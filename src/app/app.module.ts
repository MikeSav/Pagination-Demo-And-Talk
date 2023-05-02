import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PaginatedTableComponent } from './common/paginated-table/paginated-table.component';
import { SelectComponent } from './common/select/select.component';
import { ClickOutsideDirective } from './common/click-outside/click-outide.directive';

@NgModule({
  declarations: [
    AppComponent,
    PaginatedTableComponent,
    SelectComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
