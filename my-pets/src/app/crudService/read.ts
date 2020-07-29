import { Injectable } from '@angular/core';
import { ReadComponent } from '../read/read.component';
import { FormService } from '../form.service'

@Injectable({
  providedIn: 'root'
})
export class ReadService {

    constructor(
    private formService: FormService

    ) { }

    read(resource, component?) {
      if (component) {
        this.formService.openRead(resource, component)
  
      } else {
        this.formService.openRead(resource, ReadComponent)
      }
    }
}
