import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Scene } from './../models/Scene';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  outputs:['deleteSelectedScene']
})
export class ModalConfirmComponent implements OnInit {
  
  deleteSelectedScene = new EventEmitter<Scene>()
  @Input() deleteScene;

  constructor() { }

  cancel(){

    console.log(this.deleteScene)
    this.deleteScene={};
  }

  delete(){
    this.deleteSelectedScene.emit(this.deleteScene);
    this.deleteScene = {};
  }

  ngOnInit() {
  }

}
