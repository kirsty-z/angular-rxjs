import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCommComponent } from './sub-comm.component';

describe('SubCommComponent', () => {
  let component: SubCommComponent;
  let fixture: ComponentFixture<SubCommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCommComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
