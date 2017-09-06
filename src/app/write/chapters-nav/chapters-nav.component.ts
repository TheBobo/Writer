import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActsService } from './../../acts.service';
import { Scene } from './../../models/Scene';


@Component({
  selector: 'app-chapters-nav',
  templateUrl: './chapters-nav.component.html',
  styleUrls: ['./chapters-nav.component.scss'],
  inputs:['menuItems'],
  outputs:['selectedChapter', 'createNewScene']
})
export class ChaptersNavComponent implements OnInit {


  constructor(public shareService: ActsService) { }

  selectedChapter =  new EventEmitter<Number>();
  createNewScene =  new EventEmitter<Scene>();


  selectChapter(chapter){
    this.selectedChapter.emit(chapter);
  }

  clicked(chapter){
    alert(chapter)
  }

  addScene(sceneId:number, chapterId:number, actId:number, type: string, last: boolean){
    var newScene = this.shareService.getNewScene(sceneId, actId, chapterId, type, last);
    debugger
    this.createNewScene.emit(newScene);
  }

  ngOnInit() {
  }

}
