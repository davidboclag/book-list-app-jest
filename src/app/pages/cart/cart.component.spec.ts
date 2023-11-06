import { CartComponent } from "./cart.component"
import { ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { BookService } from "../../services/book.service";
import { Book } from "../../models/book.model";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
];

const MatDialogMock = {
    open() {
        return {
            afterClosed: () => of(true)
        }
    }
}

describe('Cart component', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                // Importante que sea HttpClientTestingModule y no HttpClientModule, ya que estaríamos realizadon peticiones reales.
                HttpClientTestingModule
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                // CartComponent, //component2
                BookService,
                {
                    provide: MatDialog, useValue: MatDialogMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook);
    });

    afterEach(() => {
        fixture.destroy();
        jest.resetAllMocks();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Esto es otra forma de importar el component, y para ello debe estar importado el componente en providers
    // it('should create', inject([CartComponent], (component2: CartComponent) => {
    //     expect(component2).toBeTruthy();
    // }));


    it('getTotalPrice return an amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0); // Comprueba que totalPrice sea mayor a 0
        // expect(totalPrice).not.toBe(0); // Comprueba que totalPrice no sea 0
        // expect(totalPrice).not.toBeNull(); // Comprueba que totalPrice no sea null
    });

    it('onInputNumberChange increments correctly', () => {
        const action = 'plus';
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };

        // const service1 = (component as any)._bookService; // No es correcto, porque perdemos el tipado y podemos acceder a el metodo privado
        // const service2 = component["_bookService"]; // No es correcto porque nos saltaríamos el metodo privado
        // const service3 = TestBed.get(BookService); // Esto está deprecado, es para versiones inferior a angular 9, pero es la forma correcta
        // const service = fixture.debugElement.injector.get(BookService); // Esto es correcto, pero lo hemos creado en una variable global, por si en un futuro se usa más de una vez.

        // Los espías hay que crearlos/configurarlos antes de llamar al método.
        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null); // Podemos obviarlo, pero lo vamos a espiar como null, ya que en otro it anterior ya tiene su propio test unitario.
        expect(book.amount).toBe(2);

        // Una vez que lo tenemos todo, entonces es cuando llamamos al método y realizamos las comprobaciones deseadas con expect().
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(3);
        // expect(book.amount === 3).toBe(true); // Esta es otra forma de comprobar la línea anterior
        expect(spy1).toHaveBeenCalledTimes(1); // Comprueba que ha sido llamado (1 vez)
        expect(spy2).toHaveBeenCalledTimes(1); // Cuando desconocemos cuantas veces puede llegar a llamarse: toHaveBeenCalled();
    });

    it('onInputNumberChange decrement correctly', () => {
        const action = 'minus';
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };

        // const service1 = (component as any)._bookService; // No es correcto, porque perdemos el tipado y podemos acceder a el metodo privado
        // const service2 = component["_bookService"]; // No es correcto porque nos saltaríamos el metodo privado
        // const service3 = TestBed.get(BookService); // Esto está deprecado, es para versiones inferior a angular 9, pero es la forma correcta
        // const service = fixture.debugElement.injector.get(BookService); // Esto es correcto, pero lo hemos creado en una variable global, por si en un futuro se usa más de una vez.

        // Los espías hay que crearlos/configurarlos antes de llamar al método.
        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null); // Podemos obviarlo, pero lo vamos a espiar como null, ya que en otro it anterior ya tiene su propio test unitario.
        expect(book.amount).toBe(2);

        // Una vez que lo tenemos todo, entonces es cuando llamamos al método y realizamos las comprobaciones deseadas con expect().
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(1);
        // expect(book.amount === 1).toBe(true); // Esta es otra forma de comprobar la línea anterior
        expect(spy1).toHaveBeenCalledTimes(1); // Comprueba que ha sido llamado (1 vez)
        expect(spy2).toHaveBeenCalledTimes(1); // Cuando desconocemos cuantas veces puede llegar a llamarse: toHaveBeenCalled();
    });

    it('onClearBooks works correctly', () => {
        component.listCartBook = listBook;
        const spy1 = jest.spyOn(component as any, '_clearListCartBook');
        const spy2 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    // Esto no es correcto, porque un método privado se debe evaluar desde el público como en el caso anterior, pero en todo caso se haría dela siguiente manera
    it('_clearListCartBook works correctly', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        component.listCartBook = listBook;
        // (component as any)._clearListCartBook();
        component["_clearListCartBook"]();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1);
    });


})