import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideRequestDetailsComponent } from './ride-request-details.component';

describe('RideRequestDetailsComponent', () => {
  let component: RideRequestDetailsComponent;
  let fixture: ComponentFixture<RideRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideRequestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
