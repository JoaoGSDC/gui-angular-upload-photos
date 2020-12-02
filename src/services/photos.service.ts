import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, delay } from 'rxjs/operators';
import { IPhotoDTO } from 'src/app/interfaces/IPhotoDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  url: string = `${environment.url}/photos`;

  getPhotos(): Observable<IPhotoDTO[]> {
    return this.http.get<IPhotoDTO[]>(`${environment.url}/photos`);
  }

  insertPhoto(file: IPhotoDTO): Observable<any> {
    console.log(file)
    return this.http.post<any>(this.url, file).pipe(take(1));
  }

  deletePhoto(id: number): Observable<any> {
    return this.http.delete<any>(this.url, { headers: { id: String(id) } }).pipe(take(1), delay(50));
  }
}
