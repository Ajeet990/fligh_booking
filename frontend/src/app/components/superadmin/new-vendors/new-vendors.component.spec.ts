import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVendorsComponent } from './new-vendors.component';

describe('NewVendorsComponent', () => {
  let component: NewVendorsComponent;
  let fixture: ComponentFixture<NewVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVendorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
