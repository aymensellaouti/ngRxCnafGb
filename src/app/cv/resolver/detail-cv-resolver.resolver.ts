import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

export const detailCvResolverResolver: ResolveFn<Cv> = (route, state) => {
  const id = route.params["id"];
  console.log({ route });
  const cvService: CvService = inject(CvService);
  return cvService.getCvById(+id);
};
