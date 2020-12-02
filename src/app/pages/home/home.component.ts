import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { IPhotoDTO } from 'src/app/interfaces/IPhotoDTO';
import { PhotosService } from 'src/services/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private photoService: PhotosService) { }

  photos: IPhotoDTO[] = [];
  photosAux: IPhotoDTO[] = [];

  addNewPhotoWasClicked: boolean = false;
  showPhotoClicked: boolean = false;
  photoClicked!: string;

  faTrash = faTrashAlt;

  ngOnInit(): void {
    this.getPhotosData();
  }

  getPhotosData(): void {
    this.photoService.getPhotos().subscribe((photos: IPhotoDTO[]) => {
      this.photos = photos;
      this.photosAux = photos;
    });
  }

  closeNewPhotoModal(event: boolean): void {
    this.addNewPhotoWasClicked = event;
    this.getPhotosData();
  }

  addPhoto(): void {
    this.addNewPhotoWasClicked = true;
  }

  searchPhoto(event: any): void {
    const search = event.target.value;

    if (search === '') {
      this.photos = this.photosAux;
      return;
    }

    this.photos = this.photosAux.filter(photo => photo.name.includes(search) || String(new Date(photo.date).toLocaleDateString()).includes(search));
  }

  deletePhoto(id: number): void {
    this.photoService.deletePhoto(id).subscribe((photo: IPhotoDTO) => {
      window.alert('Foto deletada com sucesso!');
      this.getPhotosData();
    });
  }

  showPhoto(image: string | ArrayBuffer | null): void {
    this.photoClicked = String(image);
    this.showPhotoClicked = true;
  }

  get photosArray(): IPhotoDTO[] {
    return !!this.photos ? this.photos : [];
  }

}
