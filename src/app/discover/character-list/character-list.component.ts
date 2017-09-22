import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  inputs:['characters'],
  outputs:['newCharacter', 'emitEditCharacter', 'emitDeleteCharacter']
})
export class CharacterListComponent implements OnInit {


  newCharacter = new EventEmitter();
  emitEditCharacter = new EventEmitter<number>()
  emitDeleteCharacter = new EventEmitter<number>()

  constructor() { }


  addCharacter(){
    this.newCharacter.emit();
  }

  deleteCharacter(event){
    this.emitDeleteCharacter.emit(event)
  }

  editCharacter(event){
    this.emitEditCharacter.emit(event);
  }

  ngOnInit() {
  }

}
