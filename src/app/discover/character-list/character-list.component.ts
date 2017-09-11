import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  inputs:['characters'],
  outputs:['newCharacter']
})
export class CharacterListComponent implements OnInit {

  
  newCharacter = new EventEmitter();
  
  constructor() { }

  
  addCharacter(){
    this.newCharacter.emit();
  }

  ngOnInit() {
  }

}
