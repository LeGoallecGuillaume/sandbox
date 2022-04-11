import {Injectable} from '@angular/core';
import {Note} from '../structures/note';
import {not} from "rxjs/internal-compatibility";
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public _notes: Map<String, Note>;
  constructor(private _snackBar: MatSnackBar) {
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
      localStorage.setItem(existNote.titre.toString(), JSON.stringify(existNote));

      this._snackBar.open('Note modifiée !', 'Fermer', {
        duration: 3000
      });

    } else{
      if(!note.createDate){
        note.createDate = new Date();
      }

      note.status = "waiting";
      this._notes.set(note.titre, note);
      localStorage.setItem(note.titre.toString(), JSON.stringify(note));

      this._snackBar.open('Note crée !', 'Fermer', {
        duration: 3000
      });
    }

  }
  private getPhoto() : File {
    var base64 = localStorage["file"];
    var base64Parts = base64.split(",");
    var fileFormat = base64Parts[0].split(";")[1];
    var fileContent = base64Parts[1];
    var file = new File([fileContent], "file name here", {type: fileFormat});
    return file;
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
