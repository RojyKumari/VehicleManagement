import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../service/storage.service';

import {Request} from '../model/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input()reqKey: string

  request:Request;

  constructor(private storageService: StorageService) { }

  ngOnInit() {

    this.request = this.storageService.getRequest(this.reqKey);
  }

  deleteRequest(){
    this.storageService.deleteRequest(this.reqKey);
  }

}
