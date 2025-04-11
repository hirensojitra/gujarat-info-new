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
      district_id: [null],
      taluka_id: [null],
      village_id: [null]
    });
  }

  ngOnInit(): void {
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
        const currentFormValue = Object.keys(this.userForm.value).reduce((acc, key) => {
          acc[key] = this.userForm.value[key]?.toString() || '';
          return acc;
        }, {});
        console.log(currentFormValue)
        const isEqual = JSON.stringify(currentFormValue) === JSON.stringify(filteredValue);
        if (!isEqual) {
          this.userForm.patchValue(filteredValue, { emitEvent: false });
        }
      }
      this.loadDistricts();
    });
    this.userForm.get('district_id')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(async (districtId) => {
      this.userForm.get('taluka_id')?.markAsUntouched();
      this.userForm.get('village_id')?.markAsUntouched();
      this.selectedDistrict = this.districts.find(district => district.id === districtId);
      this.talukas = [];
      this.villages = [];
      this.userForm.get('taluka_id')?.setValue(null);
      await this.loadTalukas();
    });

    this.userForm.get('taluka_id')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(async (talukaId) => {
      this.userForm.get('village_id')?.markAsUntouched();
      this.selectedTaluka = this.talukas.find(taluka => taluka.id === talukaId);
      this.villages = [];
      this.userForm.get('village_id')?.setValue(null);
      await this.loadVillages();
    });
  }

  async loadDistricts(): Promise<void> {
    this.districts = await this.districtService.getDistrict().toPromise();
    if (this.districts.length) {
      this.selectedDistrict = this.districts.find(district => district.id === this.user?.district_id);
      this.userForm.get('district_id')?.setValue(this.selectedDistrict?.id || null);
    }
  }

  async loadTalukas(): Promise<void> {
    const districtId = this.userForm.get('district_id')?.value;
    if (districtId) {
      this.talukas = await this.talukaService.getTalukaByDistrict(districtId).toPromise();
      if (this.talukas.length) {
        const selectedTaluka = this.talukas.find(taluka => taluka.id == this.user.taluka_id);
        this.userForm.get('taluka_id')?.setValue(selectedTaluka?selectedTaluka.id : null);
      }
    }
  }

  async loadVillages(): Promise<void> {
    const talukaId = this.userForm.get('taluka_id')?.value;
    if (talukaId) {
      this.villages = await this.villageService.getVillageByTaluka(talukaId).toPromise();
      if (this.villages.length) {
        // Set the default value for Village from the user's profile
        const selectedVillage = this.villages.find(village => village.id == this.user?.village_id);
        this.userForm.get('village_id')?.setValue(selectedVillage?.id || null);
      }
    }
  }

  saveUser(): void {
    if (this.userForm.valid) {
      if (this.user) {
        const formValue = this.userForm.value;
        console.log(formValue)
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
        this.userService.updateUser(userid, formValue).subscribe(
          (response: any) => {
            this.userService.setUser(response.user);
            this.toastService.show(response.message, { class: 'bg-success' });
          },
          error => {
            console.error('Error updating user:', error);
            const errorMessage = error && typeof error.message === 'string'
              ? error.message
              : 'Unexpected server response. Please check the network log.';
            this.toastService.show(errorMessage, { class: 'bg-danger' });
          }
        );
      }
    } else {
      this.DS.markFormGroupTouched(this.userForm);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.userSubscription.unsubscribe();
  }
}
