export class Note {

  private _titre: String;
  private _body: String;
  private _createDate: Date;
  private _document: any;
  private _status: String;

  constructor(titre = "", body = "", createDate = new Date(), doc = "", status = "") {
    this._titre = titre;
    this._body = body;
    this._createDate = createDate;
    this._document = doc;
    this._status = status;
  }

  public setNote(note : Note){
    this._titre = note._titre;
    this._body = note._body;
    this._createDate = note._createDate;
    this._document = note._document;
    this._status = note._status;

  }
  set titre(value: String) {
    this._titre = value;
  }

  set body(value: String) {
    this._body = value;
  }

  set createDate(value: Date) {
    this._createDate = value;
  }

  set document(value: any) {
    this._document = value;
  }

  set status(value: String) {
    this._status = value;
  }

  get titre(): String {
    return this._titre;
  }

  get body(): String {
    return this._body;
  }

  get createDate(): Date {
    return this._createDate;
  }

  get document(): any {
    return this._document;
  }

  get status(): String {
    return this._status;
  }


  toString(): string{
    let str = '{';
    if(this._titre){
      str += `"titre" : "${this._titre}",`;
    }
    if(this._status){
      str += `"status" : "${this._status}",`;
    }
    if(this._createDate){
      str += `"createDate" : "${this._createDate.toISOString()}",`;
    }
    if(this._body){
      str += `"body" : "${this._body}"`;
    }
    str += '}';

    return str;
  }

}
