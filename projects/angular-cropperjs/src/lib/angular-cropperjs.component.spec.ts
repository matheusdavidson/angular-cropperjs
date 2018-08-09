import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCropperjsComponent } from './angular-cropperjs.component';

describe('AngularCropperjsComponent', () => {
  let component: AngularCropperjsComponent;
  let fixture: ComponentFixture<AngularCropperjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularCropperjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCropperjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
