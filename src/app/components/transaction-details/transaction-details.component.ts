import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class TransactionDetailsComponent implements OnInit, OnChanges {
  @Input("transactionRequest") transactionRequest: TransactionRequest;
  @Input("transactions") transactions: Transactions;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: TransactionDetails[];
  displayedColumns: string[] = ['blockNumber', 'from', 'to', 'value', 'gas', 'gasPrice', 'gasUsed', 'cumulativeGasUsed'];
  resultsLength = 0;
  isRateLimitReached = false;

  constructor(private transactionService: TransactionServiceService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.transactions) {
      this.dataSource = this.transactions.result || [];
      if (this.dataSource && this.dataSource.length > 0) {
        this.totalSize = this.dataSource.length >= this.pageSize ? this.pageSize * 2 : this.dataSource.length;
      }
    }
  }

  public handlePage(e: any) {
    this.getData(e);
  }

  public getData(e: any){
    if(this.transactionRequest && this.transactionRequest.address){
      const startBlock = this.transactionRequest.startBlock || '0';
      this.transactionService.getTransactionsFromAddressPage(
        this.transactionRequest.address, startBlock, e.pageIndex + 1
      ).subscribe((response)=>{
        this.transactions = response;
        this.dataSource = response.result || [];
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
