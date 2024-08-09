import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedSlotsComponent } from './booked-slots.component';

describe('BookedSlotsComponent', () => {
  let component: BookedSlotsComponent;
  let fixture: ComponentFixture<BookedSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookedSlotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookedSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
