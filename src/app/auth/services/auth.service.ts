import { Injectable } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { BehaviorSubject, Observable, Subject, map, tap } from "rxjs";

class User {
  constructor(public id = 0, public email = "") {}
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(
      map((user) => !!user && this.isAuthenticated())
    );
    this.isLoggedOut$ = this.user$.pipe(map((user) => !user));
    const user = localStorage.getItem("user");
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const user = new User(+response.userId, credentials.email);
        localStorage.setItem("token", response.id);
        localStorage.setItem("user", JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.userSubject.next(null);
  }
}
