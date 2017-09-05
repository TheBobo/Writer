
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Act } from '../models/Act';
import { Chapter } from '../models/Chapter';
import { Scene } from '../models/Scene';
import { ActsService } from './../acts.service';

@Component({
  selector: 'app-story-map',
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
  newChapter: Chapter

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

  emitNewChapter(event){
    this.newChapter = new Chapter((event.id+1));
    this.newChapter.actId = event.actId;
    this.newChapter.type = 'create';

    this.newScene = undefined;
    console.log(this.newChapter)
    debugger
    if(event.type != 'delete')
      this.showright.emit(true);
    else {     
       this.showmodal.emit(true);
      }
    debugger

    }


  ngOnInit() {
  }

}
