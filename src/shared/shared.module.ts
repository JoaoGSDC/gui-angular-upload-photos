import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadPhotosComponent } from './modals/upload-photos/upload-photos.component';
import { ShowPhotoComponent } from './modals/show-photo/show-photo.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent, UploadPhotosComponent, ShowPhotoComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [SidebarComponent, UploadPhotosComponent, ShowPhotoComponent]
})
export class SharedModule { }
