import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperComponent } from './cropper.component';

describe('CropperComponent', () => {
  let component: CropperComponent;
  let fixture: ComponentFixture<CropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
