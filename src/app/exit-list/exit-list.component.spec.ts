import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitListComponent } from './exit-list.component';

describe('ExitListComponent', () => {
  let component: ExitListComponent;
  let fixture: ComponentFixture<ExitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
