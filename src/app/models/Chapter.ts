import { Act } from './Act'
import {Character} from './Character'
import {Scene} from './Scene'

export class Chapter{
  id: number;
  type: string;
  title: string;
  description: string;
  wordCount: number;
  characters: Character[];
  actId: number;
  
  scenes: Scene[];


  constructor(id:number){
    this.id = id;
    this.type='create';
    this.title = 'Chapter Title';
    this.description = '';
    this.wordCount=0;
    this.characters = new Array<Character>();
    this.scenes = new Array<Scene>();
  }


}
