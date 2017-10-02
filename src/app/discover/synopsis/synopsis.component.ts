import { Story } from 'app/models/Story';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

declare var $:any;
declare var jQuery: any;

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
  inputs:['story'],
  outputs:['storyInfo']
})
export class SynopsisComponent implements OnInit {

  @Input() story;
  storyInfo = new EventEmitter<Story>();

  private synopsisForm: FormGroup;

  synopsis={
     one:'',
     two:'',
     three:'',
     four:'',
  }

  constructor(private fb: FormBuilder) {
    this.synopsisForm =  fb.group({
      synopsisOne: '',
      synopsisTwo: '',
      synopsisThree: '',
      synopsisFour:''
    })
   }

   focusElem(elem){
    $(elem.target).parent().addClass("active")
  }

  blur(elem){
    if($(elem.target).val().length == 0)
        $(elem.target).parent().removeClass("active")

    if($(elem.target).hasClass('synopsisOne')){
        this.story.synopsis = $(elem.target).val();
    }
    
    if($(elem.target).hasClass('synopsisTwo')){
        this.story.paragraphSynopsis = $(elem.target).val();
    }

    if($(elem.target).hasClass('synopsisThree')){
        this.story.fourParagraphSynopsis = $(elem.target).val();
    }

    if($(elem.target).hasClass('synopsisFour')){
        this.story.fourPageSynopsis = $(elem.target).val();
    }
    this.storyInfo.emit(this.story)
  }


  ngOnInit() {
  }

}
