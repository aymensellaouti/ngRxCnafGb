import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";

import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";

import { authenticationGuard } from "./auth/guards/authentication.guard";
import { detailCvResolverResolver } from "./cv/resolver/detail-cv-resolver.resolver";
import { ProductsComponent } from "./products/products.component";
/* cv/5 */
const routes: Route[] = [
  { path: "", redirectTo: "cv", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "cv",
    component: CvComponent,
  },
  {
    path: "cv/add",
    component: AddCvComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "cv/:id",
    component: DetailsCvComponent,
    resolve: {
      cv: detailCvResolverResolver,
    },
  },
  { path: "todo", component: TodoComponent },
  { path: "products", component: ProductsComponent },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes /* , {
      enableTracing: true,
    } */
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
