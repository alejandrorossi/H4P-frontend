import { User } from './user.model';

export class Image {
  public _id: String;
  public title: String;
  public creator: User;
  public extension: String;
  public path: String;
  public data: any;
  public createdDate: Date;
}

export class ImgResponse  {
  public dataURL: String;
  public format: String;
  public image: Image;
}