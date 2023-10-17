import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent {
  observable: Observable<number>;
  constructor(private toaster: ToastrService) {
    this.observable = new Observable((observer) => {
      let i = 5;
      const intervalIndex = setInterval(() => {
        if (!i) {
          observer.complete();
          clearInterval(intervalIndex);
        }
        observer.next(i--);
      }, 1000);
    });
    this.observable.subscribe((val) => {
      console.log(val);
    });

    this.observable.subscribe({
      next: (value) => {
        this.toaster.info("" + value);
      },
      complete: () => {
        this.toaster.warning("Fin du compte à rebours");
      },
      error: (e) => {
        this.toaster.error("Problème");
      },
    });
  }
}
