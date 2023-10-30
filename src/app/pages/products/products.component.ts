import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponseDto } from 'src/app/data/models/products/product.model';
import { TableColumn } from 'src/app/data/models/table/table-column.model';
import { ProductsService } from 'src/app/data/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductResponseDto[] = [];
  dropdownIconClass: string = 'fa-solid fa-ellipsis-vertical';
  columnIconClass: string = 'fa-solid fa-circle-exclamation';
  tableColumns: TableColumn[] = [
    { label: 'Logo', property: 'logo', showIcon: false },
    { label: 'Nombre del producto', property: 'name', showIcon: false },
    { label: 'Descripción', property: 'description', showIcon: true },
    { label: 'Fecha de liberación', property: 'date_release', showIcon: true },
    {
      label: 'Fecha de restructuración',
      property: 'date_revision',
      showIcon: true,
    },
  ];

  constructor(public productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getBankProducts();
  }

  editRow(row: any) {
    let productsLocalStorage = localStorage.getItem('Products');
    if (productsLocalStorage) {
      const arrayProducts = JSON.parse(productsLocalStorage);
      const idRow = arrayProducts.filter(
        (obj: { id: any }) => obj.id === row.id
      );
      localStorage.setItem('FormId', JSON.stringify(idRow));
      this.router.navigate(['/form']);
    }
  }

  deleteRow(row: any) {
    this.productService.deleteProduct(row.id).subscribe({
      next: () => {
        this.getBankProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  redirecToForm() {
    localStorage.removeItem('FormId');
    localStorage.removeItem('Products');
    this.router.navigate(['/form']);
  }

  getBankProducts() {
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products = response;
        localStorage.setItem('Products', JSON.stringify(response));
      },
    });
  }
}
