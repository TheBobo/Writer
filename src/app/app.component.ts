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
  activeComponent: string;
  selectChapter:Chapter;

  deleteScene: Scene;

  rightTab: boolean;
  showModal: boolean;
  menubarItem:string;
  showLeftPanel: boolean;


  ACTS: Act[];
  appCharacters: Character[];
  @ViewChild('rightSlideView') rightSlideView;
  @ViewChild('confirmModalView') confirmModalView;

  clearState(){
    this.newChapter = undefined;
    this.newScene = undefined;
    this.newCharacter = undefined;
  }


  constructor(private shareService: ActsService) { }

  createNewCharacter(){
    this.clearState();
    this.newCharacter = new Character(1);
    this.newCharacter.type="create"
    this.rightTab = true;
    debugger
  }

  createScene(event){
    this.rightTab = true;
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
    this.newChapter = event;
    this.rightTab =true;
    this.newScene = undefined;
    }

  emitModal(event){
    this.showModal = event;
  }

  emitRight(event){
    debugger
    this.rightTab = event;

    setTimeout(() => {
      if(this.newScene){
        if ( this.newScene.type === 'edit') {
          debugger
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
    })
  }

  selectedChapter(chapter){
    this.selectChapter = chapter;
  }

  addNewScene(event){
    this.shareService.addScene(event);
    this.ACTS = this.shareService.getAllActs();
    debugger;
  }


  addNewChapter(event){
    this.shareService.addChapter(event);
  }

  addNewCharacter(event){
    this.appCharacters.push(event);
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

    var firstCharacter = new Character(1);
    firstCharacter.name = 'lusso 1';
    firstCharacter.storyline ='I am first mockup created character.';
    firstCharacter.goal ="run fast";
    firstCharacter.conflict='no conflicts';
    firstCharacter.epiphany = 'n/a';
    firstCharacter.role ='main';
    firstCharacter.img = 'scr/avatar.png'
    

    this.appCharacters = new Array<Character>();
    this.appCharacters.push(firstCharacter);
  }

}
