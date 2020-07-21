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

  loadFormGroup(form, item?) {
    const group = {}

    if (item) {
      for (let element of form) {
        group[element.name] = new FormControl(item[element.name])
      }
    } else {

      for (let element of form) {
        group[element.name] = new FormControl('')
      }
    }
    const formGroup = new FormGroup(group)
    return formGroup
  }

  getForm(resource) {

    return this.httpClient.get(`api/form/${resource}`).pipe()

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
    const scope = "read"
    let form = JSON.parse(localStorage.getItem(`form-${resource}-${scope}`))


    this.dataService.getAll(resource).subscribe((data) => {

      if (!form) {
        this.getForm(resource).subscribe(form => {
          form = this.setStructure(resource, scope, form)
          dialogConfig.data = {
            items: data["_items"],
            resource: resource,
            form: form,
          }
          this.dialog.open(component, dialogConfig)
          this.loadRead(dialogConfig,resource,component)
        })
      } else {
        dialogConfig.data = {
          items: data["_items"],
          resource: resource,
          form: form,
        }
        this.loadRead(dialogConfig,resource,component)

      }
    })
  }

  loadRead(dialogConfig,resource,component){
    dialogConfig.autoFocus = true
    dialogConfig.maxWidth = "200vw"
    const dialogRef = this.dialog.open(component, dialogConfig)
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)
      }
    )
  }

  openCreate(resource, component) {
    const dialogConfig = new MatDialogConfig()
    const scope = "create"
    let form = JSON.parse(localStorage.getItem(`form-${resource}-${scope}`))
    
    if (!form) {
      this.getForm(resource).subscribe(form => {
        form = this.setStructure(resource, scope, form)
        dialogConfig.data = {
          resource: resource,
          form: form,
          scope: scope
        }
      return this.loadCreate(dialogConfig,resource,component)
      })
    } else {
      dialogConfig.data = {
        resource: resource,
        form: form,
        scope: scope
      }
      return this.loadCreate(dialogConfig,resource,component)

    }

  }

  loadCreate(dialogConfig,resource,component){
    dialogConfig.autoFocus = true
    dialogConfig.maxWidth = "200vw"
    const dialogRef = this.dialog.open(component, dialogConfig)
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
        console.log(data)
        this.dataService.add(resource, data)
        }
      }
    )
    return dialogRef
  }

  openUpdate(resource, id, component) {
    const dialogConfig = new MatDialogConfig()
    const scope = "update"
    let test:any
    let form = JSON.parse(localStorage.getItem(`form-${resource}-${scope}`))
    this.dataService.getOne(resource, id).subscribe((data) => {

      if (!form) {
        form = this.getForm(resource).subscribe(form => {
          form = this.setStructure(resource, scope, form)
          dialogConfig.data = {
            item: data,
            resource: resource,
            form: form,
          }
        test = this.loadUpdate(dialogConfig,resource,id,component)
        })
      } else {
        dialogConfig.data = {
          item: data,
          resource: resource,
          form: form,
        }

        test = this.loadUpdate(dialogConfig,resource,id,component)
      }

    })

    return test

  }

  loadUpdate(dialogConfig,resource,id,component){
    dialogConfig.autoFocus = true
    dialogConfig.maxWidth = "200vw"
    const dialogRef = this.dialog.open(component, dialogConfig)
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.dataService.update(resource,id, data)
          }
      }
    )

    return dialogRef
  }
  

}
