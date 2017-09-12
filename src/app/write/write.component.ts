import { Component, OnInit, Input,Output, EventEmitter, SimpleChanges } from '@angular/core';

import { TrumbowygModule} from 'ng2-lazy-trumbowyg';
import { ActsService } from './../acts.service';
import { Act } from './../models/Act'
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';
import { Character } from './../models/Character'


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  inputs:['chapter', 'ACTS', 'characters'],
  outputs:['selectedChapter', 'createNewScene', 'createNewChapter'],
  providers: [ActsService]
})
export class WriteComponent implements OnInit {

  public ACTS: Act[];
  public characters: Character[]
  scenes: Scene[];
  currentChapterId = 0;
  currentChapter: Chapter;
  createNewScene =  new EventEmitter<Scene>();
  createNewChapter =  new EventEmitter<Chapter>();

  public initialContentOne: string = ``
  public initialContentTwo: string = ``
  public contentOne: string;
  public contentTwo: string;
  public options1: any = {
    'placeholder':'placeholder is here'
  };
  constructor(private shareService: ActsService) {
   }

  focusMe(scene){
    for(var i=0; i<this.ACTS.length; i++)
      for(var j=0; j<this.ACTS[i].chapters.length; j++)
        for(var k=0; k<this.ACTS[i].chapters[j].scenes.length; k++)
          if(scene.chapterId ==  this.ACTS[i].chapters[j].scenes[k].chapterId &&
            scene.id ==  this.ACTS[i].chapters[j].scenes[k].id){
               this.ACTS[i].chapters[j].scenes[k].isFocus = true;

               var id = 'scene-'+this.ACTS[i].chapters[j].id+'-'+this.ACTS[i].chapters[j].scenes[k].id;
               document.getElementById(id).classList.add('active');

            }
         else{
           if(this.ACTS[i].chapters[j].scenes[k].isFocus){
            var id = 'scene-trumbowyg-'+this.ACTS[i].chapters[j].id+'-'+this.ACTS[i].chapters[j].scenes[k].id;

             console.log( document.getElementById(id))
           }
            this.ACTS[i].chapters[j].scenes[k].isFocus = false;

            var id = 'scene-'+this.ACTS[i].chapters[j].id+'-'+this.ACTS[i].chapters[j].scenes[k].id;
            document.getElementById(id).classList.remove('active');

          }
}

  ngOnChanges(changes: SimpleChanges) {
      if(changes.chapter){

          this.currentChapter = changes.chapter.currentValue; //this.shareService.getChapter(id);
          console.log(this.currentChapter.scenes)
      }

  }



  addNewScene(actId, chapterId, sceneId ) {
    var newScene = this.shareService.getNewScene((sceneId+1), actId, chapterId, 'create');
    this.createNewScene.emit(newScene);
  }

  editScene(scene,chapterId){
    scene.type = 'edit';
    scene.chapterId = chapterId;
    this.createNewScene.emit(scene);
  }

  viewScene(scene){
    scene.type = 'view';
    this.createNewScene.emit(scene);
  }


  deleteScene(scene, actId:number){
    scene.isDelete = true;
    scene.type = 'delete';
    scene.actId = actId;

    this.createNewScene.emit(scene);
  }

  addChapter(chapter ) {
    chapter.type="create"

    var newChapter = new Chapter("create",chapter.id,chapter.actId)
    this.createNewChapter.emit(newChapter);
  }

  viewChapter(chapter){
    chapter.type = 'view';
    this.createNewChapter.emit(chapter);
  }

  editChapter(chapter){
    chapter.type = 'edit';
    this.createNewChapter.emit(chapter);
  }

  ngOnInit() {
  }

  over(chapter){
    for(var i=0; i<this.ACTS.length; i++)
      for(var j=0; j<this.ACTS[i].chapters.length; j++)
          if(chapter.id ==  this.ACTS[i].chapters[j].id ){
               this.ACTS[i].chapters[j].isFocus = true;
               var id = 'chapter-'+this.ACTS[i].chapters[j].id;
               document.getElementById(id).classList.add('open');
               //document.getElementById(id).className += " otherclass";

            }
         else{
            this.ACTS[i].chapters[j].isFocus = false;

            var id = 'chapter-'+this.ACTS[i].chapters[j].id;
            document.getElementById(id).classList.remove('open');


          }

      this.shareService.updateActs(this.ACTS);
  }



}
