import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TrumbowygModule} from 'ng2-lazy-trumbowyg';
import { ActsService } from './../acts.service';
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  inputs:['chapterId'],
  providers: [ActsService]
})
export class WriteComponent implements OnInit {
  
  currentChapterId = 0;
  currentChapter: Chapter

  public initialContentOne: string = ``
  public initialContentTwo: string = ``
  public contentOne: string;
  public contentTwo: string;
  public options1: any = {
  };
  constructor(private shareService: ActsService) { 
    this.currentChapter = new Chapter(-1);
   }

  ngOnChanges(changes: SimpleChanges) {
      if(changes.chapterId){
        this.currentChapter = this.shareService.getChapter(changes.chapterId.currentValue);
      }
    
    }

  ngOnInit() {
  }

}
