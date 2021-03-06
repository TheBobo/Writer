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
  NewChapter: Chapter = new Chapter('create',0);
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

    getNewChapter(chapterId:number, actId:number,  type: string){
      this.NewChapter = new Chapter(type, chapterId, actId, )
      this.NewChapter.id = chapterId;
      this.NewChapter.actId=actId;

      this.NewChapter.type = type;
      return this.NewChapter;
    }

    getScene(){
      return this.NewScene;
    }


    getAllActs(){
      return this.ACTS;
    }

    initAllActs(){
      var chapterIndex = 0;
      var isFirstScene = true;

      for(var i=0; i<this.ACTS.length; i++){


        if(this.ACTS[i].chapters == undefined){
            this.ACTS[i].chapters =  new Array<Chapter>();

            chapterIndex++;
            this.ACTS[i].chapters.push(new Chapter('create', chapterIndex,(i+1)));
            if(isFirstScene){
              this.ACTS[i].chapters[0].scenes[0].isFocus=true;
              isFirstScene=false;
            }
            chapterIndex++;
            this.ACTS[i].chapters.push(new Chapter('create',chapterIndex,(i+1)));

        }

      }
      return this.ACTS;
    }

    updateChapter(chapter){
      for(var i=0; i<this.ACTS.length; i++)
        for(var j=0; j<this.ACTS[i].chapters.length; j++)
          if(this.ACTS[i].chapters[j].id == chapter.id)
            this.ACTS[i].chapters[j]=chapter;
    }

    updateActs(ACTS){

      this.ACTS = ACTS;
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

      chapter.scenes.splice((scene.id), 0, scene);

      this.updateSceneId(chapter, scene.id, scene.last);
    }


    addChapter(chapter: Chapter){
      var act = this.ACTS.find(x => x.id == chapter.actId);
      if(chapter.type == 'edit'){

        let NewChapter = act.chapters.filter(item=> item.id === chapter.id)[0]
        act.chapters.forEach((item,i)=>{
          if(item.id === chapter.id){
            act.chapters[i]=chapter;
          }
        })
        return;
      }
      act.chapters.splice((chapter.id ), 0, chapter);
      this.updateChapterId(this.ACTS);
    }

    getChapterByIndex(id:number){
      
    }

    getChapter(chapterId: number):Chapter{

      for(var i=0; i< this.ACTS.length; i++){
        if(this.ACTS[i].chapters)
          for(var j=0; j<this.ACTS[i].chapters.length; j++){
            return this.ACTS[i].chapters[j];
          }
      }
      return new Chapter('create',-1);
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


  changeSceneChapter(scene){
    for(var i=0; i<this.ACTS.length; i++){
      for(var j=0; j<this.ACTS[i].chapters.length;j++){
        if(this.ACTS[i].chapters[j].id == scene.chapterId){
          this.ACTS[i].chapters[j].scenes.splice(scene.id-1,1);
          this.updateSceneId(this.ACTS[i].chapters[j], scene.id);
        }
      }
    }


    for(var i=0; i<this.ACTS.length; i++){
      for(var j=0; j<this.ACTS[i].chapters.length;j++){
        if(this.ACTS[i].chapters[j].id == scene.newChapterId){
          this.ACTS[i].chapters[j].scenes.push(scene);
          this.updateSceneId(this.ACTS[i].chapters[j], scene.id);
          scene.chapterId = scene.newChapterId;
        }

      }
    }
  }

  changeSceneOrder(scene){
    for(var i=0; i<this.ACTS.length; i++){
      for(var j=0; j<this.ACTS[i].chapters.length;j++){

        if(scene.chapterId == this.ACTS[i].chapters[j].id){
          for(var k=0; k<this.ACTS[i].chapters[j].scenes.length;k++){
            if(this.ACTS[i].chapters[j].scenes[k].id == scene.id){
              this.ACTS[i].chapters[j].scenes.splice(k,1)

            }
          }
        }
      }
    }


    for(var i=0; i<this.ACTS.length; i++){
      for(var j=0; j<this.ACTS[i].chapters.length;j++){
        if(scene.chapterId == this.ACTS[i].chapters[j].id){
          for(var k=0; k<this.ACTS[i].chapters[j].scenes.length;k++){
            if(this.ACTS[i].chapters[j].scenes[k].id == scene.newId){
              scene.id = scene.newId;
              this.ACTS[i].chapters[j].scenes.splice(k,0, scene);
              this.updateSceneId(this.ACTS[i].chapters[j], 0);
              ;
            }
          }
        }
      }
    }
  }

    deleteScene(scene: Scene){
      var act = this.ACTS.find(x=>x.id == scene.actId);
      var chapter = act.chapters.find(x=>x.id == scene.chapterId);

      if ( !chapter )
        return;

      chapter.scenes.splice((scene.id-1), 1);

      this.updateSceneId(chapter, scene.id);
    }

    deleteChapter(chapter: Chapter){
      var act = this.ACTS.find(x=>x.id == chapter.actId);
      act.chapters.splice(chapter.id-1, 1)
      this.updateChapterId(this.ACTS);
    }

    labelPosition() {
       setTimeout(function() {
        var input  = $(".form-control");
          // input.on('focus blur', function (e) {
          //   if(this != undefined)
          //     $(this).parents('.form-group').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
          // });
          $(input).on('focus', function() {
            if(this != undefined)
              $(this).parents('.form-group').addClass('focus')
          })
          $(input).on('blur', function() {
            if(this != undefined)
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
