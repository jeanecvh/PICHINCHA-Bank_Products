import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductResponseDto } from '../models/products/product.model';
import { BaseResponse } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  URLBase = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros'


  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<any>{
    const headers: any = {
      "authorId": "5"
   };
   //Post options pass it to HttpHeaders Class
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
    return this.httpClient.get<BaseResponse<ProductResponseDto[]>>(
      `${this.URLBase}/bp/products`, httpOptions
    )
  }
}
