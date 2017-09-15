import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  outputs: ['redirectDashboard','redirectSettings']
})
export class HeaderComponent implements OnInit {

  redirectDashboard = new EventEmitter();
  redirectSettings = new EventEmitter();

  constructor() { }

  gotoDashboard(){
    this.redirectDashboard.emit();
  }

  gotoSettings(){
    this.redirectSettings.emit();
  }

  ngOnInit() {
  }

}
