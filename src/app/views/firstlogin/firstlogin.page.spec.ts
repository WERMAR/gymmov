import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstloginPage } from './firstlogin.page';

describe('FirstloginPage', () => {
  let component: FirstloginPage;
  let fixture: ComponentFixture<FirstloginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
