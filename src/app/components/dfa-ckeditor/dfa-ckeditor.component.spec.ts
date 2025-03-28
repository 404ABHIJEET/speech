import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfaCkeditorComponent } from './dfa-ckeditor.component';

describe('DfaCkeditorComponent', () => {
  let component: DfaCkeditorComponent;
  let fixture: ComponentFixture<DfaCkeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfaCkeditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfaCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
