import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { TransactionDetails } from 'src/app/models/transaction-details.model';
import { TransactionRequest } from 'src/app/models/transaction-request.model';
import { Transactions } from 'src/app/models/transactions.model';
import { TransactionServiceService } from 'src/app/services/transaction-service.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @Input("transactionRequest") transactionRequest: TransactionRequest;
  @Input("transactions") transactions: Transactions;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: TransactionDetails[];
  displayedColumns: string[] = ['from', 'to', 'value'];
  resultsLength = 0;
  isRateLimitReached = false;

  constructor(private transactionService: TransactionServiceService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.dataSource==null){
      this.dataSource = this.transactions?.result;
      this.totalSize = this.pageSize * 2
    }
  }

  public handlePage(e: any) {
    this.getData(e);
  }

  public getData(e: any){
    if(this.transactionRequest.address!=null && this.transactionRequest.startBlock!=null){
      this.transactionService.getTransactionsFromAddressPage(
        this.transactionRequest.address, this.transactionRequest.startBlock, e.pageIndex + 1
      ).subscribe((response)=>{
        this.transactions = response;
        this.dataSource = response.result
        if(this.currentPage<e.pageIndex+1&& this.totalSize<=((e.pageIndex + 1)* this.pageSize) 
        && this.dataSource.length==this.pageSize){
          this.totalSize = this.totalSize+20;
        }
        if(this.dataSource.length!=this.pageSize){
          this.currentPage = e.pageIndex;
        }
        else{
          this.currentPage = e.pageIndex + 1;
          this.pageSize = e.pageSize;
        }
      })
    }
  }
}
