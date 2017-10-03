import { Act } from './Act'
import {Character} from './Character'
import {Scene} from './Scene'

export class Chapter{
  id: number;
  type: string;
  title: string;
  description: string;
  wordCount: number;
  wordTarget: number;
  characters: Character[];
  actId: number;
  isFocus:boolean;

  scenes: Scene[];


  constructor(type:string, id:number, actId?:number){
    var date = new Date();
    this.id = id;

    this.type=type;
    this.title = '';
    this.description = 'enter you scene text';
    this.wordCount=0;
    this.wordTarget=0;
    this.isFocus = false;
    this.characters = new Array<Character>();
    this.scenes = new Array<Scene>();
    this.scenes.push(new Scene(1,this.id,this.actId,"create"))

    if(actId){
      this.actId=actId;
    }
  }


}
