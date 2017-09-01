import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Act } from './models/Act';
import { Chapter } from './models/Chapter';
import { Scene } from './models/Scene'

@Injectable()
export class ActsService {

  constructor() { }

  ACTS: Act[]=[new Act(1),new Act(2), new Act(3)];
  NewScene: Scene = new Scene(0,0,0);

    ngOnInit() {

    }

    getNewScene(sceneId:number, actId:number, chapterId:number){
      this.NewScene.id = sceneId;
      this.NewScene.actId=actId;
      this.NewScene.chapterId = chapterId;
      return this.NewScene;
    }
    getScene(){
      return this.NewScene;
    }


    getAllActs(){

      for(var i=0; i<this.ACTS.length; i++){


        if(this.ACTS[i].chapters == undefined)
            this.ACTS[i].chapters =  new Array<Chapter>();

        this.ACTS[i].chapters.push(new Chapter(this.ACTS[i].chapters.length+1));

        for(var j=0; j<this.ACTS[i].chapters.length; j++){
          this.ACTS[i].chapters[j].scenes.push(new Scene( this.ACTS[i].chapters[j].scenes.length+1, j, i));
        }

      }

      debugger
      return this.ACTS;
    }


    addScene(scene: Scene){


      var act = this.ACTS.find(x=>x.id == scene.actId);

      var chapter = act.chapters.find(x=>x.id == scene.chapterId);

      debugger
      chapter.scenes.splice(scene.id, 0, scene);

      this.updateSceneId(chapter);
    }

    updateSceneId(chapter: Chapter){
      for(var i=0; i<chapter.scenes.length; i++){
        chapter.scenes[i].id = i+1;
      }
      // chapter.scenes.forEach(element => {

      // })
    }

  }
