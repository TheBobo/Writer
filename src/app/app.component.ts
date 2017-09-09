import { Scene } from './models/Scene';
import { Chapter } from './models/Chapter';
import { Component, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActsService } from './acts.service';
import { Act } from './models/Act';
//import * as $ from 'jquery';

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
  activeComponent: string;
  selectChapter:Chapter;

  deleteScene: Scene;

  rightTab: boolean;
  showModal: boolean;
  menubarItem:string;
  showLeftPanel: boolean;


  ACTS: Act[];
  @ViewChild('rightSlideView') rightSlideView;
  @ViewChild('confirmModalView') confirmModalView;


  constructor(private shareService: ActsService) { }

  createScene(event){
    this.rightTab = true;
    this.newScene = event;
    this.newChapter = undefined
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
    this.newChapter = new Chapter('create',(event.id+1));
    this.newChapter.actId = event.actId;
    this.newChapter.type = 'create';
    this.rightTab =true;
    this.newScene = undefined;
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
          this.rightSlideView.setRightSideTitle('Chapter')
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

  debugger;
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
  }

}
