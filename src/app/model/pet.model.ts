import { User } from './user.model';
import { Imagen } from './imagen.model';


export class Pet {
  public name: String;
  public surname: String;
  public age: Number;
  public birth: Date;
  public type: String;
  public characteristics: String;
  public imagen: Imagen[];
  public user: User;
  public createdDate: Date;
}