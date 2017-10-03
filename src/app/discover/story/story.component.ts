import { Story } from 'app/models/Story';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  inputs: ['story'],
  outputs: ['dstory','selectStory']
})
export class StoryComponent implements OnInit {
  dstory = new EventEmitter<Story>();
  selectStory = new EventEmitter<Story>();

  constructor() { }

  ngOnInit() {
  }

  selectAStory(story){
    this.selectStory.emit(story);
  }

  deleteStory(story){
    this.dstory.emit(story);
  }

}
