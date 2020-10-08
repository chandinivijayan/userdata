import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileViewComponent } from './file-view/file-view.component';


@NgModule({
  declarations: [FileUploadComponent, FileViewComponent],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FileUploadModule { }
