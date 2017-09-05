import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assets-menu',
  templateUrl: './assets-menu.component.html',
  styleUrls: ['./assets-menu.component.scss'],
  outputs: ['activeMenu']
})
export class AssetsMenuComponent implements OnInit {

  constructor() { }
  activeMenu = new EventEmitter<string>()

  activeElement: string;

  ngOnInit() {
  }

  changeView(elem) {
    this.activeElement = elem;
    this.activeMenu.emit(this.activeElement);
  }

}
