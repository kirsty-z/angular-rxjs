import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxComponentComponent } from './rx-component.component';

describe('RxComponentComponent', () => {
  let component: RxComponentComponent;
  let fixture: ComponentFixture<RxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
