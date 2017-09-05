import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActsService } from './../acts.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
  inputs:['chapter', 'scenes', 'actId'],
  outputs:['outScene','outChapter'],
  providers: [ActsService]
})

export class ChapterComponent implements OnInit {
  @Input() chapter;
  @Input() scenes;
  
  newScene : Scene;
  outScene = new EventEmitter<Scene>();
  outChapter = new EventEmitter<Chapter>()
  constructor(private shareService: ActsService) { }

  sceneEmit:Scene;

  emitScene(event){
    this.sceneEmit=event;
    this.outScene.emit(event);
  }
  
  addScene(sceneId:number, chapterId:number, actId:number, type: string){
    this.newScene = this.shareService.getNewScene(sceneId, actId, chapterId, 'create');
    //this.isSceneOpen = !this.isSceneOpen;
    this.outScene.emit(this.newScene);
  }

  
  addNewChapter(chapter, actId){
    debugger
    chapter.actId = actId;
    this.outChapter.emit(chapter);
  }
  ngOnInit() {

  }

}
