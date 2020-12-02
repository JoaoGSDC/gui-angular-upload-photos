import { Component, OnInit } from '@angular/core';
import { IPerfilDTO } from 'src/app/interfaces/IPerfiDTO';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  perfil!: IPerfilDTO;

  ngOnInit(): void {
    this.perfil = {
      image: 'https://avatars1.githubusercontent.com/u/62730271?s=460&u=562e7a63f5535a31ed60db27776e86e5818b7820&v=4',
      name: 'João Gabriel'
    }
  }

}
