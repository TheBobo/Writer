
import { Scene } from './models/Scene';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActsService } from './acts.service';
import { Act } from './models/Act';
//import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ActsService]
})
export class AppComponent  implements OnInit  {
  title = 'app works!';
  user = { username: 'bob'};
  isRightPanelOpen = false;
  newScene: Scene;
  deleteScene: Scene;
  rightTab: boolean;
  showModal: boolean;

  ACTS: Act[];
  @ViewChild('rightSlideView') rightSlideView;
  @ViewChild('confirmModalView') confirmModalView;


  constructor(private shareService: ActsService) { }

  emitScene(event){
    this.newScene = event;
  }

  emitModal(event){
    this.showModal = event;
  }

  emitRight(event){
    this.rightTab = event;

    setTimeout(() => {
      if ( this.newScene.type === 'edit') {
        this.rightSlideView.setRightSideTitle('Edit Scene')
      } else if ( this.newScene.type === 'create' ) {
        this.rightSlideView.setRightSideTitle('New Scene')
      } else if ( this.newScene.type === 'view' ) {
        this.rightSlideView.setRightSideTitle('Scene')
      }
    })
  }

  addNewScene(event){
    this.shareService.addScene(event);
  }

  ngOnInit() {
    this.ACTS = this.shareService.getAllActs();
  }

}
