import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/data/services/products.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let formBuilder: FormBuilder;
  let productService: ProductsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [FormularioComponent],
      providers: [FormBuilder, ProductsService, Router],
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

  it('should call productService.editProduct and navigate to home when submitForm is called with formSession', () => {
    const formSession = [{ id: 1, name: 'Product 1', description: 'Description 1' }];
    const request = {
      id: formSession[0].id,
      name: formSession[0].name,
      description: formSession[0].description,
      logo: component.formSession[0].logo,
      date_release: component.formSession[0].date_release + 'T00:00:00.000+00:00',
      date_revision: component.formSession[0].date_revision + 'T00:00:00.000+00:00',
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(formSession));
    spyOn(productService, 'editProduct').and.returnValue(of(null));

    component.ngOnInit();
    component.submitForm();

    expect(productService.editProduct).toHaveBeenCalledWith(request);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should call productService.saveProduct and navigate to home when submitForm is called without formSession', () => {
    const request = {
      id: component.id.value,
      name: component.nombre.value,
      description: component.descripcion.value,
      logo: component.logo.value,
      date_release: component.fechaLiberacion.value + 'T00:00:00.000+00:00',
      date_revision: component.fechaRevision.value + 'T00:00:00.000+00:00',
    };
    spyOn(productService, 'saveProduct').and.returnValue(of(null));

    component.submitForm();

    expect(productService.saveProduct).toHaveBeenCalledWith(request);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
