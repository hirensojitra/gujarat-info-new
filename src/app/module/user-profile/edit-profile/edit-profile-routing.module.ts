import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';

const routes: Routes = [{
  path: '',
  component: EditProfileComponent,
  data: {
    title: 'Edit Profile - Your Website',
    description: 'Edit your profile details including name, mobile, and location.',
    keywords: 'edit profile, user settings, update user details',
    robots: 'index, follow',
    image: '/assets/edit-profile-image.png',
    canonical: 'https://gujarat-uvach.netlify.app/edit-profile',
    breadcrumb: 'Edit Profile'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfileRoutingModule { }
