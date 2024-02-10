export class LoginPage {
    
    constructor() {
        this.userInfo = '#user';
        this.passInfo = '#pass';
        this.submitForm = '#submitForm';
    };

    escribirUsuario(user){
        cy.get(this.userInfo).type(user);
    };

    escribirContraseña(pass){
        cy.get(this.passInfo).type(pass);
    };

    clickLogin(){
        cy.get(this.submitForm).click();
    };
};