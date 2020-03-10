import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicationDisplayPage } from './publication-display.page';

describe('PublicationDisplayPage', () => {
  let component: PublicationDisplayPage;
  let fixture: ComponentFixture<PublicationDisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationDisplayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
