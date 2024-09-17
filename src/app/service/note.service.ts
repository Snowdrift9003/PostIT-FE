import {Injectable} from '@angular/core';
import {Note} from "../model/note";
import axios from "axios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() {
  }

  async getAllNotes(): Promise<Note[]> {
    const notesResponse = await axios.get<Note[]>(`${environment.apiUrl}/note`);
    return notesResponse.data;
  }

  async getNoteById(id: string) {
    const noteResponse = await axios.get<Note>(`${environment.apiUrl}/note/${id}`);
    return noteResponse.data;
  }

  async deleteNote(id: string) {
    await axios.delete(`${environment.apiUrl}/note/${id}`);
  }

  async createNote(content: string) {
    await axios.post(`${environment.apiUrl}/note`, {content: content});
  }

  async updateNote(id: string, content: string) {
    await axios.patch(`${environment.apiUrl}/note/${id}`, {content: content})
  }
}
