import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapters-nav',
  templateUrl: './chapters-nav.component.html',
  styleUrls: ['./chapters-nav.component.scss'],
  inputs:['menuItems']
})
export class ChaptersNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
