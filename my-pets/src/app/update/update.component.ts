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
  form:any=[]
  item:any=[]
  id:string
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private dataService:DataService,
    private formService: FormService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.item = data.item
    this.form =data.form
    this.myFormGroup = this.formService.loadFormGroup(this.form,this.item)

   }

  ngOnInit() {
    
  }

  loadData(){
    this.dataService.getOne(this.resource, this.id).subscribe((data) => {
      this.item=data
    })

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
