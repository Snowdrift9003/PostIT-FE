import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
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
  note: Note | undefined;
  content: String = ''
  private activatedRoute = inject(ActivatedRoute);

  async ngOnInit(): Promise<void> {
    this.noteId = this.activatedRoute.snapshot.params['id'];
    if (this.noteId) {
      this.mode = NoteCreateEditMode.EDIT;
      const noteResponse = await axios.get<Note>(`http://localhost:8080/api/note/${this.noteId}`);
      this.note = noteResponse.data;
      this.content = this.note.content
    }
  }
}
