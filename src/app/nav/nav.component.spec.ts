import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

class ComponentTestRoute {}

// Para realizar los test de las navegaciones de router, podemos hacerlo con mock y usarlo en providers
// const routerMock = {
//     navigate() {}
// }

describe('Nav component', () => {

    let component: NavComponent
    let fixture: ComponentFixture<NavComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'home', component: ComponentTestRoute },
                    { path: 'cart', component: ComponentTestRoute }
                ])
            ],
            declarations: [
                NavComponent
            ],
            providers: [
                // {
                //     provide: Router, useValue: routerMock
                // }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate', () => {
        const router = TestBed.inject(Router);
        const spy = jest.spyOn(router, 'navigate');
        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']);
        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);
    });
    
    // Esto sería el test con mock, en este caso no comprobamos que la ruta es correcta ni nada, simplemente que ha redireccionado.
    // it('should navigate', () => {
    //     const router = TestBed.inject(Router);
    //     const spy = jest.spyOn(router, 'navigate');
    //     component.navTo('');
    //     expect(spy).toHaveBeenCalled();
    // });
    
});
