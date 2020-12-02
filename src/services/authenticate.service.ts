import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUserDTO } from 'src/app/interfaces/IUserDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  isLogged = false;

  url: string = `${environment.url}/auth`;

  login(user: IUserDTO): Observable<IUserDTO> {
    return this.http.post<IUserDTO>(this.url, user).pipe(take(1));
  }
}
