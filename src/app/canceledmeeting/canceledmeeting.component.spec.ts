import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledmeetingComponent } from './canceledmeeting.component';

describe('CanceledmeetingComponent', () => {
  let component: CanceledmeetingComponent;
  let fixture: ComponentFixture<CanceledmeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanceledmeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanceledmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
