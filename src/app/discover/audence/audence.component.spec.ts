import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudenceComponent } from './audence.component';

describe('AudenceComponent', () => {
  let component: AudenceComponent;
  let fixture: ComponentFixture<AudenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
