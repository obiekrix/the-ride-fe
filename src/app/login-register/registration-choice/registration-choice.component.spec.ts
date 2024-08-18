import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationChoiceComponent } from './registration-choice.component';

describe('ChooseRegistrationTypeComponent', () => {
  let component: RegistrationChoiceComponent;
  let fixture: ComponentFixture<RegistrationChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
