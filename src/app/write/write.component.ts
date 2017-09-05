import { Component, OnInit } from '@angular/core';
import { TrumbowygModule} from 'ng2-lazy-trumbowyg';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  public initialContentOne: string = ``
  public initialContentTwo: string = ``
  public contentOne: string;
  public contentTwo: string;
  public options1: any = {
  };
  constructor() { }

  ngOnInit() {
  }

}
