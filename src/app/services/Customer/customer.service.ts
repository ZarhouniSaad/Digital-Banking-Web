import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../Model/customer_model";

@Injectable()
export class CustomerService {
  backEndHost :String="http://localhost:8085/"

  constructor(private http:HttpClient) { }
  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backEndHost+"customers");
  }

  public searchCustomers(keyword : String):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backEndHost+"customers/search?keyword="+keyword);
  }

  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(this.backEndHost+"customers",customer);
  }

  public deleteCustomer(id: number){
    return this.http.delete(this.backEndHost+"customers/"+id);
  }
}
