
import { Scene } from './models/Scene';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  rightTab: boolean;
  ACTS: Act[];


  constructor(private shareService: ActsService) { }

  emitScene(event){
    this.newScene = event;
    console.log("scene is in app component", this.newScene)
  }

  emitRight(event){
    this.rightTab = event;
  }

  addNewScene(event){
    this.shareService.addScene(event);
  }

  ngOnInit() {
    this.ACTS = this.shareService.getAllActs();

  }

}
