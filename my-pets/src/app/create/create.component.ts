import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

import { FormService } from '../form.service'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  resource:string
  form:any=[]
  item:any=[]
  id:string
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private formService: FormService,
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.item = data.item
    this.form =data.form
    this.myFormGroup = this.formService.loadFormGroup(this.form,this.item)

   }

  ngOnInit() {
      
  }

  save(){
    this.dialogRef.close(this.myFormGroup.value);
  }

  

}
