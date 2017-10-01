import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActsService } from './../acts.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
  inputs:['chapter', 'scenes', 'actId'],
  outputs:['outScene','outChapter', 'deleteChapter'],
  providers: [ActsService]
})

export class ChapterComponent implements OnInit {
  @Input() chapter;
  @Input() scenes;

  newScene : Scene;
  outScene = new EventEmitter<Scene>();
  outChapter = new EventEmitter<Chapter>();
  deleteChapter = new EventEmitter<Chapter>();
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
    var newChapter = new Chapter('create',chapter.id-1,actId);
    // chapter.actId = actId;
    // chapter.type ='create';
    // chapter.id = chapter.id;
    this.outChapter.emit(newChapter);
  }

  editChapter(chapter){
    chapter.type='edit'
    this.outChapter.emit(chapter);
  }

  viewChapter(chapter){
    chapter.type='view'
    this.outChapter.emit(chapter);
  }

  deleteChapterFomAct(chapter){
    chapter.type='delete'
    this.deleteChapter.emit(chapter)
  }

  ngOnInit() {
    debugger
    for(var i=0; i < this.chapter.scenes.length; i++){
      this.chapter.wordCount = this.chapter.scenes[i].wordCount;
      this.chapter.wordTarget = this.chapter.scenes[i].wordsGoal;
    }
  }

}
