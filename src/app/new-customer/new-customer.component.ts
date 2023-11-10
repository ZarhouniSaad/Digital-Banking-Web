import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../Model/customer_model";
import {CustomerService} from "../services/Customer/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  formGroup!:FormGroup
  constructor(private fb :FormBuilder,private customerServie:CustomerService,private router:Router) {
    this.formGroup=this.fb.group({
      name: this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.email,Validators.required])
    })
  }

  handleSaveCustomer() {
    let customer :Customer=this.formGroup.value;
    this.customerServie.saveCustomer(customer).subscribe({
      next: (data)=> {
        alert("Custmer saved with id " + data.id)
        this.formGroup.reset()
        this.router.navigateByUrl("/customers")
      },
      error: err => console.log(err)
    })
  }
}
