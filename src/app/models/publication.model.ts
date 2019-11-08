import { Application } from './application.model';
import { Pet } from './pet.model';

export class Publication {
  public _id: String;
  public pet: Pet;
  public applications: Application[];
  public status: String;
  public createdDate: Date;

  constructor(json: any){
    this._id = json._id;
    this.pet = json.pet;
    this.applications = json.applications;
    this.status = json.status;
    this.createdDate = json.createdDate;
  }

  hasPostulant(userName: String): Boolean {
    return this.applications.some(application => application.user.username == userName);
  };

  isOwner(userName: String): Boolean {
    return this.pet.user.username == userName;
  };
};