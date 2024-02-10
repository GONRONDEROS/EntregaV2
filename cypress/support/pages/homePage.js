export class HomePage {
    
    constructor(){
        this.onlineshoplink = '#onlineshoplink';
    };

    clickOnLineShopLink(){
        cy.get(this.onlineshoplink).click();
    };
};