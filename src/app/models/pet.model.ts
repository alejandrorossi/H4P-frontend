import { Image } from './image.model';
import { User } from './user.model';


export class Pet {
  public _id: string;
  public name: string;
  public surname: string;
  public age: Number;
  public typeAge: string;
  public birth: Date;
  public type: string;
  public description: string;
  public images: Image[];
  public user: User;
  public createdDate: Date;
}