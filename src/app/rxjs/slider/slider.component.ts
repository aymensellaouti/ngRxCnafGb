import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Observable, timer, map, combineLatest, tap } from "rxjs";
import { API } from "../../../config/api.config";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
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
  images$: Observable<Photo[]>;
  constructor(private http: HttpClient) {
    this.images$ = this.http.get<Photo[]>(API.photos);
  }
  slider$!: Observable<string>;
  ngOnInit(): void {
    this.slider$ = combineLatest([this.images$, timer(0, this.time)]).pipe(
      tap(([images, index]) => console.log({ images, index })),
      map(([images, index]) => images[index % (images.length - 1)].url)
    );

    /* 0 1 2 3 4 5 6 ... */
    /* 404 as cv */
    /*       timer(0, this.time).pipe(
        map((index) => this.images[index % (this.images.length - 1)])
      ); */
  }
}
