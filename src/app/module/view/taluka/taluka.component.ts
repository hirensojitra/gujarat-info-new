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
  selector: 'app-taluka',
  templateUrl: './taluka.component.html',
  styleUrls: ['./taluka.component.scss'],
})
export class TalukaComponent implements OnInit, AfterViewInit, OnDestroy {
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
    this.talukaModalElement =
      this.el.nativeElement.querySelector('#talukaModal');
    this.talukaModal = new bootstrap.Modal(
      this.talukaModalElement,
      this.talukaModalOptions
    );
  }

  ngOnDestroy(): void {
    if (this.talukaModal) this.talukaModal.hide();
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    if (!this.selectedDistrictId) await this.loadSelectedId();
    await this.loadAllDistricts();
    await this.loadTalukaData();
    this.loading = false;
  }

  initForm(): void {
    this.currentForm = this.fb.group({
      talukas: this.fb.array([this.createTalukaForm()]),
    });
  }

  createTalukaForm(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      gu_name: ['', Validators.required],
      district_id: ['', Validators.required],
      is_deleted: [false],
    });
  }

  private buildTalukaForm(t: Taluka): FormGroup {
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
    this.selectedActiveTalukas = this.talukas.filter((t) => t.selected);
  }

  updateSelectedDeletedTalukas(): void {
    this.selectedDeletedTalukas = this.deletedTalukas.filter((t) => t.selected);
  }

  onDistrictChange(): void {
    this.activeTalukaPagination = { page: 1, limit: 10 };
    this.deletedTalukaPagination = { page: 1, limit: 10 };
    this.loadTalukaData();
  }

  async loadSelectedId(): Promise<void> {
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
    this.talukasFormArray.push(this.createTalukaForm());
  }

  removeTaluka(index: number): void {
    if (this.talukasFormArray.length > 1) this.talukasFormArray.removeAt(index);
  }

  saveTaluka(): void {
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
    this.talukaModalTitle = 'Add New Talukas';
    this.needUpdate = false;
    this.currentForm.setControl(
      'talukas',
      this.fb.array([this.createTalukaForm()])
    );
    this.talukaModal.show();
  }

  editTaluka(taluka: Taluka): void {
    this.needUpdate = true;
    this.talukaModalTitle = 'Edit Taluka';
    this.currentForm.setControl(
      'talukas',
      this.fb.array([this.buildTalukaForm(taluka)])
    );
    this.talukaModal.show();
  }

  editSelectedTalukas(): void {
    const selected = this.getSelectedTalukas(this.talukas);
    if (!selected.length) return;
    this.needUpdate = true;
    this.talukaModalTitle = 'Edit Selected Talukas';
    const formGroups = selected.map((t) => this.buildTalukaForm(t));
    this.currentForm.setControl('talukas', this.fb.array(formGroups));
    this.talukaModal.show();
  }

  deleteTaluka(id: string): void {
    this.talukaService
      .softDeleteTaluka(id)
      .subscribe({ next: () => this.loadTalukaData() });
  }

  restoreTaluka(id: string): void {
    this.talukaService
      .restoreTaluka(id)
      .subscribe({ next: () => this.loadTalukaData() });
  }

  deleteSelectedTalukas(): void {
    const ids = this.getSelectedTalukas(this.talukas).map((t) => t.id);
    if (ids.length) {
      this.talukaService
        .softDeleteTalukas(ids)
        .subscribe({ next: () => this.loadTalukaData() });
    }
  }

  restoreSelectedTalukas(): void {
    const ids = this.getSelectedTalukas(this.deletedTalukas).map((t) => t.id);
    if (ids.length) {
      this.talukaService
        .restoreTalukas(ids)
        .subscribe({ next: () => this.loadTalukaData() });
    }
  }

  getSelectedTalukas(list: Taluka[]): Taluka[] {
    return list.filter((t) => typeof t === 'object' && t.selected);
  }

  changeActivePage(page: number): void {
    if (this.activeTalukaPagination.page !== page) {
      this.activeTalukaPagination.page = page;
      this.loadTalukaData();
    }
  }

  changeActivePageSize(limit: number): void {
    if (this.activeTalukaPagination.limit !== limit) {
      this.activeTalukaPagination.limit = limit;
      this.activeTalukaPagination.page = 1;
      this.loadTalukaData();
    }
  }

  changeDeletedPage(page: number): void {
    if (this.deletedTalukaPagination.page !== page) {
      this.deletedTalukaPagination.page = page;
      this.loadTalukaData();
    }
  }

  changeDeletedPageSize(limit: number): void {
    if (this.deletedTalukaPagination.limit !== limit) {
      this.deletedTalukaPagination.limit = limit;
      this.deletedTalukaPagination.page = 1;
      this.loadTalukaData();
    }
  }
}
