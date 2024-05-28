import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriRegisterComponent } from './nutri-register.component';

describe('NutriRegisterComponent', () => {
  let component: NutriRegisterComponent;
  let fixture: ComponentFixture<NutriRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutriRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutriRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
