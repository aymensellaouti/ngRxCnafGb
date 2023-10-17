import { Component } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  map,
  scan,
  takeWhile,
} from "rxjs";
import { ProductService } from "./service/product.service";

export interface ApiResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Settings {
  limit: number;
  skip: number;
}

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  /*
    aller chercher les produits paginés
    à chaque fois qu'on tape sur more =>
    1- Flux pour le cli🇨 => Subject
    2- Le http MergeMap X , ConcatMap
    3- Flux pour les produits (résultat des deux flux ) scan
  */
  products$: Observable<Product[]>;
  settings: Settings = { limit: 12, skip: 0 };
  private settings$: BehaviorSubject<Settings> = new BehaviorSubject(
    this.settings
  );
  constructor(private productService: ProductService) {
    this.products$ = this.getProdducts();
  }
  private getProdducts(): Observable<Product[]> {
    return this.settings$.pipe(
      concatMap((settings) => this.productService.getProducts(settings)),
      map((apiResponse) => apiResponse.products),
      takeWhile((produits) => !!produits.length),
      scan((oldProducts, newProducts) => [...oldProducts, ...newProducts])
    );
  }
  more() {
    this.settings.skip += 12;
    this.settings$.next(this.settings);
  }
}
