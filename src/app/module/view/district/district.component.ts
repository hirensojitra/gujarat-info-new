import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { District } from 'src/app/common/interfaces/commonInterfaces';
import { GraphDistrictService } from 'src/app/common/services/graph-district.service';

declare const bootstrap: any;
let seq = 1;

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss'],
})
export class DistrictComponent implements OnInit, AfterViewInit {
  // state properties
  districtData = {
    getDistrictStats: {
      activeDistrictLength: 0,
      deletedDistrictLength: 0,
      districtLength: 0,
    },
    getDeletedDistricts: [],
    getDistricts: [],
  };

  districts: District[] = [];
  deletedDistricts: District[] = [];
  currentForm: FormGroup;
  needUpdate = false;
  deletedDistrictCount = 0;

  districtModal: any;
  districtModalElement: any;
  districtModalOptions: any;
  districtModalTitle = 'Add District';

  activeDistrictPagination = {
    page: 1,
    limit: 10,
    sortBy: 'name',
    sortOrder: 'ASC',
  };
  deletedDistrictPagination = {
    page: 1,
    limit: 10,
    sortBy: 'name',
    sortOrder: 'ASC',
  };
  totalActiveDistricts = 0;
  totalDeletedDistricts = 0;

  selectedActiveDistricts: string[] = [];
  selectedDeletedDistricts: string[] = [];

  constructor(
    private districtService: GraphDistrictService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', seq++);
    this.districtModalElement =
      this.el.nativeElement.querySelector('#districtModal');
    this.districtModalOptions = { backdrop: false, keyboard: false };
    this.districtModal = new bootstrap.Modal(
      this.districtModalElement,
      this.districtModalOptions
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit', seq++);
    this.loadDistrictData();
    this.initForm();
  }

  updateSelectedActiveDistricts() {
    console.log('updateSelectedActiveDistricts', seq++);
    this.selectedActiveDistricts = this.districts
      .filter((d) => d.selected)
      .map((d) => d.id);
  }

  updateSelectedDeletedDistricts() {
    console.log('updateSelectedDeletedDistricts', seq++);
    this.selectedDeletedDistricts = this.deletedDistricts
      .filter((d) => d.selected)
      .map((d) => d.id);
  }

  loadDistrictData() {
    console.log('loadDistrictData', seq++);
    this.districtService
      .getDistrictStatsAndData(
        this.activeDistrictPagination,
        this.deletedDistrictPagination
      )
      .subscribe({
        next: (data) => {
          this.districtData = data.data;
          this.districts = this.districtData.getDistricts;
          this.deletedDistricts = this.districtData.getDeletedDistricts;
          this.totalActiveDistricts =
            this.districtData.getDistrictStats.activeDistrictLength;
          this.totalDeletedDistricts =
            this.districtData.getDistrictStats.deletedDistrictLength;
        },
        error: (error) => console.error('Error fetching district data:', error),
      });
  }

  initForm() {
    console.log('initForm', seq++);
    this.currentForm = this.fb.group({
      districts: this.fb.array([this.createDistrictForm()]),
    });
  }

  createDistrictForm(): FormGroup {
    console.log('createDistrictForm', seq++);
    return this.fb.group({
      name: ['', Validators.required],
      gu_name: ['', Validators.required]
    });
  }

  get districtsFormArray(): FormArray {
    return this.currentForm.get('districts') as FormArray;
  }

  addDistrict() {
    console.log('addDistrict', seq++);
    this.districtsFormArray.push(this.createDistrictForm());
  }

  removeDistrict(index: number) {
    console.log('removeDistrict', seq++);
    const districtToRemove = this.districtsFormArray.at(index).value;
    const districtId = districtToRemove.id;
    const district = this.districts.find((d) => d.id === districtId);
    if (district) district.selected = false;
    if (this.districtsFormArray.length > 1)
      this.districtsFormArray.removeAt(index);
  }

  saveDistrict() {
    console.log('saveDistrict', seq++);
    if (this.currentForm.invalid) return;
    const districtData = this.currentForm.value.districts;

    if (this.needUpdate) {
      this.districtService.updateDistricts(districtData).subscribe({
        next: (data) => {
          const updatedDistricts = data.data.updateDistricts;
          updatedDistricts.forEach((updatedDistrict) => {
            const index = this.districts.findIndex(
              (d) => d.id === updatedDistrict.id
            );
            if (index !== -1) {
              const updated = { ...this.districts[index], ...updatedDistrict };
              this.districts[index] = updated;
            }
          });
          this.districtModal.hide();
        },
        error: (err) => console.error('Update error:', err),
      });
    } else {
      this.districtService.createDistricts(districtData).subscribe({
        next: () => {
          this.loadDistrictData();
          this.districtModal.hide();
        },
        error: (err) => console.error('Create error:', err),
      });
    }
  }

  openDistrictModal() {
    console.log('openDistrictModal', seq++);
    this.districtModalTitle = 'Add New Districts';
    this.needUpdate = false;
    const formArray = this.districtsFormArray;
    formArray.clear();
    this.addDistrict();
    this.districtModal.show();
  }

  openMultipleEditModal(districts: District[]) {
    console.log('openMultipleEditModal', seq++);
    this.districtModalTitle = 'Edit Multiple Districts';
    this.needUpdate = true;
    const formArray = this.districtsFormArray;
    formArray.clear();
    districts.forEach((district) => {
      formArray.push(
        this.fb.group({
          id: [district.id],
          name: [district.name, Validators.required],
          gu_name: [district.gu_name, Validators.required],
          is_deleted: [district.is_deleted],
        })
      );
    });
    this.districtModal.show();
  }

  deleteSelectedDistricts() {
    console.log('deleteSelectedDistricts', seq++);
    const selectedIds = this.getSelectedDistricts(this.districts);
    if (selectedIds.length) {
      this.districtService
        .softDeleteDistricts(selectedIds)
        .subscribe(() => this.loadDistrictData());
    }
  }

  restoreSelectedDistricts() {
    console.log('restoreSelectedDistricts', seq++);
    const selectedIds = this.getSelectedDistricts(this.deletedDistricts);
    if (selectedIds.length) {
      this.districtService
        .restoreDistricts(selectedIds)
        .subscribe(() => this.loadDistrictData());
    }
  }

  editSelectedDistricts() {
    console.log('editSelectedDistricts', seq++);
    const selectedIds = this.getSelectedDistricts(this.districts);
    if (!selectedIds.length) return;
    const selected = this.districts.filter((d) => selectedIds.includes(d.id));
    this.openMultipleEditModal(selected);
  }

  getSelectedDistricts(districts: District[]): string[] {
    console.log('getSelectedDistricts', seq++);
    return districts.filter((d) => d.selected).map((d) => d.id);
  }

  toggleDistrictSelection(d: District) {
    console.log('toggleDistrictSelection', seq++);
    d.selected = !d.selected;
  }

  editDistrict(d: District) {
    console.log('editDistrict', seq++);
    this.districtModalTitle = 'Update District';
    this.needUpdate = true;
    const formArray = this.districtsFormArray;
    formArray.clear();
    formArray.push(
      this.fb.group({
        id: [d.id],
        name: [d.name, Validators.required],
        gu_name: [d.gu_name, Validators.required],
        is_deleted: [d.is_deleted],
      })
    );
    this.districtModal.show();
  }

  deleteDistrict(id: string) {
    console.log('deleteDistrict', seq++);
    this.districtService
      .softDeleteDistrict(id)
      .subscribe(() => this.loadDistrictData());
  }

  restoreDistrict(id: string) {
    console.log('restoreDistrict', seq++);
    this.districtService
      .restoreDistrict(id)
      .subscribe(() => this.loadDistrictData());
  }

  changeActivePage(page: number) {
    console.log('changeActivePage', seq++);
    if (this.activeDistrictPagination.page === page) return;
    this.activeDistrictPagination.page = page;
    this.districtService
      .getDistricts(page, this.activeDistrictPagination.limit)
      .subscribe((res) => {
        this.districts = res.data.getDistricts;
      });
  }

  changeActivePageSize(limit: number) {
    console.log('changeActivePageSize', seq++);
    if (this.activeDistrictPagination.limit === limit) return;
    this.activeDistrictPagination.limit = limit;
    this.activeDistrictPagination.page = 1;
    this.districtService.getDistricts(1, limit).subscribe((res) => {
      this.districts = res.data.getDistricts;
    });
  }

  changeDeletedPage(page: number) {
    console.log('changeDeletedPage', seq++);
    if (this.deletedDistrictPagination.page === page) return;
    this.deletedDistrictPagination.page = page;
    this.districtService
      .getDeletedDistricts(page, this.deletedDistrictPagination.limit)
      .subscribe((res) => {
        this.deletedDistricts = res.data.getDeletedDistricts;
      });
  }

  changeDeletedPageSize(limit: number) {
    console.log('changeDeletedPageSize', seq++);
    if (this.deletedDistrictPagination.limit === limit) return;
    this.deletedDistrictPagination.limit = limit;
    this.deletedDistrictPagination.page = 1;
    this.districtService.getDeletedDistricts(1, limit).subscribe((res) => {
      this.deletedDistricts = res.data.getDeletedDistricts;
    });
  }
}
