import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriverifyOtpComponent } from './nutriverify-otp.component';

describe('NutriverifyOtpComponent', () => {
  let component: NutriverifyOtpComponent;
  let fixture: ComponentFixture<NutriverifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutriverifyOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutriverifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
