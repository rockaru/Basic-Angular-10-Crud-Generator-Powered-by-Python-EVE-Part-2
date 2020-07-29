import { Injectable } from '@angular/core';
import { DetailsComponent } from '../details/details.component'
import { FormService } from '../form.service'

@Injectable({
  providedIn: 'root'
})
export class DetailService {

    constructor(
      private formService: FormService

    ) { }

    details(resource, item, component?) {
      if (component) {
        this.formService.openDetails(resource, item, component)
      } else {
        this.formService.openDetails(resource, item, DetailsComponent)
      }
    }

}
