import { Component } from '@angular/core';
import { TableColumn } from 'src/app/data/models/table/table-column.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  dropdownIconClass: string = 'fa-solid fa-ellipsis-vertical';
  columnIconClass: string = 'fa-solid fa-circle-exclamation';
  data = [
    {
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      nombre: "Producto 1",
      descripcion: "Descripción del Producto 1",
      fechaLiberacion: "2023-01-01",
      fechaRestructuracion: "2023-02-15"
    },
    {
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      nombre: "Producto 2",
      descripcion: "Descripción del Producto 2",
      fechaLiberacion: "2023-03-01",
      fechaRestructuracion: "2023-04-15"
    },
    // ...
  ];

  tableColumns: TableColumn[] = [
    { label: "Logo", property: "logo", showIcon:false },
    { label: "Nombre del producto", property: "nombre", showIcon:false },
    { label: "Descripción", property: "descripcion", showIcon:true },
    { label: "Fecha de liberación", property: "fechaLiberacion", showIcon:true },
    { label: "Fecha de restructuración", property: "fechaRestructuracion", showIcon:true }
  ];


  editRow(row: any) {
    // Lógica para editar la fila
  }

  deleteRow(row: any) {
    // Lógica para borrar la fila
  }

  handleButtonClick(){
    console.log("Boton");
  }


}
