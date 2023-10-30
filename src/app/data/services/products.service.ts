import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductResponseDto } from '../models/products/product.model';
import { BaseResponse } from '../models/base.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  headers = {
    authorId: '6',
  }

  httpOptions = {
    headers: new HttpHeaders(this.headers),
    response: 'text'
  }

  URLBase =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<BaseResponse<ProductResponseDto[]>>(
      `${this.URLBase}`,
      this.httpOptions
    );
  }

  saveProduct(body: any){
    return this.http.post(`${this.URLBase}`, body, this.httpOptions);
  }

  editProduct(body: any){
    return this.http.put(`${this.URLBase}`, body, this.httpOptions);
  }

  deleteProduct(id: string) {
    const headers = {
      authorId: '6',
    }
    return this.http.delete(`${this.URLBase}?id=${id}`, {headers: headers, responseType: 'text'})
  }
}
