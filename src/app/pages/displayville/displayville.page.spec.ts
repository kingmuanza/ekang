import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplayvillePage } from './displayville.page';

describe('DisplayvillePage', () => {
  let component: DisplayvillePage;
  let fixture: ComponentFixture<DisplayvillePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayvillePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayvillePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
