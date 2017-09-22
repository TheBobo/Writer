import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-audence-list',
  templateUrl: './audence-list.component.html',
  styleUrls: ['./audence-list.component.scss'],
  inputs:['audences'],
  outputs:['newAudence']
})
export class AudenceListComponent implements OnInit {

  newAudence = new EventEmitter();
  
  constructor() { }

  
  addAudence(){
    this.newAudence.emit();
  }
  
  ngOnInit() {
  }

}
