import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter'
import { Component, Input, OnInit, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ActsService } from './../acts.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  inputs: [ 'scene', 'chapter', 'rightOpen'],
  outputs: ['close', 'addNewScene', 'addNewChapter'],
  providers: [ActsService]
})
export class RightSideComponent implements OnInit {
  @Input() scene;
  @Input() chapter;
  @Input() rightOpen;

  close = new EventEmitter<boolean>()
  addNewScene = new EventEmitter<Scene>()
  addNewChapter = new EventEmitter<Chapter>()
  newModelScene = new Scene(0,0,0, '');
  private rightPanelForm: FormGroup;
  private rightPanelCreateChapter: FormGroup;

  private panelTitle: string = 'New Scene'

  constructor(private shareService: ActsService, private fb: FormBuilder) {
    this.rightPanelForm = fb.group({
      title: [this.scene ? this.scene.title : ''],
      description: [this.scene ? this.scene.synopsis : ''],
      wordGoal: [this.scene ? this.scene.wordGoal : ''],
      chapterId: [this.scene ? this.scene.chapterId : ''],
      id: [this.scene ? this.scene.id : '']
    });

    this.rightPanelCreateChapter = fb.group({
      chaptertitle: [this.chapter ? this.chapter.title : ''],
      description:[this.chapter ? this.chapter.description : ''],
      actId:[this.chapter ? this.chapter.actId : ''],
      id:[this.chapter ? this.chapter.id : '']
    })
  }

  ngOnInit() {
    this.shareService.RightSlide = this;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.scene ) {
      this.shareService.labelPosition();

      if ( this.scene && this.scene.type === 'create') {
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


  saveChapter(){
    let formData = this.rightPanelCreateChapter.getRawValue();
    this.chapter.title = formData.chaptertitle;
    debugger
    this.chapter.description = formData.description;

    this.addNewChapter.emit(this.chapter);
    //this.addNewScene.emit(this.scene);
    this.close.emit(false);
  }
}
