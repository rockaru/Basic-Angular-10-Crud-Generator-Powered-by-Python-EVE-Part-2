import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SELECT_PANEL_PADDING_X } from '@angular/material/select';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(resource): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`api/${resource}`).pipe().subscribe(data => {
        resolve(this.setAll(data))
      })
    })
  }

  private setAll(data) {
    return data._items
  }

  public getOne(resource,id){
    return this.httpClient.get(`api/${resource}/${id}`).pipe()
  }

  private setOne(data){
    const item = {}
    for (let i in data) {
      item[i] = data[i]
    }
    return item
  }

  public add(resource, data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`api/${resource}`, data).pipe().subscribe(data => {
        resolve(this.setAdd(data))
      })
    })
  }

  private setAdd(data){
    return data
  }

}


