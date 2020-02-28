import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicationsViewPage } from './publications-view.page';

describe('PublicationsViewPage', () => {
  let component: PublicationsViewPage;
  let fixture: ComponentFixture<PublicationsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
