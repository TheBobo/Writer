import { Component, OnInit, EventEmitter } from '@angular/core';
import { Act } from '../models/Act';
import { Chapter } from '../models/Chapter';
import { Scene } from '../models/Scene';
import { ActsService } from './../acts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  inputs: ['ACTS'],
  outputs:['outScene', 'outChapter', 'showright', 'menuBar'],
  providers: [ActsService]
})


export class MainComponent implements OnInit {
  public ACTS: Act[];
  menuBar = 'discover';
  
  outScene = new EventEmitter<Scene>()
  showright = new EventEmitter<true>()
  showmodal = new EventEmitter<true>()
  menubar = new EventEmitter<string>()
  outChapter = new EventEmitter<Chapter>()

  newScene: Scene

  constructor(private shareService: ActsService) { }

  


  emitScene(event){
    this.newScene = event;
    this.outScene.emit(event);

    if(event.type != 'delete')
      this.showright.emit(true);
    else {     
       this.showmodal.emit(true);
      }
  }

  addNewChapter(chaptter, act){
    chaptter.actId = act.id;
    this.outChapter.emit(chaptter);
    this.showright.emit(true);
  }

  ngOnInit() {
  }

}
