import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpassotpComponent } from './forgotpassotp.component';

describe('ForgotpassotpComponent', () => {
  let component: ForgotpassotpComponent;
  let fixture: ComponentFixture<ForgotpassotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotpassotpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotpassotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
