import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Act } from './models/Act';
import { Chapter } from './models/Chapter';
import { Scene } from './models/Scene';
import { RightSideComponent } from './right-side/right-side.component';

declare var $:any;

@Injectable()
export class ActsService {

  constructor() { }

  ACTS: Act[]=[new Act(1),new Act(2), new Act(3)];
  NewScene: Scene = new Scene(0,0,0, '');
  RightSlide: RightSideComponent;

    ngOnInit() {

    }

    getNewScene(sceneId:number, actId:number, chapterId:number, type: string){
      this.NewScene.id = sceneId;
      this.NewScene.actId=actId;
      this.NewScene.chapterId = chapterId;
      this.NewScene.type = type;
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

        // for(var j=0; j<this.ACTS[i].chapters.length; j++){
        //   this.ACTS[i].chapters[j].scenes.push(new Scene( this.ACTS[i].chapters[j].scenes.length+1, j, i, ''));
        // }

      }

      return this.ACTS;
    }


    addScene(scene: Scene){
      var act = this.ACTS.find(x=>x.id == scene.actId);
      var chapter = act.chapters.find(x=>x.id == scene.chapterId);

      if ( !chapter )
        return;
      
      if ( scene.type === 'edit') {
        let newScene = chapter.scenes.filter(item => item.id === scene.id)[0]
        chapter.scenes.forEach((item, i) => {
          if ( item.id === scene.id ) {
            chapter.scenes[i] = scene;
          }
        });

        return;
      }

      chapter.scenes.splice(scene.id, 0, scene);

      this.updateSceneId(chapter);
    }

    deleteScene(scene: Scene){
      
      debugger
      var act = this.ACTS.find(x=>x.id == scene.actId);
      var chapter = act.chapters.find(x=>x.id == scene.chapterId);

      if ( !chapter )
        return;
      
      

      chapter.scenes.splice((scene.id-1), 1);

      this.updateSceneId(chapter);

    }

    updateSceneId(chapter: Chapter){
      for(var i=0; i<chapter.scenes.length; i++){
        chapter.scenes[i].id = i+1;
      }
    }

    labelPosition() {
       setTimeout(function() {
        var input  = $(".form-control");
        input.on('focus blur', function (e) {
          $(this).parents('.form-group').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
        });
          $(input).on('focus', function() {
            $(this).parents('.form-group').addClass('focus')
          })
          $(input).on('blur', function() {
            $(this).parents('.form-group').removeClass('focus')
          })
            .trigger('blur');

        // Form Change Between Login and Signup
        //Singup Login changer between the forms login.html
        $('.change-form a').click(function(){
         $('form').animate({height: "toggle", opacity: "toggle"}, "400");
        });
      }, 400);
    }

  }
