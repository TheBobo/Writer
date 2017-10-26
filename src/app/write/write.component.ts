import { Component, OnInit, Input,Output, EventEmitter, SimpleChanges } from '@angular/core';

import { TrumbowygModule} from 'ng2-lazy-trumbowyg';
import { ActsService } from './../acts.service';
import { Act } from './../models/Act'
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';
import { Character } from './../models/Character'

declare var $:any;
declare var jQuery: any;

declare var TrumbowEdit: any;

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  inputs:['chapter', 'ACTS', "characters"],
  outputs:['selectedChapter', 'createNewScene', 'createNewChapter','newCharacter', 'hasOpenAddCharacter',
'deleteChapter'],
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
  newCharacter = new EventEmitter();
  deleteChapter  = new EventEmitter<Chapter>();
  hasOpenAddCharacter = new EventEmitter<boolean>();
  startCharacter : number;
  endCharacter : number;

  public isOpenComplete : string = '';

  public initialContentOne: string = ``
  public initialContentTwo: string = ``
  public contentOne: string;
  public contentTwo: string;
  public options1: any = {
    btns: [
      ['undo', 'redo'], // Only supported in Blink browsers
      ['formatting'],
      ['strong', 'em', 'del'],
      ['link'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
      ['unorderedList', 'orderedList'],
      ['removeformat']
    ]
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

  saveSceneContent(event, sceneId){
    // this.scene
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

  deleteChapterFn(chapter){
    chapter.type = 'delete';
    this.deleteChapter.emit(chapter);
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

  addCharacter(){
    $("#characters").hide();
    this.newCharacter.emit();
    
    this.hasOpenAddCharacter.emit(true);

  }


  showCharacter(character) {
    character.type="view"

    this.newCharacter.emit(character);
  }

  over(chapter){
    for(var i=0; i<this.ACTS.length; i++)
      for(var j=0; j<this.ACTS[i].chapters.length; j++)
          if(chapter.id ==  this.ACTS[i].chapters[j].id ){
               this.ACTS[i].chapters[j].isFocus = true;
               var id = 'chapter-'+this.ACTS[i].chapters[j].id;
               document.getElementById(id).classList.add('open');
            }
         else{
            this.ACTS[i].chapters[j].isFocus = false;

            var id = 'chapter-'+this.ACTS[i].chapters[j].id;
            document.getElementById(id).classList.remove('open');


          }

      this.shareService.updateActs(this.ACTS);
  }
  

  select(character, event){
    // var text = ($('.scene.focus').find('.trumbowyg-editor').html())
    // if(this.startCharacter != -1){
    //   debugger
    // }

    // var index = text.indexOf("@");
    // text = text.substr(0, index);

    // text = text + "<span readonly class='character-name' (click)='showCharacter("+character+")'>"+character.name+"</span>&#8203;"
    // $('.scene.focus').find('.trumbowyg-editor').html(text);

    var text = ($('.textEditor.active').val())
    var textStart = text.substr(0, this.startCharacter-1);
    var textEnd = text.substr(this.endCharacter);

    text = textStart + character.name + textEnd;
    var textDiv = textStart + "<span readonly class='character-name' (click)='showCharacter("+character+")'>"+character.name+"</span>&#8203;" + textEnd;
    
    $('.textEditor.active').val(text)
    $('.textEditor.active').parent().find('.textEditorDiv').html(textDiv);
    $("#characters").hide();
    debugger
  }

  selectTrumbowyg(event){
    $('.textEditor').removeClass('active');
    $(event.target).addClass('active')
  }

  
getCaretPosition() {
  var x = 0;
  var y = 0;
  var sel = window.getSelection();
  if(sel.rangeCount) {
      var range = sel.getRangeAt(0).cloneRange();
      debugger
      if(range.getClientRects()) {
      range.collapse(true);
      var rect = range.getClientRects()[0];
      if(rect) {
          y = rect.top;
          x = rect.left;
      }
      }
  }

  return {
      x: x,
      y: y
  };
}

  typeText(event){
    debugger
    if(event.key == '@'){
      
      var currentHtml = $('.textEditorDiv').html();
      $('.textEditorDiv').html(currentHtml.replace('@', '<span class="tagHero">@</span>'))
      debugger

      var postion = this.getCaretPosition();
      $("#characters").css({top: postion.y-28, left: postion.x-300, display:'block'});
      $("#characters > li").each(function() {
         $(this).show();
      });
    }
    else if(event.code == 'Space'){
      var currentHtml = $('.textEditorDiv').html();
      var newHtml = currentHtml.replace('<span class="tagHero">@</span>', '@');
      debugger
      $('.textEditorDiv').html(newHtml)
    }
    else if(this.startCharacter != -1){
      this.endCharacter = $(event.target).prop('selectionStart')
      if(event.key = 'space')
        $("#characters").hide();
    }


    console.log($(event.target).text())
  }

  


}
