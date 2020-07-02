import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlBase = 'http://localhost:7070/api/products';
  private categoryUrl = 'http://localhost:7070/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProduct> {
    // build URL  based on category id, page and size
    const searchUrl = `${this.urlBase}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    // build URL  based on category id
    const searchUrl = `${this.urlBase}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProduct(searchUrl);
  }


  searchProducts(theKeyword: string): Observable<Product[]> {
    // build URL  based product name
    const searchUrl = `${this.urlBase}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProduct(searchUrl);
  }

  // pagination for serach
  searchProductsPaginate(thePage: number,
                           thePageSize: number,
                           theKeyword: string): Observable<GetResponseProduct> {
    // build URL  based on product name, page and size
    const searchUrl = `${this.urlBase}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  private getProduct(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductDetail(theProductId: number): Observable<Product> {
    const productUrl = `${this.urlBase}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}