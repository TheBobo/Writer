import { Scene } from './../models/Scene';
import { Component, Input, OnInit, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ActsService } from './../acts.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  inputs: [ 'scene', 'rightOpen'],
  outputs: ['close', 'addNewScene'],
  providers: [ActsService]
})
export class RightSideComponent implements OnInit {
  @Input() scene;
  @Input() rightOpen;

  close = new EventEmitter<boolean>()
  addNewScene = new EventEmitter<Scene>()
  newModelScene = new Scene(0,0,0, '');
  private rightPanelForm: FormGroup;
  private panelTitle: string = 'New Scene'

  constructor(private shareService: ActsService, private fb: FormBuilder) {
    this.rightPanelForm = fb.group({
      title: [this.scene ? this.scene.title : ''],
      description: [this.scene ? this.scene.description : ''],
      wordGoal: [this.scene ? this.scene.wordGoal : ''],
      chapterId: [this.scene ? this.scene.chapterId : ''],
      id: [this.scene ? this.scene.id : '']
    });
  }

  ngOnInit() {
    this.shareService.RightSlide = this;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.scene ) {
      this.shareService.labelPosition();

      if ( this.scene.type === 'create') {
        this.clearForm();
      }

    }
  }

  private clearForm() {
    this.rightPanelForm.reset();
  }

  cancel(){
    this.close.emit(false);
  }

  public setRightSideTitle(title) {
    this.panelTitle = title;
  }   

  save(){
    let formData = this.rightPanelForm.getRawValue();
    this.scene.title = formData.title;
    this.scene.description = formData.description;
    this.scene.wordsGoal = formData.wordGoal ? parseInt(formData.wordGoal) : 0;

    this.addNewScene.emit(this.scene);
    this.close.emit(false);
  }
}
