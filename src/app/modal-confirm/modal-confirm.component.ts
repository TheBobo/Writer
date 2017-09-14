import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';
import { Character } from './../models/Character';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  outputs:['deleteSelectedScene','deleteSelectedChapter' ,'deleteSelectedCharacter']
})
export class ModalConfirmComponent implements OnInit {

  deleteSelectedScene = new EventEmitter<Scene>()
  deleteSelectedChapter=new EventEmitter<Chapter>()
  deleteSelectedCharacter=new EventEmitter<Character>()

  @Input() deleteScene;
  @Input() deleteChapter;
  @Input() deleteCharacter;

  constructor() { }

  cancel(){
    this.deleteScene={};
    this.deleteChapter={};
    this.deleteCharacter={};
  }

  deleteSceneFN(){
    this.deleteSelectedScene.emit(this.deleteScene);
    this.deleteScene = {};
  }

  deleteChapterFN(){
    this.deleteSelectedChapter.emit(this.deleteChapter);
    this.deleteChapter = {};
  }

  deleteCharacterFN(){
    this.deleteSelectedCharacter.emit(this.deleteCharacter);
    this.deleteCharacter= {};
  }

  ngOnInit() {
  }

}
