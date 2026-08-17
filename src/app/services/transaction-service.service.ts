import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { catchError, Observable, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transactions } from '../models/transactions.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {
  private baseUrl = 'https://api.etherscan.io/v2/api';
  private chainId = 1; // 1 = Ethereum Mainnet
  private TOKEN_KEY = environment.tokenKey;

  constructor(private http: HttpClient) { }

  public getBalanceFromAddress(address: String): Observable<Object> {
    return this.http.get<Object>(
      `${this.baseUrl}?chainid=${this.chainId}&module=account&action=balance&address=${address}&tag=latest&apikey=${this.TOKEN_KEY}`
    ).pipe(
      map((data: any) => data),
      catchError(() => throwError("Problem while fetching balance with address"))
    );
  }

  public getTransactionsFromAddress(address: String, startBlock?: String): Observable<Transactions> {
    const block = (startBlock && String(startBlock).trim() !== '') ? startBlock : '0';
    return this.http.get<Transactions>(
      `${this.baseUrl}?chainid=${this.chainId}&module=account&action=txlist&address=${address}&startblock=${block}&page=1&offset=10&sort=asc&apikey=${this.TOKEN_KEY}`
    ).pipe(
      map(data => data),
      catchError(() => throwError("Problem while fetching transactions with address"))
    );
  }

  public getTransactionsFromAddressPage(address: String, startBlock?: String, page: number = 1): Observable<Transactions> {
    const block = (startBlock && String(startBlock).trim() !== '') ? startBlock : '0';
    return this.http.get<Transactions>(
      `${this.baseUrl}?chainid=${this.chainId}&module=account&action=txlist&address=${address}&startblock=${block}&page=${page}&offset=10&sort=asc&apikey=${this.TOKEN_KEY}`
    ).pipe(
      map(data => data),
      catchError(() => throwError("Problem while fetching transactions with address"))
    );
  }
}
