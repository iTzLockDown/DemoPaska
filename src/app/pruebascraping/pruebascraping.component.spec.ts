import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebascrapingComponent } from './pruebascraping.component';

describe('PruebascrapingComponent', () => {
  let component: PruebascrapingComponent;
  let fixture: ComponentFixture<PruebascrapingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebascrapingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebascrapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
