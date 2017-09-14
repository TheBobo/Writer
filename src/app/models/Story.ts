import {User} from './User'
import {Chapter} from './Chapter'
import {Character} from './Character'

export class Story{
  id: number;
  title: string;
  description: string;
  synopsis: string;
  wordCount: number;
  targetWord: number;
  date: Date;

  chapters: Array<Chapter>
  characters: Array<Character>


  user: User
  //characters:

  constructor (id:number){
      this.id=id;
      this.title='';
      this.description='';
      this.synopsis = '';
      this.date = new Date();
      this.wordCount = 0;
      this.targetWord=0;
      this.chapters = new Array<Chapter>();
      this.characters = new Array<Character>();
  }
}
