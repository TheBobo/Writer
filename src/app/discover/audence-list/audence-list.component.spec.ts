import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudenceListComponent } from './audence-list.component';

describe('AudenceListComponent', () => {
  let component: AudenceListComponent;
  let fixture: ComponentFixture<AudenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
