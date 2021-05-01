
class HomePage{
    constructor(){
        this.body = document.body;
    }
    loadPage (){
        this.makePage();
    }
    makePage(){
        this.body.appendChild(this.makeHeader());
    }
    makeHeader(){
        let h1 = document.createElement('h1');
        h1.textContent = 'Hello I am practicing paths';
        console.log(h1.textContent);
        return h1;
    }
}
const homePage = new HomePage();
console.log('work ran');
homePage.loadPage();