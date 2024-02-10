/// <reference types="cypress" />

import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShopingCartPage } from "../support/pages/shopingCartPage";

describe('Validar flow de compra de articulos', () => {

    let product;
    const loginPage = new LoginPage;
    const homePage = new HomePage;
    const productsPage = new ProductsPage; 
    const shopingCartPage = new ShopingCartPage;

    before(() => {
       
        cy.fixture('productos').then(productosFixture => {
            product = productosFixture;
        });
    });

    beforeEach(() => {
        cy.visit('');
        cy.get('#registertoggle').dblclick();
        loginPage.escribirUsuario(Cypress.env().user);
        loginPage.escribirContraseña(Cypress.env().pass);
        loginPage.clickLogin();
        homePage.clickOnLineShopLink();
    });

    it('Seleccionar 2 productos y verificar carro de compras', () => {
        
        //Verifico existencia de Productos en la Pagina de Productos
        cy.xpath(`//p[text()="${product.producto1.nombre}"]`).should('exist');
        cy.xpath(`//p[text()="${product.producto2.nombre}"]`).should('exist');

        //Agrego el primer producto
        productsPage.agregarProducto(product.producto1.nombre);

        //Agrego el segundo producto X 2
        productsPage.agregarProducto(product.producto2.nombre);
        productsPage.agregarProducto(product.producto2.nombre);
        

        //Verifico existencia de boton de acceso al Carro de Compras y accedo al Carro de compras
        cy.contains('button', "Go to shopping cart").should('exist').click();

        //Verifico que en el Carro de Compras la cantidad, y precio del primer producto sea la correcta
        shopingCartPage.verificarProductosYPreciosIndividuales(product.producto1.cantidad,product.producto1.nombre,product.producto1.precio,((product.producto1.precio)*(product.producto1.cantidad))).should('exist');
        
        //Verifico que en el Carro de Compras la cantidad, y precio del segundo producto sea la correcta
        shopingCartPage.verificarProductosYPreciosIndividuales(product.producto2.cantidad,product.producto2.nombre,product.producto2.precio,((product.producto2.precio)*(product.producto2.cantidad))).should('exist');
        
        //Confirmo existencia de boton de Precio Total de la compra y clickeo   
        cy.xpath('//button[text()="Show total price"]').should('exist').click();
        
        //Chequeo Precio Total de la Compra en el Carrito de Compras
        cy.log(`Confirmar precio total de la compra es igual a ${(((product.producto1.precio)*(product.producto1.cantidad)))+(((product.producto2.precio)*(product.producto2.cantidad)))}`);
        shopingCartPage.verificarCostoTotal(((((product.producto1.precio)*(product.producto1.cantidad)))+(((product.producto2.precio)*(product.producto2.cantidad)))).toFixed(2)).should('exist');
    });
});



