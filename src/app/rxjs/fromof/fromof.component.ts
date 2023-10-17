import { Component } from "@angular/core";
import { from, of } from "rxjs";

@Component({
  selector: "app-fromof",
  templateUrl: "./fromof.component.html",
  styleUrls: ["./fromof.component.css"],
})
export class FromofComponent {
  from$ = from([1, 2, 3]);
  of$ = of([1, 2, 3], "cc");

  constructor() {
    this.from$.subscribe((value) => console.log("From: ", value));
    this.of$.subscribe((value) => console.log("of: ", value));
  }
}
