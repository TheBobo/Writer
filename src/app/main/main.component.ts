import { Component, OnInit, EventEmitter } from '@angular/core';
import { Act } from '../models/Act';
import { Chapter } from '../models/Chapter';
import { Scene } from '../models/Scene';

import { ActsService } from './../acts.service';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  inputs: ['ACTS'],
  outputs:['outScene', 'showright'],
  providers: [ActsService]
})


export class MainComponent implements OnInit {
  public ACTS: Act[];
  
  outScene = new EventEmitter<Scene>()
  showright = new EventEmitter<true>()
  newScene: Scene
  showLeftPanel: boolean;

  constructor(private shareService: ActsService) { }

  openMenu(){
    this.showLeftPanel = !this.showLeftPanel;
    let body = document.getElementsByTagName('body')[0];
    if(this.showLeftPanel)
      body.classList.add("show-left-panel");   //add the class
    else
      body.classList.remove("show-left-panel");   //remove the class
  }

  emitScene(event){
    this.newScene = event;
    this.outScene.emit(event);
    this.showright.emit(true);

  }

  addNewChapter(act, index){

    //this.ACTS.splice(2, 0, );
  }

  ngOnInit() {
  }

}
