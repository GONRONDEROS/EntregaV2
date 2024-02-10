export class ShopingCartPage {
    
    verificarProductosYPreciosIndividuales(quantity, product, price, total) {
        cy.log(`Confirmar existencia de producto ${product}, cantidad incluida en el Carro de Compras igual a ${quantity} y precio total igual a ${total}`);
        return cy.xpath(`//li//child::div//child::p[text()="${quantity}"]//following-sibling::p[text()="${product}"]//following-sibling::p[text()="${price}"]//following-sibling::p[text()="${total}"]`);
    };

    verificarCostoTotal(price) {
        return cy.xpath(`//p[@id="price"]//child::b[text()="${price}"]`);
    };
};