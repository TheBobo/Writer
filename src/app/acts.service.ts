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

    getNewScene(sceneId:number, actId:number, chapterId:number, type: string, last?: boolean){
      this.NewScene = new Scene(0,0,0,'')
      this.NewScene.id = sceneId;
      this.NewScene.actId=actId;
      this.NewScene.chapterId = chapterId;
      this.NewScene.type = type;
      this.NewScene.last = last;
      return this.NewScene;
    }
    getScene(){
      return this.NewScene;
    }


    getAllActs(){
      return this.ACTS;
    }

    initAllActs(){
      var chapterIndex = 0;

      for(var i=0; i<this.ACTS.length; i++){


        if(this.ACTS[i].chapters == undefined)
            this.ACTS[i].chapters =  new Array<Chapter>();

        chapterIndex++;
        this.ACTS[i].chapters.push(new Chapter(chapterIndex));
        chapterIndex++;
        this.ACTS[i].chapters.push(new Chapter(chapterIndex));
        // for(var j=0; j<this.ACTS[i].chapters.length; i++){
        //   if(this.ACTS[i].chapters[j].scenes == undefined)
        //     this.ACTS[i].chapters[j].scenes =  new Array<Scene>();

        //   this.ACTS[i].chapters[j].scenes.push(new Scene(1,j,i,"test"));
        //   this.ACTS[i].chapters[j].scenes.push(new Scene(2,j,i,"test"));
        //   this.ACTS[i].chapters[j].scenes.push(new Scene(3,j,i,"test"));
        // }
      }
      return this.ACTS;
    }


    addScene(scene: Scene){
      var act = this.ACTS.find(x=>x.id == scene.actId);
      debugger
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

      chapter.scenes.splice((scene.id-1), 0, scene);

      this.updateSceneId(chapter, scene.id, scene.last);
    }


    addChapter(chapter: Chapter){
      var act = this.ACTS.find(x=>x.id == chapter.id);
      if(chapter.type == 'edit'){

        return;
      }
      act.chapters.push(chapter);
      this.updateChapterId(this.ACTS);
    }

    getChapter(chapterId: number):Chapter{
      console.log(this.ACTS)

      for(var i=0; i< this.ACTS.length; i++){
        if(this.ACTS[i].chapters)
          for(var j=0; j<this.ACTS[i].chapters.length; j++){
            return this.ACTS[i].chapters[j];
          }
      }
      return new Chapter(-1);
    }

    updateChapterId(ACTS){
      var index = 1;
      ACTS.forEach((item, i) => {
        item.chapters.forEach((element,i)=> {
          element.id=index;
          index++;
        });
      });

    }

    updateSceneId(chapter: Chapter, sceneId: number, last?: boolean){
      chapter.scenes.forEach((item, i) => {
        chapter.scenes[i].id = i+1;
      })
    }

    deleteScene(scene: Scene){
      var act = this.ACTS.find(x=>x.id == scene.actId);
      var chapter = act.chapters.find(x=>x.id == scene.chapterId);

      if ( !chapter )
        return;

      chapter.scenes.splice((scene.id-1), 1);

      this.updateSceneId(chapter, scene.id);
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
