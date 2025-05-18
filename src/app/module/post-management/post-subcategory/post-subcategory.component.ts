// src/app/post-subcategory/post-subcategory.component.ts

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PostSubcategoryService } from 'src/app/common/services/post-subcategory.service';
import {
  PostCategory,
  PostSubcategory,
  PaginationInput,
  PostSubcategoryStats,
} from 'src/app/graphql/types/post-subcategory.types';
declare const bootstrap: any;

@Component({
  selector: 'app-post-subcategory',
  templateUrl: './post-subcategory.component.html',
  styleUrls: ['./post-subcategory.component.scss'],
})
export class PostSubcategoryComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  seq = 1;

  // Data lists & selections
  postCategories: PostCategory[] = [];
  postSubcategories: (PostSubcategory & { selected?: boolean })[] = [];
  deletedPostSubcategories: (PostSubcategory & { selected?: boolean })[] = [];
  selectedActivePostSubcategories: typeof this.postSubcategories = [];
  selectedDeletedPostSubcategories: typeof this.deletedPostSubcategories = [];

  // Pagination & totals
  activePagination: PaginationInput = { page: 1, limit: 10 };
  deletedPagination: PaginationInput = { page: 1, limit: 10 };
  totalActive = 0;
  totalDeleted = 0;

  // Current context
  selectedPostCategoryId = '';
  postSubcategoryData!: PostSubcategoryStats;
  loading = true;

  // Modal & form
  currentForm!: FormGroup;
  needUpdate = false;
  modalTitle = 'Add PostSubcategory';
  public modal!: any;
  public modalEl!: any;
  private modalOpts = { backdrop: false, keyboard: false };

  public confirmDeleteModal!: any;
  public confirmDeleteModalEl!: any;
  deleteManyMode = false;
  private deleteTargetId!: string;
  private deleteTargetIds: string[] = [];

  constructor(
    private service: PostSubcategoryService,
    private fb: FormBuilder,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    console.log(`${this.seq++} - ngAfterViewInit`);
    this.modalEl = this.el.nativeElement.querySelector('#postSubcategoryModal');
    this.modal = new bootstrap.Modal(this.modalEl, this.modalOpts);
    this.confirmDeleteModalEl = this.el.nativeElement.querySelector('#confirmDeleteModal');
    this.confirmDeleteModal   = new bootstrap.Modal(this.confirmDeleteModalEl, this.modalOpts);
  }

  ngOnDestroy(): void {
    console.log(`${this.seq++} - ngOnDestroy`);
    if (this.modal) this.modal.hide();
  }

  async ngOnInit(): Promise<void> {
    console.log(`${this.seq++} - ngOnInit`);
    this.buildForm();
    await this.loadSelectedCategoryId();
    await this.refreshData();
    this.loading = false;
  }

  private buildForm(): void {
    console.log(`${this.seq++} - buildForm`);
    this.currentForm = this.fb.group({
      postSubcategories: this.fb.array([this.makeFormGroup()]),
    });
  }

  private makeFormGroup(): FormGroup {
    console.log(`${this.seq++} - makeFormGroup`);
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category_id: [this.selectedPostCategoryId, Validators.required],
    });
  }

  private makeEditForm(item: PostSubcategory): FormGroup {
    console.log(`${this.seq++} - makeEditForm`);
    return this.fb.group({
      id: [item.id],
      name: [item.name, Validators.required],
      description: [item.description, Validators.required],
      category_id: [this.selectedPostCategoryId, Validators.required],
    });
  }

  // -- Data loading --------------------------------

  private loadSelectedCategoryId(): Promise<void> {
    console.log(`${this.seq++} - loadSelectedCategoryId`);
    return new Promise((res, rej) => {
      this.service.getSelectedPostCategoryId().subscribe(
        (r) => {
          this.selectedPostCategoryId = r.data.getSelectedPostCategoryId || '';
          res();
        },
        (e) => rej(e)
      );
    });
  }

  private refreshData(): Promise<void> {
    console.log(`${this.seq++} - refreshData`);
    this.loading = true;
    return new Promise((res, rej) => {
      this.service
        .getPostSubcategoryStatsAndData(
          this.selectedPostCategoryId,
          this.activePagination,
          this.deletedPagination
        )
        .subscribe({
          next: (r) => {
            const d = r.data.getPostSubcategoryStatsByCategory;
            if (!d) return rej('no data');
            this.postSubcategoryData = d;
            this.selectedPostCategoryId = d.selectedId;
            this.postCategories = d.categories;
            this.postSubcategories = d.activePostSubcategoriesByCategoryId.map(
              (x) => ({ ...x, selected: false })
            );
            this.deletedPostSubcategories =
              d.deletedPostSubcategoriesByCategoryId.map((x) => ({
                ...x,
                selected: false,
              }));
            this.totalActive = d.totalActivePostSubcategoriesByCategoryId;
            this.totalDeleted = d.totalDeletedPostSubcategoriesByCategoryId;
            this.selectedActivePostSubcategories = [];
            this.selectedDeletedPostSubcategories = [];
            this.loading = false;
            this.cdr.detectChanges();
            res();
          },
          error: (e) => {
            console.error(`${this.seq++} - refreshData error`, e);
            this.loading = false;
            this.cdr.detectChanges();
            rej(e);
          },
        });
    });
  }

  // -- Selection handlers --------------------------

  updateSelectedActive(): void {
    console.log(`${this.seq++} - updateSelectedActive`);
    this.selectedActivePostSubcategories = this.postSubcategories.filter(
      (x) => x.selected
    );
  }

  updateSelectedDeleted(): void {
    console.log(`${this.seq++} - updateSelectedDeleted`);
    this.selectedDeletedPostSubcategories =
      this.deletedPostSubcategories.filter((x) => x.selected);
  }

  onCategoryChange(): void {
    console.log(`${this.seq++} - onCategoryChange`);
    this.activePagination = { page: 1, limit: 10 };
    this.deletedPagination = { page: 1, limit: 10 };
    this.refreshData();
  }

  // -- Modal & form actions -----------------------

  openAdd(): void {
    console.log(`${this.seq++} - openAdd`);
    this.needUpdate = false;
    this.modalTitle = 'Add PostSubcategory';
    this.currentForm.setControl(
      'postSubcategories',
      this.fb.array([this.makeFormGroup()])
    );
    this.modal.show();
  }

  openEdit(item: PostSubcategory): void {
    console.log(`${this.seq++} - openEdit`);
    this.needUpdate = true;
    this.modalTitle = 'Edit PostSubcategory';
    this.currentForm.setControl(
      'postSubcategories',
      this.fb.array([this.makeEditForm(item)])
    );
    this.modal.show();
  }

  openBulkEdit(): void {
    console.log(`${this.seq++} - openBulkEdit`);
    const sel = this.postSubcategories.filter((x) => x.selected);
    if (!sel.length) return;
    this.needUpdate = true;
    this.modalTitle = 'Edit Selected PostSubcategories';
    const groups = sel.map((x) => this.makeEditForm(x));
    this.currentForm.setControl('postSubcategories', this.fb.array(groups));
    this.modal.show();
  }

  addFormRow(): void {
    console.log(`${this.seq++} - addFormRow`);
    this.postFormArray.push(this.makeFormGroup());
  }

  removeFormRow(i: number): void {
    console.log(`${this.seq++} - removeFormRow`);
    if (this.postFormArray.length > 1) this.postFormArray.removeAt(i);
  }

  save(): void {
    console.log(`${this.seq++} - save`);
    if (this.currentForm.invalid) return;
    const data = this.currentForm.value.postSubcategories;
    console.log(data);
    const action = this.needUpdate
      ? this.service.updatePostSubcategories(data)
      : this.service.createPostSubcategories(data);

    action.subscribe({
      next: () => {
        this.modal.hide();
        this.refreshData();
      },
      error: (e) =>
        console.error(this.needUpdate ? 'update failed' : 'create failed', e),
    });
  }

  // -- Soft-delete / restore ----------------------

  deactivateOne(id: string): void {
    console.log(`${this.seq++} - deactiveOne`);
    this.service
      .softDeletePostSubcategory(id)
      .subscribe(() => this.refreshData());
  }

  deactivateMany(): void {
    console.log(`${this.seq++} - deactiveMany`);
    const ids = this.postSubcategories
      .filter((x) => x.selected)
      .map((x) => x.id);
    if (!ids.length) return;
    this.service
      .softDeletePostSubcategories(ids)
      .subscribe(() => this.refreshData());
  }

  activateOne(id: string): void {
    console.log(`${this.seq++} - activateOne`);
    this.service.restorePostSubcategory(id).subscribe(() => this.refreshData());
  }

  activateMany(): void {
    console.log(`${this.seq++} - activateMany`);
    const ids = this.deletedPostSubcategories
      .filter((x) => x.selected)
      .map((x) => x.id);
    if (!ids.length) return;
    this.service
      .restorePostSubcategories(ids)
      .subscribe(() => this.refreshData());
  }
  
  /** User clicks the trash icon for one item */
  deleteOne(id: string): void {
    this.deleteManyMode    = false;
    this.deleteTargetId    = id;
    this.confirmDeleteModal.show();
  }

  /** User clicks “Delete Selected” in the deleted tab */
  deleteMany(): void {
    const ids = this.deletedPostSubcategories
      .filter(x => x.selected)
      .map(x => x.id);
    if (!ids.length) { return; }
    this.deleteManyMode    = true;
    this.deleteTargetIds   = ids;
    this.confirmDeleteModal.show();
  }
  /** Called when the user confirms in the modal */
  onConfirmHardDelete(): void {
    if (this.deleteManyMode) {
      console.log(this.deleteTargetIds)
      this.service.hardDeletePostSubcategories(this.deleteTargetIds)
        .subscribe(() => {
          this.confirmDeleteModal.hide();
          this.refreshData();
        });
    } else {
      this.service.hardDeletePostSubcategory(this.deleteTargetId)
        .subscribe(() => {
          this.confirmDeleteModal.hide();
          this.refreshData();
        });
    }
  }
  // -- Pagination -------------------------------

  changeActivePage(p: number): void {
    console.log(`${this.seq++} - changeActivePage`);
    if (this.activePagination.page !== p) {
      this.activePagination.page = p;
      this.refreshData();
    }
  }

  changeActiveSize(l: number): void {
    console.log(`${this.seq++} - changeActiveSize`);
    if (this.activePagination.limit !== l && l <= this.totalActive) {
      this.activePagination.limit = l;
      this.activePagination.page = 1;
      this.refreshData();
    }
  }

  changeDeletedPage(p: number): void {
    console.log(`${this.seq++} - changeDeletedPage`);
    if (this.deletedPagination.page !== p) {
      this.deletedPagination.page = p;
      this.refreshData();
    }
  }

  changeDeletedSize(l: number): void {
    console.log(`${this.seq++} - changeDeletedSize`);
    if (this.deletedPagination.limit !== l && l <= this.totalDeleted) {
      this.deletedPagination.limit = l;
      this.deletedPagination.page = 1;
      this.refreshData();
    }
  }

  get postFormArray(): FormArray {
    return this.currentForm.get('postSubcategories') as FormArray;
  }
  
}
