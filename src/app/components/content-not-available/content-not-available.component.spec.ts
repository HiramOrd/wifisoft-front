import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNotAvailableComponent } from './content-not-available.component';

describe('ContentNotAvailableComponent', () => {
  let component: ContentNotAvailableComponent;
  let fixture: ComponentFixture<ContentNotAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentNotAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentNotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
