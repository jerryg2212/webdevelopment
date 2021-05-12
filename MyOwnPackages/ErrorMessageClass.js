console.log('fuck you');
class ErrorMessage{
    constructor(message){
        this.message = message;
        this.errorMessage = document.createElement('span');;
        errorMessage.textContent = message;
    }
    insertBefore(container, beforeElement){
        console.log('insert before ran');
        container.insertBefore(this.errorMessage, beforeElement);
    }
    oneTimeBodyClickEvent(ev){
        ev.stopPropagation();
        this.errorMessage.remove();
        document.body.removeEventListener('click', this.oneTimeBodyClickEvent, true);
    }

}
