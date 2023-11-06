import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('Form component', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [

            ],
            providers: [

            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('name field is requeried', () => {
        const nameField = component.form.get('name');
        nameField.setValue('');
        expect(nameField.valid).toBe(false);
    });
    
    it('name field has an error with more than 5 characters', () => {
        const nameField = component.form.get('name');
        nameField.setValue('test name');
        expect(nameField.valid).toBe(false);
    });
    
    it('name field is correct with less than 5 characters', () => {
        const nameField = component.form.get('name');
        nameField.setValue('Jack');
        expect(nameField.valid).toBe(true);
    });
    
    it('email filed is required', () => {
        const emailField = component.form.get('email');
        emailField.setValue('');
        expect(emailField.valid).toBe(false);
    });
    
    it('email must be valid', () => {
        const emailField = component.form.get('email');
        emailField.setValue('davidboclag@');
        expect(emailField.valid).toBe(false);
        emailField.setValue('davidboclag@gmail.com');
        expect(emailField.valid).toBe(true);
    });
    
    it('Form must be valid', () => {
        const nameField = component.form.get('name');
        const emailField = component.form.get('email');
        nameField.setValue('Jack');
        emailField.setValue('davidboclag@gmail.com');
        expect(component.form.valid).toBe(true);
    });
});