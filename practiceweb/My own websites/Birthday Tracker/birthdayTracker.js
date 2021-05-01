/* Known Defects
*/

class BirthdayPage{
    constructor(){
        this.body = document.getElementById("birthdayBody");
    }
    loadPage(){
        this.makePage();
    }
    makePage(){
        this.pageElements();
        this.showNames();
    }
    pageElements(){
        this.makeBody();
        this.makeBirthdayList();
    }
    makeBody(){
       const birthdayBodyStyles = {
            backgroundColor : "rgb(243, 255, 78)",
            width : '100%',
            height : '100%',
            margin : '0px',
        }
        Object.assign(this.body.style, birthdayBodyStyles);

    }
    makeBirthdayList(){
        //container to hold the buttons and list of birthdays
            let birthdayListContainer = document.createElement('div');
            birthdayListContainer.setAttribute('id', 'birthdayListContainer');
            birthdayListContainer.style.minHeight = `${window.screen.height * .8}px`;
        //adding the add btn
            birthdayListContainer.appendChild(this.makebtnContainer());
        // makeing a div to hold the birthdays 
            let birthdayList = document.createElement('div');
            birthdayList.setAttribute('id', 'birthdayList');
            birthdayListContainer.appendChild(birthdayList);
        //appending the container to the body
        this.body.appendChild(birthdayListContainer);
    }
    makebtnContainer(){
        // container to hold all buttons
        let container = document.createElement('div');
        const containerStyles = {
            width : '100%',
            paddingTop : '10px'
        }
        Object.assign(container.style, containerStyles);

        container.appendChild(this.makeAddBirthdaybtn());
        container.appendChild(this.makeEditAndDeleteButtons());
        container.appendChild(this.makeSortRadioButtons());
        return container;
    }
        //edit button
        makeEditbtn(){
            let editbtn = document.createElement('button');
            editbtn.setAttribute('id', 'editbtn');
            editbtn.textContent = 'Edit';
            editbtn.addEventListener('click',this.editButtonClick.bind(this));
            return editbtn;
        }
            // on click event for the edit button
                editButtonClick(){
                    console.log('edit button was clicked');
                    //making it so you cannot click on the add button
                        document.getElementById('addbtn').style.pointerEvents = 'none';
                    //making it so you cannot click on the delete button
                        document.getElementById('deletebtn').style.pointerEvents = 'none';
                    //making it so you cannot click the edit button again
                        document.getElementById('editbtn').style.pointerEvents = 'none';
                    // making it so you cannot click on the sort buttons
                        document.getElementById('radioBtnContainer').style.pointerEvents = 'none';
                    //making the done button
                        let doneBtn = document.createElement('button');
                        doneBtn.setAttribute('id', 'doneBtn');
                        doneBtn.textContent = 'Done';
                        doneBtn.addEventListener('click', this.doneBtnClick);
                        //inserting the done button
                            document.getElementById('birthdayListContainer').insertBefore(doneBtn, document.getElementById('birthdayList'));
                    // lowering the margin on the birthday list 
                        document.getElementById('birthdayList').style.marginTop = '0px';

                    //getting all the table row nodes from the table
                        let tableRows = document.querySelectorAll('table tr');
                    //adding a click event listerner that lets the user edit the cell to the tr's
                        tableRows.forEach(function(element, index, arr){
                            if(Array.from(tableRows).indexOf(element) != 0){
                                element.addEventListener('click', tableRowEditClick, false);
                            }

                        });
                }
                    // click event for the done button
                        doneBtnClick(){
                            console.log('done click event ran');
                            document.getElementById('editbtn').style.pointerEvents = 'auto';
                            document.getElementById('deletebtn').style.pointerEvents = 'auto';
                            document.getElementById('addbtn').style.pointerEvents = 'auto';
                            document.getElementById('radioBtnContainer').style.pointerEvents = 'auto';
                            //removeing the done button
                                document.getElementById('birthdayListContainer').removeChild(document.getElementById('doneBtn'));
                            // returning the margin on the birthday list to its original value
                                document.getElementById('birthdayList').style.marginTop = '20px';
                            
                            //removing the event listener from the all the lis
                                //getting all the table row nodes from the table
                                    let tableRows = document.querySelectorAll('table tr');
                            tableRows.forEach(function(element, index, arr){
                                console.log(element);
                                element.removeEventListener('click', tableRowEditClick, false);
                            });
                            // removing the document click event
                            document.removeEventListener('click', exitInputClick, true);
                        }
        makeDeletebtn(){
            let deletebtn = document.createElement('button');
            deletebtn.setAttribute('id', 'deletebtn');
            deletebtn.textContent = 'Delete';
            deletebtn.addEventListener('click', this.deleteButtonClick.bind(this));
            return deletebtn; 
        }
            //click event function for the delete btn
                deleteButtonClick(){
                    console.log('delete click event');
                    //making it so you cannot click on other buttons
                        document.getElementById('editbtn').style.pointerEvents = 'none';
                        document.getElementById('deletebtn').style.pointerEvents = 'none';
                        document.getElementById('addbtn').style.pointerEvents = 'none';
                        document.getElementById('radioBtnContainer').style.pointerEvents = 'none';

                    //making the done button
                        let doneBtn = document.createElement('button');
                        doneBtn.setAttribute('id', 'doneDeleteBtn');
                        doneBtn.textContent = 'Done';
                        doneBtn.addEventListener('click', doneDeleteButtonClick.bind(this));
                        //inserting the done button
                            document.getElementById('birthdayListContainer').insertBefore(doneBtn, document.getElementById('birthdayList'));
                    // lowering the margin on the birthday list to compensate for the newly inserted done button
                        document.getElementById('birthdayList').style.marginTop = '0px';

                    //adding event click event listeners to all the table rows
                    Array.from(document.getElementById('birthdaysTable').querySelectorAll('tr')).forEach((elm, index, arr) =>{
                        elm.addEventListener('click', tableRowsClick_Delete);
                    });
                }
        makeEditAndDeleteButtons(){
            let container = document.createElement('div');
            container.setAttribute('id', 'editAndDeleteButtonsContainer');
            container.appendChild(this.makeEditbtn());
            container.appendChild(this.makeDeletebtn());
            return container;
        }
        // makes the radios buttons
        makeSortRadioButtons(){
            //radio buttons
                    // container to hold the radio buttons and label
                    let radioBtnContainer = document.createElement('div');
                    radioBtnContainer.setAttribute('id', 'radioBtnContainer');
                // title paragraph
                    let radioLabelP = document.createElement('p');
                    radioLabelP.textContent = 'Sort';
                // ABC sort radio button and label
                    let abcRadioButton = document.createElement('input');
                    abcRadioButton.setAttribute('id', 'abcRadioButton');
                    abcRadioButton.type = 'radio';
                    abcRadioButton.name = 'Sort';
                    let abcRadioButtonLabel = document.createElement('label');
                    abcRadioButtonLabel.textContent = 'Alphabetical';
                    abcRadioButtonLabel.appendChild(abcRadioButton);
                    //onchange event handler 

                // clostest sort radio button and label
                    let clostestRadioButton = document.createElement('input');
                    clostestRadioButton.setAttribute('id', 'clostestRadioButton');
                    clostestRadioButton.type = 'radio';
                    clostestRadioButton.name = 'Sort';
                    clostestRadioButton.defaultChecked = true;
                    let clostestRadioButtonLabel = document.createElement('label');
                    clostestRadioButtonLabel.textContent = 'Closest';
                    clostestRadioButtonLabel.appendChild(clostestRadioButton);
                    // onchange event handler
                        clostestRadioButton.addEventListener('change', this.showNames.bind(this));
                        abcRadioButton.addEventListener('change', this.showNames.bind(this));
                //appending the elements to the container
                //   radioBtnContainer.appendChild(radioLabelP);
                    radioBtnContainer.appendChild(abcRadioButtonLabel);
                    radioBtnContainer.appendChild(clostestRadioButtonLabel);
                return radioBtnContainer;
        }
    makeAddBirthdaybtn(){
        let addbtn = document.createElement('button');
        addbtn.setAttribute('id', 'addbtn');
        const addbtnStyles = {
            border : '2px solid rgb(243, 255, 78)',
            padding: '10px',
            margin : "10px auto",
            color: 'rgb(243, 255, 78)',
            textShadow : '.5px .5px black',
            backgroundColor : 'white',
            fontWeight: 'bold',
            letterSpacing : '.7px',
            fontSize: '16px',
            display : 'block'
        }
        Object.assign(addbtn.style, addbtnStyles);
        addbtn.textContent = 'New Birthday';
        addbtn.addEventListener('click', this.addbtnonClick.bind(this), true);
        return addbtn;
    }
    addbtnonClick(){
        document.getElementById('addbtn').removeEventListener('click', this.addbtnClick);
        // creating the elements
            // cancel button
                let cancelimg = document.createElement('img');
                    cancelimg.src = 'cancel.svg';
                    cancelimg.setAttribute('id', 'cancelimg');
                //cancel button click event
                    cancelimg.addEventListener('click', function (){
                        this.body.removeChild(document.getElementById('addpopupBox'));
                        //console.log(this);
                    }.bind(this));
            //container box
                let addpopupBox = document.createElement('div');
                    addpopupBox.setAttribute('id', 'addpopupBox');
            //form
                let addBirthdayform = document.createElement('form');
                    addBirthdayform.setAttribute('id', 'addBirthdayform');
                    addBirthdayform.addEventListener('submit', function(e){
                         e.stopPropagation();
                         e.preventDefault();
                         if(this.validateBirthday()){
                            this.showNames();
                            this.body.removeChild(document.getElementById('addpopupBox'));
                         }

                     }.bind(this));
            //label for name
                let namelabelp = document.createElement('p');
                    namelabelp.setAttribute('id', 'namelabel');
                // text for the name label
                    namelabelp.textContent = "Name"
            //input name
                let nameinput = document.createElement('input');
                    nameinput.setAttribute('id', 'nameinput');
                    nameinput.required = true;
            //birthday title
                let birthdayp = document.createElement('p');
                    birthdayp.setAttribute('id', 'birthdaylabel');
                    birthdayp.textContent = "Birthday"
            //birthday container
                let birthdayDateul = document.createElement('ul');
                    birthdayDateul.setAttribute('id', 'birthdayDateul');
            // day li
                let dayli = document.createElement('li');
            //month li
                let monthli = document.createElement('li');
            //yearli
                let yearli = document.createElement('li');
            //daylabel
                let daylabel = document.createElement('label');
                    daylabel.setAttribute('id', 'daylabel');
                    daylabel.textContent = 'Day: '
            //day input
                let dayinput = document.createElement('input');
                    dayinput.setAttribute('id', 'dayinput');
                    dayinput.required = true;
            //month label
                let monthlabel = document.createElement('label');
                    monthlabel.setAttribute('id', 'monthlabel');
                    monthlabel.textContent = 'Month: '
            //month input
                let monthinput = document.createElement("input");
                    monthinput.required = true;
                    monthinput.setAttribute('id', 'monthinput');
            // year label 
                let yearlabel = document.createElement('label');
                    yearlabel.setAttribute('id', 'yearlabel');
                    yearlabel.textContent = "Year: "
            // year input
                let yearinput = document.createElement('input');
                    yearinput.setAttribute('id', 'yearinput');
                    yearinput.setAttribute('placeholder', 'optional');
            //year optional span
                let yearOptionalspan = document.createElement('span');
                    yearOptionalspan.textContent = 'optional';
            // add submit button
                    let addBirthdaysubmitbtn = document.createElement('button');
                        //event listener for the submit button
                        addBirthdaysubmitbtn.setAttribute('id', 'addBirthdaySubmitBtn');
                        addBirthdaysubmitbtn.setAttribute('type', 'submit');
                        addBirthdaysubmitbtn.textContent = 'Add';
                       /* addBirthdaysubmitbtn.addEventListener('click', function(e){
                           // e.stopPropagation();
                            e.preventDefault();
                            console.log(e);
                           // console.log(this);
                            console.log('it didnt');
                            this.validateBirthday();

                            console.log('it ran');
                        }.bind(this));*/

        //appending the elements
            dayli.appendChild(daylabel);
            dayli.appendChild(dayinput);
            monthli.appendChild(monthlabel);
            monthli.appendChild(monthinput);
            yearli.appendChild(yearlabel);
            yearli.appendChild(yearinput);
            birthdayDateul.appendChild(dayli);
            birthdayDateul.appendChild(monthli);
            birthdayDateul.appendChild(yearli);
            addBirthdayform.appendChild(namelabelp);
            addBirthdayform.appendChild(nameinput);
            addBirthdayform.appendChild(birthdayp);
            addBirthdayform.appendChild(birthdayDateul);
            addBirthdayform.appendChild(addBirthdaysubmitbtn);
            addpopupBox.appendChild(cancelimg);
            addpopupBox.appendChild(addBirthdayform);
            this.body.appendChild(addpopupBox);
           // console.log(this.body.clientWidth);
           // console.log(document.getElementById('addpopupBox').clientWidth);
            addpopupBox.style.margin = `auto ${(this.body.clientWidth - addpopupBox.clientWidth) / 2}px`
           // addpopupBox.style.left = `${(((this.body.clientWidth - addpopupBox.clientWidth) * .5))}px`;
           // console.log((((this.body.clientWidth - addpopupBox.clientWidth) * .5) - (addpopupBox.clientWidth)));

    }
    validateBirthday(){
        let nameinput = document.getElementById('nameinput');
        let dayinput = document.getElementById('dayinput');
        let monthinput = document.getElementById('monthinput');
        let yearinput = document.getElementById('yearinput');
        let nameContent = nameinput.value;
        let dayContent = dayinput.value;
        let monthContent = monthinput.value;
        let yearContent = yearinput.value;
        // object to hold the new person
        let person = {};

        // testing if the user inputed valued information
            // testing the name input
                if(/^[A-z ]{1,20}$/.test(nameContent)){
                    console.log(`Name Content ${nameContent}`);
                    person.name = nameContent;
                }else{
                    nameinput.style.border = '2px solid red';
                    console.log(`failure Name Content is incorrect`);
                    return false;
                }
            //testing the day input
                if(/^[\d]{1,2}$/.test(dayContent) && parseInt(dayContent) < 32 && parseInt(dayContent) > 0){
                    dayContent = parseInt(dayContent);
                    console.log(`Day Content: ${dayContent}`);
                    person.day = dayContent;
                }else{
                    console.log('failure');
                    dayinput.style.border = '2px red solid';
                    return false;
                }
            // testing the month input
                if(/^[\d]{1,2}$/.test(monthContent) && parseInt(monthContent) < 13 && parseInt(monthContent) > 0){
                    monthContent = parseInt(monthContent);
                    console.log(`Month Content: ${monthContent}`);
                    person.month = monthContent;
                }else{
                    monthinput.style.border = '2px red solid';
                    return false;
                }
            // testing the year input
                if(/^[\d]{4}$/.test(yearContent) || yearContent.length == 0){
                    if(!yearContent.length == 0){
                        yearContent = parseInt(yearContent);
                        person.year = yearContent
                    }
                    console.log(`Year Content: ${yearContent}`);
                }else{
                    yearinput.style.border = '2px red solid';
                    return false;
                }

                let birthdays = JSON.parse(localStorage.getItem('birthdays') || "[]");
                birthdays.push(formatDate(person));
                localStorage.setItem('birthdays', JSON.stringify(birthdays));
                return true;
    }
    showNames(){
        console.log('showname');
        let birthdayList = document.getElementById('birthdayList');
        birthdayList.innerHTML = '';
        // method that changes the order of the birthdays based on the sort button that is clicked
            this.updateBirthdayList();
        let birthdays = JSON.parse(localStorage.getItem('birthdays'), "[]");
        if(!birthdays){
            console.log('no birthdays');
            let noBirthdaysP = document.createElement('p');
            noBirthdaysP.setAttribute('id', 'noBirthdaysP');
            noBirthdaysP.textContent = 'Add A Birthday';
            birthdayList.appendChild(noBirthdaysP);
            return;
        }
        // making the table to hold the birthdays and adding the header row
            let birthdaysTable = document.createElement('table');
            birthdaysTable.setAttribute('id', 'birthdaysTable');
            birthdaysTable.innerHTML = `<tr><th>Name</th><th>Date</th></tr>`;
        //adding all the names to the table
            for(const birthday of birthdays){
                let tr = document.createElement('tr');
                let nametd = document.createElement('td');
                let datetd = document.createElement('td');
                nametd.textContent = `${birthday.name}`;
                datetd.textContent = `${birthday.date}`;
                tr.appendChild(nametd);
                tr.appendChild(datetd);
                birthdaysTable.appendChild(tr);
            }

        document.getElementById('birthdayList').appendChild(birthdaysTable);
        
    }
    // method that checks the sort order and updates the order of the birthday list
    updateBirthdayList(){
        // gets the list of birthdays
            let list = JSON.parse(localStorage.getItem('birthdays', '[]'));
        // gets radio button container
            let radioBtnContainer = document.getElementById('radioBtnContainer');
        //gets both radio buttons
            let abcRadioButton = document.getElementById('abcRadioButton');
            let clostestRadioButton = document.getElementById('clostestRadioButton');
        // checks if the abc radio button is checked
            if(abcRadioButton.checked){
                // sorts the list alphabetically and saves it to local storage
                    list.sort(function(a,b) {
                        if(a.name.toLowerCase() < b.name.toLowerCase()){
                            return -1;
                        }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    });
                    localStorage.setItem('birthdays', JSON.stringify(list));
            }
        // checks if the clostest radio button is checked
            if(clostestRadioButton.checked){
                //sorts the list so that the clostest birthdays are first and saves it to local storage
                    let date = new Date();
                    let month = date.getMonth();
                    month++;
                    let day = date.getDate();
                    list.sort(function(a,b){
                        if(a.month < b.month){
                            return -1
                        }else if(a.month > b.month){
                            return 1
                        }else{
                            if(a.day < b.day){
                                return -1
                            }else if(a.day > b.day){
                                return 1
                            }else return 0;
                        }
                    });
                    let mostCurrentBirthday;
                    let i = 0;
                    while(!mostCurrentBirthday){
                        if((i + 1) === list.length){
                            mostCurrentBirthday = list[i];
                        }else if(list[i].month >= month){
                            if(list[i].month > month){
                                mostCurrentBirthday = list[i];
                            }else{
                                if(list[i].day >= day){
                                    mostCurrentBirthday = list[i];
                                }else i++;
                            }
                        }else i++;
                    }
                    let beginning = list.slice(list.indexOf(mostCurrentBirthday));
                    let end = list.slice(0, list.indexOf(mostCurrentBirthday));
                    list = beginning.concat(end);
                    localStorage.setItem('birthdays', JSON.stringify(list));
                }
    }
}



window.addEventListener('load', function(){
    if(document.getElementById('birthdayBody')){
        Window.birthdayPage = new BirthdayPage();
        Window.birthdayPage.loadPage();
    }
});







/////////////////////////funtions///////////////////////////
 function formatDate(person){
if(person.year){
    person.date = `${person.month}-${person.day}-${person.year}`;
}else{
    person.date = `${person.month}-${person.day}`;
}
 console.log(person.date);
 return person
}
// event listener functions for when the edit button is clicked
    // click event for the table row to edit it
        function tableRowEditClick(ev){
            console.log('tableRowEdit Ran');
            ev.stopPropagation();
            //console.log(ev.target);
            //variable to hold the current clicked element
                window.currentClickedElement = ev.target;
            //variable to hold the og value of the target
                window.currentClickedElementOriginalText = ev.target.textContent;
            //variable to hold the og index of the current clicked elements table row
                let listOfTableRows = ev.target.parentElement.parentElement.querySelectorAll('tr');
                window.indexOfCurrentClickedElementTableRow = Array.from(listOfTableRows).indexOf(ev.target.parentElement) - 1;
        // console.log(`this is the current clicked element ${window.currentClickedElement}`);
            // variable to hold the original value of the table cell
                let originalValue = ev.target.textContent;

            //making it so you cannot click on the buttons
                document.querySelector('body').style.pointerEvents = 'auto';
                document.getElementById('addbtn').style.pointerEvents = 'none';
                document.getElementById('deletebtn').style.pointerEvents = 'none';
                document.getElementById('editbtn').style.pointerEvents = 'none';
                document.getElementById('radioBtnContainer').style.pointerEvents = 'none';
            // ev.target.style.pointerEvents = 'auto';
            // creating the input element to go into the table cell
                    let editInput = document.createElement('input');
                    editInput.setAttribute('class', 'clickedTableCell');
                    editInput.type = 'text';
                    editInput.value = `${originalValue}`;
                    editInput.style.width = `${ev.target.offsetWidth}px`;
                //removing the text node
                    //console.log(ev.target.firstChild);
                    ev.target.removeChild(ev.target.firstChild);
                // adding the new text input element
                    ev.target.appendChild(editInput);

            //removing the event listener so the user does not double click it
            //console.log(ev.target.parentElement);
                ev.target.parentElement.removeEventListener('click', tableRowEditClick, false);

            //adding input event listener to the event onj
                editInput.addEventListener('input', function(event){
                    event.stopPropagation();
                    console.log('input event fired');
                    // if the input was a name
                        if(/^[A-z ]{1,20}$/.test(originalValue)){
                            // testing if the input is correct
                                if(/^[A-z ]{1,20}$/.test(event.target.value)){
                                    //changeing the class so the border is yellow
                                        if(event.target.className != 'clickedTableCell'){
                                            event.target.setAttribute('class', 'clickedTableCell');
                                        }
                                    document.querySelector('body').style.pointerEvents = 'auto';
                                    document.getElementById('addbtn').style.pointerEvents = 'none';
                                    document.getElementById('deletebtn').style.pointerEvents = 'none';
                                    document.getElementById('editbtn').style.pointerEvents = 'none';
                                    document.getElementById('radioBtnContainer').style.pointerEvents = 'none';
                                // console.log(event.target.value)
                                //removing the document click event
                                        document.removeEventListener('click', exitInputClick, true);
                                    //adding a blur event listener
                                        event.target.addEventListener('blur', nameInputBlur);
                                }else{
                                    //making it so the only this you can click on is the cell
                                        document.removeEventListener('click', exitInputClick, true);
                                        document.querySelector('body').style.pointerEvents = 'none';
                                        ev.target.style.pointerEvents = 'auto';
                                    //changeing the class so the border is red
                                        if(event.target.className != 'incorrectValue'){
                                            event.target.setAttribute('class', 'incorrectValue');
                                        }

                                    console.log('by blur');
                                    event.target.removeEventListener('blur', nameInputBlur);
                                }
                        }
                    // if the input was a birthday
                        if(/^[\d]{1,2}-[\d]{1,2}-?([\d]{4})?$/.test(originalValue)){
                            //if the input follows the format mm-dd
                                if(/^[01]?[\d]-[0-3]?[\d](-[\d]{4})?$/.test(event.target.value)){
                                    //changeing the class so the border is yellow
                                        if(event.target.className != 'clickedTableCell'){
                                            event.target.setAttribute('class', 'clickedTableCell');
                                        }
                                    document.querySelector('body').style.pointerEvents = 'auto';
                                    document.getElementById('addbtn').style.pointerEvents = 'none';
                                    document.getElementById('deletebtn').style.pointerEvents = 'none';
                                    document.getElementById('editbtn').style.pointerEvents = 'none';
                                    document.getElementById('radioBtnContainer').style.pointerEvents = 'none';
                                    // console.log(event.target.value)
                                    //removing the document click event
                                        document.removeEventListener('click', exitInputClick, true);
                                    //adding a blur event listener
                                        event.target.addEventListener('blur', nameInputBlur);
                                }
                            // if the input if incorrect
                                else{
                                    //making it so the only this you can click on is the cell
                                        document.removeEventListener('click', exitInputClick, true);
                                        document.querySelector('body').style.pointerEvents = 'none';
                                        console.log(event.target);
                                        ev.target.style.pointerEvents = 'auto';
                                    //changeing the class so the border is red
                                        if(event.target.className != 'incorrectValue'){
                                            event.target.setAttribute('class', 'incorrectValue');
                                        }

                                    console.log('by blur');
                                    event.target.removeEventListener('blur', nameInputBlur);
                                }
                        }
                });
            //getting the styles out of the ev
            /*  let evfontSize = ev.target.style.fontSize;
                console.log(evfontSize);
                console.log(ev.target.offsetWidth);
            console.log(ev);
            console.log(ev.target.textContent);*/
            //creating the text input element
                //console.log(ev.target.querySelector('input'));
                document.addEventListener('click', exitInputClick, true);
            // ev.target.textContent = `${ev.target.querySelector('input').value}`;
            // ev.target.removeChild(ev.target.querySelector('input'));

        }
        // function that fires when the user clickes out after updating input element
            function nameInputBlur(event){
                event.stopPropagation();
                console.log('blur blur');
                console.log(event.target);
                let tableCell = event.target.parentElement;
                console.log(tableCell);
                //console.log(event.target.value);
                tableCell.removeChild(event.target);
                tableCell.textContent = event.target.value;

                // adding the event listener back to the exiting cell
                    window.currentClickedElement.parentElement.addEventListener('click', tableRowEditClick, false);

                //saving the local storage to a variable
                let birthdays = JSON.parse(localStorage.getItem('birthdays'), "[]");
                //adding the new updated value to the local storage
                console.log(window.currentClickedElementOriginalText);
                    //if it is a name
                        if(/^[A-z ]{1,20}$/.test(event.target.value)){
                            birthdays[window.indexOfCurrentClickedElementTableRow].name = event.target.value;
                        }
                    //if it is a birthday
                        else{
                            //if it is formatted mm-dd
                                if(match = event.target.value.match(/^([01]?[\d])-([0-3]?[\d])$/)){
                                    birthdays[window.indexOfCurrentClickedElementTableRow].day = parseInt(match[2]);
                                    birthdays[window.indexOfCurrentClickedElementTableRow].month = parseInt(match[1]); 
                                    birthdays[window.indexOfCurrentClickedElementTableRow] = formatDate(birthdays[window.indexOfCurrentClickedElementTableRow]);
                                }
                            //if it is formatted mm-dd-yy
                                if(match = event.target.value.match(/^([01]?[\d])-([0-3]?[\d])-([\d]{4})$/)){
                                    console.log('yes');
                                    birthdays[window.indexOfCurrentClickedElementTableRow].day = parseInt(match[2]);
                                    birthdays[window.indexOfCurrentClickedElementTableRow].month = parseInt(match[1]); 
                                    birthdays[window.indexOfCurrentClickedElementTableRow].year = parseInt(match[3]);
                                    birthdays[window.indexOfCurrentClickedElementTableRow] = formatDate(birthdays[window.indexOfCurrentClickedElementTableRow]);
                                }
                        }
                    localStorage.setItem('birthdays', JSON.stringify(birthdays));
            }
        // function that fires when the user has not changed the input and is trying to exit out of it
            function exitInputClick(event){
            // event.stopPropagation();
                //console.log(window.currentClickedElement);
                console.log('exitInputClick ran');
            //  console.log(event.target);
            // console.log(window.currentClickedElement);



                //console.log(event.target);
                if(event.target == window.currentClickedElement || event.target == window.currentClickedElement.querySelector('input')){
                    event.stopPropagation();
                    console.log('this is the current element');
                    //do nothing
                }else{
                    //console.log('other Element');
                // console.log(window.currentClickedElement);
                    window.currentClickedElement.textContent = window.currentClickedElement.querySelector('input').value;
                    // adding back the click event listener to the old input element
                    //console.log(window.currentClickedElement);
                    
                        window.currentClickedElement.parentNode.addEventListener('click', tableRowEditClick, false);
                        document.removeEventListener('click', exitInputClick, true);
                // console.log(window.currentClickedElement);
                // console.log(window.currentClickedElement);
                // window.currentClickedElement.removeChild(window.currentClickedElement.querySelector('input'));
                }
            // e.textContent = e.target.querySelector('input').value;
            // e.removeChild(e.target.querySelector('input'));
            }
// event listener functions for when the delete button is clicked
    //function for when the tables rows are clicked after the delete button is clicked
        function tableRowsClick_Delete(ev){
            //checks if the element is the header
            if(ev.target.parentElement == document.querySelectorAll('#birthdaysTable tr')[0]){
                return
            }else if(ev.target.parentElement.getAttribute('class') === 'deleteTableRow'){
                ev.target.parentElement.removeAttribute('class');
            }else{
                ev.target.parentElement.setAttribute('class', 'deleteTableRow');
            }
            
        }
    //function for when the done button is clicked after the delete button was clicked
        function doneDeleteButtonClick(ev){
            // variable to hold all the tr elements
                let tableRows = document.getElementById('birthdaysTable').querySelectorAll('tr');
            // variable that holds the indexes of all the deletable tr elements
                Window.deleteTableRows = [];
            //going through all the table rows and adding their index to deltetableTableRows if their class is delteTableRow
                Array.from(tableRows).forEach((elm, index, arr)=>{
                    if(elm.getAttribute('class') === 'deleteTableRow'){
                        Window.deleteTableRows.push(index -1);
                    }
                });
            // if there are any table rows to delete prompt a confirmation
                if(Window.deleteTableRows.length > 0) {
                    console.log(Window.deleteTableRows);
                   deleteTableRowsPrompt();
                    
                }else{
                    //removing the event listeners from all the table rows
                        Array.from(tableRows).forEach((elm, index, arr) =>{
                            elm.removeEventListener('click', tableRowsClick_Delete);
                        });
                    //removing the done button from the document
                        document.getElementById('birthdayListContainer').removeChild(document.getElementById('doneDeleteBtn'));
                    //making it so you can click on other buttons again
                        document.getElementById('editbtn').style.pointerEvents = 'auto';
                        document.getElementById('deletebtn').style.pointerEvents = 'auto';
                        document.getElementById('addbtn').style.pointerEvents = 'auto';
                        document.getElementById('radioBtnContainer').style.pointerEvents = 'auto';
                }
        }
    //function that prompts the user if they are sure they want to delete the selected elements
        function deleteTableRowsPrompt(){
            console.log('prompt');
            console.log(Window.deleteTableRows);
            //if there already is a prompt return
                if(document.getElementById('deletePrompt')) return;
            // making it so you cannot click on the delete button
                document.getElementById('doneDeleteBtn').style.pointerEvents = 'none';
            //removind the event listener from the table rows
                //removing the event listeners from all the table rows
                    Array.from(document.querySelectorAll('#birthdaysTable tr')).forEach((elm, index, arr) =>{
                        elm.removeEventListener('click', tableRowsClick_Delete);
                    });
            //holds the prompt container
                let promptcontainer = promptContainer();
                    //appending the cancel svg
                        promptcontainer.appendChild(exitPrompt());
                    //appending the question p
                        promptcontainer.appendChild(promptP());
                    //appending the buttons container
                        promptcontainer.appendChild(promptButtonsContainer());
            //appending the containe to the body
                document.querySelector('body').appendChild(promptcontainer);
            //changing the margin
                document.getElementById('deletePrompt').style.margin = `auto ${(document.querySelector('body').clientWidth - document.getElementById('deletePrompt').clientWidth) /2}px`;
        }
            //makes the container for the prompt
                function promptContainer(){
                    let prompt = document.createElement('div');
                    prompt.id = 'deletePrompt';
                   /* prompt.style.width = '80%';
                    prompt.style.maxWidth = '600px';
                    prompt.style.minWidth = '300px';*/

                    return prompt;
                }
            //makes the p element for the prompt
                function promptP(){
                    let p = document.createElement('p');
                    p.id = 'promptP';
                    p.textContent = 'Are You Sure You Want To Delete These Elements?';
                    return p;
                }
            //makes the exit click button
                function exitPrompt(){
                    let cancel = document.createElement('img');
                    cancel.src = 'cancel.svg';
                    cancel.id = 'promptCancel';
                    //adding a click event listener
                        cancel.addEventListener('click', function() {
                            //adding the click event back to the table rows
                                Array.from(document.querySelectorAll('#birthdaysTable tr')).forEach((elm, index, arr) =>{
                                    elm.addEventListener('click', tableRowsClick_Delete);
                                });
                            document.querySelector('body').removeChild(document.getElementById('deletePrompt'));
                    // making it so you can click on the delete button again
                        document.getElementById('doneDeleteBtn').style.pointerEvents = 'auto';
                        });
                    return cancel;
                }
            // makes the container for the buttons
                function promptButtonsContainer(){
                    let buttonsContainer = document.createElement('div');
                    buttonsContainer.id = 'promptButtonsContainer';
                    buttonsContainer.appendChild(promptYesButton());
                    buttonsContainer.appendChild(promptNoButton());
                    return buttonsContainer;
                }
                //makes the yes button
                    function promptYesButton(){
                        let yesButton = document.createElement('button');
                        yesButton.id = 'promptYesButton';
                        yesButton.textContent = 'Yes';
                        yesButton.addEventListener('click', promptYesButtonClick);
                        return yesButton;
                    }
                    //click event for the yes button
                        function promptYesButtonClick(){
                            console.log(Window.deleteTableRows);
                            //removing the event listener from the table rows
                                Array.from(document.querySelectorAll('#birthdaysTable tr')).forEach((elm, index, arr) =>{
                                    elm.removeEventListener('click', tableRowsClick_Delete);
                                });
                            //saving the birthdays list to a variable
                                let birthdays = JSON.parse(localStorage.getItem('birthdays'), '[]');
                            // deleting the birthdays the user wants to delete
                                Window.deleteTableRows.forEach((elm, index, arr) => {
                                    console.log(elm);
                                    birthdays.splice(birthdays.indexOf(birthdays[elm]), 1);
                                });
                                // saving the remaining birthdays to local storage
                                    localStorage.setItem('birthdays', JSON.stringify(birthdays));
                                    Window.birthdayPage.showNames();
                                    document.querySelector('body').removeChild(document.getElementById('deletePrompt'));
                            //removing the done button
                                document.getElementById('birthdayListContainer').removeChild(document.getElementById('doneDeleteBtn'));
                            //making it so you can click on other buttons again
                                document.getElementById('editbtn').style.pointerEvents = 'auto';
                                document.getElementById('deletebtn').style.pointerEvents = 'auto';
                                document.getElementById('addbtn').style.pointerEvents = 'auto';
                                document.getElementById('radioBtnContainer').style.pointerEvents = 'auto';  
                        }
                //makes the no button
                    function promptNoButton(){
                        let noButton = document.createElement('button');
                        noButton.id = 'promptNoButton';
                        noButton.textContent = 'No';
                        noButton.addEventListener('click', promptNoButtonClick);
                        document.querySelector('body').style.PointerEvents = 'auto';
                        return noButton;
                    }
                    //click event for the yes button
                        function promptNoButtonClick(){
                            //adding the click event back to the tables rows
                                Array.from(document.querySelectorAll('#birthdaysTable tr')).forEach((elm, index, arr) =>{
                                    elm.addEventListener('click', tableRowsClick_Delete);
                                });
                            document.querySelector('body').removeChild(document.getElementById('deletePrompt'));
                            // making it so you can click on the delete button again
                                document.getElementById('doneDeleteBtn').style.pointerEvents = 'auto';
                            
                        }


