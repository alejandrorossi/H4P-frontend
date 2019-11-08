import { Image } from './image.model';
import { User } from './user.model';


export class Pet {
  public _id: String;
  public name: String;
  public surname: String;
  public age: Number;
  public typeAge: String;
  public birth: Date;
  public type: String;
  public description: String;
  public images: Image[];
  public user: User;
  public createdDate: Date;
}