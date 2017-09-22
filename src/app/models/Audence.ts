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

    
    age: number;
    gender:string;
    bio: string;
    location:string;
    education:string;
    profession:string;
    income: number;
    preferred_reading_device:string;
    secondary_reading_device: string;
    how_often_do_they_read:string;
    where_do_they_read:string;
    what_story_length_do_they_prefer:string;
    average_words_read_per_day:string;
  

  
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
      
      this.bio = '';
      this.age=0;
      this.gender='';
      this.location='';
      this.education='';
      this.profession='';
      this.income=0;
      this.preferred_reading_device='';
      this.secondary_reading_device='';
      this.how_often_do_they_read='';
      this.where_do_they_read='';
      this.what_story_length_do_they_prefer='';
      this.average_words_read_per_day='';
    }
  
  
  }
  