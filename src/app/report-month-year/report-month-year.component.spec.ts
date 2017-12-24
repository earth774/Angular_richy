import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMonthYearComponent } from './report-month-year.component';

describe('ReportMonthYearComponent', () => {
  let component: ReportMonthYearComponent;
  let fixture: ComponentFixture<ReportMonthYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMonthYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMonthYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
