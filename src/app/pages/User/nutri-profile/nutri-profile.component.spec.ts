import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriProfileComponent } from './nutri-profile.component';

describe('NutriProfileComponent', () => {
  let component: NutriProfileComponent;
  let fixture: ComponentFixture<NutriProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutriProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutriProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
