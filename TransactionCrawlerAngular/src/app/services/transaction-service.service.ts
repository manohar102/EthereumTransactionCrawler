import { HttpClient } from '@angular/common/http';
import { Injectable,Pipe } from '@angular/core';
import { catchError, Observable, map, throwError } from 'rxjs';
import { Transactions } from '../models/transactions.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {
  // Add your EtherumScan API Token Key
  private TOKEN_KEY = "";
  constructor(private http: HttpClient) { }

  public getBalanceFromAddress(address: String):Observable<Object>{
    return this.http.get<Object>("https://api.etherscan.io/api?module=account&action=balance&address="+address+"&tag=latest&apikey="
    +this.TOKEN_KEY). pipe(
      map((data: any) => { 
        return data;
      }),
      catchError(()=> throwError("Problem while fetching balance with address"))
    )
  }
  

  public getTransactionsFromAddress(address: String, startBlock: String):Observable<Transactions>{
    return this.http.get<Transactions>("https://api.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock="+startBlock+"&page=1&offset=10&sort=asc&apikey="
    +this.TOKEN_KEY). pipe(
      map(data => data), 
      catchError(()=> throwError("Problem while fetching balance with address"))
    )
  }

  public getTransactionsFromAddressPage(address: String, startBlock: String, page:number):Observable<Transactions>{
    return this.http.get<Transactions>("https://api.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock="+startBlock+"&page="+page+"&offset=10&sort=asc&apikey="
    +this.TOKEN_KEY).pipe(
      map(data => data), 
      catchError(()=> throwError("Problem while fetching balance with address"))
    )
  }
}
