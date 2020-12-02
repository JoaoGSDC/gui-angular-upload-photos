import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, delay } from 'rxjs/operators';
import { IPhotoDTO } from 'src/app/interfaces/IPhotoDTO';
import { IUserDTO } from 'src/app/interfaces/IUserDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(private http: HttpClient) { }

  url: string = `${environment.url}/users`;

  create(user: IUserDTO): Observable<IUserDTO> {
    return this.http.post<IUserDTO>(this.url, user).pipe(take(1));
  }
}
