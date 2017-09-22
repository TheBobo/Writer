import { Character } from './../../models/Character';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  inputs: ['character'],
  outputs: ['emitDeleteCharacter','emitEditCharacter']
})
export class CharacterComponent implements OnInit {

  Characters: Character[];
  emitDeleteCharacter = new EventEmitter<number>()
  emitEditCharacter = new EventEmitter<number>()

  deleteCharacter(characterId){
    this.emitDeleteCharacter.emit(characterId);
  }

  editCharacter(characterId){
    this.emitEditCharacter.emit(characterId);
  }


  constructor() { }

  ngOnInit() {
  }

}
