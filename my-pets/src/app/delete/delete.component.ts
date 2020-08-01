import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  item:any=[]
  
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    private dataService:DataService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    
    this.item = data.item
    
   }

   ngOnInit() {
    this.loadForm()
}

loadForm() {
  const group = {}
    group["name"] = new FormControl({value: this.item.name, disabled: true})
    group["description"] = new FormControl({value: this.item.description, disabled: true})


  this.myFormGroup = new FormGroup(group)
}

  delete(){
    this.dataService.delete(this.item._id).subscribe(data=>{
      console.log(data)
      this.dialogRef.close("close")
    })
  }

}
