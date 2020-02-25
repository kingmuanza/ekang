import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmisPage } from './amis.page';

describe('AmisPage', () => {
  let component: AmisPage;
  let fixture: ComponentFixture<AmisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
