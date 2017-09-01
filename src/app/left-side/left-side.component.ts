import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LeftSideComponent implements OnInit {

  constructor() { }
  isOpen:boolean

  ngOnInit() {
    this.isOpen = false;
  }

  openMenu(){
    this.isOpen=!this.isOpen;
  }


}
