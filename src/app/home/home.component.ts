import { Component, OnInit } from '@angular/core';

import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  requests:{[key:string]: Request};

  constructor(private storageService: StorageService) { }

  ngOnInit() {

    this.requests = this.storageService.getAllRequests();

    this.storageService.updateRequests.subscribe(() => {
      this.requests = this.storageService.getAllRequests();
    });
  }

  undo() {
    this.storageService.undoOperation();
  }

}
