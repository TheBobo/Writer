import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TrumbowygModule} from 'ng2-lazy-trumbowyg';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { RightSideComponent } from './right-side/right-side.component';
import { LoginComponent } from './login/login.component';
import { ChapterComponent } from './chapter/chapter.component';
import { SceneComponent } from './scene/scene.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoryComponent } from './discover/story/story.component';
import { WriteComponent } from './write/write.component';
import { CreateSceneSidePanelComponent } from './create-scene-side-panel/create-scene-side-panel.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { CharacterComponent } from './discover/character/character.component';
import { CharacterListComponent } from './discover/character-list/character-list.component';
import { AssetsMenuComponent } from './assets-menu/assets-menu.component';
import { ChaptersNavComponent } from './write/chapters-nav/chapters-nav.component';
import { SynopsisComponent } from './discover/synopsis/synopsis.component';
import { AudenceComponent } from './discover/audence/audence.component';
import { StoryMapComponent } from './story-map/story-map.component';
import { ScrollEventModule } from 'ngx-scroll-event';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSideComponent,
    RightSideComponent,
    LoginComponent,
    ChapterComponent,
    SceneComponent,
    DashboardComponent,
    StoryComponent,
    WriteComponent,
    CreateSceneSidePanelComponent,
    ModalConfirmComponent,
    CharacterComponent,
    CharacterListComponent,
    AssetsMenuComponent,
    ChaptersNavComponent,
    SynopsisComponent,
    AudenceComponent,
    StoryMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TrumbowygModule,
    ScrollEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
