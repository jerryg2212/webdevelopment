
//adds the click event to the li elements in the side nav
addSideNavLiClickEvent();
//adds event listener to the side nav delete icon
    sideNavDeleteIcon.addEventListener('click', sideNavDeleteIconClickEvent);

//adds the form event to the creat list form and the add new item form
    createNewListForm.addEventListener('submit', formSubmitEvent);


//// FUNCTIONS ////\\\\\\

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
            window.location = `/list/${ev.target.textContent.toLowerCase()}`;
            /*let title = ev.target.textContent.toLowerCase();
            window.location = `/list/${title}`;*/
        }

//click event for the side nav delete icon
    function sideNavDeleteIconClickEvent(){
        //create check mark icon to replace the delete icon
            let checkmark = document.createElement('img');
            checkmark.src = '../icons/checkmark.svg';
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