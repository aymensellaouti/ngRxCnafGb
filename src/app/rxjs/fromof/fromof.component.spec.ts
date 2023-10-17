import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromofComponent } from './fromof.component';

describe('FromofComponent', () => {
  let component: FromofComponent;
  let fixture: ComponentFixture<FromofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FromofComponent]
    });
    fixture = TestBed.createComponent(FromofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
