import { Component, OnInit } from '@angular/core';
import { TransactionRequest } from 'src/app/models/transaction-request.model';
import { Transactions } from 'src/app/models/transactions.model';
import { TransactionServiceService } from 'src/app/services/transaction-service.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  checked = false;
  today: Date = new Date();
  nextDay: Date = new Date();
  error: string = '';
  
  public transactionRequest: TransactionRequest;
  public transactions: Transactions;

  constructor(private transactionService: TransactionServiceService) { }

  ngOnInit(): void {
    // this.nextDay.setDate(this.today.getDate()+1);
    this.transactionRequest = new TransactionRequest();
  }

  ngOnChanges(): void {
  }

  onSubmit(){
    this.transactionService.getTransactionsFromAddress(this.transactionRequest.address, this.transactionRequest.startBlock).subscribe(
      res => { this.transactions = res}
    )
  }

  toggleCheck(){
    this.checked = !this.checked;
  }

}
