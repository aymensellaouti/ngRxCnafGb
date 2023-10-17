import { Component, Input, OnInit } from "@angular/core";
import { Observable, timer, map } from "rxjs";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent implements OnInit {
  @Input() images: string[] = [
    "404.png",
    "as.jpg",
    "cv.png",
    "rotating_card_profile.png",
    "rotating_card_profile2.png",
    "rotating_card_profile3.png",
  ];
  @Input() size = 150;
  @Input() time = 1000;
  slider$!: Observable<string>;
  ngOnInit(): void {
    this.slider$ =
      /* 0 1 2 3 4 5 6 ... */
      /* 404 as cv */
      timer(0, this.time).pipe(
        map((index) => this.images[index % (this.images.length - 1)])
      );
  }
}
