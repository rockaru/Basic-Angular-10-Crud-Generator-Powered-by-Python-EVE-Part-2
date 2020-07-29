import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormService } from '../form.service'
import { FormGroup } from '@angular/forms';

import { UpdateService } from '../crudService/update'
import { DeleteService } from '../crudService/delete'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  resource:string
  form:any=[]
  item:any=[]
  myFormGroup: FormGroup = new FormGroup({})

  constructor(
    private updateService: UpdateService,
    private deleteService: DeleteService,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.resource = data.resource
    this.item = data.item
    this.form =data.form
    this.myFormGroup = this.formService.loadFormGroup(this.form,this.item)

   }

  ngOnInit() {
      
  }

  update(item){
    this.updateService.update(this.resource,item)
      
  }

  delete(item){
    this.deleteService.delete(this.resource,item)
  }

}
