import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriLoginComponent } from './nutri-login.component';

describe('NutriLoginComponent', () => {
  let component: NutriLoginComponent;
  let fixture: ComponentFixture<NutriLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutriLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutriLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
