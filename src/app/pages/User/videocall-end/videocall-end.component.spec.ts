import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallEndComponent } from './videocall-end.component';

describe('VideocallEndComponent', () => {
  let component: VideocallEndComponent;
  let fixture: ComponentFixture<VideocallEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideocallEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideocallEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
