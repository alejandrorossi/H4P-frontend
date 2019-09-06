import { Pet } from './pet.model';
import { User } from './user.model';


export class Publication {
  public pet: Pet;
  public user: User;
  public postulants: any[];
  public createdDate: Date;
}