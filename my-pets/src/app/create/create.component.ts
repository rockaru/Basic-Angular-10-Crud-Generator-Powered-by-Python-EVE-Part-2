import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  myFormGroup: FormGroup

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<CreateComponent>,
  ) { }

  ngOnInit() {
    this.loadForm()
  }

  loadForm() {
    const group = {}
    group["name"] = new FormControl('')
    group["description"] = new FormControl('')


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
    this.dataService.add(formData).subscribe(data => {
      console.log(data)
      this.dialogRef.close("close");
    })
  }

}
