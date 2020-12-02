import { Component } from '@angular/core';
import { AuthenticateService } from 'src/services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Upload Photos';

  constructor(public authService: AuthenticateService) {}
}
