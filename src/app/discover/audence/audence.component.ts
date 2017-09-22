import { Audence } from './../../models/Audence';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-audence',
  templateUrl: './audence.component.html',
  styleUrls: ['./audence.component.scss'],
  inputs: ['audence']
})
export class AudenceComponent implements OnInit {


  Audences: Audence[];

  constructor() { }

  ngOnInit() {
  }

}

