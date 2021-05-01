//variables
    // container div
    let container = document.getElementById('container');
    // holds the main form
    let form;
    let firstName;
    let lastName;
    let telephone;
    let emailAddress;
    //regular expression for the first name
    let regFirst = /^[A-z ']{1,20}$/;
    let regEmail = /^[A-z']{1,30}@[A-z']{1,30}[.]{1}[A-z]{1,10}$/;
    let regTelephone = /^([\d]?[ -])?[(]?[\d]{3}[)]?[ -]?[\d]{3}[ -]?[\d]{4}$/;
    



//////////////////////////////////////////             MAIN THREAD           ///////////////////////////////////////////////////////////////
    //creates the form elements
    createForm();
    createFormElements();
    // variables to hold the inputs of the form elements
        firstName = document.getElementById('firstNameinput');
        lastName = document.getElementById('lastNameinput');
        telephone = document.getElementById('telephoneNumberinput');
        emailAddress = document.getElementById('emailAddressinput');
    //variables to hold the div elements in the forms that hold the label and inputs
        firstNamediv = document.getElementById('firstNamediv');
        lastNamediv = document.getElementById('lastNamediv');
        telephonediv = document.getElementById('telephoneNumberdiv');
        emailAddressdiv = document.getElementById('emailAddressdiv');

        
    /*firstName.addEventListener('input' function(){
        console.log('fuch uyo');
    });*/
    //firstName = document.getElementById('firstNameinput');
    checkInputs();
    


    




//////////////////////////////////////////              END                  //////////////////////////////////////////////////////////


// functions



    // creating the input elements
        //creating the name inputs
        function createFormElements(){
        //creates the elements
            //creating the inputs
                let firstname = document.createElement('input');
                let lastname = document.createElement('input');
                let telephonenumber = document.createElement('input');
                let emailaddress = document.createElement('input');
            //creating the labels
                let firstnamelabel = document.createElement('label');
                firstnamelabel.textContent = 'First Name';
                let lastnamelabel = document.createElement('label');
                 lastnamelabel.textContent = 'Last Name';
                let telephonenumberlabel = document.createElement('label');
                telephonenumberlabel.textContent = 'Telephone Number';
                let emailaddresslabel = document.createElement('label');
                emailaddresslabel.textContent = 'Email';
            // createing the divs that hold everything
                let firstnamediv = document.createElement('div');
                let lastnamediv = document.createElement('div');
                let telephonenumberdiv = document.createElement('div');
                let emailaddressdiv = document.createElement('div');
        //giving them ids
            // input elements id
                firstname.setAttribute('id', 'firstNameinput');
                lastname.setAttribute('id', 'lastNameinput');
                telephonenumber.setAttribute('id', 'telephoneNumberinput');
                emailaddress.setAttribute('id', 'emailAddressinput');
            // div elements id
                firstnamediv.setAttribute('id', 'firstNamediv');
                lastnamediv.setAttribute('id', 'lastNamediv');
                telephonenumberdiv.setAttribute('id', 'telephoneNumberdiv');
                emailaddressdiv.setAttribute('id', 'emailAddressdiv');
        //styleing the elements
            // all inputs
                let inputsStyle = {
                    'width' : '200px',
                    'margin' : '5px auto',
                    'margin-bottom' : '0px',
                    'padding' : '10px',
                    'border' : '1px solid black',
                    'border-radius' : '10px'                
                }
            // jsut the telphone and email 
                let teleemaildivStyle = {
                    'grid-column-start' : '1',
                    'grid-column-end' : '3',
                    'margin' : '5px auto',
                    
                }
            //labels
                let labelsStyle = {
                    'display' : 'block',
                    'text-align' : 'left',
                    'margin-left' : '5px'
                }
            // divs
                let inputdivStyle = {
                    'margin-top' : '50px'
                }

            // assainging the styles to the elements
                // inputs 
                    Object.assign(firstname.style, inputsStyle);
                    Object.assign(lastname.style, inputsStyle);
                    Object.assign(telephonenumber.style, inputsStyle);
                    Object.assign(emailaddress.style, inputsStyle);
                // telephone and email
                    Object.assign(telephonenumberdiv.style, teleemaildivStyle);
                    Object.assign(emailaddressdiv.style, teleemaildivStyle);
                //labels
                    Object.assign(firstnamelabel.style, labelsStyle);
                    Object.assign(lastnamelabel.style, labelsStyle);
                    Object.assign(telephonenumberlabel.style, labelsStyle);
                    Object.assign(emailaddresslabel.style, labelsStyle);
                // divs
                  /*  Object.assign(firstnamediv.style, inputdivStyle);
                    Object.assign(lastnamediv.style, inputdivStyle);
                    Object.assign(telephonenumberdiv.style, inputdivStyle);
                    Object.assign(emailaddressdiv.style, inputdivStyle);*/
        //appending the elements
            //appending the input and label elements to the div
                firstnamediv.appendChild(firstnamelabel);
                firstnamediv.appendChild(firstname);
                lastnamediv.appendChild(lastnamelabel);
                lastnamediv.appendChild(lastname);
                telephonenumberdiv.appendChild(telephonenumberlabel);
                telephonenumberdiv.appendChild(telephonenumber);
                emailaddressdiv.appendChild(emailaddresslabel);
                emailaddressdiv.appendChild(emailaddress);


            //appending the div elements
                form.appendChild(firstnamediv);
                form.appendChild(lastnamediv);
                form.appendChild(emailaddressdiv);
                form.appendChild(telephonenumberdiv);


        }

        //creating the form element
        function createForm(){
            //creates form element
    let form1 = document.createElement('form');
   
    form1.setAttribute('id', 'form1');
    let formStyle = {
        'width': '40%',
        'margin': '10px auto',
        'background-color': 'lightgrey',
        'display' : 'grid',
        'grid-template-columns' : '1fr 1fr',
        'padding' : '10px',
        'align-items' : 'start'
    }
    Object.assign(form1.style, formStyle);
    container.appendChild(form1);
    form = document.getElementById('form1');
        }

        // function that checks the form elements inputs
        function checkInputs() {

            firstName.addEventListener('input', function(){
                
                // event listener for the first name input
                    let firstNameErrormsg = p('firstNameErrormsg');
                    firstNameErrormsg.textContent = 'Please Input Valid Name';
                    let FNerrormsgStyle = {
                        'font-size' : '12px',
                        'color' : 'red',
                        'padding' : '0px',
                        'margin' : '0px'
                    }
                    Object.assign(firstNameErrormsg.style, FNerrormsgStyle);
                    if(!regFirst.test(firstName.value)){
                        if(!firstNamediv.contains(document.getElementById('firstNameErrormsg'))){
                        firstNamediv.appendChild(firstNameErrormsg);
                        }
                    }
                    if(regFirst.test(firstName.value)){
                        console.log('yes');
                        if(firstNamediv.contains(document.getElementById('firstNameErrormsg'))){
                            firstNamediv.removeChild(document.getElementById('firstNameErrormsg'));
                        }
                    }
                    //console.log(regFirst.test(firstName.value));

                });
            
            // envent for the last name input
            lastName.addEventListener('input', function(){
                let lastNameErrormsg = p('lastNameErrormsg');
                lastNameErrormsg.textContent = 'Please Input Valid Name';
                let FNerrormsgStyle = {
                    'font-size' : '12px',
                    'color' : 'red',
                    'padding' : '0px',
                    'margin' : '0px'
                }
                Object.assign(lastNameErrormsg.style, FNerrormsgStyle);
                if(!regFirst.test(lastName.value)){
                    if(!lastNamediv.contains(document.getElementById('lastNameErrormsg'))){
                    lastNamediv.appendChild(lastNameErrormsg);
                    }
                }
                if(regFirst.test(lastName.value)){
                    console.log('yes');
                    if(lastNamediv.contains(document.getElementById('lastNameErrormsg'))){
                        lastNamediv.removeChild(document.getElementById('lastNameErrormsg'));
                    }
                }
            });

            // email address event listener
                emailAddress.addEventListener('input', function(){
                    let emailAddressErrormsg = p('emailAddressErrormsg');
                    emailAddressErrormsg.textContent = 'Must Input Email Address';
                    let FNerrormsgStyle = {
                        'font-size' : '12px',
                        'color' : 'red',
                        'padding' : '0px',
                        'margin' : '0px'
                    }
                    Object.assign(emailAddressErrormsg.style, FNerrormsgStyle);
                    
                    if(!regEmail.test(emailAddress.value)){
                        if(!emailAddressdiv.contains(document.getElementById('emailAddressErrormsg'))){
                            emailAddressdiv.appendChild(emailAddressErrormsg);
                        }
                    }
                    if(regEmail.test(emailAddress.value)){
                        if(emailAddressdiv.contains(document.getElementById('emailAddressErrormsg'))){
                            emailAddressdiv.removeChild(document.getElementById('emailAddressErrormsg'));
                        }
                    }
                });

            // telephone event listener
                telephone.addEventListener('input', function(){
                    let telephoneErrormsg = p('telephoneErrormsg');
                    telephoneErrormsg.textContent = 'Must be a proper telephone number faggot';
                    let FNerrormsgStyle = {
                        'font-size' : '12px',
                        'color' : 'red',
                        'padding' : '0px',
                        'margin' : '0px'
                    }
                    Object.assign(telephoneErrormsg.style, FNerrormsgStyle);

                    if(!regTelephone.test(telephone.value)){
                        if(!telephonediv.contains(document.getElementById('telephoneErrormsg'))){
                            telephonediv.appendChild(telephoneErrormsg);
                        }
                    }
                    if(regTelephone.test(telephone.value)){
                       
                        if(telephonediv.contains(document.getElementById('telephoneErrormsg'))){
                            telephonediv.removeChild(document.getElementById('telephoneErrormsg'));
                        }
                    }
                    
                });

        }

      /*  let haha = (function (num){
            let price = 5;
            let count = 2;
            return {
                        seven: 7,
                        eight: 8,
                        increasePrice: function (){
                            return price + 5;
                        },
                        increaseCount: function (){
                            return count+= 1
                        }

                    }
            
        
            
        })();

console.log(haha.increaseCount());*/
function validate(username, password){
    //your code here
    let usernamelength = username.length;
    let passwordlength = password.length;
    let max;
  
    usernamelength > passwordlength ? max= Math.floor(passwordlength / 2) : max = Math.floor(usernamelength / 2);
    let result = true;
    
    
    if(username === '' && password === '') return false
    
    for(let i = 0; i < usernamelength - max + 1; i++){
      let imax = i + max;
      
      let tomaz = username.substring(i, i + max);
      if(password.includes(tomaz)) return false;
    }
    return true
    
  }

 function Person (name, money){
    this.name = name;
    this.money = money;
    this.hobbieslist = [];
 }
 let Jerry = new Person('Jerry', 20);
 let Shane = new Person('Shane', 15);
 let Mike = new Person('Mike', 40);
 let people = [Jerry, Shane, Mike];
Person.prototype.hobbies = function(hobbie){
    hobbie.forEach(element => {
        this.hobbieslist.push(element);
    }, this);
    
}
let John = new Person('John', 60);
Jerry.hobbies(['skateboarding', 'baseball', 'Xbox']);
console.log(people);