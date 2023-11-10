import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../Model/account_model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  accountFormGroup!:FormGroup
  currentPage:number=0
  pageSize:number=5
  accountDetailsObservable!:Observable<AccountDetails>
  operationsFormGroup!: FormGroup
  constructor(private fb:FormBuilder,private accountService:AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId: this.fb.control("644670fc-cebb-4204-8ba6-7ee6682e439b")
    })

    this.operationsFormGroup=this.fb.group({
      type:this.fb.control(null),
      amount :this.fb.control(0),
      accountDestination:this.fb.control(null),
      description:this.fb.control(null)
    })
  }


  HandleSearchAccount() {
    let accountId=this.accountFormGroup.value.accountId;
    this.accountDetailsObservable=this.accountService.getAccount(accountId,this.currentPage,this.pageSize)
  }

  gotoPage(page: number) {
    this.currentPage=page
    this.HandleSearchAccount()
  }

  handleAccountOperation() {
    let accountId:String=this.accountFormGroup.value.accountId;
    let operationType:String=this.operationsFormGroup.value.type;
    console.log(this.operationsFormGroup.value)
    if (operationType=="Debit"){
      this.accountService.debit(accountId,
        this.operationsFormGroup.value.amount,
        this.operationsFormGroup.value.description).subscribe({
        next :(data)=> {
          alert("Debit Success");
          this.HandleSearchAccount()
        },
        error :(err)=>console.log(err)
      })
    }else if (operationType=="Credit"){
      this.accountService.credit(accountId,
        this.operationsFormGroup.value.amount,
        this.operationsFormGroup.value.description).subscribe({
        next :(data)=> {
          alert("Credit Success");
          this.HandleSearchAccount()
        },
        error :(err)=>console.log(err)
      })
    }else if(operationType=="Transfert"){
      this.accountService.transfer(accountId,
        this.operationsFormGroup.value.accountDestination,
        this.operationsFormGroup.value.amount,
        this.operationsFormGroup.value.description
        ).subscribe({
        next :(data)=> {
          alert("Transfer Success");
          this.HandleSearchAccount()
        },
        error :(err)=>console.log(err)
      })
    }
    this.operationsFormGroup.reset()
  }
}
