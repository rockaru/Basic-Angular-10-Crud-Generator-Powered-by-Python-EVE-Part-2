import { Component } from '@angular/core';
import { CreateService } from './crudService/create'
import { ReadService } from './crudService/read'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-pets';

  constructor(
    private readService:ReadService,
    private createService:CreateService,
    )
  {
  }

  read(resource){
    this.readService.read(resource)
  }

  create(resource){
    this.createService.create(resource)
  }

}
