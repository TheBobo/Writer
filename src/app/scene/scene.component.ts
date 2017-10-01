import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';
import { ActsService } from './../acts.service';



@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  inputs:['scene', 'scenes', 'chapterId', 'actId'],
  outputs: ['outScene', 'deleteScene'],
  providers: [ActsService]
})
export class SceneComponent implements OnInit {
  @Input() scene;
  @Input() scenes;
  @Input() lastItem;

  isSceneOpen = false;
  isDeleteOpen = false;
  newScene : Scene;

  constructor(public shareService: ActsService) { }
  outScene = new EventEmitter<Scene>();

  addScene(sceneId:number, chapterId:number, actId:number, type: string, event, last: boolean){
    debugger
    event.stopPropagation();
    if ( type === 'edit') {
      this.newScene = this.scene
      this.newScene.type = 'edit';
    } else if ( type === 'create') {
      this.newScene = this.shareService.getNewScene(sceneId, actId, chapterId, type, last);
      this.scenes.forEach((item, i) => {
        if ( item.id === sceneId && i != this.scenes.length && !last ) {
          this.newScene.id += 1
        }
      })
    } else if ( type === 'view') {
      this.newScene = this.scene
      this.newScene.type = 'view';
    }

     this.isSceneOpen = !this.isSceneOpen;
     this.outScene.emit(this.newScene);
  }

  deleteScene(sceneId:number, chapterId:number, actId:number, type: string){
    this.newScene = this.scene
    this.newScene.isDelete = true;
    this.newScene.type = 'delete';
    this.newScene.actId = actId;

    this.isDeleteOpen = !this.isDeleteOpen;
    this.outScene.emit(this.newScene);
  }

  ngOnInit() {
  }

}
