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