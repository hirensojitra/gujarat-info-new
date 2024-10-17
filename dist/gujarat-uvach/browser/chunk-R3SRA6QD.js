import {
  UserImageApiService
} from "./chunk-CNWTJSS7.js";
import {
  UserService
} from "./chunk-BM7BGPBE.js";
import {
  AsteriskDirective,
  ConfirmationModalComponent,
  PaginationDirective,
  SharedModule,
  ToastService
} from "./chunk-TUD4Z2WI.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-63CLPE7A.js";
import "./chunk-QJMPY6Q2.js";
import {
  environment
} from "./chunk-UHQMXXXD.js";
import {
  ActivatedRoute,
  CommonModule,
  ElementRef,
  NgClass,
  NgForOf,
  NgIf,
  Renderer2,
  Router,
  RouterModule,
  __async,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-B5FGZX5H.js";

// src/app/module/user-img/user-img.component.ts
var _c0 = () => [30, 50, 100];
var _c1 = (a0) => ({ "bg-dark text-white": a0 });
var _c2 = (a0) => ({ "bg-opacity-25": a0 });
var _c3 = (a0) => ({ "active pe-none text-white": a0 });
var _c4 = (a0) => ({ "text-white": a0 });
function UserImgComponent_li_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 28)(1, "div", 29)(2, "div", 30)(3, "div", 31)(4, "div", 32);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 33);
    \u0275\u0275element(6, "rect", 34)(7, "path", 35)(8, "path", 36)(9, "path", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div")(11, "p", 38)(12, "a", 39);
    \u0275\u0275listener("click", function UserImgComponent_li_5_Template_a_click_12_listener() {
      const folder_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.fetchImages(folder_r2.id);
      return \u0275\u0275resetView(false);
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span", 40);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 41)(17, "div", 42)(18, "a", 43);
    \u0275\u0275element(19, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ul", 45)(21, "li")(22, "a", 46);
    \u0275\u0275listener("click", function UserImgComponent_li_5_Template_a_click_22_listener() {
      const folder_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.openFolderDeleteModal(folder_r2.id, folder_r2.name);
      return \u0275\u0275resetView(false);
    });
    \u0275\u0275element(23, "i", 47);
    \u0275\u0275text(24, "Delete");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "li")(26, "a", 46);
    \u0275\u0275listener("click", function UserImgComponent_li_5_Template_a_click_26_listener() {
      const folder_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.openRenameFolderModal(folder_r2.id);
      return \u0275\u0275resetView(false);
    });
    \u0275\u0275element(27, "i", 48);
    \u0275\u0275text(28, "Rename");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "li")(30, "a", 46);
    \u0275\u0275listener("click", function UserImgComponent_li_5_Template_a_click_30_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(false);
    });
    \u0275\u0275element(31, "i", 49);
    \u0275\u0275text(32, "Hide Folder");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(33, "div")(34, "div", 50);
    \u0275\u0275element(35, "div", 51);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const folder_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(10, _c1, ctx_r2.selectedFolderId == folder_r2.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(12, _c2, ctx_r2.selectedFolderId == folder_r2.id));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(14, _c3, ctx_r2.selectedFolderId == folder_r2.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(folder_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.imageCounts[folder_r2.id], " Files");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(16, _c4, ctx_r2.selectedFolderId == folder_r2.id));
    \u0275\u0275advance(16);
    \u0275\u0275styleMap("width: " + ctx_r2.imageCounts[folder_r2.id] + "%");
    \u0275\u0275attribute("aria-valuenow", ctx_r2.imageCounts[folder_r2.id])("aria-label", "Image Folder capacity: " + ctx_r2.imageCounts[folder_r2.id] + "%");
  }
}
function UserImgComponent_ng_container_7_li_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 61)(1, "div", 62)(2, "div", 63);
    \u0275\u0275element(3, "img", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 65)(5, "div", 66)(6, "button", 67);
    \u0275\u0275listener("click", function UserImgComponent_ng_container_7_li_12_Template_button_click_6_listener() {
      const image_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.refreshImage(image_r6.id, ctx_r2.selectedFolderId));
    });
    \u0275\u0275element(7, "i", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 66)(9, "a", 69);
    \u0275\u0275listener("click", function UserImgComponent_ng_container_7_li_12_Template_a_click_9_listener($event) {
      const image_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.copyHrefToClipboard($event, ctx_r2.getImagePath(image_r6)));
    });
    \u0275\u0275element(10, "i", 70);
    \u0275\u0275text(11, " Copy");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 66)(13, "button", 71);
    \u0275\u0275listener("click", function UserImgComponent_ng_container_7_li_12_Template_button_click_13_listener() {
      const image_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteImage(ctx_r2.selectedFolderId, image_r6.id));
    });
    \u0275\u0275element(14, "i", 72);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const image_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r2.apiUrl + "/user-img" + ctx_r2.getImagePath(image_r6) + "?quality=30", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(6);
    \u0275\u0275propertyInterpolate("href", ctx_r2.getImagePath(image_r6), \u0275\u0275sanitizeUrl);
  }
}
function UserImgComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 52)(2, "div", 53)(3, "h6", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 55)(6, "label", 56);
    \u0275\u0275element(7, "i", 57);
    \u0275\u0275text(8, "Upload Image");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 58);
    \u0275\u0275listener("change", function UserImgComponent_ng_container_7_Template_input_change_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 30)(11, "ul", 59);
    \u0275\u0275template(12, UserImgComponent_ng_container_7_li_12_Template, 15, 2, "li", 60);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r2.selectedFolderName, "(", ctx_r2.imageCounts[ctx_r2.selectedFolderId], ")");
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r2.images);
  }
}
var UserImgComponent = class _UserImgComponent {
  onFolderPageChange(pageIndex) {
    return __async(this, null, function* () {
      if (this.folderPage !== pageIndex) {
        this.folderPage = pageIndex;
        this.fetchFolders();
      }
    });
  }
  onFolderPageSizeChange(newSize) {
    return __async(this, null, function* () {
      if (this.folderLimit !== newSize) {
        this.folderLimit = newSize;
        this.folderPage = 1;
        this.fetchFolders();
      }
    });
  }
  constructor(userImageService, formBuilder, toast, elementRef, renderer, router, route, userService) {
    this.userImageService = userImageService;
    this.formBuilder = formBuilder;
    this.toast = toast;
    this.elementRef = elementRef;
    this.renderer = renderer;
    this.router = router;
    this.route = route;
    this.userService = userService;
    this.userId = "";
    this.folders = [];
    this.images = [];
    this.selectedFile = null;
    this.selectedFolderId = null;
    this.selectedFolderName = "";
    this.apiUrl = environment.MasterApi;
    this.confirmationMessage = "";
    this.confirmationTitle = "";
    this.imagePage = 1;
    this.imageLimit = 10;
    this.imageItems = 0;
    this.totalImagePages = 1;
    this.folderPage = 1;
    this.folderItems = 0;
    this.folderLimit = 30;
    this.searchFolder = "";
    this.imageCounts = {};
    this.initializeForms();
  }
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  ngAfterViewInit() {
    return __async(this, null, function* () {
      yield this.userService.getUser().subscribe((data) => __async(this, null, function* () {
        if (this.userId !== data.id) {
          this.userId = data.id;
          yield this.loadFolderCount();
          yield this.fetchFolders();
        }
      }));
      this.route.queryParams.subscribe((params) => {
        const folderId = params["folder"];
        if (folderId) {
          this.fetchImages(folderId);
        }
      });
    });
  }
  // Initialize form groups
  initializeForms() {
    this.addFolderForm = this.formBuilder.group({
      folderName: ["", Validators.required]
    });
    this.renameFolderForm = this.formBuilder.group({
      folderName: ["", Validators.required],
      folderId: ["", Validators.required]
    });
  }
  fetchFolders() {
    const searchTerm = this.searchFolder.trim();
    const sortBy = this.sortFolderBy || "created_at";
    const sortOrder = this.sortFolderOrder || "asc";
    this.folderLimit && this.userImageService.getFolders(this.userId, this.folderPage, this.folderLimit, searchTerm, sortBy, sortOrder).subscribe({
      next: (data) => {
        this.folders = data.folders;
      },
      error: () => {
        this.toast.show("Error fetching folders!", { class: "bg-danger" });
      }
    });
  }
  onFileSelected(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      if (this.selectedFolderId)
        this.uploadImage(this.selectedFolderId);
    }
  }
  uploadImage(folderId) {
    if (this.selectedFile && folderId) {
      const metadata = { description: "Sample Image" };
      this.userImageService.uploadImage(this.userId, folderId, this.selectedFile, metadata).subscribe({
        next: () => {
          this.fetchImages(folderId);
          this.loadFolderCount();
        },
        error: () => this.toast.show("Error uploading image!", { class: "bg-danger" })
      });
    }
  }
  fetchImages(folderId, page = 1, limit = 10) {
    this.userImageService.getImagesInFolder(this.userId, folderId, page, limit).subscribe({
      next: (data) => {
        this.images = data.images;
        this.selectedFolderId = folderId;
        this.selectedFolderName = this.folders.find((folder) => folder.id === folderId)?.name || "";
        this.loadImageCount(folderId);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { folder: folderId },
          queryParamsHandling: "merge"
        });
      },
      error: () => {
        this.toast.show("Error fetching images!", { class: "bg-danger" });
      }
    });
  }
  deleteImage(folderId, imageId) {
    this.userImageService.deleteImage(this.userId, folderId, imageId).subscribe({
      next: () => {
        this.fetchImages(folderId);
      },
      error: () => this.toast.show("Error deleting image!", { class: "bg-danger" })
    });
  }
  // Bootstrap modals handling
  openAddFolderModal() {
    const addFolderModal = new bootstrap.Modal(document.getElementById("addFolderModal"));
    addFolderModal.show();
  }
  openRenameFolderModal(folderId) {
    const folder = this.folders.find((f) => f.id === folderId);
    if (folder) {
      this.selectedFolderId = folderId;
      this.renameFolderForm.patchValue({ folderName: folder.name, folderId: folder.id });
      const renameFolderModal = new bootstrap.Modal(document.getElementById("renameFolderModal"));
      renameFolderModal.show();
    }
  }
  addFolder() {
    if (this.addFolderForm.valid) {
      const folderName = this.addFolderForm.value.folderName;
      this.userImageService.createFolder(this.userId, folderName).subscribe({
        next: () => {
          this.fetchFolders();
          this.addFolderForm.reset();
          bootstrap.Modal.getInstance(document.getElementById("addFolderModal")).hide();
          this.toast.show("Folder created successfully!", { class: "bg-success" });
          this.loadFolderCount();
        },
        error: () => {
          this.toast.show("Error creating folder!", { class: "bg-danger" });
        }
      });
    }
  }
  renameFolder() {
    if (this.renameFolderForm.valid) {
      const folderName = this.renameFolderForm.value.folderName;
      const folderId = this.renameFolderForm.value.folderId;
      this.userImageService.renameFolder(folderId, folderName).subscribe({
        next: () => {
          this.fetchFolders();
          this.toast.show("Folder renamed successfully!", { class: "bg-success" });
          bootstrap.Modal.getInstance(document.getElementById("renameFolderModal")).hide();
        },
        error: () => {
          this.toast.show("Error renaming folder!", { class: "bg-danger" });
        }
      });
    }
  }
  deleteFolder() {
    if (this.selectedFolderId !== null) {
      this.userImageService.deleteFolder(this.selectedFolderId).subscribe({
        next: () => {
          this.toast.show("Folder deleted successfully!", { class: "bg-success" });
          this.selectedFolderId = null;
          this.fetchFolders();
        },
        error: () => {
          this.toast.show("Error deleting folder!", { class: "bg-danger" });
          this.selectedFolderId = null;
        }
      });
    }
  }
  copyHrefToClipboard(event, href) {
    event.preventDefault();
    const el = this.renderer.createElement("textarea");
    el.value = `${this.apiUrl}/user-img${href}`;
    this.renderer.appendChild(this.elementRef.nativeElement, el);
    el.select();
    document.execCommand("copy");
    this.renderer.removeChild(this.elementRef.nativeElement, el);
    this.toast.show("Image File path copied to clipboard", { title: "Copy Success", class: "bg-success" });
  }
  refreshImage(imageId, folderId) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const input = event.target;
      if (input.files && input.files.length > 0) {
        const formData = new FormData();
        formData.append("image", input.files[0]);
        this.userImageService.refreshImage(this.userId, folderId, imageId, formData).subscribe({
          next: () => {
            this.fetchImages(this.selectedFolderId);
            this.toast.show("Image replaced successfully!", { class: "bg-success" });
          },
          error: () => {
            this.toast.show("Error replacing image!", { class: "bg-danger" });
          }
        });
      }
    };
    fileInput.click();
  }
  openFolderDeleteModal(folderId, folderName) {
    this.selectedFolderId = folderId;
    this.selectedFolderName = folderName;
    this.confirmationTitle = "Confirm Folder Deletion";
    this.confirmationMessage = `Are you sure you want to delete the folder "${folderName}"? This action cannot be undone.`;
    const modal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    modal.show();
  }
  getImagePath(image) {
    const parts = image.image_url.split("/");
    parts.pop();
    const basePath = parts.join("/");
    return `${basePath}/${image.id}`;
  }
  loadFolderCount(search = "") {
    this.userImageService.getTotalFolderCount(this.userId, search).subscribe({
      next: (response) => {
        if (response && typeof response.count === "number") {
          this.folderItems = response.count;
        } else {
          console.warn("Unexpected response structure:", response);
        }
      },
      error: (error) => {
        console.error("Error fetching folder count:", error);
      },
      complete: () => {
      }
    });
  }
  loadImageCount(folderId) {
    return __async(this, null, function* () {
      try {
        if (!this.imageCounts[folderId]) {
          const response = yield this.userImageService.getTotalImageCount(folderId).toPromise();
          this.imageCounts[folderId] = response.totalCount;
        }
      } catch (error) {
        console.error("Error fetching image count", error);
        this.imageCounts[folderId] = 0;
      }
    });
  }
  static {
    this.\u0275fac = function UserImgComponent_Factory(t) {
      return new (t || _UserImgComponent)(\u0275\u0275directiveInject(UserImageApiService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(UserService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserImgComponent, selectors: [["app-user-img"]], decls: 47, vars: 11, consts: [[1, "container"], [1, "btn", "btn-success", "btn-sm", "my-2", 3, "click"], [1, "fa", "fa-plus", "me-2"], [1, "row", "g-2", "list-unstyled"], ["class", "col-lg-3 col-md-4 col-sm-6 col-6", 4, "ngFor", "ngForOf"], ["pagination", "", 3, "currentPageChange", "pageSizeChange", "currentPage", "totalItems", "pageSize", "pageSizes"], [4, "ngIf"], ["id", "addFolderModal", "tabindex", "-1", "aria-labelledby", "addFolderModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "addFolderModalLabel", 1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body"], [3, "formGroup"], [1, "mb-3"], ["for", "folderName", 1, "form-label"], ["type", "text", "formControlName", "folderName", "id", "folderName", 1, "form-control"], [1, "modal-footer"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-secondary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["id", "renameFolderModal", "tabindex", "-1", "aria-labelledby", "renameFolderModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["id", "renameFolderModalLabel", 1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-sm", "btn-outline-danger"], [1, "fa", "fa-close", "me-2"], ["type", "button", 1, "btn", "btn-sm", "btn-success", "text-white", 3, "click"], [1, "fa", "fa-save", "me-2"], [3, "confirm", "title", "message"], [1, "col-lg-3", "col-md-4", "col-sm-6", "col-6"], [1, "card", "border", "shadow-none", 3, "ngClass"], [1, "card-body"], [1, "mb-0", "folder-svg-container", "d-flex", "flex-wrap", "align-items-center"], [1, "me-3", "bg-lighter", "avatar", "avatar-lg", "border", "h-40-px", "w-40-px", "p-1", "rounded", 3, "ngClass"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 256 256"], ["width", "256", "height", "256", "fill", "none"], ["d", "M69.77,112H208V88a8,8,0,0,0-8-8H130.67a8,8,0,0,1-4.8-1.6L98.13,57.6a8,8,0,0,0-4.8-1.6H40a8,8,0,0,0-8,8V208l30.18-90.53A8,8,0,0,1,69.77,112Z", "opacity", "0.2"], ["d", "M32,208V64a8,8,0,0,1,8-8H93.33a8,8,0,0,1,4.8,1.6l27.74,20.8a8,8,0,0,0,4.8,1.6H200a8,8,0,0,1,8,8v24", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "16"], ["d", "M32,208l30.18-90.53A8,8,0,0,1,69.77,112H232a8,8,0,0,1,7.59,10.53L211.09,208Z", "fill", "none", "stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "16"], [1, "fs-14", "fw-medium", "mb-1", "lh-1"], ["href", "#", 1, "link", "fw-bold", "text-decoration-none", 3, "click", "ngClass"], [1, "fs-12"], [1, "float-end", "ms-auto"], [1, "dropdown"], ["href", "#", "data-bs-toggle", "dropdown", "aria-expanded", "false", "aria-label", "More Option", 1, "btn", "btn-flat", "btn-sm"], [1, "fa", "fa-ellipsis-v", 3, "ngClass"], [1, "dropdown-menu", "dropdown-menu-end", "bg-dark", "dropdown-menu-dark"], ["href", "#", 1, "dropdown-item", 3, "click"], [1, "w-20-px", "text-center", "fa", "fa-trash", "me-2", "text-danger"], [1, "w-20-px", "text-center", "fa", "fa-pencil", "me-2", "text-primary"], [1, "w-20-px", "text-center", "fa", "fa-eye-slash", "me-2", "text-mute"], [1, "progress", "progress-xs", "mt-3"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar", "bg-primary", "progress-bar-striped"], [1, "card", "shadow"], [1, "card-header", "d-flex", "align-items-center"], [1, "fw-bold", "m-0"], [1, "ms-auto"], ["for", "uploadImage", 1, "btn", "btn-success", "ms-2", "btn-sm"], [1, "fa", "fa-image", "me-2"], ["type", "file", "id", "uploadImage", 1, "d-none", 3, "change"], [1, "row", "g-3", "list-unstyled", "align-items-stretch"], ["class", "col-lg-3 col-md-4 col-sm-6 col-12", 4, "ngFor", "ngForOf"], [1, "col-lg-3", "col-md-4", "col-sm-6", "col-12"], [1, "d-flex", "h-100", "flex-column", "p-2", "border", "rounded", "shadow-sm"], [1, "img-container", "flex-grow-1", "d-flex", "align-items-end", "mb-2"], ["alt", "Image", 1, "img-fluid", "rounded", "m-auto", 3, "src"], [1, "row", "g-2"], [1, "col-4"], ["aria-label", "Replace", 1, "btn", "btn-sm", "btn-outline-success", "w-100", 3, "click"], [1, "fa", "fa-refresh"], ["aria-label", "Copy", 1, "btn", "btn-sm", "btn-outline-dark", "w-100", 3, "click", "href"], [1, "fa", "fa-copy"], ["aria-label", "Delete", 1, "btn", "btn-sm", "btn-outline-danger", "w-100", 3, "click"], [1, "fa", "fa-trash"]], template: function UserImgComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
        \u0275\u0275listener("click", function UserImgComponent_Template_button_click_1_listener() {
          return ctx.openAddFolderModal();
        });
        \u0275\u0275element(2, "i", 2);
        \u0275\u0275text(3, "Add Folder ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "ul", 3);
        \u0275\u0275template(5, UserImgComponent_li_5_Template, 36, 18, "li", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 5);
        \u0275\u0275listener("currentPageChange", function UserImgComponent_Template_div_currentPageChange_6_listener($event) {
          return ctx.onFolderPageChange($event);
        })("pageSizeChange", function UserImgComponent_Template_div_pageSizeChange_6_listener($event) {
          return ctx.onFolderPageSizeChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(7, UserImgComponent_ng_container_7_Template, 13, 3, "ng-container", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "h5", 11);
        \u0275\u0275text(13, "Add Folder");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "button", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 13)(16, "form", 14)(17, "div", 15)(18, "label", 16);
        \u0275\u0275text(19, "Folder Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "div", 18)(22, "button", 19);
        \u0275\u0275text(23, "Close");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 20);
        \u0275\u0275listener("click", function UserImgComponent_Template_button_click_24_listener() {
          return ctx.addFolder();
        });
        \u0275\u0275text(25, "Add Folder");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(26, "div", 21)(27, "div", 8)(28, "div", 9)(29, "div", 10)(30, "h5", 22);
        \u0275\u0275text(31, "Rename Folder");
        \u0275\u0275elementEnd();
        \u0275\u0275element(32, "button", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div", 13)(34, "form", 14)(35, "div", 15)(36, "label", 16);
        \u0275\u0275text(37, "Folder Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(38, "input", 17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(39, "div", 18)(40, "button", 23);
        \u0275\u0275element(41, "i", 24);
        \u0275\u0275text(42, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "button", 25);
        \u0275\u0275listener("click", function UserImgComponent_Template_button_click_43_listener() {
          return ctx.renameFolder();
        });
        \u0275\u0275element(44, "i", 26);
        \u0275\u0275text(45, "Save");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(46, "app-confirmation-modal", 27);
        \u0275\u0275listener("confirm", function UserImgComponent_Template_app_confirmation_modal_confirm_46_listener() {
          return ctx.deleteFolder();
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.folders);
        \u0275\u0275advance();
        \u0275\u0275property("currentPage", ctx.folderPage)("totalItems", ctx.folderItems)("pageSize", ctx.folderLimit)("pageSizes", \u0275\u0275pureFunction0(10, _c0));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedFolderId);
        \u0275\u0275advance(9);
        \u0275\u0275property("formGroup", ctx.addFolderForm);
        \u0275\u0275advance(18);
        \u0275\u0275property("formGroup", ctx.renameFolderForm);
        \u0275\u0275advance(12);
        \u0275\u0275property("title", ctx.confirmationTitle)("message", ctx.confirmationMessage);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, AsteriskDirective, PaginationDirective, ConfirmationModalComponent, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserImgComponent, { className: "UserImgComponent", filePath: "src\\app\\module\\user-img\\user-img.component.ts", lineNumber: 15 });
})();

// src/app/module/user-img/user-img-routing.module.ts
var routes = [{
  path: "",
  component: UserImgComponent,
  data: {
    title: "Images | Gujarat Uvach",
    description: "Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.",
    keywords: "Gujarat Uvach, services, dashboard, user portal, features, access",
    robots: "index, follow"
  }
}];
var UserImgRoutingModule = class _UserImgRoutingModule {
  static {
    this.\u0275fac = function UserImgRoutingModule_Factory(t) {
      return new (t || _UserImgRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UserImgRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/user-img/user-img.module.ts
var UserImgModule = class _UserImgModule {
  static {
    this.\u0275fac = function UserImgModule_Factory(t) {
      return new (t || _UserImgModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UserImgModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      UserImgRoutingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule
    ] });
  }
};
export {
  UserImgModule
};
//# sourceMappingURL=chunk-R3SRA6QD.js.map
