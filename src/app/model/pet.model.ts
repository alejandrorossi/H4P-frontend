import { Image } from './image.model';
import { User } from './user.model';


export class Pet {
  public _id: String;
  public name: String;
  public surname: String;
  public age: Number;
  public birth: Date;
  public type: String;
  public characteristics: String;
  public images: Image[];
  public user: User;
  public createdDate: Date;
}