import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all products', () => {
    const mockResponse = [
      { id: '1', name: 'Product 1', price: 10 },
      { id: '2', name: 'Product 2', price: 20 }
    ];

    service.getAll().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.URLBase}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should save a product', () => {
    const mockProduct = { name: 'New Product', price: 30 };

    service.saveProduct(mockProduct).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${service.URLBase}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush({ success: true });
  });

  it('should edit a product', () => {
    const mockProduct = { id: '1', name: 'Updated Product', price: 40 };

    service.editProduct(mockProduct).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${service.URLBase}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush({ success: true });
  });

  it('should delete a product', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${service.URLBase}?id=${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
