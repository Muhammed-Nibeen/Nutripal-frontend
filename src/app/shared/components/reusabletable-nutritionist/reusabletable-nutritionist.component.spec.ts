import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusabletableNutritionistComponent } from './reusabletable-nutritionist.component';

describe('ReusabletableNutritionistComponent', () => {
  let component: ReusabletableNutritionistComponent;
  let fixture: ComponentFixture<ReusabletableNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusabletableNutritionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusabletableNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
