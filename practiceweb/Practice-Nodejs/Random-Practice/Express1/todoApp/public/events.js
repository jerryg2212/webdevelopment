
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