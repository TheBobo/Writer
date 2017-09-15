import { element } from 'protractor';
import { Audence } from './models/Audence';
import { Scene } from './models/Scene';
import { Chapter } from './models/Chapter';
import { Component, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActsService } from './acts.service';
import { Act } from './models/Act';
import { Character } from "app/models/Character";
import { Story } from "app/models/Story";

declare var $:any;
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  outputs:['createNewScene'],
  providers: [ActsService]
})
export class AppComponent  implements OnInit  {
  title = 'app works!';
  user = { username: 'bob'};
  isRightPanelOpen = false;
  addCharacterFromInput: false;
  newScene: Scene;
  newChapter: Chapter;
  newCharacter: Character;
  newAudence: Character;
  activeComponent: string;
  selectChapter:Chapter;
  selectedStoryItem:Story;

  deleteScene: Scene;

  rightTab: boolean;
  showModal: boolean;
  menubarItem:string;
  showLeftPanel: boolean;

  Stories: Story[];
  ACTS: Act[];
  appCharacters: Character[];
  appAudences: Audence[];
  @ViewChild('rightSlideView') rightSlideView;
  @ViewChild('confirmModalView') confirmModalView;

  clearState(){
    this.newChapter = undefined;
    this.newScene = undefined;
    this.newCharacter = undefined;
    this.newAudence = undefined;
  }


  constructor(private shareService: ActsService) { }

  selectedStory(event){
    this.selectedStoryItem = event;
    this.menubarItem = 'discover';
    this.activeComponent = 'synopsis';
    this.showLeftPanel = true;
    let body = document.getElementsByTagName('body')[0];
    if(this.showLeftPanel)
      body.classList.add("show-left-panel");   //add the class
  }



  createNewStory(event){
    if(this.Stories==null)
      this.Stories = new Array<Story>();
    this.Stories.push(event);

    this.selectedStory(event)
  }


  toDashboard(){
    this.menubarItem='dashboard'
  }

  toSettings(){
    this.menubarItem='settings'
  }

  createNewAudence(){
    this.clearState();
    this.newAudence = new Audence(1);
    this.newAudence.type="create";

    this.emitRight(true);
  }

  createNewCharacter(){
    this.clearState();
    this.newCharacter = new Character(1);
    this.newCharacter.type="create"
    this.emitRight(true);
  }

  editCharacter(event){

    this.clearState();
    this.newCharacter = this.appCharacters.find(x=>x.id == event)
    this.newCharacter.type ='edit'
    this.emitRight(true)
  }


  deleteCharacter(event){
    this.clearState();
    var index = -1;

    this.appCharacters.forEach((element,i) => {
      if(element.id == event){
        index=i;
        this.newCharacter = element;
      }
    });

    this.newCharacter.type = 'delete';

  }

  createScene(event){
    if(event.type != 'delete')
      this.emitRight(true);
    this.clearState();
    this.newScene = event;
  }

  activeMenuItem(event) {
    this.activeComponent = event;
  }

  gotoMenu(option){
    this.menubarItem = option;

    this.showLeftPanel = true;
    let body = document.getElementsByTagName('body')[0];
    if(this.showLeftPanel)
      body.classList.add("show-left-panel");   //add the class

      //this.openMenu();
  }

  emitGotoMenu(event){
    this.menubarItem = event;
  }

  emitScene(event){
    this.newScene = event;
    this.newChapter = undefined;
  }

  emitNewChapter(event){
    this.clearState();
    this.newChapter = event;
    this.emitRight(true);
  }

  emitModal(event){
    this.showModal = event;
  }

  emitRight(event){
    this.rightTab = event;

    setTimeout(() => {
      if(this.newScene){
        if ( this.newScene.type === 'edit') {
          this.rightSlideView.setRightSideTitle('Edit Scene')
        } else if ( this.newScene.type === 'create' ) {
          this.rightSlideView.setRightSideTitle('New Scene')
        } else if ( this.newScene.type === 'view' ) {
          this.rightSlideView.setRightSideTitle('Scene')
        }
      } else if ( this.newChapter ) {
        if ( this.newChapter.type === 'edit') {
          this.rightSlideView.setRightSideTitle('Edit Chapter')
        } else if ( this.newChapter.type === 'create' ) {
          this.rightSlideView.setRightSideTitle('New Chapter')
        } else if ( this.newChapter.type === 'view' ) {
          this.rightSlideView.setRightSideTitle('View Chapter')
        }
      }
      else if ( this.newCharacter ) {
        if ( this.newCharacter.type === 'edit') {
          this.rightSlideView.setRightSideTitle('Edit Character')
        } else if ( this.newCharacter.type === 'create' ) {
          this.rightSlideView.setRightSideTitle('New Character')
        } else if ( this.newCharacter.type === 'view' ) {
          this.rightSlideView.setRightSideTitle('View Character')
        }
      }
      else if ( this.newAudence ) {
        if ( this.newAudence.type === 'edit') {
          this.rightSlideView.setRightSideTitle('Edit Audence')
        } else if ( this.newAudence.type === 'create' ) {
          this.rightSlideView.setRightSideTitle('New Audence')
        } else if ( this.newAudence.type === 'view' ) {
          this.rightSlideView.setRightSideTitle('View Audence')
        }
      }
    })
  }

  selectedChapter(chapter){
    this.selectChapter = chapter;
  }

  addNewScene(event){
    this.shareService.addScene(event);
    this.ACTS = this.shareService.getAllActs();
  }


  addNewChapter(event){
    this.shareService.addChapter(event);
  }

  addNewCharacter(event){

    if(event.type == 'create'){
      if(event.name==null)
        return;

      this.appCharacters.push(event);
      debugger
      if(this.addCharacterFromInput){
        this.select(event)
      }
    }
    else if(event.type == 'edit'){
      var character = this.appCharacters.find(x=>x.id == event.id);
      character=event;
    }


    this.rightTab=false;
    this.addCharacterFromInput = false;
    $('.form-group').removeClass('active')
    this.newCharacter = new Character(1);
  }

  addNewAudence(event){
    this.appAudences.push(event);
    this.rightTab=false;
  }

  deleteSelectedScene(event){
    this.shareService.deleteScene(event);
  }

  deleteSelectedChapter(event){
    this.shareService.deleteChapter(event);
    this.newChapter=undefined;
  }

  deleteSelectedCharacter(event){
    var index = -1;

        this.appCharacters.forEach((element,i) => {
          if(element.id == event.id){
            index=i;
            this.newCharacter = element;
          }
        });

        this.appCharacters.splice(index,1);
        this.newCharacter = undefined;
  }

  deleteChapter(event){

    this.newChapter = event;
    this.showModal=false;

  }

  openMenu(){
    this.showLeftPanel = !this.showLeftPanel;
    let body = document.getElementsByTagName('body')[0];
    if(this.showLeftPanel)
      body.classList.add("show-left-panel");   //add the class
    else
      body.classList.remove("show-left-panel");   //remove the class
  }

  select(character){

        var text = ($('.scene.focus').find('.trumbowyg-editor').html())

        var index = text.indexOf("@");
        text = text.substr(0, index);

        text = text + "<span readonly class='character-name' (click)='showCharacter("+character+")'>"+character.name+"</span>&#8203;"
        $('.scene.focus').find('.trumbowyg-editor').html(text);

        $("#characters").hide();
      }



  addCharacterFromWriter(event){
    this.addCharacterFromInput = event;
  }


  ngOnInit() {
    this.shareService.initAllActs();
    this.ACTS = this.shareService.getAllActs();
    this.selectChapter = this.ACTS[0].chapters[0];
    this.menubarItem='dashboard'

    this.appCharacters = new Array<Character>();

    this.appAudences = new Array<Audence>();
  }

}
