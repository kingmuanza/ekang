import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicationsEditPage } from './publications-edit.page';

describe('PublicationsEditPage', () => {
  let component: PublicationsEditPage;
  let fixture: ComponentFixture<PublicationsEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
