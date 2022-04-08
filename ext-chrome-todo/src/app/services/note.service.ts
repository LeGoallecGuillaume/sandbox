import {Injectable} from '@angular/core';
import {Note} from '../structures/note';
import {not} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public _notes: Map<String, Note>;

  constructor() {
    this._notes = new Map<String, Note>();
    // getLocaStorageNotes
    for(let i = 0; i < localStorage.length; i++){
      const key = localStorage.key(i);
      const note = JSON.parse(localStorage.getItem(key)) as Note;
      this.updateFromStorage(note);
    }
  }

  public updateFromStorage(note: Note){
    const newNote = new Note();
    newNote.setNote(note);
    const existNote = this._notes.get(newNote.titre);
    if(!existNote){
      this._notes.set(newNote.titre, newNote);
    }
  }

  public addNote(note: Note):void {
    const existNote = this._notes.get(note.titre);
    if(existNote){
      existNote.createDate = note.createDate; // date de modification
      existNote.status = "waiting";
      existNote.body = note.body;
      existNote.document = note.document;
      this._notes.set(existNote.titre, existNote);
      localStorage.setItem(existNote.titre.toString(), JSON.stringify(existNote))

    } else{
      if(!note.createDate){
        note.createDate = new Date();
      }
      note.status = "waiting";
      if (note.document) {

        const fileName = note.document.name;

        const formData = new FormData();

        formData.append("thumbnail", note.document);

        // const upload$ = this.http.post("...", formData);

        // upload$.subscribe();
      }
      this._notes.set(note.titre, note);
      localStorage.setItem(note.titre.toString(), JSON.stringify(note))

    }
  }

  public resetNote(note: Note): Note{
    const existNote = this._notes.get(note.titre);
    if(existNote) {
      this._notes.delete(note.titre);
      localStorage.removeItem(note.titre.toString());
    }
    note.titre = "";
    note.status = ""
    note.body = ""
    note.document = ""

    return note;
  }

  public getNote(titre: String):Note{
    return  this._notes.get(titre);
  }

  public setStatus(note: Note, status: string){
    const existNote = this._notes.get(note.titre);
    if(existNote) {
      existNote.status= status;
      this._notes.set(existNote.titre, existNote);
      localStorage.setItem(existNote.titre.toString(), JSON.stringify(existNote))
    }
  }

}
