import { Character } from 'app/models/Character';
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter'
import { Component, Input, OnInit, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ActsService } from './../acts.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import './../../assets/js/lite-select'

declare var $:any;
declare var jQuery: any;
declare var LiteSelectFunctionality: any;


@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  inputs: [ 'scene', 'chapter', 'character', 'rightOpen'],
  outputs: ['close', 'addNewScene', 'addNewChapter', 'addNewCharacter'],
  providers: [ActsService]
})
export class RightSideComponent implements OnInit {
  @Input() scene;
  @Input() chapter;
  @Input() character
  @Input() rightOpen;

  close = new EventEmitter<boolean>()
  addNewScene = new EventEmitter<Scene>()
  addNewChapter = new EventEmitter<Chapter>()
  addNewCharacter = new EventEmitter<Character>()

  newModelScene = new Scene(0,0,0, '');
  private rightPanelForm: FormGroup;
  private rightPanelCreateChapter: FormGroup;
  private rightPanelCreateCharacter: FormGroup;

  private panelTitle: string = 'New Scene';
  

  constructor(private shareService: ActsService, private fb: FormBuilder) {
    // this.liteSelectObj = new LiteSelect()
    debugger

    this.rightPanelForm = fb.group({
      title: [this.scene ? this.scene.title : ''],
      description: [this.scene ? this.scene.synopsis : ''],
      wordGoal: [this.scene ? this.scene.wordGoal : ''],
      chapterId: [this.scene ? this.scene.chapterId : ''],
      id: [this.scene ? this.scene.id : '']
    });

    this.rightPanelCreateChapter = fb.group({
      chaptertitle: [this.chapter ? this.chapter.title : ''],
      description:[this.chapter ? this.chapter.description : ''],
      actId:[this.chapter ? this.chapter.actId : ''],
      id:[this.chapter ? this.chapter.id : '']
    })

    this.rightPanelCreateCharacter = fb.group({
      characterName: [this.character ? this.character.name : ''],
      role:[this.character ? this.character.role : ''],
      storyline:[this.character ? this.character.storyline : ''],
      goal:[this.character ? this.character.goal : ''],
      conflict:[this.character ? this.character.conflict : ''],
      epiphany:[this.character ? this.character.epiphany : ''],
      image:[this.character ? this.character.image : '']
    })
  }

  ngOnInit() {
    this.shareService.RightSlide = this;
    LiteSelectFunctionality.initLiteItems();
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.scene ) {
      this.shareService.labelPosition();

      if ( this.scene && this.scene.type === 'create') {
        this.clearForm();
      }
    }
  }

  private clearForm() {
    this.rightPanelForm.reset();
  }

  cancel(){
    this.close.emit(false);
  }

  public setRightSideTitle(title) {
    this.panelTitle = title;
  }

  save(){
    let formData = this.rightPanelForm.getRawValue();
    this.scene.title = formData.title;
    this.scene.description = formData.description;
    this.scene.wordsGoal = formData.wordGoal ? parseInt(formData.wordGoal) : 0;

    this.addNewScene.emit(this.scene);
    this.close.emit(false);
  }


  saveChapter(){
    let formData = this.rightPanelCreateChapter.getRawValue();
    this.chapter.title = formData.chaptertitle;
  
    this.chapter.description = formData.description;

    this.addNewChapter.emit(this.chapter)
    this.close.emit(false);
  }

  saveCharapter(){
    
    let formData = this.rightPanelCreateCharacter.getRawValue();

    this.character.name = formData.characterName;
    this.character.storyline=formData.storyline;
    this.character.goal = formData.goal;
    this.character.conflict = formData.conflict;
    this.character.epiphany = formData.epiphany;

    this.character.role = formData.role;
    debugger
    this.addNewCharacter.emit(this.character);
  }

}
