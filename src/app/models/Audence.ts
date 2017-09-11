export class Audence{
    id: number;
    name: string;
    img: string;
    storyline: string;
    goal: string;
    conflict: string;
    role:string;
    epiphany:string;
  
    type: string;
  
    constructor(id:number){
      this.id = id;
      this.name = '';
      this.img = '';
      this.storyline='';
      this.goal='';
      this.conflict='';
      this.role='';
      this.epiphany='';
  
      this.type='';
    }
  
  
  }
  