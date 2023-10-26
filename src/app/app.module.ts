import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
