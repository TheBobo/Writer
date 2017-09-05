import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersNavComponent } from './chapters-nav.component';

describe('ChaptersNavComponent', () => {
  let component: ChaptersNavComponent;
  let fixture: ComponentFixture<ChaptersNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
