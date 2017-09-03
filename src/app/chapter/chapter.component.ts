import { Scene } from './../models/Scene';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActsService } from './../acts.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
  inputs:['chapter', 'scenes', 'actId'],
  outputs:['outScene'],
  providers: [ActsService]
})


export class ChapterComponent implements OnInit {
  @Input() chapter;
  @Input() scenes;
  
  newScene : Scene;
  outScene = new EventEmitter<Scene>()
  constructor(private shareService: ActsService) { }

  sceneEmit:Scene;

  emitScene(event){
    this.sceneEmit=event;
    this.outScene.emit(event);
  }
  // addScene(sceneId:number, chapterId:number, actId:number){

  //       //this.actsService.prepareScene(sceneId,chapterId, actId);
  //       $('body').toggleClass('show-right-panel');
  // }

  OnAddScene(){
  }

  ngOnChanges() {
    
  }
  
  addScene(sceneId:number, chapterId:number, actId:number, type: string){
    this.newScene = this.shareService.getNewScene(sceneId, actId, chapterId, 'create');
    //this.isSceneOpen = !this.isSceneOpen;
    this.outScene.emit(this.newScene);
  }

  ngOnInit() {

  }

  onAddScene(scene : Scene): void{
      
  }

}
