import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    TableComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
    ButtonComponent,

  ]
})
export class SharedModule { }
