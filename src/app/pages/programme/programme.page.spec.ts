import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgrammePage } from './programme.page';

describe('ProgrammePage', () => {
  let component: ProgrammePage;
  let fixture: ComponentFixture<ProgrammePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
