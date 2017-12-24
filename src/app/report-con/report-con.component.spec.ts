import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConComponent } from './report-con.component';

describe('ReportConComponent', () => {
  let component: ReportConComponent;
  let fixture: ComponentFixture<ReportConComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
