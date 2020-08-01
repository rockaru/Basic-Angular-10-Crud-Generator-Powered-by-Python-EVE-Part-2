import { Injectable } from '@angular/core';
import { ReadComponent } from './read.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

    constructor(
      private dialog: MatDialog,
    ) { }

    open() {
     
      this.dialog.open(ReadComponent)
  
    }
  
}
