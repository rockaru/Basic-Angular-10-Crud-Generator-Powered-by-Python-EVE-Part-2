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
  form:any=[]
  items:any=[]

  constructor(
    private formService: FormService,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ReadComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.resource = data.resource
    this.form =data.form
  }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.dataService.getAll(this.resource).subscribe((data) => {
      this.items=data["_items"]
    })
  }

  create(){
    this.formService.openCreate(this.resource,CreateComponent)
  }

  update(id){
    const dialogRef = this.formService.openUpdate(this.resource,id,UpdateComponent)
      
  }

  delete(id){

  }

}
