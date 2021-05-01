const {easyelm} = require("./createElementsLibraryPlay");
const element = new easyelm();
document.body.appendChild(element.p('fuck off', ' this hopefully worked agot'));
//variable to hold all the user messages
let messages = ['Hello'];

makePage();

function makePage(){
    //makes the elements
        //makes the form
            let form = document.createElement('form');
            form.method = 'POST';
            form.action = 'http://localhost:8000/messages';
        //makes the input
            let input = document.createElement('input');
            input.type = 'text';
            input.name = "message";
        //makes the button
            let button = document.createElement('button');
            button.type = 'submit';
            button.textContent = 'Submit';
            button.addEventListener('click', checkInput);
        //makes the div container
            let div = document.createElement('div');
            div.id = 'messageContainer';
        form.appendChild(input);
        form.appendChild(button);
        document.body.appendChild(form);
        document.body.appendChild(div);
    //updates the messages
    updateMessages();
}

// validates input
function checkInput(e){
   /* let input = document.querySelector('input').value;
    if(input.length > 0){
        console.log('good info');
            messages.push(input);
            updateMessages();
    }*/return
}

// prints out the users messages onto the div
function updateMessages(){
    let container = document.getElementById('messageContainer');
    for(let elm of messages){
        let p = document.createElement('p');
        p.classList.add('message');
        p.textContent = elm;
        container.appendChild(p);
    }
}

