import { Chapter } from './Chapter'
import { Character } from './Character'

export class Scene{
  id: number;
  title: string;
  description: string;
  wordCount: number;
  wordsGoal: number;
  characters: Character[];
  chapterId: number;
  actId: number;
  type: string;

  constructor (id:number, chapterId:number, actId:number, type: string){
    this.id = id;
    this.chapterId = chapterId;
    this.actId = actId;
    this.type = type;

    this.title = '';
    this.description = '';
    this.characters = new Array<Character>();
    this.wordCount = 0;
    this.wordsGoal = 0;
  }

}
 