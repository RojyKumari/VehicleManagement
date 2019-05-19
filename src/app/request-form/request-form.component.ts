import { Component, OnInit } from '@angular/core';

import { Request } from '../model/request';
import { StorageService } from '../service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  editable: boolean;
  requestObject: Request;
  requestForm;
  reqKey: string;

  constructor(private storageService: StorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.editable = JSON.parse(this.route.snapshot.paramMap.get('editable'));
    this.reqKey = this.route.snapshot.paramMap.get('reqKey');
    if (this.reqKey){
      this.requestObject = this.storageService.getRequest(this.reqKey);
    } else {
      this.requestObject = {
        firstName: '',
        lastName: '',
        vehicleRegNumber: '',
        mobileNumber: '',
        address: '',
        pickupDate: '',
        returnDate: ''
      };
    }
  }

  submitRequest(form){
    form.value.vehicleRegNumber = form.value.vehicleRegNumber || this.reqKey;
    this.storageService.addRequest(<Request>form.value);
    this.router.navigate(['/home']);
    console.log(form.value);
  }


}
