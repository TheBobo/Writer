export class Character{
  id: number;
  name: string;
  img: string;
  storyline: string;
  goal: string;
  conflict: string;
  role:string;
  epiphany:string;
  type: string;

    age: number;
    gender: string;
    location:string;
    employment:string;
    custom: string;

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
    
    this.age = 0;
    this.gender='';
    this.location='';
    this.employment='';
    this.custom='';
  }


}
