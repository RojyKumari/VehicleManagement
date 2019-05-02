import { Injectable } from '@angular/core';

import { Request } from '../model/request';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  recentOperation = {
    operationType : '',
    data : {}
  };

  updateRequests = new Subject();

  constructor() { }

  addRequest(req: Request) {
    this.recentOperation.operationType = 'add';
    this.recentOperation.data = {
      [req.vehicleRegNumber] : req
    };
    localStorage.setItem(req.vehicleRegNumber, JSON.stringify(req));
  }

  getRequest(vehicleRegNumber: string) {
    return JSON.parse(localStorage.getItem(vehicleRegNumber));
  }

  getAllRequests():{}{
    let requests: {[key:string]: Request} = {};

    if (localStorage.length){
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        requests[key] = value;
      }
    }
      return requests;

  }

  deleteRequest(reqKey: string){
    this.recentOperation.operationType = 'delete';
    this.recentOperation.data = {
      [reqKey] : this.getRequest(reqKey)
    };
    localStorage.removeItem(reqKey);
    this.updateRequests.next();
  }

  undoOperation(){
    if(!this.recentOperation.operationType){
      return;
    }

    if (this.recentOperation.operationType === 'add') {
      this.deleteRequest(Object.keys(this.recentOperation.data)[0]);
    } else if (this.recentOperation.operationType === 'delete') {
      this.addRequest( Object.values(this.recentOperation.data)[0] as Request);
    }

    this.updateRequests.next();
  }
}
