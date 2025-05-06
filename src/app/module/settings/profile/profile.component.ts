import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { UpdateUserService } from 'src/app/common/services/update-user.service';
import { LanguageService } from 'src/app/common/services/language.service';
import {
  UserPublicInfo,
  Gender,
  MaritalStatus,
  Language,
} from 'src/app/graphql/types/login.types';

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

  // ← add this
  languageOptions: Language[] = [];

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
    { name: 'language_id', label: 'Language', type: 'select', validators: [] }, // ← type select
  ];

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
    });

    // ← fetch list of languages
    this.updateUserService.getLanguages().subscribe((list) => {
      this.languageOptions = list;
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
      // skip unset
      if (val === '' || val == null) continue;

      // detect change
      if (key === 'language_id') {
        if (val !== this.user.language.id) {
          payload[key] = val;
        }
      } else {
        const orig = (this.user as any)[key];
        if (String(val) !== String(orig)) {
          payload[key] = val;
          if (key === 'number') {
            numberChanged = true;
          }
        }
      }
    }
    if (numberChanged) {
      payload['number'] = raw['number'];
    }

    // nothing changed?
    if (!Object.keys(payload).length) {
      this.editing = false;
      return;
    }

    this.updateUserService.updateProfile(payload).subscribe((updated) => {
      this.authService.setUser(updated);
      this.editing = false;
    });
  }
}
