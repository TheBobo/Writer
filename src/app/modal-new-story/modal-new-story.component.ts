import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Story } from './../models/Story';

declare var $:any;
declare var jQuery: any;

@Component({
  selector: 'app-modal-new-story',
  templateUrl: './modal-new-story.component.html',
  styleUrls: ['./modal-new-story.component.scss'],
  inputs:['modalOpen', 'story'],
  outputs:['newStory','closeModal']
})
export class ModalNewStoryComponent implements OnInit {


  private createAStoryForm: FormGroup;
  public  story : Story;

  newStory = new EventEmitter<Story>();
  closeModal = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.createAStoryForm =  fb.group({
      title: '',
      description: '',
      synopsis: ''
    })
   }

  closeModalFn(){
      this.closeModal.emit(true);
  }

  focusElem(elem){
    $(elem.target).parent().addClass("active")
  }

  blur(elem){
    if($(elem.target).val().length == 0)
        $(elem.target).parent().removeClass("active")
  }

  createAStory(){

    let formData = this.createAStoryForm.getRawValue();

        this.story.title = formData.title;
        this.story.description=formData.description;
        this.story.synopsis = formData.synopsis;

        this.newStory.emit(this.story);
        this.createAStoryForm.reset();
  }

  ngOnInit() {
  }

}
