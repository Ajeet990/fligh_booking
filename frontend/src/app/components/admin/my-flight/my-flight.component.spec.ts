import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlightComponent } from './my-flight.component';

describe('MyFlightComponent', () => {
  let component: MyFlightComponent;
  let fixture: ComponentFixture<MyFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFlightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
