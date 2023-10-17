import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, Settings } from "../products.component";

const API = "https://dummyjson.com/products";
@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(setting: Settings) {
    const { limit, skip } = setting;
    return this.http.get<ApiResponse>(`${API}?limit=${limit}&skip=${skip}`);
  }
}
