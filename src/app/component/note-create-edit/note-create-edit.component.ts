import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteCreateEditMode} from "./note-create-edit.mode";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NoteService} from "../../service/note.service";

@Component({
  selector: 'app-note-create-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, RouterLink, MatButton, MatCardModule],
  templateUrl: './note-create-edit.component.html',
  styleUrl: './note-create-edit.component.css'
})
export class NoteCreateEditComponent implements OnInit {
  noteId: string = '';
  mode: NoteCreateEditMode = NoteCreateEditMode.CREATE;
  content: string = '';
  private activatedRoute = inject(ActivatedRoute);


  constructor(private router: Router, private noteService: NoteService) {
  }

  async ngOnInit(): Promise<void> {
    this.noteId = this.activatedRoute.snapshot.params['id'];
    if (this.noteId) {
      this.mode = NoteCreateEditMode.EDIT;
      this.content = (await this.noteService.getNoteById(this.noteId)).content;
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
    await this.noteService.deleteNote(this.noteId)

    //go Back
    await this.router.navigate(['/'])
  }

  async save() {
    //save or update
    if (this.mode === NoteCreateEditMode.CREATE) {
      await this.noteService.createNote(this.content);
    } else {
      await this.noteService.updateNote(this.noteId, this.content);
    }

    //goBack
    await this.router.navigate(['/'])
  }
}
