import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActsService } from './../../acts.service';
import { Scene } from './../../models/Scene';
import { Chapter } from './../../models/Chapter';


@Component({
  selector: 'app-chapters-nav',
  templateUrl: './chapters-nav.component.html',
  styleUrls: ['./chapters-nav.component.scss'],
  inputs:['menuItems'],
  outputs:['selectedChapter', 'createNewScene', 'createNewChapter']
})
export class ChaptersNavComponent implements OnInit {


  constructor(public shareService: ActsService) { }

  selectedChapter =  new EventEmitter<Number>();
  createNewScene =  new EventEmitter<Scene>();
  createNewChapter =  new EventEmitter<Chapter>();


  selectChapter(chapter){
    this.selectedChapter.emit(chapter);
  }

  clicked(chapter){
    alert(chapter)
  }

  addScene(sceneId:number, chapterId:number, actId:number, type: string, last: boolean){
    var newScene = this.shareService.getNewScene(sceneId, actId, chapterId, type, last);

    this.createNewScene.emit(newScene);
  }

  addChapter(chapter){
    this.createNewChapter.emit(chapter);
  }

  ngOnInit() {
  }

}
