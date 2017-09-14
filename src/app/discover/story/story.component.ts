import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  inputs: ['story']
})
export class StoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
