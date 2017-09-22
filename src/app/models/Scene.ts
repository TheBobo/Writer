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
    this.title = 'mock up title';
    this.synopsis='';
    this.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    this.characters = new Array<Character>();
    this.wordCount = this.description.split(' ').length;
    this.wordsGoal = 0;
    this.selectLabel='';
    this.lblClass='';
  }

}
