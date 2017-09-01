import {Chapter} from './Chapter'
export class Act{
  id: number
  chapters?: Array<Chapter>


   constructor(id:number, chapters?:Array<Chapter>){

    this.id = id;
    this.chapters = chapters
  }
}
