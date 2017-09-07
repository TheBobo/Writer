import { Component, ViewEncapsulation, OnInit, Input, EventEmitter } from '@angular/core';
import { ActsService } from '../acts.service';
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';
@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: ['menubarItem'],
  outputs: ['activeMenu', 'selectedChapter', 'createNewScene', 'createNewChapter']
})
export class LeftSideComponent implements OnInit {
  @Input() chapter

  activeMenu = new EventEmitter<string>()
  selectedChapter = new EventEmitter<Chapter>()
  createNewChapter = new EventEmitter<Chapter>()
  createNewScene  = new EventEmitter<Scene>()


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

  selectChapter(event){
    this.selectedChapter.emit(event);
  }

  createScene(event){
    this.createNewScene.emit(event)
  }

  createChapter(event){
    this.createNewChapter.emit(event);
  }


  openMenu(){
    this.isOpen=!this.isOpen;
  }


}
