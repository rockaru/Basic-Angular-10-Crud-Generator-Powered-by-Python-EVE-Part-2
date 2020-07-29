import { Injectable } from '@angular/core';
import { UpdateComponent } from '../update/update.component'
import { FormService } from '../form.service'

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

    constructor(
    private formService: FormService

    ) { }

    update(resource, item, component?) {
      if (component) {
        this.formService.openUpdate(resource, item, component)
      } else {
        this.formService.openUpdate(resource, item, UpdateComponent)
      }
  
    }
}
