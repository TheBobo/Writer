import { Scene } from './../models/Scene';
import { Component, Input, OnInit, Output,OnChanges, EventEmitter } from '@angular/core';
import { ActsService } from './../acts.service';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  inputs: [ 'scene', 'rightOpen'],
  outputs: ['close', 'addNewScene'],
  providers: [ActsService]
})
export class RightSideComponent implements OnInit {

  constructor(private shareService: ActsService) { }

  public scene: Scene;
  close = new EventEmitter<boolean>()
  addNewScene = new EventEmitter<Scene>()
  newModelScene = new Scene(0,0,0);
  


  ngOnInit() {
  }

  cancel(){
    this.close.emit(false);
  }

   

  save(){
    console.log(this.newModelScene);
    debugger
    
    this.addNewScene.emit(this.scene);
    this.close.emit(false);

  }

}
