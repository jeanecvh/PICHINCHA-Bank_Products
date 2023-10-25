import { Component, Input } from '@angular/core';
import { TableColumn } from 'src/app/data/models/table/table-column.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];
}
