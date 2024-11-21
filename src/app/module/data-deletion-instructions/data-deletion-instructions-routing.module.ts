import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDeletionInstructionsComponent } from './data-deletion-instructions.component';

const routes: Routes = [{
  path: '',
  component: DataDeletionInstructionsComponent,
  data: {
    title: 'Data Deletion Instructions | PostNew',
    description: 'Learn how to request deletion of your data from PostNew, ensuring your data privacy and compliance with applicable laws.',
    keywords: 'Data Deletion, PostNew, user data, privacy, compliance, data removal',
    robots: 'index, follow',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataDeletionInstructionsRoutingModule { }
