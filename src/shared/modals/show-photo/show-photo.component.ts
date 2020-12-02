import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.scss']
})
export class ShowPhotoComponent implements OnInit {

  constructor() { }

  @Input() photo: any;
  @Output() close = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  closeModal(): void {
    this.close.emit(false);
  }

}
