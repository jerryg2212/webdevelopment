
class LoginRegister{
    constructor(){
        this.body = document.getElementById('loginRegisterBody');

    }
    //returns the form element
    getForm(){
        return this.body.querySelector(`form`);
    }
}