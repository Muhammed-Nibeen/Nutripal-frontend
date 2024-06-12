import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutridashComponent } from './nutridash.component';

describe('NutridashComponent', () => {
  let component: NutridashComponent;
  let fixture: ComponentFixture<NutridashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutridashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutridashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
