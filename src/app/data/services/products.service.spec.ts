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
    const id = '123';
    const expectedUrl = `${service.URLBase}?id=${id}`;
    const expectedHeaders = {
      authorId: '6',
    };

    // Llama a la función a probar
    service.deleteProduct(id).subscribe();

    // Verifica que se haya realizado una solicitud DELETE con los parámetros correctos
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('authorId')).toBe(expectedHeaders.authorId);

    // Responde a la solicitud con una respuesta vacía
    req.flush('', { status: 200, statusText: 'OK' });
  });
});
