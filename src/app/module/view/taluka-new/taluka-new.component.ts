import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GraphTalukaService } from 'src/app/common/services/graph-taluka.service';
import { District } from 'src/app/graphql/types/village.types';
declare const bootstrap: any;

interface Taluka {
  id: string;
  name: string;
  gu_name: string;
  district?: { id: string };
  selected?: boolean;
}
let seq = 1;
@Component({
  selector: 'app-taluka-new',
  templateUrl: './taluka-new.component.html',
  styleUrls: ['./taluka-new.component.scss'],
})
export class TalukaNewComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedActiveTalukas: Taluka[] = [];
  selectedDeletedTalukas: Taluka[] = [];
  talukaData: any = {};
  talukas: Taluka[] = [];
  deletedTalukas: Taluka[] = [];
  districts: District[] = [];
  currentForm: FormGroup;
  needUpdate = false;
  talukaModal: any;
  talukaModalElement: any;
  talukaModalOptions = { backdrop: false, keyboard: false };
  talukaModalTitle = 'Add Taluka';
  activeTalukaPagination = { page: 1, limit: 10 };
  deletedTalukaPagination = { page: 1, limit: 10 };
  totalActiveTalukas = 0;
  totalDeletedTalukas = 0;
  selectedDistrictId: string = '';
  loading = true;

  constructor(
    private talukaService: GraphTalukaService,
    private fb: FormBuilder,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    console.log(`${seq++} - ngAfterViewInit`);
    this.talukaModalElement =
      this.el.nativeElement.querySelector('#talukaModal');
    this.talukaModal = new bootstrap.Modal(
      this.talukaModalElement,
      this.talukaModalOptions
    );
  }

  ngOnDestroy(): void {
    console.log(`${seq++} - ngOnDestroy`);
    if (this.talukaModal) this.talukaModal.hide();
  }

  async ngOnInit(): Promise<void> {
    console.log(`${seq++} - ngOnInit`);
    this.initForm();
    if (!this.selectedDistrictId) await this.loadSelectedId();
    await this.loadAllDistricts();
    await this.loadTalukaData();
    this.loading = false;
  }

  initForm(): void {
    console.log(`${seq++} - initForm`);
    this.currentForm = this.fb.group({
      talukas: this.fb.array([this.createTalukaForm()]),
    });
  }

  createTalukaForm(): FormGroup {
    console.log(`${seq++} - createTalukaForm`);
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      gu_name: ['', Validators.required],
      district_id: ['', Validators.required],
      is_deleted: [false],
    });
  }

  private buildTalukaForm(t: Taluka): FormGroup {
    console.log(`${seq++} - buildTalukaForm`);
    return this.fb.group({
      id: [t.id],
      name: [t.name, Validators.required],
      gu_name: [t.gu_name, Validators.required],
      district_id: [
        t.district?.id || this.selectedDistrictId,
        Validators.required,
      ],
    });
  }

  updateSelectedActiveTalukas(): void {
    console.log(`${seq++} - updateSelectedActiveTalukas`);
    this.selectedActiveTalukas = this.talukas.filter((t) => t.selected);
  }

  updateSelectedDeletedTalukas(): void {
    console.log(`${seq++} - updateSelectedDeletedTalukas`);
    this.selectedDeletedTalukas = this.deletedTalukas.filter((t) => t.selected);
  }

  onDistrictChange(): void {
    console.log(`${seq++} - onDistrictChange`);
    this.activeTalukaPagination = { page: 1, limit: 10 };
    this.deletedTalukaPagination = { page: 1, limit: 10 };
    this.loadTalukaData();
  }

  async loadSelectedId(): Promise<void> {
    console.log(`${seq++} - loadSelectedId`);
    return new Promise((resolve, reject) => {
      this.talukaService.getSelectedDistrictId().subscribe(
        (res) => {
          this.selectedDistrictId = res?.data?.getSelectedDistrictId;
          resolve();
        },
        (err) => reject(err)
      );
    });
  }

  async loadAllDistricts(): Promise<void> {
    console.log(`${seq++} - loadAllDistricts`);
    return new Promise((resolve, reject) => {
      this.talukaService.getAllDistricts().subscribe(
        (res) => {
          this.districts = res?.data?.getDistricts || [];
          resolve();
        },
        (err) => reject(err)
      );
    });
  }

  loadTalukaData(): void {
    console.log(`${seq++} - loadTalukaData`);
    this.loading = true;
    this.talukaService
      .getTalukaStatsAndData(
        this.selectedDistrictId,
        this.activeTalukaPagination,
        this.deletedTalukaPagination
      )
      .subscribe({
        next: (res) => {
          const response = res?.data?.getTalukaStatsByDistrict;
          if (!response) return;

          this.talukaData = response;
          this.selectedDistrictId = response.selectedId;
          this.talukas = (response.activeTalukasByDistrictId || []).map(
            (t) => ({ ...t, selected: false })
          );
          this.deletedTalukas = (response.deletedTalukasByDistrictId || []).map(
            (t) => ({ ...t, selected: false })
          );
          this.selectedActiveTalukas = [];
          this.selectedDeletedTalukas = [];
          this.totalActiveTalukas = response.totalActiveTalukasByDistrictId;
          this.totalDeletedTalukas = response.totalDeletedTalukasByDistrictId;
          this.districts = response.districts;

          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(`${seq++} - loadTalukaData error`, err);
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }
  get talukasFormArray(): FormArray {
    return this.currentForm.get('talukas') as FormArray;
  }
  addTaluka(): void {
    console.log(`${seq++} - addTaluka`);
    this.talukasFormArray.push(this.createTalukaForm());
  }

  removeTaluka(index: number): void {
    console.log(`${seq++} - removeTaluka`);
    if (this.talukasFormArray.length > 1) this.talukasFormArray.removeAt(index);
  }

  saveTaluka(): void {
    console.log(`${seq++} - saveTaluka`);
    if (this.currentForm.invalid) return;
    const talukaData = this.currentForm.value.talukas;
    const request = this.needUpdate
      ? this.talukaService.updateTalukas(talukaData)
      : this.talukaService.createTalukas(talukaData);

    request.subscribe({
      next: () => {
        this.loadTalukaData();
        this.talukaModal.hide();
      },
      error: (err) =>
        console.error(
          this.needUpdate ? 'Update failed:' : 'Create failed:',
          err
        ),
    });
  }

  openTalukaModal(): void {
    console.log(`${seq++} - openTalukaModal`);
    this.talukaModalTitle = 'Add New Talukas';
    this.needUpdate = false;
    this.currentForm.setControl(
      'talukas',
      this.fb.array([this.createTalukaForm()])
    );
    this.talukaModal.show();
  }

  editTaluka(taluka: Taluka): void {
    console.log(`${seq++} - editTaluka`);
    this.needUpdate = true;
    this.talukaModalTitle = 'Edit Taluka';
    this.currentForm.setControl(
      'talukas',
      this.fb.array([this.buildTalukaForm(taluka)])
    );
    this.talukaModal.show();
  }

  editSelectedTalukas(): void {
    console.log(`${seq++} - editSelectedTalukas`);
    const selected = this.getSelectedTalukas(this.talukas);
    if (!selected.length) return;
    this.needUpdate = true;
    this.talukaModalTitle = 'Edit Selected Talukas';
    const formGroups = selected.map((t) => this.buildTalukaForm(t));
    this.currentForm.setControl('talukas', this.fb.array(formGroups));
    this.talukaModal.show();
  }

  deleteTaluka(id: string): void {
    console.log(`${seq++} - deleteTaluka`);
    this.talukaService
      .softDeleteTaluka(id)
      .subscribe({ next: () => this.loadTalukaData() });
  }

  restoreTaluka(id: string): void {
    console.log(`${seq++} - restoreTaluka`);
    this.talukaService
      .restoreTaluka(id)
      .subscribe({ next: () => this.loadTalukaData() });
  }

  deleteSelectedTalukas(): void {
    console.log(`${seq++} - deleteSelectedTalukas`);
    const ids = this.getSelectedTalukas(this.talukas).map((t) => t.id);
    if (ids.length) {
      this.talukaService
        .softDeleteTalukas(ids)
        .subscribe({ next: () => this.loadTalukaData() });
    }
  }

  restoreSelectedTalukas(): void {
    console.log(`${seq++} - restoreSelectedTalukas`);
    const ids = this.getSelectedTalukas(this.deletedTalukas).map((t) => t.id);
    if (ids.length) {
      this.talukaService
        .restoreTalukas(ids)
        .subscribe({ next: () => this.loadTalukaData() });
    }
  }

  getSelectedTalukas(list: Taluka[]): Taluka[] {
    console.log(`${seq++} - getSelectedTalukas`);
    return list.filter((t) => typeof t === 'object' && t.selected);
  }

  changeActivePage(page: number): void {
    console.log(`${seq++} - changeActivePage`);
    if (this.activeTalukaPagination.page !== page) {
      this.activeTalukaPagination.page = page;
      this.loadTalukaData();
    }
  }

  changeActivePageSize(limit: number): void {
    console.log(`${seq++} - changeActivePageSize`);
    if (this.activeTalukaPagination.limit !== limit) {
      this.activeTalukaPagination.limit = limit;
      this.activeTalukaPagination.page = 1;
      this.loadTalukaData();
    }
  }

  changeDeletedPage(page: number): void {
    console.log(`${seq++} - changeDeletedPage`);
    if (this.deletedTalukaPagination.page !== page) {
      this.deletedTalukaPagination.page = page;
      this.loadTalukaData();
    }
  }

  changeDeletedPageSize(limit: number): void {
    console.log(`${seq++} - changeDeletedPageSize`);
    if (this.deletedTalukaPagination.limit !== limit) {
      this.deletedTalukaPagination.limit = limit;
      this.deletedTalukaPagination.page = 1;
      this.loadTalukaData();
    }
  }
}
