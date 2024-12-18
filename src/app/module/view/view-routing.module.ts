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
      { path: 'taluka/:distId', loadChildren: () => import('./taluka/taluka.module').then(m => m.TalukaModule) },
      { path: 'village/:distId/:talukaId', loadChildren: () => import('./village/village.module').then(m => m.VillageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
