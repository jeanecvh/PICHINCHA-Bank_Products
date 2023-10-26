import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from 'src/app/data/models/table/table-column.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];
  @Input() dropdownIconClass: string = '';
  @Input() columnIconClass: string = '';
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  toggleDropdown(row: any) {
    row.showDropdown = !row.showDropdown;
  }

  editRow(row: any) {
    this.edit.emit(row);
  }

  deleteRow(row: any) {
    this.delete.emit(row);
  }
}
