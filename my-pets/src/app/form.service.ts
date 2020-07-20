import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataService } from './data.service'
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private dataService: DataService

  ) { }

  loadFormGroup(form){
    const group = {}

    for(let element of form){
      group[element.name] = new FormControl('')
    }

    const formGroup = new FormGroup(group)
    return formGroup
  }

  getForm(resource, scope) {
    return new Promise((resolve, reject) => {
      return this.httpClient.get(`api/form/${resource}`).pipe().subscribe(data => {
        resolve(this.setStructure(resource, scope, data))
      })
    })
  }

  setStructure(resource, scope, data) {
    const items = []
    for (let item in data) {
      switch (scope) {
        case 'create':
          if (data[item].create) {
            items[item] = data[item];
          }
          break;
        case 'read':
          if (data[item].read) {
            items[item] = data[item];
          }
          break;
        case 'update':
          if (data[item].update) {
            items[item] = data[item];
          }
          break;
      }
    }
    const form = []
    for (let item in items) {
      form.push({
        name: item,
        value: items[item]
      })

    }
    localStorage.setItem(`form-${resource}-${scope}`, JSON.stringify(form))
    return form;
  }

  openRead(resource, component) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      resource: resource
    }
    this.dialog.open(component, dialogConfig)
  }

  openCreate(resource, component) {
    const dialogConfig = new MatDialogConfig()
    const form = JSON.parse(localStorage.getItem(`form-${resource}-create`))
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      resource: resource,
      form:form,
      scope:"create"
    }
    
    const dialogRef = this.dialog.open(component, dialogConfig)

    dialogRef.afterClosed().subscribe(
      data => {
        this.dataService.add(resource, data)
      }
    )

  }

  openUpdate(resource, id, component) {
    const dialogConfig = new MatDialogConfig()
    const item = this.dataService.getOne(resource, id).subscribe((data) => {
      dialogConfig.autoFocus = true
      dialogConfig.data = {
        item: data,
        resource: resource,
        id: id
      }

      const dialogRef = this.dialog.open(component, dialogConfig)

      dialogRef.afterClosed().subscribe(
        data => {
          this.dataService.add(resource, data)
        }
      )
    })


  }

}
