// src/app/file-manager/file-manager.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { ListModule } from './list/list.module';
import { DetailsModule } from './details/details.module';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';

@NgModule({
  declarations: [FileManagerComponent],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    ListModule,
    DetailsModule,
    RouterModule,
  ],
  providers: [ListComponent],
})
export class FileManagerModule {}
