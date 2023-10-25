import { Component } from '@angular/core';
import { TableColumn } from 'src/app/data/models/table/table-column.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  data = [
    {
      logo: "ruta-al-logo-1",
      nombre: "Producto 1",
      descripcion: "Descripción del Producto 1",
      fechaLiberacion: "2023-01-01",
      fechaRestructuracion: "2023-02-15",
      icono: "fa-star"
    },
    {
      logo: "ruta-al-logo-2",
      nombre: "Producto 2",
      descripcion: "Descripción del Producto 2",
      fechaLiberacion: "2023-03-01",
      fechaRestructuracion: "2023-04-15",
      icono: "fa-heart"
    },
    // ...
  ];

  tableColumns: TableColumn[] = [
    { label: "Logo", property: "logo" },
    { label: "Nombre del producto", property: "nombre" },
    { label: "Descripción", property: "descripcion" },
    { label: "Fecha de liberación", property: "fechaLiberacion" },
    { label: "Fecha de restructuración", property: "fechaRestructuracion" },
    { label: "Icono", property: "icono" }
  ];

}
