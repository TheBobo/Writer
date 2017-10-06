import { Act } from './../models/Act';
import { Angular2SelectModule } from '@baumi/angular2-select';

import { Audence } from './../models/Audence';
import { Character } from 'app/models/Character';
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter'
import { Component, Input, OnInit, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ActsService } from './../acts.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {SelectModule} from 'ng2-select';
import './../../assets/js/lite-select'

declare var $:any;
declare var jQuery: any;
// declare var LiteSelectFunctionality: any;

const LABELS = [
  {'name': 'No label', 'class': ''},
  {'name': 'Setup', 'class': 'primary'},
  {'name': 'Backstory',  'class': 'primary'},
  {'name': 'Catalyst', 'class': 'secondary'},
  {'name': 'Major Event', 'class': 'secondary'},
  {'name': 'Midpoint', 'class': 'primary'},
  {'name': 'Crisis', 'class': 'primary'},
  {'name': 'Climax', 'class': 'primary'},
  {'name': 'Resolution', 'class': 'primary'},
  {'name': 'Final Image', 'class': 'primary'},


  {'name': 'Fun & Games',  'class': 'secondary'},
  {'name': 'Unreliable narrator',  'class': 'secondary'},
  {'name': 'Cliﬀhanger', 'class': 'secondary'},
  {'name': 'Act of God',  'class': 'secondary'},
  {'name': 'Eucatastrophe',  'class': 'secondary'},
  {'name': 'Flashback', 'class': 'secondary'},
  {'name': 'Flashforward',  'class': 'secondary'},
  {'name': 'Foreshadowing',  'class': 'secondary'},
  {'name': 'Frame Story',   'class': 'secondary'},
  {'name': 'Quibble',  'class': 'secondary'},
  {'name': 'In medias rese',   'class': 'secondary'},
  {'name': 'Narrative hook',  'class': 'secondary'},
  {'name': 'Plot twist',  'class': 'secondary'},
  {'name': 'Poetic justice',  'class': 'secondary'},
  {'name': 'Red herring',  'class': 'secondary'},
  {'name': 'Self-fulﬁlling prophecy','class': 'secondary'},
  {'name': 'Ticking Clock', 'class': 'secondary'},
  {'name': 'Chekhov\'s gun', 'class':'secondary'}
];


const GENDER_LABELS = [
  {'name': 'Male', 'class': 'primary'},
  {'name': 'Female',  'class': 'primary'},
  {'name': 'Custom', 'class': 'primary'}
];

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  inputs: [ 'scene', 'chapter', 'character','audence', 'rightOpen', 'acts', 'title'],
  outputs: ['close', 'addNewScene', 'addNewChapter', 'addNewCharacter', 'addNewAudence', 'changeSceneChapter', 'changeSceneOrder','changeLocation'],
  providers: [ActsService]
})
export class RightSideComponent implements OnInit {
  @Input() scene;
  @Input() chapter;
  @Input() character;
  @Input() acts;

  @Input() audence;
  @Input() rightOpen;
  @Input() String;

  isCustomGender: boolean;
  chapters:Array<any>;
  availableScene:Array<any>;
  genders:Array<any>;



  close = new EventEmitter<boolean>()
  addNewScene = new EventEmitter<Scene>()
  addNewChapter = new EventEmitter<Chapter>()
  addNewCharacter = new EventEmitter<Character>()
  addNewAudence = new EventEmitter<Audence>();
  changeSceneChapter = new EventEmitter<Scene>();
  changeSceneOrder = new EventEmitter<Scene>();
  changeLocation = new EventEmitter<number>();

  public labels:Array<any> = [];


  newModelScene = new Scene(0,0,0, '');
  private rightPanelForm: FormGroup;
  private rightPanelCreateChapter: FormGroup;
  private rightPanelCreateCharacter: FormGroup;
  private rightPanelCreateAudence: FormGroup;

  public panelTitle: string = '';


  constructor(private shareService: ActsService, private fb: FormBuilder) {
    // this.liteSelectObj = new LiteSelect()

    this.rightPanelForm = fb.group({
      title: [this.scene ? this.scene.title : ''],
      description: [this.scene ? this.scene.synopsis : ''],
      wordsGoal: [this.scene ? this.scene.wordsGoal : ''],
      chapterId: [this.scene ? this.scene.chapterId : ''],
      id: [this.scene ? this.scene.id : ''],
      settings:[this.scene ? this.scene.settings : ''],
      mood:[this.scene ? this.scene.mood : ''],
      objective:[this.scene ? this.scene.objective : ''],
      selectLabel: [this.scene ? this.scene.selectLabel : '']

    });

    this.rightPanelCreateChapter = fb.group({
      chaptertitle: [this.chapter ? this.chapter.title : ''],
      description:[this.chapter ? this.chapter.description : ''],
      actId:[this.chapter ? this.chapter.actId : ''],
      id:[this.chapter ? this.chapter.id : ''],
    })

    this.rightPanelCreateCharacter = fb.group({
      characterName: [this.character ? this.character.name : ''],
      image:[this.character ? this.character.img : ''],
      storyline:[this.character ? this.character.storyline : ''],
      goal:[this.character ? this.character.goal : ''],
      conflict:[this.character ? this.character.conflict : ''],
      role:[this.character ? this.character.role : ''],
      epiphany:[this.character ? this.character.epiphany : ''],

      age:[this.character ? this.character.age : ''],
      gender:[this.character ? this.character.gender : ''],
      location:[this.character ? this.character.location : ''],
      employment:[this.character ? this.character.employment : ''],
      custom:[this.character ? this.character.custom : ''],
    })

    this.rightPanelCreateAudence = fb.group({
      audenceName: [this.audence ? this.audence.name : ''],
      role:[this.audence ? this.audence.role : ''],
      storyline:[this.audence ? this.audence.storyline : ''],
      goal:[this.audence ? this.audence.goal : ''],
      conflict:[this.audence ? this.audence.conflict : ''],
      epiphany:[this.audence ? this.audence.epiphany : ''],
      image:[this.audence ? this.audence.image : ''],

      age:[this.audence ? this.audence.age : ''],
      gender:[this.audence ? this.audence.gender : ''],
      location:[this.audence ? this.audence.location : ''],

      bio:[this.audence ? this.audence.bio : ''],
      education:[this.audence ? this.audence.education : ''],
      profession:[this.audence ? this.audence.profession : ''],
      income:[this.audence ? this.audence.income : ''],
      preferred_reading_device:[this.audence ? this.audence.preferred_reading_device : ''],
      secondary_reading_device:[this.audence ? this.audence.secondary_reading_device : ''],
      how_often_do_they_read:[this.audence ? this.audence.how_often_do_they_read : ''],
      where_do_they_read:[this.audence ? this.audence.where_do_they_read : ''],
      what_story_length_do_they_prefer:[this.audence ? this.audence.what_story_length_do_they_prefer : ''],
      average_words_read_per_day:[this.audence ? this.audence.average_words_read_per_day : '']
    })
  }

   public ngOnInit():any {
    debugger
    this.isCustomGender = false;
    this.shareService.RightSlide = this;
    this.chapters = Array<any>();
    this.genders = Array<any>();

    for(var i=0; i<this.acts.length; i++){
      for(var j=0; j<this.acts[i].chapters.length; j++)
        this.chapters.push({id:this.acts[i].chapters[j].id, text:'chapter: ' + this.acts[i].chapters[j].title +' '+this.acts[i].chapters[j].id});
    }


     LABELS.forEach((label:{name:string, class:string}) => {
       this.labels.push({
         id: label.name,
         text: `${label.name}<span class="${label.class}">${label.class}</span>`
       });
     });

     GENDER_LABELS.forEach((label:{name:string, class:string}) => {
      this.genders.push({
        id: label.name,
        text: `${label.name}`
      });
    });


   }

  onSelectionChange(name,event){

  }


  focusElem(elem){
    $(elem.target).parent().addClass("active")
  }

  blur(elem){
    if($(elem.target).val().length == 0)
        $(elem.target).parent().removeClass("active")
  }

  chageSceneChapter(event){
    if(this.scene.chapterId != event.id){
      //this.shareService.changeSceneChapter(this.scene, event.id)
      this.scene.newChapterId = event.id;
      this.changeSceneChapter.emit(this.scene)
      this.setAvailableScene()
    }
    else{
      this.setAvailableScene()
    }
  }

  chageChapterLocation(event){
    if(this.chapter.id != event.id){
      this.changeLocation.emit(event.id)
    }
  }

  selectedLabel(event){
    this.scene.selectLabel = event.id;
  }


  selectCharacterGender(event){
    if(event.id == 'Custom'){
      this.character.isCustomGender = true;
      return;
    }
    this.character.gender = event.id;
  }


  selectAudenceGender(event){
    if(event.id == 'Custom'){
      this.audence.isCustomGender = true;
      return;
    }
    this.audence.gender = event.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.scene ) {
      this.shareService.labelPosition();

      if ( this.scene && this.scene.type === 'create') {
        this.clearForm();
      }
    }

    if(changes.character){
      this.rightPanelCreateCharacter.reset()
    }
  }

  characterClear(){
    this.character.name = '';
  }

  private clearForm() {
    this.rightPanelForm.reset();
  }

  cancel(){
    this.close.emit(false);
    this.rightPanelForm.reset();
    this.rightPanelCreateChapter.reset();
    this.rightPanelCreateCharacter.reset();
    this.rightPanelCreateAudence.reset();
    $('.form-group').removeClass('active')
  }

  public setRightSideTitle(title) {

    this.panelTitle = title;
    if(title == "Edit Scene")
      this.setAvailableScene();

  }

  setAvailableScene(){
    this.availableScene = Array<any>()
    for(var i=0; i<this.acts.length; i++)
      for(var j=0; j<this.acts[i].chapters.length; j++)
        if(this.scene.chapterId == this.acts[i].chapters[j].id){

          for(var k=0; k<this.acts[i].chapters[j].scenes.length; k++ )
            this.availableScene.push({id:this.acts[i].chapters[j].scenes[k].id, text: 'Scene ' + this.acts[i].chapters[j].scenes[k].id})
        }

  }

  chageScenePostion(event){
    this.scene.newId = event.id;
    this.changeSceneOrder.emit(this.scene);
  }

  save(){
    let formData = this.rightPanelForm.getRawValue();
    this.scene.title = formData.title ? formData.title : this.scene.title ? this.scene.title : '';
    debugger
    this.scene.wordsGoal = formData.wordsGoal ? parseInt(formData.wordsGoal) : this.scene.wordsGoal ? this.scene.wordsGoal : 0;
    this.scene.settings = formData.settings ? formData.settings : this.scene.settings ? this.scene.settings : '';
    this.scene.mood = formData.mood ? formData.mood : this.scene.mood ? this.scene.mood : '';
    this.scene.objective = formData.objective ? formData.objective : this.scene.objective ? this.scene.objective : '';


    this.addNewScene.emit(this.scene);
    this.close.emit(false);
    this.rightPanelForm.reset();
    $('.form-group').removeClass('active')
  }

  switchMode(mode){
    if(this.scene)
      this.scene.type = mode;
    else if(this.chapter)
      this.chapter.type = mode;
    else if(this.character)
      this.character = mode;
  }



  saveChapter(){
    let formData = this.rightPanelCreateChapter.getRawValue();
    this.chapter.title = formData.chaptertitle;


    this.chapter.description = formData.description;

    this.addNewChapter.emit(this.chapter)
    this.close.emit(false);
    this.rightPanelCreateChapter.reset();
    $('.form-group').removeClass('active')
  }

  saveCharapter(){

    let formData = this.rightPanelCreateCharacter.getRawValue();


    var imgSrc = $('.characterForm .image');
    var image = imgSrc.css("background-image")


    this.character.name = formData.characterName;
    this.character.storyline=formData.storyline;
    this.character.goal = formData.goal;
    this.character.conflict = formData.conflict;
    this.character.epiphany = formData.epiphany;
    this.character.img = image;

    this.character.role = formData.role;
    this.addNewCharacter.emit(this.character);

    this.character.age = formData.age;
    this.character.gender = formData.gender;
    this.character.location = formData.location;
    this.character.employment = formData.employment;
    this.character.custom = formData.custom;

    this.rightPanelCreateCharacter.reset();
    $('.form-group').removeClass('active')

    $('.characterForm .clear').click();
    $(imgSrc).css("background-image","")
  }

  saveAudence(){

      let formData = this.rightPanelCreateAudence.getRawValue();

      this.audence.name = formData.audenceName;
      this.audence.storyline=formData.storyline;
      this.audence.goal = formData.goal;
      this.audence.conflict = formData.conflict;
      this.audence.epiphany = formData.epiphany;

      this.audence.role = formData.role;
      this.addNewAudence.emit(this.audence);
  }
}
