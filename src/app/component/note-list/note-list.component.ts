import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {Note} from "../../model/note";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  async ngOnInit(): Promise<void> {
    const notesResponse = await axios.get<Note[]>('http://localhost:8080/api/note');
    this.notes = notesResponse.data
  }

}
