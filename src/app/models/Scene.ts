import { Chapter } from './Chapter'
import { Character } from './Character'

export class Scene{
  id: number;
  newId: number;
  title: string;
  synopsis: string;
  description: string;
  wordCount: number;
  wordsGoal: number;
  characters: Character[];
  chapterId: number;
  newChapterId: number;
  actId: number;
  type: string;
  last: boolean = false;
  isDelete:boolean;
  isFocus: boolean;
  settings:string;
  mood:string;
  objective: string;
  label:string;
  selectLabel: string;

  lblClass:string;

  constructor (id:number, chapterId:number, actId:number, type: string, last?: boolean){
    this.id = id;
    this.chapterId = chapterId;
    this.actId = actId;
    this.type = type;
    this.last = last;
    this.isFocus=false;
    this.label = 'primary'
    this.title = '';
    this.synopsis='';
    this.description = "";
    this.characters = new Array<Character>();
    this.wordCount = this.description.split(' ').length;
    this.wordsGoal = 0;
    this.selectLabel='';
    this.lblClass='';
    this.settings = '';
    this.mood='';
  }

}
