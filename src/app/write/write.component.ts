import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TrumbowygModule} from 'ng2-lazy-trumbowyg';
import { ActsService } from './../acts.service';
import { Scene } from './../models/Scene';
import { Chapter } from './../models/Chapter';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  inputs:['chapter'],
  providers: [ActsService]
})
export class WriteComponent implements OnInit {

  ACTS;
  currentChapterId = 0;
  currentChapter: Chapter

  public initialContentOne: string = ``
  public initialContentTwo: string = ``
  public contentOne: string;
  public contentTwo: string;
  public options1: any = {
  };
  constructor(private shareService: ActsService) {
   }

  ngOnChanges(changes: SimpleChanges) {
      if(changes.chapter){

        this.currentChapter = changes.chapter.currentValue;
      //  var test =  this.shareService.getAllActs();
       debugger
      }

  }

  getChapter(chapterId: number):Chapter{
    console.log(this.ACTS)

    for(var i=0; i< this.ACTS.length; i++){
      if(this.ACTS[i].chapters){
        for(var j=0; j<this.ACTS[i].chapters.length; j++){
          if(this.ACTS[i].chapters[j].chapterId == chapterId){
            debugger
            return this.ACTS[i].chapters[j];
          }
        }
      }
    }
    return new Chapter(-1);
  }

  ngOnInit() {
    this.ACTS = this.shareService.getAllActs();
    this.currentChapter = new Chapter(1);
  }

}
