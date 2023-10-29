import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import * as moment from 'moment';

export function momentFactory() {
  return moment;
}
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    FormularioComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: 'moment', useFactory: momentFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
