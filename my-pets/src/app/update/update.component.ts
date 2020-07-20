import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

import { FormService } from '../form.service'
import { DataService } from '../data.service'
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  resource:string
  id:string
  scope:string="update"
  form:any=[]
  item:any=[]
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private formService: FormService,
    private dataService: DataService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.item = data.item
    this.form =JSON.parse(localStorage.getItem(`form-${this.resource}-${this.scope}`))
   }

  ngOnInit() {
    this.loadData()
  }

  async loadData(){

    console.log(this.item)

    const group = {}

    if(!this.form){
      this.form = await this.formService.getForm(this.resource,this.scope)
    }

    console.log(this.form)
   
    for(let element of this.form){
      group[element.name] = new FormControl(this.item[element.name])
    }

    this.myFormGroup = new FormGroup(group)

    console.log(this.myFormGroup)

  }

  async loadForm(){
    
  }

  close(){
    this.dialogRef.close()
  }

  save(){
    this.dialogRef.close(this.myFormGroup.value);
  }

}
