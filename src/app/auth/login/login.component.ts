import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CredentialsDto } from "../dto/credentials.dto";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "../../../config/routes.config";
import { EMPTY, catchError, tap } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  login(credentials: CredentialsDto) {
    this.authService
      .login(credentials)
      .pipe(
        tap(() => {
          this.toastr.success(`Bienvenu chez vous :)`);
          this.router.navigate([APP_ROUTES.cv]);
        }),
        catchError((e) => {
          this.toastr.error("Veuillez vérifier vos credentials");
          return EMPTY;
        })
      )
      .subscribe();
  }
}
