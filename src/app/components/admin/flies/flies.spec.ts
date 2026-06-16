import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flies } from './flies';

describe('Flies', () => {
  let component: Flies;
  let fixture: ComponentFixture<Flies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flies],
    }).compileComponents();

    fixture = TestBed.createComponent(Flies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
