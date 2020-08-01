import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormGroup, FormControl } from '@angular/forms';

import { UpdateService } from '../update/update.service'
import { DeleteService } from '../delete/delete.service'
@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  item:any=[]
  myFormGroup: FormGroup

  constructor(
    private updateService: UpdateService,
    private deleteService: DeleteService,
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

  update(item){
    this.updateService.open(item)
      
  }

  delete(item){
    this.deleteService.open(item)
  }

}
