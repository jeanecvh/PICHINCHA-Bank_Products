import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/data/services/products.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as moment from 'moment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let formBuilder: FormBuilder;
  let productService: ProductsService;
  let router: Router;

  function momentFactory() {
    return moment;
  }
  beforeEach(async () => {
    (<any>window).moment = moment;
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [FormularioComponent],
      providers: [
        FormBuilder,
        ProductsService,
        Router,
        { provide: 'moment', useFactory: momentFactory}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    productService = TestBed.inject(ProductsService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls and values when ngOnInit is called', () => {
    component.ngOnInit();

    expect(component.registroForm.get('id')).toBeDefined();
    expect(component.registroForm.get('nombre')).toBeDefined();
    expect(component.registroForm.get('descripcion')).toBeDefined();
    expect(component.registroForm.get('logo')).toBeDefined();
    expect(component.registroForm.get('fechaLiberacion')).toBeDefined();
    expect(component.registroForm.get('fechaRevision')).toBeDefined();
    expect(component.idLS).toBeUndefined();
    expect(component.nameLS).toBeUndefined();
    expect(component.descriptionLS).toBeUndefined();
    expect(component.logoLS).toBeUndefined();
    expect(component.fechaLiberacionLS).toBeUndefined();
    expect(component.fechaRevisionLS).toBeUndefined();
    expect(component.edit).toBeFalsy();
    expect(component.formSession).toBeNull();
  });

  it('should set edit to true and populate form controls with values when there is a form session', () => {
    const formSession = [{ id: 1, name: 'Product 1', description: 'Description 1' }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(formSession));

    component.ngOnInit();

    expect(component.edit).toBeTruthy();
    expect(component.formSession).toEqual(formSession);
    expect(component.idLS).toBe(component.formSession[0].id);
    expect(component.nameLS).toBe(formSession[0].name);
    expect(component.descriptionLS).toBe(formSession[0].description);
    expect(component.logoLS).toBe(component.formSession[0].logo);
    expect(component.fechaLiberacionLS).toBe(component.formSession[0].date_release);
    expect(component.fechaRevisionLS).toBe(component.formSession[0].date_revision);
  });


  it('should call productService.saveProduct and navigate to home when submitForm is called without formSession', () => {
    component.formSession = [
      {
        id: 'A001',
        name: 'MASTER CARD',
        description: 'Tarjeta de crédito',
        logo: 'URL',
        date_release: moment('23-02-2024', 'DD-MM-YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
        date_revision: moment('23-02-2025', 'DD-MM-YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
       }];
    const request = ({
      id: component.formSession[0]?.id,
      name: component.formSession[0]?.name,
      description: component.formSession[0]?.description,
      logo: component.formSession[0]?.logo,
      date_release: component.formSession[0]?.date_release + 'T00:00:00.000+00:00',
      date_revision: component.formSession[0]?.date_revision + 'T00:00:00.000+00:00',
  }) ;
  spyOn(productService, 'saveProduct').and.returnValue(of(request));
  component.submitForm();
  });
});
