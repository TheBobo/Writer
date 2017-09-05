import { Component, ViewEncapsulation, OnInit, Input, EventEmitter } from '@angular/core';
import { ActsService } from '../acts.service';
@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: ['menubarItem'],
  outputs: ['activeMenu']
})
export class LeftSideComponent implements OnInit {
  @Input() chapter

  activeMenu = new EventEmitter<string>()

  private ACTS;

  constructor(private shareService: ActsService) { }
  isOpen:boolean
  private menuItems = [];

  ngOnInit() {
    this.isOpen = false;
    this.ACTS = this.shareService.getAllActs();
    this.menuItems = this.ACTS
    console.log('this.ACTS', this.ACTS)
  }

  currentView(event) {
    this.activeMenu.emit(event);
  }


  openMenu(){
    this.isOpen=!this.isOpen;
  }


}
