import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

import { FormService } from '../form.service'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  resource:string
  scope:string
  form:any=[]
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private formService: FormService,
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.form =data.form
    this.scope =data.scope
   }

  ngOnInit() {
    
    this.loadData()

  }

  async loadData(){
    
    if(!this.form){
      this.form = await this.formService.getForm(this.resource,this.scope)
    }

    this.myFormGroup = this.formService.loadFormGroup(this.form)
  
  }

  close(){
    this.dialogRef.close()
  }

  save(){
    this.dialogRef.close(this.myFormGroup.value);
  }

}
