import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSceneSidePanelComponent } from './create-scene-side-panel.component';

describe('CreateSceneSidePanelComponent', () => {
  let component: CreateSceneSidePanelComponent;
  let fixture: ComponentFixture<CreateSceneSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSceneSidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSceneSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
