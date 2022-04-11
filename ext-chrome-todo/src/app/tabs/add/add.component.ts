import { Component, OnInit } from '@angular/core';
import {Note} from "../../structures/note";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public note = new Note();
  public fileName;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  save(){
    this.noteService.addNote(this.note);
  }

  reset(){
    this.note = this.noteService.resetNote(this.note);
  }

  onFileSelected(event) {
    // this.note.document = event.target.files[0];
    // this.fileName = this.note.document.name;
    this.getBase64Img(event);
  }

  private getBase64Img(element) {
    var file = element.target.files[0];
    var reader = new FileReader();
    var self = this;
    reader.onload = function(base64) {
      self.note.document = base64;
      self.fileName = file.name;
    }
    reader.readAsDataURL(file);
  }
  removeFile() {
    this.note.document = "";
    this.fileName = undefined;
  }

}
