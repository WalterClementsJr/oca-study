import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuestionComponent } from './random-question.component';

describe('RandomQuestionComponent', () => {
  let component: RandomQuestionComponent;
  let fixture: ComponentFixture<RandomQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
