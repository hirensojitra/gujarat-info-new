import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { District } from 'src/app/common/interfaces/commonInterfaces';
import { GraphTalukaService } from 'src/app/common/services/graph-taluka.service';
declare const bootstrap: any;

let seq = 1;

@Component({
  selector: 'app-taluka-new',
  templateUrl: './taluka-new.component.html',
  styleUrls: ['./taluka-new.component.scss'],
})
export class TalukaNewComponent implements OnInit, AfterViewInit {
  selectedActiveTalukas: any[] = [];
  selectedDeletedTalukas: any[] = [];

  talukaData: any = {};
  talukas: any[] = [];
  deletedTalukas: any[] = [];
  districts: District[] = [];
  currentForm: FormGroup;
  needUpdate = false;

  talukaModal: any;
  talukaModalElement: any;
  talukaModalOptions: any;
  talukaModalTitle = 'Add Taluka';

  activeTalukaPagination = { page: 1, limit: 10 };
  deletedTalukaPagination = { page: 1, limit: 10 };
  totalActiveTalukas = 0;
  totalDeletedTalukas = 0;

  selectedDistrictId: string = '';
  loading: boolean = true;

  constructor(
    private talukaService: GraphTalukaService,
    private fb: FormBuilder,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', seq++);
    this.talukaModalElement =
      this.el.nativeElement.querySelector('#talukaModal');
    this.talukaModalOptions = { backdrop: false, keyboard: false };
    this.talukaModal = new bootstrap.Modal(
      this.talukaModalElement,
      this.talukaModalOptions
    );
  }

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit', seq++);
    this.initForm();
    if (!this.selectedDistrictId) await this.loadSelectedId();
    await this.loadAllDistricts();
    await this.loadTalukaData();
    this.loading = false;
  }
  updateSelectedActiveTalukas() {
    this.selectedActiveTalukas = this.talukas.filter((t) => t.selected);
  }

  updateSelectedDeletedTalukas() {
    this.selectedDeletedTalukas = this.deletedTalukas.filter((t) => t.selected);
  }

  async loadSelectedId(): Promise<void> {
    console.log('loadSelectedId', seq++);
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
    console.log('loadAllDistricts', seq++);
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

  initForm() {
    console.log('initForm', seq++);
    this.currentForm = this.fb.group({
      talukas: this.fb.array([this.createTalukaForm()]),
    });
  }

  createTalukaForm(): FormGroup {
    console.log('createTalukaForm', seq++);
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      gu_name: ['', Validators.required],
      district_id: ['', Validators.required],
      is_deleted: [false],
    });
  }

  get talukasFormArray(): FormArray {
    return this.currentForm.get('talukas') as FormArray;
  }
  onDistrictChange(): void {
    console.log('onDistrictChange', seq++);
    this.activeTalukaPagination = { page: 1, limit: 10 };
    this.deletedTalukaPagination = { page: 1, limit: 10 };
    this.loadTalukaData();
  }

  loadTalukaData(): void {
    console.log('loadTalukaData', ++seq);
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
            (t) => ({
              ...t,
              selected: false,
            })
          );
          this.deletedTalukas = (response.deletedTalukasByDistrictId || []).map(
            (t) => ({
              ...t,
              selected: false,
            })
          );

          // Clear selected arrays to prevent template recalculations
          this.selectedActiveTalukas = [];
          this.selectedDeletedTalukas = [];

          this.totalActiveTalukas = response.totalActiveTalukasByDistrictId;
          this.totalDeletedTalukas = response.totalDeletedTalukasByDistrictId;
          this.districts = response.districts;

          this.loading = false;

          // ✅ Ensure Angular updates the view after model changes
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          console.error('Error loading taluka data:', err);
          this.cdr.detectChanges(); // Optional safety
        },
      });
  }

  addTaluka() {
    console.log('addTaluka', seq++);
    this.talukasFormArray.push(this.createTalukaForm());
  }

  removeTaluka(index: number) {
    console.log('removeTaluka', seq++);
    if (this.talukasFormArray.length > 1) this.talukasFormArray.removeAt(index);
  }

  saveTaluka() {
    console.log('saveTaluka', seq++);
    if (this.currentForm.invalid) return;
    const talukaData = this.currentForm.value.talukas;

    const request = this.needUpdate
      ? this.talukaService.updateTalukas(talukaData)
      : this.talukaService.createTalukas(talukaData);

    request.subscribe(
      () => {
        this.loadTalukaData();
        this.talukaModal.hide();
      },
      (err) =>
        console.error(
          this.needUpdate ? 'Update failed:' : 'Create failed:',
          err
        )
    );
  }

  openTalukaModal() {
    console.log('openTalukaModal', seq++);
    this.talukaModalTitle = 'Add New Talukas';
    this.needUpdate = false;
    this.currentForm.reset();
    this.currentForm.setControl(
      'talukas',
      this.fb.array([this.createTalukaForm()])
    );
    this.talukaModal.show();
  }

  editTaluka(taluka: any) {
    console.log('editTaluka', seq++);
    this.needUpdate = true;
    this.talukaModalTitle = 'Edit Taluka';
    const formGroup = this.fb.group({
      id: [taluka.id],
      name: [taluka.name, Validators.required],
      gu_name: [taluka.gu_name, Validators.required],
      district_id: [this.selectedDistrictId, Validators.required],
      is_deleted: [taluka.is_deleted],
    });
    this.currentForm.setControl('talukas', this.fb.array([formGroup]));
    this.talukaModal.show();
  }

  editSelectedTalukas() {
    console.log('editSelectedTalukas', seq++);
    const selected = this.getSelectedTalukas(this.talukas);
    if (!selected.length) return;
    this.needUpdate = true;
    this.talukaModalTitle = 'Edit Selected Talukas';

    const formGroups = selected.map((t) =>
      this.fb.group({
        id: [t.id],
        name: [t.name, Validators.required],
        gu_name: [t.gu_name, Validators.required],
        district_id: [
          t.district?.id || this.selectedDistrictId,
          Validators.required,
        ],
        is_deleted: [t.is_deleted],
      })
    );

    this.currentForm.setControl('talukas', this.fb.array(formGroups));
    this.talukaModal.show();
  }

  deleteTaluka(id: string) {
    console.log('deleteTaluka', seq++);
    this.talukaService
      .softDeleteTaluka(id)
      .subscribe(() => this.loadTalukaData());
  }

  restoreTaluka(id: string) {
    console.log('restoreTaluka', seq++);
    this.talukaService.restoreTaluka(id).subscribe(() => this.loadTalukaData());
  }

  deleteSelectedTalukas() {
    console.log('deleteSelectedTalukas', seq++);
    const ids = this.getSelectedTalukas(this.talukas).map((t) => t.id);
    if (ids.length) {
      this.talukaService
        .softDeleteTalukas(ids)
        .subscribe(() => this.loadTalukaData());
    }
  }

  restoreSelectedTalukas() {
    console.log('restoreSelectedTalukas', seq++);
    const ids = this.getSelectedTalukas(this.deletedTalukas).map((t) => t.id);
    if (ids.length) {
      this.talukaService
        .restoreTalukas(ids)
        .subscribe(() => this.loadTalukaData());
    }
  }

  getSelectedTalukas(list: any[]) {
    console.log('getSelectedTalukas', seq++);
    return list.filter((t) => typeof t === 'object' && t.selected);
  }

  changeActivePage(page: number) {
    console.log('changeActivePage', seq++);
    if (this.activeTalukaPagination.page === page) return;
    this.activeTalukaPagination.page = page;
    this.loadTalukaData();
  }

  changeActivePageSize(limit: number) {
    console.log('changeActivePageSize', seq++);
    if (this.activeTalukaPagination.limit === limit) return;
    this.activeTalukaPagination.limit = limit;
    this.activeTalukaPagination.page = 1;
    this.loadTalukaData();
  }

  changeDeletedPage(page: number) {
    console.log('changeDeletedPage', seq++);
    if (this.deletedTalukaPagination.page === page) return;
    this.deletedTalukaPagination.page = page;
    this.loadTalukaData();
  }

  changeDeletedPageSize(limit: number) {
    console.log('changeDeletedPageSize', seq++);
    if (this.deletedTalukaPagination.limit === limit) return;
    this.deletedTalukaPagination.limit = limit;
    this.deletedTalukaPagination.page = 1;
    this.loadTalukaData();
  }
}
