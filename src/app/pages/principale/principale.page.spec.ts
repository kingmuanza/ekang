import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrincipalePage } from './principale.page';

describe('PrincipalePage', () => {
  let component: PrincipalePage;
  let fixture: ComponentFixture<PrincipalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
