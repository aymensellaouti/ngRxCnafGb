import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CvComponent } from "./cv.component";
import { CvService } from "../services/cv.service";
import { Spy, provideAutoSpy } from "jasmine-auto-spies";
import { Cv } from "../model/cv";
import { SubscriberSpy, subscribeSpyTo } from "@hirez_io/observer-spy";
import { NO_ERRORS_SCHEMA } from "@angular/core";
fdescribe("CvComponent", () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;
  let cvServiceSpy: Spy<CvService>;
  let fakeCvs: Cv[] = [
    new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
    new Cv(2, "nidhal", "jelassi", "enfant", "       ", "1234", 41),
    new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
  ];
  let cvs$: SubscriberSpy<Cv[]>;
  let juniors$: SubscriberSpy<Cv[]>;
  let seniors$: SubscriberSpy<Cv[]>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvComponent],
      providers: [provideAutoSpy(CvService)],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    cvServiceSpy = TestBed.inject<any>(CvService);
    cvServiceSpy.getCvs.and.nextWith(fakeCvs);
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should get FakeCvs", () => {
    cvs$ = subscribeSpyTo(component.cvs$);
    expect(cvs$.getLastValue()).toEqual(fakeCvs);
  });
  it("should get Juniors", () => {
    juniors$ = subscribeSpyTo(component.cvsJuniors$);
    expect(juniors$.getLastValue()?.length).toBe(1);
  });
  it("should get Seniors", () => {
    seniors$ = subscribeSpyTo(component.cvsSeniors$);
    expect(seniors$.getLastValue()?.length).toEqual(2);
  });
});
