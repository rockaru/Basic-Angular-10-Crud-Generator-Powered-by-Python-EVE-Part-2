import { Injectable } from '@angular/core';
import { DetailComponent } from './detail.component'
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

    constructor(
      private dialog: MatDialog,

    ) { }

    open(item) {
    
      const dialogConfig = new MatDialogConfig()
  
      dialogConfig.data = {
        item: item,
        
      }
  
      const dialogRef = this.dialog.open(DetailComponent, dialogConfig)
  
    }


}
