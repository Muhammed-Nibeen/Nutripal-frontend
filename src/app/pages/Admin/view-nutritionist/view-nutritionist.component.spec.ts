import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNutritionistComponent } from './view-nutritionist.component';

describe('ViewNutritionistComponent', () => {
  let component: ViewNutritionistComponent;
  let fixture: ComponentFixture<ViewNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewNutritionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
