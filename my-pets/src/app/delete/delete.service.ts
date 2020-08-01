import { Injectable } from '@angular/core';
import { DeleteComponent } from './delete.component'
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(
    private dialog: MatDialog,

  ) { }

  

  open(item) {
    
    const dialogConfig = new MatDialogConfig()
    
    dialogConfig.data = {
      item: item,
      
    }
    
    const dialogRef = this.dialog.open(DeleteComponent, dialogConfig)

  }

}
