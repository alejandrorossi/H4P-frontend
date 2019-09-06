import { User } from './user.model';

export class Session {
  public status: String;
  public code: Number;
  public value: User;
  public error: any;
  public token: any;
}