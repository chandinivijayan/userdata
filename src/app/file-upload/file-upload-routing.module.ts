import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileViewComponent } from './file-view/file-view.component';

const routes: Routes = [
  {
    path: 'file',
    component: FileUploadComponent
  },
  {
    path:'view',
    component: FileViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }
