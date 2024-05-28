import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfoodComponent } from './showfood.component';

describe('ShowfoodComponent', () => {
  let component: ShowfoodComponent;
  let fixture: ComponentFixture<ShowfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowfoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
