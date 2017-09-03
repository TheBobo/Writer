import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TrumbowygModule} from 'ng2-lazy-trumbowyg';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { MainComponent } from './main/main.component';
import { RightSideComponent } from './right-side/right-side.component';
import { LoginComponent } from './login/login.component';
import { ChapterComponent } from './chapter/chapter.component';
import { SceneComponent } from './scene/scene.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoryComponent } from './story/story.component';
import { WriteComponent } from './write/write.component';
import { CreateSceneSidePanelComponent } from './create-scene-side-panel/create-scene-side-panel.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSideComponent,
    MainComponent,
    RightSideComponent,
    LoginComponent,
    ChapterComponent,
    SceneComponent,
    DashboardComponent,
    StoryComponent,
    WriteComponent,
    CreateSceneSidePanelComponent,
    ModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TrumbowygModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
