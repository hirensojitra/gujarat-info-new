import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'district' },
      { path: 'district', loadChildren: () => import('./district/district.module').then(m => m.DistrictModule) },
      { path: 'district-new', loadChildren: () => import('./district-new/district-new.module').then(m => m.DistrictNewModule) },
      { path: 'taluka-new', loadChildren: () => import('./taluka-new/taluka-new.module').then(m => m.TalukaNewModule) },
      { path: 'village-new', loadChildren: () => import('./village-new/village-new.module').then(m => m.VillageNewModule) },
      { path: 'taluka/:distId', loadChildren: () => import('./taluka/taluka.module').then(m => m.TalukaModule) },
      { path: 'village/:distId/:talukaId', loadChildren: () => import('./village/village.module').then(m => m.VillageModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
