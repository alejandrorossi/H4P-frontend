
export class User {
  public _id: String;
  public name: String;
  public surname: String;
  public username: String;
  public age: Number;
  public email: String;
  public password: String;
  public createdDate: Date;

  constructor(){}

  actualizar(other: User){
    this.name = other.name;
    this.surname = other.surname;
    this.username = other.username;
    this.age = other.age;
    this.email = other.email;
  };
}
