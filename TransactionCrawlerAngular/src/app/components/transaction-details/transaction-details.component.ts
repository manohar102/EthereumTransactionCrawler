import { Component, Input, OnInit } from '@angular/core';
import { Transactions } from 'src/app/models/transactions.model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @Input("transactions") transactions : Transactions;

  constructor() { }
  displayedColumns: string[] = ['from', 'to', 'value'];

  ngOnInit(): void {
    console.log("Transaction", this.transactions);
  }
  ngOnChanges(): void {
    
  }

}
