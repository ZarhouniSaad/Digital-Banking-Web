import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/Customer/customer.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../Model/customer_model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  errorMessage!:String;
  customers!:Observable<Array<Customer>>;
  searchFormGroup : FormGroup | undefined;
  constructor(private customerService: CustomerService,private fb : FormBuilder,private router :Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
      }
    );
    /*this.customerService.getCustomers().subscribe({
      next : data => {
        this.customers=data
      },
      error : (err) => {this.errorMessage=err.message}
    })*/
    this.handleSearchCustomer()

  }

  handleSearchCustomer() {
    let keyword=this.searchFormGroup?.value.keyword
    console.log(keyword)
    this.customers=this.customerService.searchCustomers(keyword).pipe(
      catchError(
        err => {
          this.errorMessage=err.message;
          return throwError(err);
        }
      )
    )
  }

  handleDeleteCustomer(c: Customer) {
    let con=confirm("Etes vous sur?")
    if(!con)return;
    this.customerService.deleteCustomer(c.id).subscribe(
      {
        next: (resp) =>{
          this.customers=this.customers.pipe(
             map(
               data=>{
                 let index=data.indexOf(c)
                 data.slice(index,1)
                 return data
               }
             )
          );
        },
        error: (err)=>{
          console.log(err.message)
        }
      }
    );

  }

  handleCustomerAccounts(c: Customer) {
    this.router.navigateByUrl("customer-accounts/"+c.id, {state:c})
  }
}
