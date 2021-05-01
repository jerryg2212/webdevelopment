

//// MAIN ////\\\\\\

//adds event listener to the delete icon
makeDeleteIcon();

//adds the form event to the creat list form and the add new item form
addNewItemForm.addEventListener('submit', formSubmitEvent);

//// FUNCTIONS ////\\\\\

    //adds the event listener to the delete icon
    function makeDeleteIcon() {
        deleteIcon.addEventListener('click', deleteIconClickEvent);
    }
    // event listener for the delete icon
        function deleteIconClickEvent(ev) {
            //creates the check mark icon
                let checkMark = document.createElement('img');
                checkMark.src = '../icons/checkmark.svg';
                checkMark.classList.add('checkDeleteIcons');
                checkMark.addEventListener('click', checkMarkClickEvent);
            //adds the checkmark and replaces the delete icon
                listContainer.replaceChild(checkMark, deleteIcon);
            //removes pointer events from the input and button and the sidenav lists constainer
                textInput.style.pointerEvents = 'none';
                submitButton.style.pointerEvents = 'none';
                sideNavListsContainer.style.pointerEvents = 'none';

            //gets the list of all the list items
                const listItems = document.querySelectorAll('#tasksList li');
                    //adds the onmouseover and onmouseoutevents
                    listItems.forEach((elm, index, arr) => {
                        elm.addEventListener('click', listElementClick);
                        elm.addEventListener('mouseover', listItemMouseOverEvent);
                        elm.addEventListener('mouseout', listItemMouseOutEvent);
                    })
                //adds event listener to all the list items so when you click on the you can delete them

        }
    //event listener for the check mark
        function checkMarkClickEvent(ev){
            
            //replaces the checkmark with the delete icon
                listContainer.replaceChild(deleteIcon, ev.target);
            //adds the pointer events back to the submit button and the text input and the side nav lists container
                textInput.style.pointerEvents = 'auto';
                submitButton.style.pointerEvents = 'auto';
                sideNavListsContainer.style.pointerEvents = 'auto';
            //removing the event listeners from the list elements
                //gets the list of all the list items
                    const listItems = document.querySelectorAll('#tasksList li');
            //creates the string to hold the url parameter so we know which json array element to delte
                let urlParameter = '';
                //adds the onmouseover and onmouseoutevents and checks if the element should be deleted
                //so it can add it to the url parameter
                    listItems.forEach((elm, index, arr) => {
                        elm.removeEventListener('click', listElementClick);
                        elm.removeEventListener('mouseover', listItemMouseOverEvent);
                        elm.removeEventListener('mouseout', listItemMouseOutEvent);
                        if(elm.classList.contains('listElementDelete')){
                            urlParameter += `${index} `;
                        }
                    })
                //if they do not want to delete anything
                    if(urlParameter.length <= 1){
                        window.location = window.location;
                    }else{
                        console.log(window.location);
                        window.location += `/delete/${urlParameter}`;
                    }
        }