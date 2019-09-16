import { User } from './user.model';
import { Pet } from './pet.model';

export class Publication {
  public _id: String;
  public pet: Pet;
  public postulants: User[];
  public createdDate: Date;
}