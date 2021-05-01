const body = document.body;
    //div container that holds the delete icon, the form, and the list elements
        const listContainer = document.getElementById('listContainer');
            const deleteIcon = document.getElementById('deleteIcon');
            const addNewItemForm = document.getElementById('addNewItemForm');
                const textInput = document.getElementById('textInput');
                const submitButton = document.querySelector('#newItemButton');
    //div container that holds all the lists on the side nav
        const sideNavListsContainer = document.getElementById('sideNavListsContainer');
        // container that wraps the form
            const sideNavFormWrapper = document.getElementById('sideNavFormWrapper');
            //form that creates a new list
                const createNewListForm = document.getElementById('createNewListForm');
                //button to create a new list
                    const newListButton = document.getElementById('newListButton');
        //container that holds all the lists
            const listsContainer = document.getElementById('listsContainer');
            //ul element that holds all the created lists
                const sideNavUl = document.getElementById('sideNavUl');
            //delete icon for the side nav
                const sideNavDeleteIcon = document.getElementById('sideNavDeleteIcon');

//adds event listener to the delete icon
    makeDeleteIcon();
//adds the click event to the li elements in the side nav
    addSideNavLiClickEvent();
//adds event listener to the side nav delete icon
    sideNavDeleteIcon.addEventListener('click', sideNavDeleteIconClickEvent);
//adds the form event to the creat list form and the add new item form
    addNewItemForm.addEventListener('submit', formSubmitEvent);
    createNewListForm.addEventListener('submit', formSubmitEvent);



//functions
    //adds the event listener to the delete icon
        function makeDeleteIcon() {
            deleteIcon.addEventListener('click', deleteIconClickEvent);
        }
        // event listener for the delete icon
            function deleteIconClickEvent(ev) {
                //creates the check mark icon
                    let checkMark = document.createElement('img');
                    checkMark.src = '../checkmark.svg';
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
        
    //adds click events to the li elements in the side nav
        function addSideNavLiClickEvent(){
            let listElements = sideNavUl.querySelectorAll('li');
            listElements.forEach((elm, index, arr) => {
                elm.addEventListener('click', sideNavLiClickEvent);
            })
        }
        //click event for the list elements in the side nav
            function sideNavLiClickEvent(ev){
                //gets all the li elements in the ul so we can get the index of the one that
                // is clicked inorder to redirect to the correct page
                let allLists = document.querySelectorAll('#sideNavUl li');
                let index = Array.from(allLists).indexOf(ev.target);
                window.location = `/list/${index}`;
                /*let title = ev.target.textContent.toLowerCase();
                window.location = `/list/${title}`;*/
            }
    
    //click event for the side nav delete icon
        function sideNavDeleteIconClickEvent(){
            //create check mark icon to replace the delete icon
                let checkmark = document.createElement('img');
                checkmark.src = '../checkmark.svg';
                checkmark.id = "sideNavCheckMark";
                checkmark.classList.add('checkDeleteIcons');
                checkmark.addEventListener('click', sideNavCheckMarkClickEvent);
                listsContainer.replaceChild(checkmark, sideNavDeleteIcon);
            
            //making it so you cannot click on other elements
                // the side nav form wrapper
                    sideNavFormWrapper.style.pointerEvents = 'none';
                // the list container 
                    listContainer.style.pointerEvents = 'none';
                
            //adding the event listeners to the list elements and removing their one that swithes to the clicked list
                //gets the list of all the list items
                const listItems = document.querySelectorAll('#sideNavUl li');
                //adds the onmouseover and onmouseoutevents
                listItems.forEach((elm, index, arr) => {
                    elm.removeEventListener('click', sideNavLiClickEvent);
                    elm.addEventListener('click', listElementClick);
                    elm.addEventListener('mouseover', listItemMouseOverEvent);
                    elm.addEventListener('mouseout', listItemMouseOutEvent);
                })


        }
    //click event for the side nav check mark icon
        function sideNavCheckMarkClickEvent(ev){
            //replaces the checkmark with the delete icon
            listsContainer.replaceChild(sideNavDeleteIcon, ev.target);
            //adds the pointer events back to the list container and the side nav form wrapper
                listContainer.style.pointerEvents = 'auto';
                sideNavFormWrapper.style.pointerEvents = 'auto';
            //removing the event listeners from the list elements and adding back the click event that switched the list
                //gets the list of all the list items
                    const listItems = document.querySelectorAll('#sideNavUl li');
            //creates the string to hold the url parameter so we know which json array element to delte
                let urlParameter = '';
                //adds the onmouseover and onmouseoutevents and checks if the element should be deleted
                //so it can add it to the url parameter
                    listItems.forEach((elm, index, arr) => {
                        elm.removeEventListener('click', listElementClick);
                        elm.removeEventListener('mouseover', listItemMouseOverEvent);
                        elm.removeEventListener('mouseout', listItemMouseOutEvent);
                        elm.addEventListener('click', sideNavLiClickEvent);
                        if(elm.classList.contains('listElementDelete')){
                            urlParameter += `${index} `;
                        }
                    })
                //if they do not want to delete anything
                    if(urlParameter.length <= 1){
                        window.location = window.location;
                    }else{
                        console.log(window.location);
                        window.location += `/delete/lists/${urlParameter}`;
                    }
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