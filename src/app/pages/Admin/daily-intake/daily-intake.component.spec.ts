import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyIntakeComponent } from './daily-intake.component';

describe('DailyIntakeComponent', () => {
  let component: DailyIntakeComponent;
  let fixture: ComponentFixture<DailyIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyIntakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
