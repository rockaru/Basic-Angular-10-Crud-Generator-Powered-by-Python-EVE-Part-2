import { Injectable } from '@angular/core';
import { DeleteComponent } from '../delete/delete.component'
import { FormService } from '../form.service'

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(
    private formService: FormService

  ) { }

  delete(resource, item, component?) {
    if (component) {
      this.formService.openDelete(resource, item, component)
    } else {
      this.formService.openDelete(resource, item, DeleteComponent)
    }
  }

}
