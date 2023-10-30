import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from 'src/app/data/services/products.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductsService;
  let router: Router;
  const row = { id: '1', name: 'Product 1', description: 'Description 1' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ProductsComponent],
      providers: [ProductsService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBankProducts method on ngOnInit', () => {
    spyOn(component, 'getBankProducts');
    component.ngOnInit();
    expect(component.getBankProducts).toHaveBeenCalled();
  });

  it('should fetch bank products and assign them to products array', () => {
    component.getBankProducts();
  });

  it('should navigate to "/form" with the correct FormId value when editRow is called', () => {
    const row = { id: 1, name: 'Product 1', description: 'Description 1' };
    const localStorageSpy = spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ id: 1 }]));
    component.editRow(row);
    expect(localStorageSpy).toHaveBeenCalledWith('FormId', '[{"id":1}]');
    expect(router.navigate).toHaveBeenCalledWith(['/form']);
  });

  it('should delete a product, fetch updated bank products, navigate to home, and log a message when deleteRow is called', () => {
    spyOn(productService, 'deleteProduct').and.returnValue(of(null));
    component.deleteRow(row);
  });

  it('should redirect to /form and delete the data in localstorage', () => {
    localStorage.setItem('FormId', 'valorFormId');
    localStorage.setItem('Products', 'valorProducts');
    component.redirecToForm();
    expect(localStorage.getItem('FormId')).toBeNull();
    expect(localStorage.getItem('Products')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/form']);
  });
});
