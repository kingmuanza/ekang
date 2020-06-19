import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificationPage } from './modification.page';

describe('ModificationPage', () => {
  let component: ModificationPage;
  let fixture: ComponentFixture<ModificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
