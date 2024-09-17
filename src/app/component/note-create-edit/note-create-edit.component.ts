import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteCreateEditMode} from "./note-create-edit.mode";
import {Note} from "../../model/note";
import axios from "axios";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-note-create-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, RouterLink, MatButton, MatCardModule],
  templateUrl: './note-create-edit.component.html',
  styleUrl: './note-create-edit.component.css'
})
export class NoteCreateEditComponent implements OnInit {
  noteId: String | undefined;
  mode: NoteCreateEditMode = NoteCreateEditMode.CREATE;
  content: String = ''
  private activatedRoute = inject(ActivatedRoute);


  constructor(private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.noteId = this.activatedRoute.snapshot.params['id'];
    if (this.noteId) {
      this.mode = NoteCreateEditMode.EDIT;
      const noteResponse = await axios.get<Note>(`http://localhost:8080/api/note/${this.noteId}`);
      this.content = noteResponse.data.content;
    }
  }

  getFormName() {
    switch (this.mode) {
      case NoteCreateEditMode.CREATE:
        return "New Note"
      case NoteCreateEditMode.EDIT:
        return "Edit Note"
    }
  }

  async delete() {
    //delete
    await axios.delete(`http://localhost:8080/api/note/${this.noteId}`,);

    //go Back
    await this.router.navigate(['/'])
  }

  async save() {
    //save or update
    if (this.mode === NoteCreateEditMode.CREATE) {
      await axios.post('http://localhost:8080/api/note', {content: this.content});
    } else {
      await axios.patch(`http://localhost:8080/api/note/${this.noteId}`, {content: this.content})
    }

    //goBack
    await this.router.navigate(['/'])
  }
}
