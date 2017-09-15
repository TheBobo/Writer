import {Story} from './Story'

export class User{
  firstName: string;
  lastName: string;
  encryptedPassword:string;
  email: string;
  username:string;
  stories: Story;

  constructor(){
    this.username='';
    this.email='';
  }
}
