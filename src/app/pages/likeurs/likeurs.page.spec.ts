import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikeursPage } from './likeurs.page';

describe('LikeursPage', () => {
  let component: LikeursPage;
  let fixture: ComponentFixture<LikeursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
