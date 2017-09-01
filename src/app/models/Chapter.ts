import { Act } from './Act'
import {Character} from './Character'
import {Scene} from './Scene'

export class Chapter{
  id: number;
  title: string;
  description: string;
  wordCount: number;
  characters: Character[];

  scenes: Scene[];


  constructor(id:number){
    this.id = id;
    this.title = 'Chapter Title';
    this.description = 'Desctiption';
    this.wordCount=0;
    this.characters = new Array<Character>();
    this.scenes = new Array<Scene>();
  }


}
