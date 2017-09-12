import { Audence } from './models/Audence';
import { Scene } from './models/Scene';
import { Chapter } from './models/Chapter';
import { Component, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActsService } from './acts.service';
import { Act } from './models/Act';
import { Character } from "app/models/Character";

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
  newScene: Scene;
  newChapter: Chapter;
  newCharacter: Character;
  newAudence: Character;
  activeComponent: string;
  selectChapter:Chapter;

  deleteScene: Scene;

  rightTab: boolean;
  showModal: boolean;
  menubarItem:string;
  showLeftPanel: boolean;


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

  
  createNewAudence(){
    this.clearState();
    this.newAudence = new Audence(1);
    this.newAudence.type="create";
    
    this.emitRight(true);
  }

  createNewCharacter(){
    this.clearState();
    this.newCharacter = new Character(1);
    this.newCharacter.type="create";
    
    this.emitRight(true);
  }

  createScene(event){
    this.emitRight(true);
    this.clearState();
    this.newScene = event;
  }

  activeMenuItem(event) {
    this.activeComponent = event;
  }

  gotoMenu(option){
    this.menubarItem = option;
    if (option == 'discover')
      this.openMenu();
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
    this.appCharacters.push(event);
    this.rightTab=false;
  }

  addNewAudence(event){
    this.appAudences.push(event);
    this.rightTab=false;
  }

  deleteSelectedScene(event){
    this.shareService.deleteScene(event);
    alert(event)
  }

  openMenu(){
    this.showLeftPanel = !this.showLeftPanel;
    let body = document.getElementsByTagName('body')[0];
    if(this.showLeftPanel)
      body.classList.add("show-left-panel");   //add the class
    else
      body.classList.remove("show-left-panel");   //remove the class
  }


  ngOnInit() {
    this.shareService.initAllActs();
    this.ACTS = this.shareService.getAllActs();
    this.selectChapter = this.ACTS[0].chapters[0];
    this.menubarItem='menubarItem'

    this.appCharacters = new Array<Character>();
    this.appAudences = new Array<Audence>();
  }

}
