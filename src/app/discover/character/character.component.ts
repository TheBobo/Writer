import { Character } from './../../models/Character';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  inputs: ['character']
})
export class CharacterComponent implements OnInit {

  
  Characters: Character[];


  constructor() { }

  ngOnInit() {
  }

}
