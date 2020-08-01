import { Component, OnInit } from '@angular/core'
import { CreateService } from '../create/create.service'
import { DetailService } from '../detail/detail.service'
import { UpdateService } from '../update/update.service'
import { DeleteService } from '../delete/delete.service'
import { DataService } from '../data.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  items: Array<any> = []
  constructor(

    public createService: CreateService,
    public detailService: DetailService,
    public updateService: UpdateService,
    public deleteService: DeleteService,
    public dataService: DataService,

  ) { }

  ngOnInit() {

    this.loadData()

  }

  loadData() {

    this.dataService.getAll().subscribe(data => this.items = data["_items"])

  }

  create() {
    this.createService.open()
  }

  detail(item) {
    this.detailService.open(item)
  }

  update(item) {
    this.updateService.open(item)

  }

  delete(item) {
    this.deleteService.open(item)
  }


}
