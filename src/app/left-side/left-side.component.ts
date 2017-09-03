import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { ActsService } from '../acts.service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LeftSideComponent implements OnInit {
  @Input() chapter

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

  openMenu(){
    this.isOpen=!this.isOpen;
  }


}
