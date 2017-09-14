import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Story } from './../models/Story'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  inputs:['stories'],
  outputs:['newStory', 'selectStory']
})
export class DashboardComponent implements OnInit {

  newStory = new EventEmitter<Story>();
  selectStory = new EventEmitter<Story>();

  modalOpen:boolean;
  story: Story;

  openCreateNewStory(){
    debugger
    this.modalOpen=true;
  }

  closeModal(event){
    this.modalOpen=false;
  }

  createNewStory(event){
    debugger
    this.modalOpen=false;
    this.newStory.emit(event);
  }

  selectAStory(story){
    this.selectStory.emit(story);
  }

  constructor() { }

  ngOnInit() {
    this.modalOpen=false;
    this.story = new Story(1);
  }

}
