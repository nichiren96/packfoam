import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExitComponent } from './single-exit.component';

describe('SingleExitComponent', () => {
  let component: SingleExitComponent;
  let fixture: ComponentFixture<SingleExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
