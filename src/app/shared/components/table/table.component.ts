import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TableColumn } from 'src/app/data/models/table/table-column.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];
  @Input() rowsLength: number
  @Input() dropdownIconClass: string = '';
  @Input() columnIconClass: string = '';
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:click', ['$event'])
  @HostListener('document:keydown.escape', ['$event'])

  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeAllDropdowns();
    }
  }
  onKeydownHandler(event: KeyboardEvent) {
    this.closeAllDropdowns();
  }

  toggleDropdown(row: any) {
    this.closeAllDropdowns();
    row.showDropdown = !row.showDropdown;
  }

  closeAllDropdowns() {
    this.rows.forEach((row: any) => {
      row.showDropdown = false;
    });
  }

  editRow(row: any) {
    this.edit.emit(row);
  }

  deleteRow(row: any) {
    this.delete.emit(row);
  }
}
