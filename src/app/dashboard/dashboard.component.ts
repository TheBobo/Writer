import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Story } from './../models/Story'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  inputs:['stories'],
  outputs:['newStory', 'selectStory', 'dStory']
})
export class DashboardComponent implements OnInit {

  newStory = new EventEmitter<Story>();
  selectStory = new EventEmitter<Story>();
  dStory = new EventEmitter<Story>()

  modalOpen:boolean;
  story: Story;

  openCreateNewStory(){

    this.modalOpen=true;
  }

  closeModal(event){
    this.modalOpen=false;
  }

  createNewStory(event){

    this.modalOpen=false;
    this.newStory.emit(event);
  }

  selectAStory(story){
    this.selectStory.emit(story);
  }

  deleteStory(story){
    debugger
    this.dStory.emit(story);
  }

  constructor() { }

  ngOnInit() {
    this.modalOpen=false;
    this.story = new Story(1);
  }

}
