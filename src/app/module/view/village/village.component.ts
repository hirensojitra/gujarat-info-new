// ./components/village/village.component.ts
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GraphVillageService } from 'src/app/common/services/graph-village.service';
import { District, Taluka, Village } from 'src/app/graphql/types/village.types';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

declare const bootstrap: any;

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit {
  selectedActiveVillages: Village[] = [];
  selectedDeletedVillages: Village[] = [];
  villages: Village[] = [];
  deletedVillages: Village[] = [];
  talukas: Taluka[] = [];
  districts: District[] = [];
  selectedTalukaId = '';
  selectedDistrictId = '';
  totalActiveVillages = 0;
  totalDeletedVillages = 0;

  villageModal: any;
  villageModalTitle = 'Add Village';
  currentForm: FormGroup;
  needUpdate = false;

  readonly DEFAULT_LIMIT = 10;
  activeVillagePagination = { page: 1, limit: this.DEFAULT_LIMIT };
  deletedVillagePagination = { page: 1, limit: this.DEFAULT_LIMIT };

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private villageService: GraphVillageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAllDistricts();
    this.initModal();
  }

  private initModal(): void {
    const element = this.el.nativeElement.querySelector('#villageModal');
    this.villageModal = new bootstrap.Modal(element);
  }

  private initForm(): void {
    this.currentForm = this.fb.group({
      villages: this.fb.array([this.createVillageForm()])
    });
  }

  private createVillageForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      gu_name: ['', Validators.required],
      taluka_id: [this.selectedTalukaId, Validators.required]
    });
  }

  get villagesFormArray(): FormArray {
    return this.currentForm.get('villages') as FormArray;
  }

  updateSelectedActiveVillages(): void {
    this.selectedActiveVillages = this.villages.filter((v) => v.selected);
  }

  updateSelectedDeletedVillages(): void {
    this.selectedDeletedVillages = this.deletedVillages.filter((v) => v.selected);
  }

  onDistrictChange(): void {
    this.selectedTalukaId = '';
    this.loadAllTalukas();
  }

  onTalukaChange(): void {
    this.activeVillagePagination = { page: 1, limit: this.DEFAULT_LIMIT };
    this.deletedVillagePagination = { page: 1, limit: this.DEFAULT_LIMIT };
    this.loadVillageData();
  }

  private loadAllDistricts(): void {
    this.villageService.getAllDistricts().pipe(
      catchError(err => { console.error(err); return of({ data: { getDistricts: [] } }); })
    ).subscribe((res) => {
      this.districts = res?.data?.getDistricts || [];
      if (this.districts.length) {
        this.selectedDistrictId = this.districts[0].id;
        this.loadAllTalukas();
      }
    });
  }

  private loadAllTalukas(): void {
    this.villageService.getAllTalukas(this.selectedDistrictId).pipe(
      catchError(err => { console.error(err); return of({ data: { getTalukasByDistrictId: [] } }); })
    ).subscribe((res) => {
      this.talukas = res?.data?.getTalukasByDistrictId || [];
      if (this.talukas.length) {
        this.selectedTalukaId = this.talukas[0].id;
        this.loadVillageData();
      }
    });
  }

  private loadVillageData(): void {
    this.selectedActiveVillages = [];
    this.selectedDeletedVillages = [];
    this.villageService.getVillageStatsByTaluka(
      this.selectedTalukaId,
      this.activeVillagePagination,
      this.deletedVillagePagination
    ).pipe(
      catchError(err => { console.error(err); return of({ data: null }); })
    ).subscribe((res) => {
      const response = res?.data?.getVillageStatsByTaluka;
      if (!response) return;
      this.selectedDistrictId = response.selectedDistrictId;
      this.selectedTalukaId = response.selectedTalukaId;
      this.talukas = response.talukas || [];
      this.villages = (response.activeVillagesByTalukaId || []).map(v => ({ ...v, selected: false }));
      this.deletedVillages = (response.deletedVillagesByTalukaId || []).map(v => ({ ...v, selected: false }));
      this.totalActiveVillages = response.totalActiveVillagesByTalukaId;
      this.totalDeletedVillages = response.totalDeletedVillagesByTalukaId;
      this.cdr.detectChanges();
    });
  }

  openVillageModal(): void {
    this.villageModalTitle = 'Add Village';
    this.needUpdate = false;
    this.currentForm.reset();
    this.villagesFormArray.clear();
    this.villagesFormArray.push(this.createVillageForm());
    this.villageModal.show();
  }

  addVillage(): void {
    this.villagesFormArray.push(this.createVillageForm());
  }

  removeVillage(i: number): void {
    if (this.villagesFormArray.length > 1) {
      this.villagesFormArray.removeAt(i);
    }
  }

  private getSelectedVillages(list: Village[]): Village[] {
    return list.filter((v) => v.selected);
  }

  saveVillage(): void {
    if (this.currentForm.invalid) return;
    const data = this.currentForm.value.villages;
    const request = this.needUpdate
      ? this.villageService.updateVillages(data)
      : this.villageService.createVillages(data);
    request.pipe(
      catchError(err => { console.error(err); return of(null); })
    ).subscribe(() => {
      this.loadVillageData();
      this.villageModal.hide();
    });
  }

  editVillage(village: Village): void {
    this.villageModalTitle = 'Update Village';
    this.needUpdate = true;
    this.villagesFormArray.clear();
    this.villagesFormArray.push(this.fb.group({
      id: [village.id],
      name: [village.name, Validators.required],
      gu_name: [village.gu_name, Validators.required],
      taluka_id: [this.selectedTalukaId, Validators.required]
    }));
    this.villageModal.show();
  }

  editSelectedVillages(): void {
    const selected = this.getSelectedVillages(this.villages);
    if (!selected.length) return;
    this.needUpdate = true;
    this.villageModalTitle = 'Edit Villages';
    const formGroups = selected.map((v) => this.fb.group({
      id: [v.id],
      name: [v.name, Validators.required],
      gu_name: [v.gu_name, Validators.required],
      taluka_id: [this.selectedTalukaId, Validators.required]
    }));
    this.currentForm.setControl('villages', this.fb.array(formGroups));
    this.villageModal.show();
  }

  deleteVillage(id: string): void {
    this.villageService.softDeleteVillage(id).pipe(
      catchError(err => { console.error(err); return of(null); })
    ).subscribe(() => this.loadVillageData());
  }

  deleteSelectedVillages(): void {
    const ids = this.getSelectedVillages(this.villages).map((v) => v.id);
    this.villageService.softDeleteVillages(ids).pipe(
      catchError(err => { console.error(err); return of(null); })
    ).subscribe(() => this.loadVillageData());
  }

  restoreVillage(id: string): void {
    this.villageService.restoreVillage(id).pipe(
      catchError(err => { console.error(err); return of(null); })
    ).subscribe(() => this.loadVillageData());
  }

  restoreSelectedVillages(): void {
    const ids = this.getSelectedVillages(this.deletedVillages).map((v) => v.id);
    this.villageService.restoreVillages(ids).pipe(
      catchError(err => { console.error(err); return of(null); })
    ).subscribe(() => this.loadVillageData());
  }

  changeActiveVillagePage(page: number): void {
    if (this.activeVillagePagination.page === page) return;
    this.activeVillagePagination.page = page;
    this.loadVillageData();
  }

  changeActiveVillagePageSize(limit: number): void {
    if (this.activeVillagePagination.limit === limit) return;
    this.activeVillagePagination.limit = limit;
    this.activeVillagePagination.page = 1;
    this.loadVillageData();
  }

  changeDeletedVillagePage(page: number): void {
    if (this.deletedVillagePagination.page === page) return;
    this.deletedVillagePagination.page = page;
    this.loadVillageData();
  }

  changeDeletedVillagePageSize(limit: number): void {
    if (this.deletedVillagePagination.limit === limit) return;
    this.deletedVillagePagination.limit = limit;
    this.deletedVillagePagination.page = 1;
    this.loadVillageData();
  }
}
