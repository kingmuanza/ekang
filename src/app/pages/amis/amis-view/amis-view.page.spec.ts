import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmisViewPage } from './amis-view.page';

describe('AmisViewPage', () => {
  let component: AmisViewPage;
  let fixture: ComponentFixture<AmisViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmisViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmisViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
