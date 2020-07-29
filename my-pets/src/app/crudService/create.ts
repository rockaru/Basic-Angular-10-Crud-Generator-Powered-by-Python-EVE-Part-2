import { Injectable } from '@angular/core';
import { CreateComponent } from '../create/create.component'
import { FormService } from '../form.service'
import { Optional } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(
    private formService: FormService,
  ) { }

  create(resource, component?) {
    if (component) {
      this.formService.openCreate(resource, component)

    } else {
      this.formService.openCreate(resource, CreateComponent)
    }
  }

}
