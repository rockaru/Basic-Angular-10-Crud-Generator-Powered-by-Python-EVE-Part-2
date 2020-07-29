import { Component, OnInit, Inject } from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { CreateService } from '../crudService/create'
import { DetailService } from '../crudService/details'
import { UpdateService } from '../crudService/update'
import { DeleteService } from '../crudService/delete'
import {DataService} from '../data.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  resource:string
  form:any=[]
  items$:Observable<any>

  constructor(
    public createService: CreateService,
    public detailService: DetailService,
    public updateService: UpdateService,
    public deleteService: DeleteService,
    public dataService:DataService,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.resource = data.resource
    this.form =data.form
  }

  ngOnInit() {
    this.items$ = this.dataService.getAll(this.resource)
    
  }

  loadData(){
  }

  create(){
    this.createService.create(this.resource)
  }

  details(item){
    this.detailService.details(this.resource,item)
  }

  update(item){
    this.updateService.update(this.resource,item)
      
  }

  delete(item){
    this.deleteService.delete(this.resource,item)
  }

}
