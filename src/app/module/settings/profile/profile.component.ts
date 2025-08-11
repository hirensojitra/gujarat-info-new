// Changes are annotated as ⭐ Added or ✏ Updated

import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { UpdateUserService } from 'src/app/common/services/update-user.service';
import {
  UserPublicInfo,
  Gender,
  MaritalStatus,
  Language,
} from 'src/app/graphql/types/login.types';
import Cropper from 'cropperjs';
import { environment } from 'src/environments/environment';

declare const bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserPublicInfo | null = null;
  editing = false;
  profileForm!: FormGroup;
  completion = 0;
  private sub!: Subscription;

  genderOptions = Object.values(Gender);
  maritalStatusOptions = Object.values(MaritalStatus);
  languageOptions: Language[] = [];

  imageUrl: string = '';
  cropper!: Cropper;
  cropperModal: any;
  @ViewChild('imageInput') imageInput!: ElementRef;
  imageSelect: any;
  formFields = [
    {
      name: 'firstname',
      label: 'First Name',
      type: 'text',
      validators: [Validators.required],
    },
    { name: 'middlename', label: 'Middle Name', type: 'text', validators: [] },
    {
      name: 'lastname',
      label: 'Last Name',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'number',
      label: 'Mobile Number',
      type: 'tel',
      validators: [Validators.required],
    },
    { name: 'birthday', label: 'Birthday', type: 'date', validators: [] },
    { name: 'gender', label: 'Gender', type: 'select', validators: [] },
    {
      name: 'marital_status',
      label: 'Marital Status',
      type: 'select',
      validators: [],
    },
    { name: 'language_id', label: 'Language', type: 'select', validators: [] },
  ];
  profilePictureForm: FormGroup<any>;
  isUploading: boolean;
  constructor(
    private authService: AuthenticationService,
    private updateUserService: UpdateUserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe((u) => {
      this.user = u;
      this.calculateCompletion();
      if (this.editing) this.buildForm();
      if (this.user) {
        this.validateImage(this.user.id);
      }
    });

    this.updateUserService.getLanguages().subscribe((list) => {
      this.languageOptions = list;
    });

    this.cropperModal = new bootstrap.Modal(
      document.getElementById('cropperModal')!,
      { focus: false, keyboard: false, static: false }
    );
    this.cropperModal._element.addEventListener('hide.bs.modal', () => {
      if (this.cropper) {
        this.cropper.destroy();
      }
    });
    this.cropperModal._element.addEventListener('show.bs.modal', () => {});
    this.imageSelect = new bootstrap.Modal(
      document.getElementById('imageSelect')!,
      { focus: false, keyboard: false, static: false }
    );
    this.imageSelect._element.addEventListener('hidden.bs.modal', () => {
      const inputElement = this.imageInput.nativeElement as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
      } else {
        this.imageSelect.show();
      }
    });
    this.profilePictureForm = this.fb.group({
      image: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (this.editing) this.buildForm();
  }

  private buildForm(): void {
    const group: any = {};
    this.formFields.forEach((f) => {
      let value: any = '';
      if (this.user) {
        if (f.name === 'language_id') {
          value = this.user.language.id;
        } else {
          value = (this.user as any)[f.name] ?? '';
        }
      }
      group[f.name] = [value, f.validators];
    });
    this.profileForm = this.fb.group(group);
  }

  private calculateCompletion(): void {
    if (!this.user) {
      this.completion = 0;
      return;
    }
    const keys = this.formFields.map((f) => f.name);
    const total = keys.length;
    const filled = keys.reduce((count, key) => {
      if (key === 'language_id') {
        return this.user!.language.id ? count + 1 : count;
      }
      return this.user![key] ? count + 1 : count;
    }, 0);
    this.completion = Math.round((filled / total) * 100);
  }

  onSubmit(): void {
    if (this.profileForm.invalid || !this.user) return;

    const raw = this.profileForm.value as Record<string, any>;
    const payload: Record<string, any> = {};
    let numberChanged = false;

    for (const [key, val] of Object.entries(raw)) {
      if (val === '' || val == null) continue;
      if (key === 'language_id') {
        if (val !== this.user.language.id) payload[key] = val;
      } else {
        const orig = (this.user as any)[key];
        if (String(val) !== String(orig)) {
          payload[key] = val;
          if (key === 'number') numberChanged = true;
        }
      }
    }

    if (numberChanged) payload['number'] = raw['number'];

    if (!Object.keys(payload).length) {
      this.editing = false;
      return;
    }

    this.updateUserService.updateProfile(payload).subscribe((updated) => {
      this.authService.setUser(updated);
      this.editing = false;
    });
  }

  openImageCropperDialog(): void {
    const inputElement = this.imageInput.nativeElement;
    if (inputElement) {
      inputElement.value = ''; // Ensure same file can be selected again
      inputElement.click();
    }
  }

  handleImageInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.imageSelect.hide();
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        // Open Bootstrap modal dialog with Cropper

        this.cropperModal.show();
        // Initialize Cropper
        const cropperElement = document.getElementById(
          'cropper'
        ) as HTMLImageElement;
        this.cropper = new Cropper(cropperElement, {
          aspectRatio: 1,
          scalable: true,
          viewMode: 1, // Ensure the crop box is always within the container
          crop: (event) => {},
          autoCropArea: 1, // Ensure the initial crop area covers the entire image
          dragMode: 'move', // Allow dragging to move the image within the container
          responsive: true, // Update crop box on resize
          cropBoxResizable: false, // Disable resizing the crop box
          minCropBoxWidth: 320,
          minCropBoxHeight: 320,
          minContainerWidth: 320,
          minContainerHeight: 320,
        });

        // Set image source for Cropper
        this.cropper.replace(imageSrc);
      };
      reader.readAsDataURL(file);
    } else {
      this.imageSelect.show();
    }
  }
  handleCropEvent(): void {
    if (this.cropper) {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const resizedCanvas = document.createElement('canvas');
      const resizedContext = resizedCanvas.getContext('2d')!;
      resizedCanvas.width = 320;
      resizedCanvas.height = 320;
      resizedContext.drawImage(croppedCanvas, 0, 0, 320, 320);
      const resizedImageData = resizedCanvas.toDataURL('image/png'); // Adjust format as needed
      this.profilePictureForm.get('image')?.setValue(resizedImageData);
    }
  }
  saveCroppedImage(): void {
    this.handleCropEvent();

    if (this.profilePictureForm.valid) {
      const formValue = this.profilePictureForm.value;
      if (formValue.image) {
        const file = this.base64ToFile(
          formValue.image,
          `profile-picture-${Date.now()}.png`
        );

        this.isUploading = true;
        this.updateUserService.updateProfile({ image: file }).subscribe({
          next: (updated) => {
            this.authService.setUser(updated);
            this.cropperModal.hide();
            this.isUploading = false;
            this.profilePictureForm.reset();

            // Refresh image preview
            this.validateImage(updated.username || this.user?.username);
          },
          error: (err) => {
            console.error('Failed to update image:', err);
            this.isUploading = false;
          },
        });
      }
    }
  }

  base64ToFile(base64Image: string, fileName: string): File {
    const arr = base64Image.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

  private apiUrl = environment.MasterApi + '/auth/avatar/';

  validateImage(username: string): void {
    const randomParam = `?v=${new Date().getTime()}`;
    const newImageUrl = username
      ? `${this.apiUrl + username}${randomParam}`
      : `https://dummyimage.com/300x300/F4F4F4/000000&text=${this.imageText()}`;

    this.imageUrl = newImageUrl;

    const currentUser = this.authService.getUser();
    const storedImage = currentUser?.image;

    // Only update image in user cookie if the base URL has changed (ignore ?v=...)
    const currentBase = storedImage?.split('?')[0];
    const newBase = newImageUrl.split('?')[0];

    if (newBase && currentBase !== newBase) {
      this.authService.setImageUrl(newBase); // only store clean base URL
    }
  }

  imageText(): string {
    if (this.user && this.user.firstname && this.user.lastname) {
      const firstCharFirstName = this.user.firstname.charAt(0);
      const firstCharLastName = this.user.lastname.charAt(0);
      return ` ${firstCharFirstName}${firstCharLastName} `;
    } else {
      return 'USER';
    }
  }
  deleteImage(): void {
    if (!this.user) return;

    const file = new File(['delete'], 'delete.txt', {
      type: 'text/plain',
    });

    this.isUploading = true;
    this.updateUserService.updateProfile({ image: file }).subscribe({
      next: (updated) => {
        this.authService.setUser(updated);
        this.imageUrl = `https://dummyimage.com/300x300/F4F4F4/000000&text=${this.imageText()}`;
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Failed to delete image:', err);
        this.isUploading = false;
      },
    });
  }
}
