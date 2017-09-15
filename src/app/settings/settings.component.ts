import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../models/User'


declare var $:any;
declare var jQuery: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  inputs:['isOpen', 'user'],
  outputs: ['close', 'userSave']
})
export class SettingsComponent implements OnInit {
 isOpen:boolean
 public user;
 close = new EventEmitter();
 userSave = new EventEmitter<User>();
 private userForm: FormGroup;

 constructor(private fb: FormBuilder) {
   debugger
  this.userForm =  fb.group({
    username: [this.user ? this.user.username : ''],
    email: [this.user ? this.user.email : ''],
  })
 }

  closeMe(){
    this.close.emit()
  }

  saveUser(){

    let formData = this.userForm.getRawValue();

    this.user.username = formData.username;
    this.user.email=formData.email;

    this.userSave.emit(this.user);
    this.close.emit()
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
