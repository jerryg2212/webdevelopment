


///// FUNCTIONS /////\\\\\


//submit event for the forms
function formSubmitEvent(ev){
    //holds the input wrapper
    let inputWrapper = ev.target.querySelector('div.inputWrapper');
    //get the value from the text input 
        let input = ev.target.querySelector('input');
        //adds a class to the input
            input.classList.add('invalidInput');
        let inputValue = input.value;
    
    //object to hold the value returned by the funtion that validates the input
    let validityResponse = validateTextInput(inputValue);

    //checks if it is valid if it is continue if not throw error
        if(validityResponse.error){
            ev.preventDefault();
            inputWrapper.appendChild(makeErrorBox(validityResponse.message));
            document.body.addEventListener('click', oneTimeBodyClickEvent, true);
        }
        //no error
        else{
            //if the error box is there
                if(errorBox = document.getElementById('errorBox')){
                    inputWrapper.removeChild(errorBox);
                }
        }

}

//click event for the body so when it is clicked it removes the error box
function oneTimeBodyClickEvent(ev){
    let errorBox = document.getElementById('errorBox');
    errorBox.parentElement.removeChild(errorBox);
    document.body.removeEventListener('click', oneTimeBodyClickEvent, true);
}

    //click event for the list elements after the delte icon is clicked
        function listElementClick(ev){
            ev.target.classList.toggle('listElementDelete');
        }

    //mouse over event for the list elements after the delete icon is clicked
        function listItemMouseOverEvent(ev){
            ev.target.classList.add('listElementHover');
        }

    //mouse out event for the list elements after the delete icon is clicked
        function listItemMouseOutEvent(ev){
            ev.target.classList.remove('listElementHover');
        }

    //function that is used to validate the users input
    function validateTextInput(value){
        //checks if the value is empty if it does it returns and object with a fasle value and error message
            if(value.length === 0){return {error: true,message: 'Cannot Be Blank'}}
        
        //if no errors are caught
            return {error: false, message: ''}
    }

//function that makes the error box given a message
    function makeErrorBox(message){
        let box = document.createElement('div');
        box.classList.add('errorBox');
        box.id = 'errorBox';
        let p = document.createElement('p');
        p.id = 'errorMessageP';
        p.textContent = message;
        box.appendChild(p);
        return box;
    }




