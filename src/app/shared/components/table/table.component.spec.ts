import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ElementRef } from '@angular/core';

fdescribe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let elementRef: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    elementRef = fixture.debugElement.injector.get(ElementRef);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event when editRow is called', () => {
    const row = { id: 1, name: 'Row 1' };
    spyOn(component.edit, 'emit');

    component.editRow(row);

    expect(component.edit.emit).toHaveBeenCalledWith(row);
  });

  it('should emit delete event when deleteRow is called', () => {
    const row = { id: 1, name: 'Row 1' };
    spyOn(component.delete, 'emit');

    component.deleteRow(row);

    expect(component.delete.emit).toHaveBeenCalledWith(row);
  });

  it('should close all dropdowns when closeAllDropdowns is called', () => {
    component.rows = [
      { id: 1, name: 'Row 1', showDropdown: true },
      { id: 2, name: 'Row 2', showDropdown: true },
      { id: 3, name: 'Row 3', showDropdown: true }
    ];

    component.closeAllDropdowns();

    component.rows.forEach((row) => {
      expect(row.showDropdown).toBeFalse();
    });
  });

  it('should toggle dropdown when toggleDropdown is called', () => {
    const row = { id: 1, name: 'Row 1', showDropdown: false };

    component.toggleDropdown(row);

    expect(row.showDropdown).toBeTrue();
  });

  it('should close all dropdowns when clicking outside the component', () => {
    const event = new MouseEvent('click');
    const containsSpy = spyOn(elementRef.nativeElement, 'contains').and.returnValue(false);
    spyOn(component, 'closeAllDropdowns');

    component.onDocumentClick(event);

    expect(containsSpy).toHaveBeenCalledWith(event.target);
    expect(component.closeAllDropdowns).toHaveBeenCalled();
  });

  it('should close all dropdowns when pressing the escape key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    spyOn(component, 'closeAllDropdowns');

    component.onKeydownHandler(event);

    expect(component.closeAllDropdowns).toHaveBeenCalled();
  });
});
