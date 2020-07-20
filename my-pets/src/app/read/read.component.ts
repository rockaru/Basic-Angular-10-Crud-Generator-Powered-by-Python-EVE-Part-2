import { Component, OnInit, Inject } from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { CreateComponent } from '../create/create.component'
import { UpdateComponent } from '../update/update.component'
import { FormService } from '../form.service'
import { DataService } from '../data.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  resource:string
  scope:string="read"
  form:any=[]
  items:any=[]

  constructor(
    private formService: FormService,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ReadComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.resource = data.resource
    this.form =JSON.parse(localStorage.getItem(`form-${this.resource}-${this.scope}`))
  }

  ngOnInit() {
    this.loadData()
  }

  async loadData(){
    if(!this.form){
      this.form = await this.formService.getForm(this.resource,this.scope)
    }
    this.items = await this.dataService.getAll(this.resource)
  }

  close(){
    this.dialogRef.close()
  }

  create(){
    this.formService.openCreate(this.resource,CreateComponent)
  }

  update(id){
    this.formService.openUpdate(this.resource,id,UpdateComponent)
  }

  delete(id){

  }

}
