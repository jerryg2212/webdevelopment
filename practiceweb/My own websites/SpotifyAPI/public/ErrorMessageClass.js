console.log('fuck you');
class ErrorMessage{
    constructor(message, id = undefined){
        this.message = message;
        this.errorMessage = document.createElement('span');;
        if(id) {this.errorMessage.setAttribute('id', id);}
        this.errorMessage.textContent = message;
    }
    insertBefore(container, beforeElement){
        console.log('insert before ran');
        container.insertBefore(this.errorMessage, beforeElement);
    }

}
