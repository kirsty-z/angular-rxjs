import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommComponent } from './comm.component';

describe('CommComponent', () => {
  let component: CommComponent;
  let fixture: ComponentFixture<CommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
