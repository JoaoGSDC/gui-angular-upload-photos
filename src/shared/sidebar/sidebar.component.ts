import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/services/authenticate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthenticateService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.isLogged = false;
    this.route.navigate(['/authenticate']);
  }

}
