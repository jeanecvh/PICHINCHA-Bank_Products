import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

fdescribe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct button color when disabled is true', () => {
    component.disabled = true;
    component.buttonColor = 'primary';

    const buttonColor = component.getButtonColor();

    expect(buttonColor).toBe('#eee087b5');
  });



  it('should set the correct button color when disabled is false', () => {
    component.disabled = false;
    component.buttonColor = 'primary';

    const buttonColor = component.getButtonColor();

    expect(buttonColor).toBe('#fd0');
  })

  it('should emit clicked event when onClick is called and disabled is false', () => {
    component.disabled = false;
    spyOn(component.clicked, 'emit');

    component.onClick();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when onClick is called and disabled is true', () => {
    component.disabled = true;
    spyOn(component.clicked, 'emit');

    component.onClick();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });
});
