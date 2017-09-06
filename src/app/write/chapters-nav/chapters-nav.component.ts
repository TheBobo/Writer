import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chapters-nav',
  templateUrl: './chapters-nav.component.html',
  styleUrls: ['./chapters-nav.component.scss'],
  inputs:['menuItems'],
  outputs:['selectedChapter']
})
export class ChaptersNavComponent implements OnInit {

  constructor() { }
  
  selectedChapter =  new EventEmitter<Number>();

  
  selectChapter(chapterId: number){
    debugger
    this.selectedChapter.emit(chapterId);
  }

  ngOnInit() {
  }

}
