import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../../Model/account_model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  backUrl:String ="http://localhost:8085/"

  constructor(private http:HttpClient) { }

  getAccount(accountId :String,page?:number,size?:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backUrl+"accounts/"+accountId+"/pageOperations?page="+page+"&pageSize="+size);
  }

  debit(accountId :String ,amount :number,description : String){
    let data={accountId:accountId,amount:amount,description:description}
    console.log(data)
    return this.http.post(this.backUrl+"accounts/debit",data)
  }

  credit(accountId :String ,amount :number,description : String){
    let data={accountId:accountId,amount:amount,description:description}
    return this.http.post(this.backUrl+"accounts/credit",data)
  }

  transfer(accountSource :String,accountDestination:String ,amount :number,description : String){
    let data={accountSource,accountDestination,amount,description} //les memes noms
    return this.http.post(this.backUrl+"accounts/transfer",data)
  }
}
