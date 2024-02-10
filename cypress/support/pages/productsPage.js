export class ProductsPage {

    constructor() {
        this.closeButton = '//button[text()="Close"]';
    }

    agregarProducto(product) {
        cy.log(`Agregar una unidad de producto ${product} al Carro de Compras`);
        cy.xpath(`//button[@name="${product}"]`).click();
        cy.xpath(this.closeButton).click();
    };
};