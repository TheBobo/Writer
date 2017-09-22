import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewStoryComponent } from './modal-new-story.component';

describe('ModalNewStoryComponent', () => {
  let component: ModalNewStoryComponent;
  let fixture: ComponentFixture<ModalNewStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
