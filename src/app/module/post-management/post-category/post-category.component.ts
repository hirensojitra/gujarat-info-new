import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PostCategory } from 'src/app/common/interfaces/commonInterfaces';
import { PostCategoryService } from 'src/app/common/services/post-category.service';
import { PaginationInput } from 'src/app/graphql/types/post-category.types';

declare const bootstrap: any;
let seq = 1;

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
})
export class PostCategoryComponent implements OnInit, AfterViewInit {
  // state properties
  postCategoryData = {
    getPostCategoryStats: {
      activePostCategoryLength: 0,
      deletedPostCategoryLength: 0,
      postCategoryLength: 0,
    },
    getDeletedPostCategories: [],
    getPostCategories: [],
  };

  postCategories: PostCategory[] = [];
  deletedPostCategories: PostCategory[] = [];
  currentForm: FormGroup;
  needUpdate = false;
  deletedPostCategoryCount = 0;

  postCategoryModal: any;
  postCategoryModalElement: any;
  postCategoryModalOptions: any;
  postCategoryModalTitle = 'Add PostCategory';

  activePostCategoryPagination: PaginationInput = {
    page: 1,
    limit: 10,
    sortBy: 'name',
    sortOrder: 'ASC',
  };
  deletedPostCategoryPagination: PaginationInput = {
    page: 1,
    limit: 10,
    sortBy: 'name',
    sortOrder: 'ASC',
  };
  totalActivePostCategories = 0;
  totalDeletedPostCategories = 0;

  selectedActivePostCategories: string[] = [];
  selectedDeletedPostCategories: string[] = [];

  constructor(
    private postCategoryService: PostCategoryService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', seq++);
    this.postCategoryModalElement =
      this.el.nativeElement.querySelector('#postCategoryModal');
    this.postCategoryModalOptions = { backdrop: false, keyboard: false };
    this.postCategoryModal = new bootstrap.Modal(
      this.postCategoryModalElement,
      this.postCategoryModalOptions
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit', seq++);
    this.loadPostCategoryData();
    this.initForm();
  }

  updateSelectedActivePostCategories() {
    console.log('updateSelectedActivePostCategories', seq++);
    this.selectedActivePostCategories = this.postCategories
      .filter((d) => d.selected)
      .map((d) => d.id);
  }

  updateSelectedDeletedPostCategories() {
    console.log('updateSelectedDeletedPostCategories', seq++);
    this.selectedDeletedPostCategories = this.deletedPostCategories
      .filter((d) => d.selected)
      .map((d) => d.id);
  }

  loadPostCategoryData() {
    console.log('loadPostCategoryData', seq++);
    this.postCategoryService
      .getPostCategoryStatsAndData(
        this.activePostCategoryPagination,
        this.deletedPostCategoryPagination
      )
      .subscribe({
        next: (data) => {
          this.postCategoryData = data.data;
          this.postCategories = this.postCategoryData.getPostCategories;
          this.deletedPostCategories =
            this.postCategoryData.getDeletedPostCategories;
          this.totalActivePostCategories =
            this.postCategoryData.getPostCategoryStats.activePostCategoryLength;
          this.totalDeletedPostCategories =
            this.postCategoryData.getPostCategoryStats.deletedPostCategoryLength;
          this.selectedActivePostCategories = [];
          this.selectedDeletedPostCategories = [];
          this.updateSelectedActivePostCategories();
          this.updateSelectedDeletedPostCategories();
        },
        error: (error) =>
          console.error('Error fetching postCategory data:', error),
      });
  }

  initForm() {
    console.log('initForm', seq++);
    this.currentForm = this.fb.group({
      postCategories: this.fb.array([this.createPostCategoryForm()]),
    });
  }

  createPostCategoryForm(): FormGroup {
    console.log('createPostCategoryForm', seq++);
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get postCategoriesFormArray(): FormArray {
    return this.currentForm.get('postCategories') as FormArray;
  }

  addPostCategory() {
    console.log('addPostCategory', seq++);
    this.postCategoriesFormArray.push(this.createPostCategoryForm());
  }

  removePostCategory(index: number) {
    console.log('removePostCategory', seq++);
    const postCategoryToRemove = this.postCategoriesFormArray.at(index).value;
    const postCategoryId = postCategoryToRemove.id;
    const postCategory = this.postCategories.find(
      (d) => d.id === postCategoryId
    );
    if (postCategory) postCategory.selected = false;
    if (this.postCategoriesFormArray.length > 1)
      this.postCategoriesFormArray.removeAt(index);
  }

  savePostCategory() {
    console.log('savePostCategory', seq++);
    if (this.currentForm.invalid) return;
    const postCategoryData = this.currentForm.value.postCategories;

    if (this.needUpdate) {
      this.postCategoryService
        .updatePostCategories(postCategoryData)
        .subscribe({
          next: (data) => {
            const updatedPostCategories = data.data.updatePostCategories;
            updatedPostCategories.forEach((updatedPostCategory) => {
              const index = this.postCategories.findIndex(
                (d) => d.id === updatedPostCategory.id
              );
              if (index !== -1) {
                const updated = {
                  ...this.postCategories[index],
                  ...updatedPostCategory,
                };
                this.postCategories[index] = updated;
              }
            });
            this.postCategoryModal.hide();
          },
          error: (err) => console.error('Update error:', err),
        });
    } else {
      this.postCategoryService
        .createPostCategories(postCategoryData)
        .subscribe({
          next: () => {
            this.loadPostCategoryData();
            this.postCategoryModal.hide();
          },
          error: (err) => console.error('Create error:', err),
        });
    }
  }

  openPostCategoryModal() {
    console.log('openPostCategoryModal', seq++);
    this.postCategoryModalTitle = 'Add  PostCategories';
    this.needUpdate = false;
    const formArray = this.postCategoriesFormArray;
    formArray.clear();
    this.addPostCategory();
    this.postCategoryModal.show();
  }

  openMultipleEditModal(postCategories: PostCategory[]) {
    console.log('openMultipleEditModal', seq++);
    this.postCategoryModalTitle = 'Edit Multiple PostCategories';
    this.needUpdate = true;
    const formArray = this.postCategoriesFormArray;
    formArray.clear();
    postCategories.forEach((postCategory) => {
      formArray.push(
        this.fb.group({
          id: [postCategory.id],
          name: [postCategory.name, Validators.required],
          description: [postCategory.description, Validators.required],
          active: [postCategory.active],
        })
      );
    });
    this.postCategoryModal.show();
  }

  deleteSelectedPostCategories() {
    console.log('deleteSelectedPostCategories', seq++);
    const selectedIds = this.getSelectedPostCategories(this.postCategories);
    if (selectedIds.length) {
      this.postCategoryService
        .softDeletePostCategories(selectedIds)
        .subscribe(() => this.loadPostCategoryData());
    }
  }

  restoreSelectedPostCategories() {
    console.log('restoreSelectedPostCategories', seq++);
    const selectedIds = this.getSelectedPostCategories(
      this.deletedPostCategories
    );
    if (selectedIds.length) {
      this.postCategoryService
        .restorePostCategories(selectedIds)
        .subscribe(() => this.loadPostCategoryData());
    }
  }

  editSelectedPostCategories() {
    console.log('editSelectedPostCategories', seq++);
    const selectedIds = this.getSelectedPostCategories(this.postCategories);
    if (!selectedIds.length) return;
    const selected = this.postCategories.filter((d) =>
      selectedIds.includes(d.id)
    );
    this.openMultipleEditModal(selected);
  }

  getSelectedPostCategories(postCategories: PostCategory[]): string[] {
    console.log('getSelectedPostCategories', seq++);
    return postCategories.filter((d) => d.selected).map((d) => d.id);
  }

  togglePostCategorySelection(d: PostCategory) {
    console.log('togglePostCategorySelection', seq++);
    d.selected = !d.selected;
  }

  editPostCategory(d: PostCategory) {
    console.log('editPostCategory', seq++);
    this.postCategoryModalTitle = 'Update PostCategory';
    this.needUpdate = true;
    const formArray = this.postCategoriesFormArray;
    formArray.clear();
    formArray.push(
      this.fb.group({
        id: [d.id],
        name: [d.name, Validators.required],
        description: [d.description, Validators.required],
        active: [d.active],
      })
    );
    this.postCategoryModal.show();
  }

  deletePostCategory(id: string) {
    console.log('deletePostCategory', seq++);
    this.postCategoryService
      .softDeletePostCategory(id)
      .subscribe(() => this.loadPostCategoryData());
  }

  restorePostCategory(id: string) {
    console.log('restorePostCategory', seq++);
    this.postCategoryService
      .restorePostCategory(id)
      .subscribe(() => this.loadPostCategoryData());
  }

  changeActivePage(page: number) {
    console.log('changeActivePage', seq++);
    if (this.activePostCategoryPagination.page === page) return;
    this.activePostCategoryPagination.page = page;
    this.postCategoryService
      .getPostCategories(page, this.activePostCategoryPagination.limit)
      .subscribe((res) => {
        this.postCategories = res.data.getPostCategories;
      });
  }

  changeActivePageSize(limit: number) {
    console.log('changeActivePageSize', seq++);
    if (this.activePostCategoryPagination.limit === limit) return;
    this.activePostCategoryPagination.limit = limit;
    this.activePostCategoryPagination.page = 1;
    this.postCategoryService.getPostCategories(1, limit).subscribe((res) => {
      this.postCategories = res.data.getPostCategories;
    });
  }

  changeDeletedPage(page: number) {
    console.log('changeDeletedPage', seq++);
    if (this.deletedPostCategoryPagination.page === page) return;
    this.deletedPostCategoryPagination.page = page;
    this.postCategoryService
      .getDeletedPostCategories(page, this.deletedPostCategoryPagination.limit)
      .subscribe((res) => {
        this.deletedPostCategories = res.data.getDeletedPostCategories;
      });
  }

  changeDeletedPageSize(limit: number) {
    console.log('changeDeletedPageSize', seq++);
    if (this.deletedPostCategoryPagination.limit === limit) return;
    this.deletedPostCategoryPagination.limit = limit;
    this.deletedPostCategoryPagination.page = 1;
    this.postCategoryService
      .getDeletedPostCategories(1, limit)
      .subscribe((res) => {
        this.deletedPostCategories = res.data.getDeletedPostCategories;
      });
  }
}
