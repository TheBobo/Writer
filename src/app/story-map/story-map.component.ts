import { Component, OnInit, EventEmitter } from '@angular/core';
import { Act } from '../models/Act';
import { Chapter } from '../models/Chapter';
import { Scene } from '../models/Scene';
import { ActsService } from './../acts.service';

@Component({
  selector: 'app-story-map',
  templateUrl: './story-map.component.html',
  inputs: ['ACTS'],
  outputs:['outScene', 'outChapter', 'showright', 'menuBar'],
  providers: [ActsService]
})


export class StoryMapComponent implements OnInit {
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

    console.log('emitScene', event)
  }

  emitNewChapter(event){
    if(event.type == 'create'){
      this.newChapter = new Chapter(event.type, (event.id+1));
      this.newChapter.actId = event.actId;
    }
    else if(event.type == 'edit')
      this.newChapter=event;

    this.newScene = undefined;
    console.log('this.newChapter ', this.newChapter)

    this.outChapter.emit(this.newChapter)
    if(event.type != 'delete')
      this.showright.emit(true);
    else {
       this.showmodal.emit(true);
      }
    }



  ngOnInit() {
  }

}

