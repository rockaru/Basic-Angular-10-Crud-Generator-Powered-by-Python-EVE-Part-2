import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormGroup, FormControl } from '@angular/forms';
import {DataService} from '../data.service'

@Component({
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  item:any=[]
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    public dataService:DataService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.item = data.item
   }

  ngOnInit() {
      this.loadForm()
  }

  loadForm() {
    const group = {}
    group["name"] = new FormControl(this.item.name)
    group["description"] = new FormControl(this.item.description)


    this.myFormGroup = new FormGroup(group)
  }

  save() {
    const formData = new FormData()
    if (!this.myFormGroup.get("name").untouched) {
      formData.append("name", this.myFormGroup.get("name").value)
    }
    if (!this.myFormGroup.get("description").untouched) {
      formData.append("description", this.myFormGroup.get("description").value)
    }
    this.dataService.update(this.item._id,formData).subscribe(data => {
      console.log(data)
      this.dialogRef.close("close");
    })
  }

}
