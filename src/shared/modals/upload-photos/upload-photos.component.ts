import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPhotoDTO } from 'src/app/interfaces/IPhotoDTO';
import { PhotosService } from 'src/services/photos.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss']
})
export class UploadPhotosComponent implements OnInit {

  constructor(private service: PhotosService, private formBuilder: FormBuilder) { }

  selectedFile!: File;

  @Output() close = new EventEmitter<boolean>();

  form!: FormGroup;

  ngOnInit(): void {
    this.setFormBuilder();
  }

  setFormBuilder(): void {
    this.form = this.formBuilder.group({
      file: [null, Validators.required],
      fileSource: [null, Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  onUploadPhoto(): void {
    const reader = new FileReader();

    reader.readAsDataURL(this.selectedFile);

    reader.onload = () => {
      const file: IPhotoDTO = {
        id: 0,
        photo: reader.result,
        name: this.selectedFile.name,
        date: new Date(),
      }

      this.service.insertPhoto(file).subscribe(photo => {
        this.closeModal();
      });
    };

  }

  onFileChange(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  closeModal(): void {
    this.close.emit(false);
  }

}
