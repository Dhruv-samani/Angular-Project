import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/productList/", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList/")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  putProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/productList/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
