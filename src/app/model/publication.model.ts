import { Pet } from './pet.model';
import { User } from './user.model';


export class Publication {
  public _id: String;
  public pet: Pet;
  public user: User;
  public postulants: any[];
  public createdDate: Date;
}