import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

declare var $:any;
declare var jQuery: any;

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

  private synopsisForm: FormGroup;

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
  }


  ngOnInit() {
  }

}
