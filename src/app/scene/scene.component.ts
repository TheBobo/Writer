import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Scene } from './../models/Scene';
import { ActsService } from './../acts.service';



@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  inputs:['scene', 'scenes', 'chapterId', 'actId'],
  outputs: ['outScene'],
  providers: [ActsService]
})
export class SceneComponent implements OnInit {
  @Input() scene;

  isSceneOpen = false;
  newScene : Scene;
  
  constructor(public shareService: ActsService) { }
  outScene = new EventEmitter<Scene>();

  addScene(sceneId:number, chapterId:number, actId:number, type: string){
    this.newScene = this.shareService.getNewScene(sceneId, actId, chapterId, type);
    // if ( type === 'edit') {
    //   this.newScene = this.scene
    //   this.newScene.type = 'edit';

    // }

    this.isSceneOpen = !this.isSceneOpen;
    this.outScene.emit(this.newScene);
  }
  ngOnInit() {
  }

}
