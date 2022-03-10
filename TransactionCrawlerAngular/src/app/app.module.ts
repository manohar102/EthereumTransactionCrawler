import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule, MatCardTitle } from '@angular/material/card';

import { MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';

const materialComponents = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatIconModule,
  MatCheckboxModule,
  MatTableModule
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransactionFormComponent,
    TransactionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialComponents,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
