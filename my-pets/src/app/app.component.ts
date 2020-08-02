import { Component } from '@angular/core';
import { CreateService } from './create/create.service'
import { ReadService } from './read/read.service'
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
  {  }

  read(){
    this.readService.open()
  }

  create(){
    this.createService.open()
  }

}
