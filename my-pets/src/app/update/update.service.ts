import { Injectable } from '@angular/core';
import { UpdateComponent } from './update.component'
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

    constructor(
      private dialog: MatDialog,

    ) { }

    open(item) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.data = {
        item: item
      }
      const dialogRef = this.dialog.open(UpdateComponent, dialogConfig)
      
    }
  
    
}
