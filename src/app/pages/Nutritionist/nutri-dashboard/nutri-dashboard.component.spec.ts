import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriDashboardComponent } from './nutri-dashboard.component';

describe('NutriDashboardComponent', () => {
  let component: NutriDashboardComponent;
  let fixture: ComponentFixture<NutriDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutriDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutriDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
