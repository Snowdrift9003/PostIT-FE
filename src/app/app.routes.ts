import {Routes} from '@angular/router';
import {NoteListComponent} from "./component/note-list/note-list.component";
import {NoteCreateEditComponent} from "./component/note-create-edit/note-create-edit.component";

export const routes: Routes = [
  {path: '', component: NoteListComponent}, {path: 'edit', component: NoteCreateEditComponent}, {
    path: 'edit/:id',
    component: NoteCreateEditComponent
  },
];
