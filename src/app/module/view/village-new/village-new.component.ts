// File 5: village-new.component.ts
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GraphVillageService } from 'src/app/common/services/graph-village.service';

declare const bootstrap: any;

let seq = 1; // Sequence counter

@Component({
  selector: 'app-village-new',
  templateUrl: './village-new.component.html',
  styleUrls: ['./village-new.component.scss'],
})
export class VillageNewComponent implements OnInit {
  selectedActiveVillages: any[] = [];
  selectedDeletedVillages: any[] = [];
  villages: any[] = [];
  deletedVillages: any[] = [];
  talukas: any[] = [];
  districts: any[] = [];
  selectedTalukaId: string = '';
  selectedDistrictId: string = '';
  totalActiveVillages = 0;
  totalDeletedVillages = 0;

  villageModal: any;
  villageModalTitle = 'Add Village';
  currentForm: FormGroup;
  needUpdate = false;

  activeVillagePagination = { page: 1, limit: 10 };
  deletedVillagePagination = { page: 1, limit: 10 };

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private villageService: GraphVillageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit', seq++);
    this.initForm();
    this.loadAllDistricts();
    this.initModal();
  }

  updateSelectedActiveVillages(): void {
    this.selectedActiveVillages = this.villages.filter((v) => v.selected);
  }

  updateSelectedDeletedVillages(): void {
    this.selectedDeletedVillages = this.deletedVillages.filter(
      (v) => v.selected
    );
  }
  initModal(): void {
    console.log('initModal', seq++);
    const element = this.el.nativeElement.querySelector('#villageModal');
    this.villageModal = new bootstrap.Modal(element);
  }

  initForm(): void {
    console.log('initForm', seq++);
    this.currentForm = this.fb.group({
      villages: this.fb.array([this.createVillageForm()]),
    });
  }

  createVillageForm(): FormGroup {
    console.log('createVillageForm', seq++);
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      gu_name: ['', Validators.required],
      taluka_id: [this.selectedTalukaId, Validators.required],
      is_deleted: [false],
    });
  }

  get villagesFormArray(): FormArray {
    return this.currentForm.get('villages') as FormArray;
  }

  onDistrictChange(): void {
    console.log('onDistrictChange', seq++);
    this.selectedTalukaId = '';
    this.loadAllTalukas();
  }

  onTalukaChange(): void {
    console.log('onTalukaChange', seq++);
    this.activeVillagePagination = { page: 1, limit: 10 };
    this.deletedVillagePagination = { page: 1, limit: 10 };
    this.loadVillageData();
  }

  loadAllDistricts(): void {
    console.log('loadAllDistricts', seq++);
    this.villageService.getAllDistricts().subscribe((res) => {
      this.districts = res?.data?.getDistricts || [];
      if (this.districts.length) {
        this.selectedDistrictId = this.districts[0].id;
        this.loadAllTalukas();
      }
    });
  }

  loadAllTalukas(): void {
    console.log('loadAllTalukas', seq++);
    this.villageService
      .getAllTalukas(this.selectedDistrictId)
      .subscribe((res) => {
        this.talukas = res?.data?.getTalukasByDistrictId || [];
        if (this.talukas.length) {
          this.selectedTalukaId = this.talukas[0].id;
          this.loadVillageData();
        }
      });
  }

  loadVillageData(): void {
    console.log('loadVillageData', seq++);
    this.selectedActiveVillages = [];
    this.selectedDeletedVillages = [];
    this.villageService
      .getVillageStatsByTaluka(
        this.selectedTalukaId,
        this.activeVillagePagination,
        this.deletedVillagePagination
      )
      .subscribe((res) => {
        const response = res?.data?.getVillageStatsByTaluka;
        if (!response) return;
        setTimeout(() => {
          // ← avoid ExpressionChangedAfterItHasBeenCheckedError
          this.selectedDistrictId = response.selectedDistrictId;
          this.selectedTalukaId = response.selectedTalukaId;
          this.talukas = response.talukas || [];

          this.villages = (response.activeVillagesByTalukaId || []).map(
            (v) => ({
              ...v,
              selected: false,
            })
          );
          this.deletedVillages = (response.deletedVillagesByTalukaId || []).map(
            (v) => ({ ...v, selected: false })
          );

          this.totalActiveVillages = response.totalActiveVillagesByTalukaId;
          this.totalDeletedVillages = response.totalDeletedVillagesByTalukaId;

          this.cdr.detectChanges(); // <-- manually trigger change detection if needed
        });
      });
  }

  openVillageModal(): void {
    console.log('openVillageModal', seq++);
    this.villageModalTitle = 'Add Village';
    this.needUpdate = false;
    this.currentForm.reset();
    this.villagesFormArray.clear();
    this.villagesFormArray.push(this.createVillageForm());
    this.villageModal.show();
  }

  addVillage(): void {
    console.log('addVillage', seq++);
    this.villagesFormArray.push(this.createVillageForm());
  }

  removeVillage(i: number): void {
    console.log('removeVillage', seq++);
    if (this.villagesFormArray.length > 1) {
      this.villagesFormArray.removeAt(i);
    }
  }

  getSelectedVillages(list: any[]): any[] {
    console.log('getSelectedVillages', seq++);
    return list.filter((v) => v.selected);
  }

  saveVillage(): void {
    console.log('saveVillage', seq++);
    if (this.currentForm.invalid) return;
    const data = this.currentForm.value.villages;
    const request = this.needUpdate
      ? this.villageService.updateVillages(data)
      : this.villageService.createVillages(data);
    request.subscribe(() => {
      this.loadVillageData();
      this.villageModal.hide();
    });
  }

  editVillage(village: any): void {
    console.log('editVillage', seq++);
    this.villageModalTitle = 'Update Village';
    this.needUpdate = true;
    this.villagesFormArray.clear();
    this.villagesFormArray.push(
      this.fb.group({
        id: [village.id],
        name: [village.name],
        gu_name: [village.gu_name],
        taluka_id: [this.selectedTalukaId],
        is_deleted: [village.is_deleted],
      })
    );
    this.villageModal.show();
  }

  editSelectedVillages(): void {
    console.log('editSelectedVillages', seq++);
    const selected = this.getSelectedVillages(this.villages);
    if (!selected.length) return;
    this.needUpdate = true;
    this.villageModalTitle = 'Edit Villages';
    const formGroups = selected.map((v) =>
      this.fb.group({
        id: [v.id],
        name: [v.name],
        gu_name: [v.gu_name],
        taluka_id: [this.selectedTalukaId],
        is_deleted: [v.is_deleted],
      })
    );
    this.currentForm.setControl('villages', this.fb.array(formGroups));
    this.villageModal.show();
  }

  deleteVillage(id: string): void {
    console.log('deleteVillage', seq++);
    this.villageService.softDeleteVillage(id).subscribe(() => {
      this.loadVillageData();
    });
  }

  deleteSelectedVillages(): void {
    console.log('deleteSelectedVillages', seq++);
    const ids = this.getSelectedVillages(this.villages).map((v) => v.id);
    this.villageService.softDeleteVillages(ids).subscribe(() => {
      this.loadVillageData();
    });
  }

  restoreVillage(id: string): void {
    console.log('restoreVillage', seq++);
    this.villageService.restoreVillage(id).subscribe(() => {
      this.loadVillageData();
    });
  }

  restoreSelectedVillages(): void {
    console.log('restoreSelectedVillages', seq++);
    const ids = this.getSelectedVillages(this.deletedVillages).map((v) => v.id);
    this.villageService.restoreVillages(ids).subscribe(() => {
      this.loadVillageData();
    });
  }

  getVillagesByTalukaId(): void {
    if (!this.selectedTalukaId) return;
    console.log('getVillagesByTalukaId', seq++);
    this.villageService
      .getVillagesByTalukaId(
        this.selectedTalukaId,
        this.activeVillagePagination
      )
      .subscribe((res) => {
        const villages = res?.data?.getVillagesByTalukaId || [];
        this.villages = villages.map((v) => ({ ...v, selected: false }));
      });
  }

  getDeletedVillagesByTalukaId(): void {
    if (!this.selectedTalukaId) return;
    console.log('getDeletedVillagesByTalukaId', seq++);
    this.villageService
      .getDeletedVillagesByTalukaId(
        this.selectedTalukaId,
        this.deletedVillagePagination
      )
      .subscribe((res) => {
        const villages = res?.data?.getDeletedVillagesByTalukaId || [];
        this.deletedVillages = villages.map((v) => ({ ...v, selected: false }));
      });
  }

  changeActiveVillagePage(page: number): void {
    if (this.activeVillagePagination.page === page) return;
    console.log('changeActiveVillagePage', seq++);
    this.activeVillagePagination.page = page;
    this.getVillagesByTalukaId();
  }

  changeActiveVillagePageSize(limit: number): void {
    if (this.activeVillagePagination.limit === limit) return;
    console.log('changeActiveVillagePageSize', seq++);
    this.activeVillagePagination.limit = limit;
    this.activeVillagePagination.page = 1;
    this.getVillagesByTalukaId();
  }

  changeDeletedVillagePage(page: number): void {
    if (this.deletedVillagePagination.page === page) return;
    console.log('changeDeletedVillagePage', seq++);
    this.deletedVillagePagination.page = page;
    this.getDeletedVillagesByTalukaId();
  }

  changeDeletedVillagePageSize(limit: number): void {
    if (this.deletedVillagePagination.limit === limit) return;
    console.log('changeDeletedVillagePageSize', seq++);
    this.deletedVillagePagination.limit = limit;
    this.deletedVillagePagination.page = 1;
    this.getDeletedVillagesByTalukaId();
  }
}
