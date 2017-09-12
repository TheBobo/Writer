import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActsService } from './../../acts.service';
import { Scene } from './../../models/Scene';
import { Chapter } from './../../models/Chapter';

declare var $:any;

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
    var id = "#chapterItem-" + chapter.id;


    console.log('current top of chapter is ' + $(id).offset().top)
    var scroll =  $('#editor-wrapper').scrollTop();
    debugger
    scroll=scroll + $(id).offset().top-60;

    $('#editor-wrapper').animate({
      scrollTop: (scroll)
    }, 2000);

  }


  addScene(sceneId:number, chapterId:number, actId:number, type: string, last: boolean){
    var newScene = this.shareService.getNewScene(sceneId, actId, chapterId, type, last);

    this.createNewScene.emit(newScene);
  }

  addChapter(chapter){
    var newChapter = new Chapter('create',chapter.id,chapter.actId)
    this.createNewChapter.emit(newChapter);
  }

  scroolToScene(sceneId, chapterId){
    var clickedScene = '#sw-'+chapterId+'-'+sceneId;
    var clickedSceneElem = '#scene-'+chapterId+'-'+sceneId;

    $('.left-side-panel .scene.active').removeClass('active');
    $(clickedSceneElem).addClass('active')

    console.log('current top of scene is ' + $(clickedScene).offset().top)
    var scroll = $('#editor-wrapper').scrollTop();
    scroll= scroll + $(clickedScene).offset().top-60;

    $('#editor-wrapper').animate({
      scrollTop: (scroll)
    }, 2000);
  }

  ngOnInit() {
  }

}
