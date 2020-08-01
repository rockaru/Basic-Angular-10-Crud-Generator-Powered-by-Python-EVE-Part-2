import { Injectable } from '@angular/core';
import { CreateComponent } from './create.component'
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(
    private dialog: MatDialog,

  ) { }

  open() {
    
    const dialogRef = this.dialog.open(CreateComponent)

  }


}
