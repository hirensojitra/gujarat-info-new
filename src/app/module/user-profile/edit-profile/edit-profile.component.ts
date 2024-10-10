import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { District, Taluka, User, Village } from '../../../common/interfaces/commonInterfaces';
import { UserService } from '../../../common/services/user.service';
import { DistrictService } from '../../../common/services/district.service';
import { TalukaService } from '../../../common/services/taluka.service';
import { VillageService } from '../../../common/services/village.service';
import { DevelopmentService } from '../../../common/services/development.service';
import { ToastService } from '../../../common/services/toast.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  districts: District[] = [];
  talukas: Taluka[] = [];
  villages: Village[] = [];
  selectedDistrict: District | undefined;
  selectedTaluka: Taluka | undefined;
  selectedVillage: Village | undefined;
  user!: User;
  userSubscription: Subscription;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private districtService: DistrictService,
    private talukaService: TalukaService,
    private villageService: VillageService,
    private DS: DevelopmentService,
    private toastService: ToastService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.required],
      district_id: [null, Validators.required],
      taluka_id: [null, Validators.required],
      village_id: [null, Validators.required]
    });

    this.userSubscription = this.userService.getUser().subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        const filteredValue = {
          firstname: user.firstname || '',
          lastname: user.lastname || '',
          mobile: user.mobile || '',
          district_id: user.district_id || '',
          taluka_id: user.taluka_id || '',
          village_id: user.village_id || ''
        };
        this.userForm.setValue(filteredValue);
        this.loadDistricts();
      }
    });
  }

  ngOnInit(): void {
    this.userForm.get('district_id')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((districtId) => {
      this.userForm.get('taluka_id')?.markAsUntouched;
      this.userForm.get('village_id')?.markAsUntouched;
      this.selectedDistrict = this.districts.find(district => district.id === districtId);
      this.talukas = [];
      this.villages = [];
      this.loadTalukas();
      this.userForm.get('taluka_id')?.setValue(null);
    });

    this.userForm.get('taluka_id')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((talukaId) => {
      this.userForm.get('village_id')?.markAsUntouched;
      this.selectedTaluka = this.talukas.find(taluka => taluka.id === talukaId);
      this.villages = [];
      this.loadVillages();
      this.userForm.get('village_id')?.setValue(null);
    });
  }

  loadDistricts(): void {
    this.districtService.getDistrict().pipe(
      takeUntil(this.destroy$)
    ).subscribe((districts: District[]) => {
      this.districts = districts;
      if (districts.length) {
        this.selectedDistrict = districts.find(district => district.id === this.user?.district_id);
        this.userForm.get('district_id')?.setValue(this.selectedDistrict?.id || null);
      }
    });


  }

  loadTalukas(): void {
    const districtId = this.userForm.get('district_id')?.value;
    if (districtId) {
      this.talukaService.getTalukaByDistrict(districtId).pipe(
        takeUntil(this.destroy$)
      ).subscribe((talukas: Taluka[]) => {
        this.talukas = talukas;
        if (talukas.length) {
          this.selectedTaluka = talukas.find(taluka => taluka.id === this.user?.taluka_id);
          this.userForm.get('taluka_id')?.setValue(this.selectedTaluka?.id || null);
        }
      });
    }
  }

  loadVillages(): void {
    const talukaId = this.userForm.get('taluka_id')?.value;
    const districtId = this.userForm.get('district_id')?.value;
    if (talukaId && districtId) {
      this.villageService.getVillageByTaluka(talukaId).pipe(
        takeUntil(this.destroy$)
      ).subscribe((villages: Village[]) => {
        this.villages = villages;
        if (villages.length) {
          this.selectedVillage = villages.find(village => village.id === this.user?.village_id);
          this.userForm.get('village_id')?.setValue(this.selectedVillage?.id || null);
        }
      });
    }
  }


  saveUser(): void {
    if (this.userForm.valid) {
      if (this.user) {
        const formValue = this.userForm.value;
        const isUserDataChanged = Object.keys(formValue).some(key => this.user![key] !== formValue[key]);
        if (!isUserDataChanged) {
          this.toastService.show('User data has not changed. Skipping update.', { class: 'bg-danger' });
          return;
        }
        const userid = this.user['id'];
        if (!userid) {
          this.toastService.show('Invalid userid.', { class: 'bg-danger' });
          return;
        }
        this.userForm.setValue(formValue);
        const updateUser$ = this.userService.updateUserData(userid, formValue);
        updateUser$.subscribe(
          (response: any) => {
            this.userService.setUser(response.user);
            this.toastService.show(response.message, { class: 'bg-success' });
            this.userForm.setValue(formValue);
          },
          error => {
            console.error('Error updating user:', error);
            const errorMessage = error && typeof error.message === 'string'
              ? error.message
              : 'Unexpected server response. Please check the network log.';
            this.toastService.show(errorMessage, { class: 'bg-danger' });
          }
        );
        ;
      }
    } else {
      // Mark all form controls as touched to trigger validation errors
      this.DS.markFormGroupTouched(this.userForm);
    }
  }



  validateImage(imageUrl: string): string {
    return imageUrl || `https://dummyimage.com/300x300/F4F4F4/000000&text=${this.imageText()}`;
  }
  imageText(): string {
    if (this.user && this.user.firstname && this.user.lastname) {
      const firstCharFirstName = this.user.firstname.charAt(0);
      const firstCharLastName = this.user.lastname.charAt(0);
      return `${firstCharFirstName}${firstCharLastName}`;
    } else {
      return 'USER';
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.userSubscription.unsubscribe();
  }
}
