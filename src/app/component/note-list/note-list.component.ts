import {Component, OnInit} from '@angular/core';
import {Note} from "../../model/note";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {NoteService} from "../../service/note.service";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {
  }

  async ngOnInit(): Promise<void> {
    this.notes = await this.noteService.getAllNotes()
  }

}
