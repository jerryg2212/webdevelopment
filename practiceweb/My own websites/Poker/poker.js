"use strict";
// Global Variables
var hamburger = document.getElementById('navigation');
var sideNav = document.getElementById('sideNav');
var body = document.getElementsByTagName('html');
var addPlayer = document.getElementById('playersbtn');
var playersInput = document.getElementById('amountOfPlayers');
var errormsg = document.getElementById('errormsg');
var playersForm = document.getElementById('addPlayersForm');
var playerList = document.getElementById('playerList');
// New Game btn
var newGamebtn = document.getElementById('newGame');
    // variable that holds the sidebar navigation unordered list
var navList = document.getElementById('navList');
    // variable that holds the new game link on the navigation menu
var navNewGame = document.getElementById('navNewGame');
    // variable that is the form element that contains the user input players
var formNames = document.getElementById('playerNames');
    // start game button
var startGamebtn;
    // global variable that keeps track of the number of games played
var numberOfGames = 1;
    // variable to hold the current game
    var CurrentGame1 = localStorage.getItem('CurrentGame1');
    CurrentGame1 = JSON.parse(CurrentGame1); 
// holds a value to have the end game nav item on
var EGNtest;
    
    

// Variables for current Game Page
    // holds the div that shows the players names and values for the current game
    var divGameInformation = document.getElementById('divGameInformation');
    // holds the current Game pages body
    var currentGameBody = document.getElementById('currentGameBody');
    // holds the table with players names and wagers
    var currentTable = document.getElementById('currentTable');
    // holds the endgame btn
    var endGamebtn = document.getElementById('endGamebtn');
    // current games html
    var currentGamehtml = document.getElementById('currentGamehtml');
    // holds the div that pops up when the end game btn is clicked
    var divConfirmEnd;
    // holds the img inside divConfirmEnd
    var imgConfirmEnd;
    // holds the paragraph in divconfirmend
    var paraConfirmEnd;
    // holds the btn in divConfirmEnd
    var btnConfirmEnd;
    // holds the current game add new player button
    var addNewPlayerbtn = document.getElementById('addNewPlayerbtn');
    // holds the increase buyin btn
    var increaseBuyin = document.getElementById('increaseBuyin');
    // holds the update balances button
    var updateBalancesbtn = document.getElementById('updateBalances');

//Variables for the endGame page
    let gameStats = document.getElementById('gameStats');
    // holds the stats from the previous game
    let postGameStats;
    postGameStats = localStorage.getItem('postGameStats');
    postGameStats = JSON.parse(postGameStats);
    // holds the updatebalances button for the endgame stats
    let endUpdateBalancesbtn = document.getElementById('endUpdateBalances');
    //body of the end game
    let endGameBody = document.getElementById('endGameBody');


    

// Event listener that when the hamburger icon is clicked, the side nav appears on the screen
    
    hamburger.addEventListener('click', function (e) {
        if(sideNav.classList.contains('offScreen')){
        sideNav.classList.remove('offScreen');
        sideNav.classList.add('onScreen');
        
        e.stopPropagation();
        }else if(sideNav.classList.contains('onScreen')){
            sideNav.classList.remove('onScreen');
            sideNav.classList.add('offScreen');
            e.stopPropagation();
        }
        
    });

    // Event for when the 'New Game' button is clicked
    if(!checkGameStatus()){
        if(newGamebtn){
        newGamebtn.addEventListener('click', function(){
            if(localStorage.getItem('postGameStats')){
                localStorage.removeItem('postGameStats');
            }
            window.location = 'setupGame.html';
        }); }
    }

    body[0].addEventListener('click', function (ev){
        
        if(sideNav.classList.contains('onScreen')){
            sideNav.classList.remove('onScreen');
            sideNav.classList.add('offScreen');
        }
        ev.stopPropagation();
    });

   
            // Add player button

                //Event Listener that when the form is submitted it checks if the input is valid
                if(playersForm){
            playersForm.addEventListener('submit', function(ev) {
                if(playersInput.validity.valid){
                    errormsg.textContent = '';
                    errormsg.classList.remove('active');
                    let totalPlayers = playersInput.value;
                    let amountOfInputs = playerList.childNodes.length - 1;
                    
                        // adds in inputs if the amount in the player input is greater than the amount already there
                    if(amountOfInputs < totalPlayers * 2){
                        while( amountOfInputs < totalPlayers * 2){
                        
                            playerList.appendChild(nameInput());
                                playerList.appendChild(buyinInput());
                                amountOfInputs = playerList.childNodes.length - 1;
                                
                        }// takes away inputs if user decreases amount of players
                    }else if( amountOfInputs > totalPlayers * 2){
                        while(amountOfInputs > totalPlayers * 2){
                            playerList.removeChild(playerList.lastElementChild);
                            playerList.removeChild(playerList.lastElementChild);
                            amountOfInputs = playerList.childNodes.length - 1;
                            
                        }
                    }
                    
                }ev.preventDefault();
                // if the input is invalid
                if(!playersInput.validity.valid){
                    showError();
                    while(playerList.firstChild){
                        playerList.removeChild(playerList.lastElementChild);
                    }
                    ev.preventDefault();
                }
                    // if statment that makes sure only one start game button is added
                    if( !formNames.contains(startGamebtn)){
                    startGamebtn = addButton(btn1Text, 'startGamebtn', 'startGamebtn');
                    formNames.appendChild(startGamebtn);
                    startGamebtn = document.getElementById('startGamebtn');
                    
                    }     
                
            }); }

            


        // Event listener that changes the error msg for when the value of the input changes
        if(playersInput){
        playersInput.addEventListener('input', function (){
            if(playersInput.validity.valid){
                errormsg.textContent = '';
                errormsg.classList.remove('active');
            }
            if(!playersInput.validity.valid){
                showError();
                
            }
        }); }

        // start game button event listener for when the start game button is clicked
        if(formNames){
        formNames.addEventListener('submit', function(e){
            // truth value to tell if the inputs are correct
            let playersTruth = true;
            // loops through all the inputs and if one is invalid it changes the truth to false
            let numberOfInputs = playerList.getElementsByTagName('input');
            for(let i = 0; i < numberOfInputs.length; i = i + 2 ){
                if(!checkWagerValidity(numberOfInputs[i + 1])){
                    console.log('must be a numer');
                    playersTruth = false;
                }
            }

            if( playersTruth){
                window.location = 'currentGame.html'; 
                checkChilds(playerList); 
                e.preventDefault();  
                
            }else{
                console.log('incorrect value');
                e.preventDefault();
            }




    
    
        }); }
        

        // event that checks if there is a current game running and changes the navlist to include a link to the current game

        if(checkGameStatus()){
            let NGItem = navList.childNodes;
            let CGList = document.createElement('li');
            let CGLink = document.createElement('a');
            CGLink.textContent = 'Current Game';
            CGLink.setAttribute('href', 'currentGame.html');
            CGList.appendChild(CGLink);
            navList.insertBefore(CGList, navList.childNodes[2]);
        }   
    
        //checks if there is not a current game
    if(!checkGameStatus()){
        addNewGameList();
    }


    // when the end game button is clicked
    if(endGamebtn){
    endGamebtn.addEventListener('click', function(e){
    // function that adds the popup confirming that the user wants to end the game
        confirmEndGame();
        // holds the div that pops up when the end game btn is clicked
        divConfirmEnd = document.getElementById('enddiv');
        imgConfirmEnd = document.getElementById('endimg');
        paraConfirmEnd = document.getElementById('endPara');
        btnConfirmEnd = document.getElementById('endbtn');
       
             

        
        //makes the body background image darker
         opacityCover();
        

        // function that gives function to the elements created in the div
        endGameElements();
    
        


        e.preventDefault();

        

      
    }); }


    // event that activtes when the add new player btn is clicked and creates a popup with information to be added by user
    if(addNewPlayerbtn){
        //statement that makes sure there is less than 10 players
        if(CurrentGame1.totalPlayers.length < 10){
            addNewPlayerbtn.addEventListener('click', function(ee){
                // creates a popup so the user can input information for the new player and saves the info to the current game local storage object
                addNewPlayerInformation();

                // the elements just created to variables
                var addNPInfodiv1 = document.getElementById('addNPInfodiv1');
                var addNPInfoinput1 = document.getElementById('addNPInfoinput1');
                var addNPInfoinput2 = document.getElementById('addNPInfoinput2');
                var addNPInfolabel1 = document.getElementById('addNPInfolabel1');
                var addNPInfolabel2 = document.getElementById('addNPInfolabel2');
                var addNPInfobtn1 = document.getElementById('addNPInfobtn1');
                var addNPInfoform1 = document.getElementById('addNPInfoform1');

 
                

                
            
                // event when the input changes for the wager input
            /*  addNPInfoinput2.addEventListener('input', function(e){
                    if(checkWagerValidity(e)){

                    }
                })*/
                // event when the form is submitted
                addNPInfoform1.addEventListener('submit', function(e){
                    // checks if the input is valid if it is it saves the new players information otherwise prevets submitting.
                    console.log('submitted');
                
                    if(!checkWagerValidity(addNPInfoinput2)){
                        e.preventDefault();
                    }else{
                        //saving the inputs
                        let NPName = addNPInfoinput1.value;
                        let NPWager = addNPInfoinput2.value;
                        //constructiong new player with inputs
                        let NP = new Player( NPName, NPWager);
                        //pushing the new player object to the total players
                        CurrentGame1.totalPlayers.push(NP);
                        // setting the new CurrentGame1 object to local storage
                        localStorage.setItem('CurrentGame1', JSON.stringify(CurrentGame1));
                        CurrentGame1 = localStorage.getItem('CurrentGame1');
                        CurrentGame1 = JSON.parse(CurrentGame1);
                        // running players and wagers to reload the new player
                        playersAndWagers(divGameInformation);
                        
                        
                    }


                });
                ee.stopPropagation();
                
                
            }, false);
        }
    }
                   //event listener that closes the input for new player when the user clicks outside the popup
                   body[0].addEventListener('click', function(ev){
                    if(document.getElementById('addNPInfodiv1')){
                        if(ev.target.id == 'addNPInfodiv1'  || document.getElementById('addNPInfodiv1').contains(ev.target)){
                            console.log('we');
                            return;
                        }else{
                            currentGamehtml.removeChild(document.getElementById('addNPInfodiv1'));
                        }
                    }
                    
                    
                    
                    ev.stopPropagation();
                }, false);




    // Event that runs when the increase Buy-in button is clicked
    if(increaseBuyin){
        increaseBuyin.addEventListener('click', function(e){
            //function that create a popup for when the button is click so the user can increase certain players wagers
            increaseBuyinpopup();

            // saving the elements just created
            var IBPdiv1 = document.getElementById('IBPdiv1');
            var IBPimg1 = document.getElementById('IBPimg1');
            var IBPbtn1 = document.getElementById('IBPbtn1');
            var IBPdivform1 = document.getElementById('IBPdivform1');



            // function that creates function for the elements created in increaseBuyinpopup
            increaseBuyinElements();
        });
    }



    //Event that runs when the updatebalances button is clicked
    if(updateBalancesbtn){
        updateBalancesbtn.addEventListener('click', function(){
            updateBalancespopup();

            let UBPdiv1 = document.getElementById('UBPdiv1');
            let UBPimg1 = document.getElementById('UBPimg1');
            let UBPbtn1 = document.getElementById('UBPbtn1');
            let UBPform1 = document.getElementById('UBPform1');
    
            //function that gives funciton to the elements just create
            updateBalanceselements();
           
        });

    }

    // checks if the endgame nav should be up
    if(gameStats){
        
        EGNtest = true;
    }
    if(localStorage.getItem('postGameStats')){
        addEndGameNav();
    }
    

    
// event for when the new game link on the nav list is cllicked
  if(document.getElementById('navNewGame')){
      // deletes the post Game stats from local storage
      navNewGame = document.getElementById('navNewGame');
      console.log('we');
      navNewGame.addEventListener('click', function(){
          console.log('shit');
          if(localStorage.getItem('postGameStats')){
              console.log('fuck');
              localStorage.removeItem('postGameStats');
          }
      });
  }

  

  // endUpdateBalances button 
  if(endUpdateBalancesbtn){
    endUpdateBalancesbtn.addEventListener('click', function(){
        endUpdateBalancespopup();

        let EUBPdiv1 = document.getElementById('EUBPdiv1');
        let EUBPimg1 = document.getElementById('EUBPimg1');
        let EUBPbtn1 = document.getElementById('EUBPbtn1');
        let EUBPform1 = document.getElementById('EUBPform1');

        //function that gives funciton to the elements just create
        endUpdateBalanceselements();
       
    });

}
    
    
    

        

        
    
      



    ///////////                                  UTILITIES  /////////////////////


        // function that makes the new players
    var nameInput = function(){
        let nameBox;
        nameBox = document.createElement('input');
        nameBox.type = 'text';
        nameBox.placeholder = "Player Name";
        nameBox.required = true;
        return nameBox;
    }
        // buy in amount
    var buyinInput = function() {
        let buyinBox;
        buyinBox = document.createElement('input');
        buyinBox.type = 'text';
        buyinBox.placeholder = 'Buy-In';
        buyinBox.classList.add('buyin');
        buyinBox.required = true;
        return buyinBox;
    }
      // function that shaws errors based on the input
      var showError = function() {
        if(!playersInput.validity.valid){
        errormsg.textContent = '* Must be 2-10 Players';
        errormsg.classList.add('active');
        }
        if(playersInput.validity.valueMissing){
            errormsg.textContent = '';
            errormsg.classList.remove('active');
        }
    }
        // function that adds a button to submit the new players information
        var btn1Text = 'Start Game';
        var addButton = function(text, id, classname){
            let btn = document.createElement('button');
             btn.setAttribute('type', 'submit');
            btn.setAttribute('id', '' + id);
            btn.classList.add('' + classname);
            btn.textContent = '' + text;
            return btn;
        }

        

        // function that takes the input values from the add players form add creates objects for them
        var checkChilds = function (list){
            
            var inputChilds = list.getElementsByTagName('input');
            
            // variable that is a place holder for the name of the current game obj
            //   numberOfGames
                 CurrentGame1 = new CurrentGame();
                 

            for(let i = 0; i < inputChilds.length; i = i + 2){
                let name = inputChilds[i].value;
                 name = name.toLowerCase();
                let wager = inputChilds[i + 1].value;
                let tempobj = new Player(name, wager);

               
                CurrentGame1.totalPlayers.push(tempobj);
                
              //   console.log(CurrentGame1);                 
                

            }
            var test = checkGameStatus();
            if(test == true){
                    
                  //  navList.removeChild(navNewGame);
             }
             localStorage.setItem('CurrentGame1', JSON.stringify(CurrentGame1));
            // console.log(localStorage.getItem('CurrentGame1'));
         }



         // function that checks if there is a current game active
            function checkGameStatus(){
                if(CurrentGame1){
                    console.log('success');
                    return true;
                }else{
                    return false;
                }
            }

            //function that if there is a current game active it deletes the New game li on the nav




            

            // adds the newgame li to the nav slidein list
           function addNewGameList(){
                let NGList = document.createElement('li');
                NGList.setAttribute('id', 'navNewGame');
                let NGLink = document.createElement('a');
                NGLink.setAttribute('href', 'setupGame.html');
                NGLink.textContent = 'New Game';
                NGList.appendChild(NGLink);
                body.backgroundColor = 'black';
                navList.insertBefore(NGList, navList.childNodes[2]);
            }

            //Functions for the currentGame page          //

                                // function that lists the current players and wagers
                    function playersAndWagers(element){
                        
                        // CurrentGame1 = localStorage.getItem('CurrentGame1');
                    // CurrentGame1 = JSON.parse(CurrentGame1); 
                //    console.log(CurrentGame1); 
                        for(let i = 0; i < CurrentGame1.totalPlayers.length; i++){
                            
                            let name = CurrentGame1.totalPlayers[i].name;
                            let wager = CurrentGame1.totalPlayers[i].wager;
                            let balance = CurrentGame1.totalPlayers[i].balance;
                            let paraname = document.createElement('p');
                            let parawager = document.createElement('p');
                            let parabalance = document.createElement('p');

                            paraname.textContent = name;
                            parawager.textContent = '$' + wager;
                            parabalance.textContent = '$' + balance;
                            element.appendChild(paraname);
                            element.appendChild(parabalance);
                            element.appendChild(parawager);
                        
                        }
                    }
                        // function for the end game stats
                    function endPlayersAndWagers(element){
                        
                        // CurrentGame1 = localStorage.getItem('CurrentGame1');
                    // CurrentGame1 = JSON.parse(CurrentGame1); 
                //    console.log(CurrentGame1); 
                        for(let i = 0; i < postGameStats.totalPlayers.length; i++){
                            
                            let name = postGameStats.totalPlayers[i].name;
                            let wager = postGameStats.totalPlayers[i].wager;
                            let balance = postGameStats.totalPlayers[i].balance;
                            let paraname = document.createElement('p');
                            let parawager = document.createElement('p');
                            let parabalance = document.createElement('p');

                            paraname.textContent = name;
                            parawager.textContent = '$' + wager;
                            parabalance.textContent = '$' + balance;
                            element.appendChild(paraname);
                            element.appendChild(parabalance);
                            element.appendChild(parawager);
                        
                        }
                    }



                // changes opacity of the body
                        function opacityCover() {
                              var divCover = document.createElement('div');
                                 divCover.setAttribute('id', 'divCover');
                               
                    var coverStyles = {
                        'z-index' : '1',
                        'width' : '100%',
                        'height' : '100%',
                        'position' : 'absolute',
                        'top' : '0',
                        'left' : '0',
                        'background-color' : 'rgba(1,1,1,.3)',
                        'margin' : '0'
                    }
                    Object.assign(divCover.style, coverStyles);
                    currentGamehtml.appendChild(divCover);
                    window.divCover1 = document.getElementById('divCover');
                  //  return document.getElementById('divCover');
                        } 



            // function that creates the popup confirming that the user wants to end the game
                    function confirmEndGame() {
                        //div that holds the question and button
                var endDiv = document.createElement('div');
                endDiv.setAttribute('id', 'enddiv');
                //adding style to the div
                var endDivStyles = {
                   // 'background-color': 'rgba(255,255,255, .7)',
                    'position' : 'absolute',
                    'width' : '300px',
                    'height' : '200px',
                    'top' : '50%',
                    'left' : '50%',
                    'margin-left' : '-150px',
                    'margin-top' : '-100px',
                    'z-index' : '2',
                    'padding-right' : '5px'
                };
                // assigning the style to the div
                Object.assign(endDiv.style, endDivStyles);
                // paragraph that askes if they want to end the game
                var endPara = document.createElement('p');
                endPara.setAttribute('id', 'endPara');
                endPara.textContent = 'Are You Sure You Want to End the Game';
                // 'X' image to close the div
                var endimg = document.createElement('img');
                endimg.setAttribute('id', 'endimg');
                var endimgStyles = {
                    'width' : '15px',
                    'float' : 'right'
                }
                Object.assign(endimg.style, endimgStyles);
                endimg.setAttribute('src', 'cancel.svg');
                // button that user clicks to confirm they want to end the game
                var endbtn = document.createElement('button');
                endbtn.setAttribute('id', 'endbtn');
        
                endbtn.textContent = 'End';
                // appending all the elements together
                endDiv.appendChild(endimg);
                endDiv.appendChild(endPara);
                endDiv.appendChild(endbtn);
                currentGameBody.appendChild(endDiv);
                    }


                // function that gives funciton to the elements created when the end game button is clicked
               function endGameElements(){
                   // eventlistenr for when the 'x' is clicked it closes the div
                imgConfirmEnd.addEventListener('click', function(){
                    //removes the popup
                    currentGameBody.removeChild(divConfirmEnd);
                    // removes the opaic background
                    currentGamehtml.removeChild(divCover1);
                });
                // enventlistener that when the end game button is clicked it ends the game
                btnConfirmEnd.addEventListener('click', function(e){
                  //  EGNtest = true;
  
                    //removes the popup
                    currentGameBody.removeChild(divConfirmEnd);
                    //removes the opaic background
                    currentGamehtml.removeChild(divCover1);

                    postGameStats = localStorage.getItem('CurrentGame1');
                    postGameStats = JSON.parse(postGameStats);                   
                    
                    
              
                    // removes the current game from local storage
                    localStorage.removeItem('CurrentGame1');
                    localStorage.setItem('postGameStats', JSON.stringify(postGameStats));
                   // addEndGameNav();
                    
                   window.location = 'endGame.html';
                   // e.preventDefault();

                    
                                                                       


                    
                    
                });
                }


                // function that creates a popup so user can input the new players info and it stores it into the local storage for currentgame1
                function addNewPlayerInformation(){
                    // Creating the elements and adding ids

                        //div that contains all the future elements
                        let div1 = document.createElement('div');
                        div1.setAttribute('id', 'addNPInfodiv1');

                        // form 
                        let form1 = document.createElement('form');
                        form1.setAttribute('id', 'addNPInfoform1');

                        // label for player name
                        let label1 = document.createElement('label');
                        label1.textContent = 'Player Name:';
                        label1.setAttribute('id', 'addNPInforlabel1');

                        // input for player name
                        let input1 = document.createElement('input');
                        input1.setAttribute('type', 'text');
                        input1.setAttribute('id', 'addNPInfoinput1');
                        input1.required = true;

                        // label for wager
                        let label2 = document.createElement('label');
                        label2.textContent = 'Wager:';
                        label2.setAttribute('id', 'addNPInfolabel2');

                        //input for wager
                        let input2 = document.createElement('input');
                        input2.setAttribute('type', 'text');
                        input2.setAttribute('id', 'addNPInfoinput2');
                        input2.required = true;

                        // button to confirm change
                        let btn1 = document.createElement('button');
                        btn1.setAttribute('id', 'addNPInfobtn1');
                        btn1.textContent = 'Add';
                        btn1.setAttribute('type', 'submit');

                        //style for all the created Elements

                            // style for the div
                            let div1Styles = {
                                'background-color' : 'rgba(1,1,1, .8)',
                                'width' : '300px',
                              //  'height' : '150px',
                                'position' : 'absolute',
                                'top' : '50%',
                                'right' : '50%',
                                'margin-top' : '-150px',
                                'margin-right' : '-150px'
                            }
                            Object.assign(div1.style, div1Styles);

                            //style for the form
                            let form1Styles = {
                                'margin' : '10px auto 10px auto',
                                'width' : '200px',
                                'text-align' : 'center'
                            }
                            Object.assign(form1.style, form1Styles);

                            //style for the labels
                            let NPlabel = {
                                'color' : 'white',
                                'text-align' : 'left',
                                'font-family' : 'coco',
                                'margin' : '5px'
                            }
                            Object.assign(label1.style, NPlabel);
                            Object.assign(label2.style, NPlabel);

                            //style for the input boxes
                            let NPinput = {
                                'display' : 'block',
                                'border' : 'green solid 1px',
                                'padding' : '5px',
                                'color' : 'green',
                                'border-radius' : '20px',
                                'width' : '150px',
                                'margin' : '5px auto 5px auto',
                                'background-color' : 'rgba(5,82,5, .6',
                                'font-family' : 'midnight',
                                'font-size' : '17px',
                                'letter-spacing' : '1px',
                                'text-align' : 'center'
                                
                            }
                            Object.assign(input1.style, NPinput);
                            Object.assign(input2.style, NPinput);

                        // appending the elements

                            
                            
                            form1.appendChild(label1);
                            form1.appendChild(input1);
                            form1.appendChild(label2);
                            form1.appendChild(input2);
                            form1.appendChild(btn1);
                            div1.appendChild(form1);
                            currentGamehtml.appendChild(div1);



                }


                // function that checks the validity of the wager inputs
                function checkWagerValidity(wager){
                 //   wager.addEventListener('input', function(){
                        let wagerValue = wager.value;
                        wagerValue = parseInt(wagerValue);
                        console.log(wagerValue);
                        if((wagerValue > 0) && (wagerValue < 1000000)){
                            return true;
                        }else{

                            return false;
                        }
                   //                     });
                }



                //function that creates a popup for when the user clicks the increase wager button
                function increaseBuyinpopup() {
                    //creating the elements
                        // container div
                        let IBPdiv1 = document.createElement('div');
                        IBPdiv1.setAttribute('id', 'IBPdiv1');
                        // head paragraph
                        let IBPpara1 = document.createElement('p');
                        IBPpara1.setAttribute('id', 'IBPpara1');
                        IBPpara1.textContent = 'Enter the amount of money the player is adding';
                        // close container img
                        let IBPimg1 = document.createElement('img');
                        IBPimg1.setAttribute('id', 'IBPimg1');
                        IBPimg1.setAttribute('src', 'cancel.svg');
                        // div that will be displayed as a grid
                        let IBPform1 = document.createElement('form');
                        IBPform1.setAttribute('id', 'IBPform1');
                        //submit button
                        let IBPbtn1 = document.createElement('button');
                        IBPbtn1.setAttribute('id', 'IBPbtn1');
                        IBPbtn1.setAttribute('type', 'submit');
                        IBPbtn1.textContent = 'Add';


                    //creating the elements styles
                        // div styling
                        let IBPdiv1Styles = {
                            'width' : '70%',
                            'position' : 'absolute',
                            'right' : '50%',
                            'margin-right' : '-35%',
                            'top' : '20%',
                         //   'background-color' : 'rgba(255, 255, 255, .9)',
                            'padding-right' : '7px',
                            'padding-left' : '7px'
                        }
                        Object.assign(IBPdiv1.style, IBPdiv1Styles);

                        //img style
                        let IBPimg1Styles = {
                            'float' : 'right',
                            'width' : '16px'
                        }
                        Object.assign(IBPimg1.style, IBPimg1Styles);

                        //para style
                        let IBPpara1Styles = {
                            'font-size' : '16px',
                            'text-align' : 'center',
                            'margin-top' : '7px',
                            'margin-right' : '10px'
                        }
                        Object.assign(IBPpara1.style, IBPpara1Styles);

                        //form style
                        let IBPform1Styles = {
                            'display' : 'grid',
                            'grid-template-columns' : '1fr 1fr',
                            'width' : '90%',
                            'text-align' : 'center',
                            'margin' : '10px auto'
                        }
                        Object.assign(IBPform1.style, IBPform1Styles);


                            // for the amount of players there are currently this will display them in the grid
                                for(let i = 0; i < CurrentGame1.totalPlayers.length; i++){
                                    let player = document.createElement('p');
                                    let wager = document.createElement('input');
                                    wager.setAttribute('class', 'IBPinput');
                                    let wagerStyle = {
                                        'display' : 'block',
                                        'border' : 'green solid 1px',
                                        'padding' : '-5px',
                                        'color' : 'green',
                                        'border-radius' : '20px',
                                        'width' : '50px',
                                        'margin' : '5px auto 5px auto',
                                        'background-color' : 'rgba(5,82,5, .6',
                                        'font-family' : 'midnight',
                                        'font-size' : '15px',
                                        'letter-spacing' : '1px',
                                        'text-align' : 'center'
                                    }
                                    Object.assign(wager.style, wagerStyle);
                                    player.style.margin = '5px';
                                    player.textContent = '' + CurrentGame1.totalPlayers[i].name;
                                    IBPform1.appendChild(player);
                                    IBPform1.appendChild(wager);
                                }



                        //appending the elements
                            //appending the img to the container
                            IBPdiv1.appendChild(IBPimg1);
                            //appending the para to the container
                            IBPdiv1.appendChild(IBPpara1);
                            //appending the grid to the container
                            IBPdiv1.appendChild(IBPform1);
                            //appending the button to the container
                            IBPform1.appendChild(IBPbtn1);
                            //appending the container to the html
                            currentGameBody.appendChild(IBPdiv1);



                     }

                
                //function that gives function to the elements created in increasebuyinpopup
                function increaseBuyinElements(){
                    // event listener for when the 'x' is clicked and closes the popup
                    IBPimg1.addEventListener('click', function(e){
                        currentGameBody.removeChild(IBPdiv1);
                    });

                    //event for button
                    IBPform1.addEventListener('submit', function(ev){
                        //value to show if input is valid

                        //counts the number of error messges
                        let confirm = true;
                        var IBPtotalinputs = document.getElementsByClassName('IBPinput');
                        let IBPinputvalue;

                            for(let j = 0; j < IBPtotalinputs.length; j++){
                                console.log(IBPtotalinputs[j].value);
                                 IBPinputvalue = IBPtotalinputs[j];
                                if(IBPtotalinputs[j].value.length > 0){
                                    if(!checkWagerValidity(IBPinputvalue)){
                                        console.log('false');
                                        confirm = false;
                                        ev.preventDefault();
                                    }
                                }
                            }
                        // if one of the wager inputs is invalid
                        if(confirm == false){
                            if(!document.body.contains(document.getElementById('IBPerrormsg'))){
                                // creates the error msg
                                let IBPerrormsg = document.createElement('p');
                                IBPerrormsg.setAttribute('id', 'IBPerrormsg');

                                        IBPerrormsg.setAttribute('id', 'IBPerrormsg');
                                        IBPerrormsg.textContent = 'please enter valid amount';
                                        let IBPerrormsgStyles = {
                                            'text-align' : 'center',
                                            'color' : 'red',
                                            'font-size' : '10px',
                                            'grid-column-start' : '1',
                                            'grid-column-end' : '3'
                                        }
                                    Object.assign(IBPerrormsg.style, IBPerrormsgStyles);
                                let IBPchildnodes = IBPform1.childNodes.length;

                                IBPform1.insertBefore(IBPerrormsg, IBPform1.childNodes[IBPchildnodes - 1]);
                            }

                        }else{

                            // for that goes through all the inputs and updates the players wager
                            for(let h = 0; h < IBPtotalinputs.length; h++){
                                if(IBPtotalinputs[h].value.length > 0){
                                    
                                    CurrentGame1.totalPlayers[h].wager = IncreaseBuyin(CurrentGame1.totalPlayers[h].wager, IBPtotalinputs[h].value);
                                    console.log(CurrentGame1.totalPlayers[h].wager);
                                    CurrentGame1.totalPlayers[h].balance = UpdateBalance(parseInt(parseInt(CurrentGame1.totalPlayers[h].balance) + parseInt(IBPtotalinputs[h].value)));
                                }
                                localStorage.setItem('CurrentGame1', JSON.stringify(CurrentGame1));
                                CurrentGame1 = localStorage.getItem('CurrentGame1');
                                CurrentGame1 = JSON.parse(CurrentGame1);

                                playersAndWagers(divGameInformation);

                            }

                        }


                        
                    });

                }

                //function that creates the elements for when the updatebalances button is clicked
                function updateBalancespopup() {
                    //creating the elements
                        // container div
                        let UBPdiv1 = document.createElement('div');
                        UBPdiv1.setAttribute('id', 'UBPdiv1');
                        // head paragraph
                        let UBPpara1 = document.createElement('p');
                        UBPpara1.setAttribute('id', 'UBPpara1');
                        UBPpara1.textContent = 'Enter the current balance of the player';
                        // close container img
                        let UBPimg1 = document.createElement('img');
                        UBPimg1.setAttribute('id', 'UBPimg1');
                        UBPimg1.setAttribute('src', 'cancel.svg');
                        // div that will be displayed as a grid
                        let UBPform1 = document.createElement('form');
                        UBPform1.setAttribute('id', 'UBPform1');
                        //submit button
                        let UBPbtn1 = document.createElement('button');
                        UBPbtn1.setAttribute('id', 'UBPbtn1');
                        UBPbtn1.setAttribute('type', 'submit');
                        UBPbtn1.textContent = 'Add';


                    //creating the elements styles
                        // div styling
                        let UBPdiv1Styles = {
                            'width' : '70%',
                            'position' : 'absolute',
                            'right' : '50%',
                            'margin-right' : '-35%',
                            'top' : '20%',
                           // 'background-color' : 'rgba(255, 255, 255, .9)',
                            'padding-right' : '7px',
                            'padding-left' : '7px'
                        }
                        Object.assign(UBPdiv1.style, UBPdiv1Styles);

                        //img style
                        let UBPimg1Styles = {
                            'float' : 'right',
                            'width' : '16px'
                        }
                        Object.assign(UBPimg1.style, UBPimg1Styles);

                        //para style
                        let UBPpara1Styles = {
                            'font-size' : '16px',
                            'text-align' : 'center',
                            'margin-top' : '7px',
                            'margin-right' : '10px'
                        }
                        Object.assign(UBPpara1.style, UBPpara1Styles);

                        //form style
                        let UBPform1Styles = {
                            'display' : 'grid',
                            'grid-template-columns' : '1fr 1fr',
                            'width' : '90%',
                            'text-align' : 'center',
                            'margin' : '10px auto'
                        }
                        Object.assign(UBPform1.style, UBPform1Styles);


                            // for the amount of players there are currently this will display them in the grid
                                for(let i = 0; i < CurrentGame1.totalPlayers.length; i++){
                                    let player = document.createElement('p');
                                    let wager = document.createElement('input');
                                    wager.setAttribute('class', 'UBPinput');
                                    let wagerStyle = {
                                        'display' : 'block',
                                        'border' : 'green solid 1px',
                                        'padding' : '-5px',
                                        'color' : 'green',
                                        'border-radius' : '20px',
                                        'width' : '50px',
                                        'margin' : '5px auto 5px auto',
                                        'background-color' : 'rgba(5,82,5, .6',
                                        'font-family' : 'midnight',
                                        'font-size' : '15px',
                                        'letter-spacing' : '1px',
                                        'text-align' : 'center'
                                    }
                                    Object.assign(wager.style, wagerStyle);
                                    player.style.margin = '5px';
                                    player.textContent = '' + CurrentGame1.totalPlayers[i].name;
                                    UBPform1.appendChild(player);
                                    UBPform1.appendChild(wager);
                                }



                        //appending the elements
                            //appending the img to the container
                            UBPdiv1.appendChild(UBPimg1);
                            //appending the para to the container
                            UBPdiv1.appendChild(UBPpara1);
                            //appending the grid to the container
                            UBPdiv1.appendChild(UBPform1);
                            //appending the button to the container
                            UBPform1.appendChild(UBPbtn1);
                            //appending the container to the html
                            currentGameBody.appendChild(UBPdiv1);



                     }

                //function that gives function to the elements created in UpdateBalancespopup
               function updateBalanceselements(){
                    UBPform1.addEventListener('submit', function(ev){
                        let UBPtotalinputs = UBPform1.getElementsByTagName('input');
                        let UBPtest = true;
                        for(let i = 0; i < UBPtotalinputs.length; i++){
                            if(UBPtotalinputs[i].value.length > 0){
                                if(!checkWagerValidity(UBPtotalinputs[i])){
                                    UBPtest = false;
                                    ev.preventDefault();
                                }
                            }
                        }

                                                // if one of the wager inputs is invalid
                                                if(UBPtest == false){
                                                    if(!document.body.contains(document.getElementById('UBPerrormsg'))){
                                                        // creates the error msg
                                                        let UBPerrormsg = document.createElement('p');
                                                        UBPerrormsg.setAttribute('id', 'UBPerrormsg');
                        
                                                                UBPerrormsg.setAttribute('id', 'UBPerrormsg');
                                                                UBPerrormsg.textContent = 'please enter valid amount';
                                                                let UBPerrormsgStyles = {
                                                                    'text-align' : 'center',
                                                                    'color' : 'red',
                                                                    'font-size' : '10px',
                                                                    'grid-column-start' : '1',
                                                                    'grid-column-end' : '3'
                                                                }
                                                            Object.assign(UBPerrormsg.style, UBPerrormsgStyles);
                                                        let UBPchildnodes = UBPform1.childNodes.length;
                        
                                                        UBPform1.insertBefore(UBPerrormsg, UBPform1.childNodes[UBPchildnodes - 1]);
                                                    }
                        
                                                }else{
                                                    for(let i = 0; i < UBPtotalinputs.length; i++){
                                                        if(UBPtotalinputs[i].value.length > 0){
                                                            CurrentGame1.totalPlayers[i].balance = UpdateBalance(UBPtotalinputs[i].value);
                                                        }
                                                        localStorage.setItem('CurrentGame1', JSON.stringify(CurrentGame1));
                                                        CurrentGame1 = localStorage.getItem('CurrentGame1');
                                                        CurrentGame1 = JSON.parse(CurrentGame1);
                                                        
                                                        playersAndWagers(divGameInformation);
                                                    }



                                                    
                                                }
                    });

                    // event that when the x is clicked it closes the menu
                    UBPimg1.addEventListener('click', function(){
                        currentGameBody.removeChild(UBPdiv1);
                    })
                }


                
                     //adds the navigation item when the end game button is clicked
                    function addEndGameNav(){
                    //     if(!CurrentGame1){
                             console.log('no currentGame');
                             let EGNli = document.createElement('li');
                             EGNli.setAttribute('id', '#EGNli');
                             let EGNa = document.createElement('a');
                             EGNa.style.color = 'white';
                             EGNa.textContent = 'End Game';
                             EGNa.setAttribute('href', 'endGame.html');
                             EGNli.appendChild(EGNa);
                            // navList = document.getElementById('navList');
                             navList.appendChild(EGNli);

                       //  }
                     }



                    // function for the end game update balances button
                                                    //function that creates the elements for when the updatebalances button is clicked
                function endUpdateBalancespopup() {
                    //creating the elements
                        // container div
                        let EUBPdiv1 = document.createElement('div');
                        EUBPdiv1.setAttribute('id', 'EUBPdiv1');
                        // head paragraph
                        let EUBPpara1 = document.createElement('p');
                        EUBPpara1.setAttribute('id', 'EUBPpara1');
                        EUBPpara1.textContent = 'Enter the current balance of the player';
                        // close container img
                        let EUBPimg1 = document.createElement('img');
                        EUBPimg1.setAttribute('id', 'EUBPimg1');
                        EUBPimg1.setAttribute('src', 'cancel.svg');
                        // div that will be displayed as a grid
                        let EUBPform1 = document.createElement('form');
                        EUBPform1.setAttribute('id', 'EUBPform1');
                        //submit button
                        let EUBPbtn1 = document.createElement('button');
                        EUBPbtn1.setAttribute('id', 'EUBPbtn1');
                        EUBPbtn1.setAttribute('type', 'submit');
                        EUBPbtn1.textContent = 'Add';


                    //creating the elements styles
                        // div styling
                        let EUBPdiv1Styles = {
                            'width' : '70%',
                            'position' : 'absolute',
                            'right' : '50%',
                            'margin-right' : '-35%',
                            'top' : '20%',
                         //   'background-color' : 'rgba(255, 255, 255, .9)',
                            'padding-right' : '7px',
                            'padding-left' : '7px'
                        }
                        Object.assign(EUBPdiv1.style, EUBPdiv1Styles);

                        //img style
                        let EUBPimg1Styles = {
                            'float' : 'right',
                            'width' : '16px'
                        }
                        Object.assign(EUBPimg1.style, EUBPimg1Styles);

                        //para style
                        let EUBPpara1Styles = {
                            'font-size' : '16px',
                            'text-align' : 'center',
                            'margin-top' : '7px',
                            'margin-right' : '10px'
                        }
                        Object.assign(EUBPpara1.style, EUBPpara1Styles);

                        //form style
                        let EUBPform1Styles = {
                            'display' : 'grid',
                            'grid-template-columns' : '1fr 1fr',
                            'width' : '90%',
                            'text-align' : 'center',
                            'margin' : '10px auto'
                        }
                        Object.assign(EUBPform1.style, EUBPform1Styles);

                        postGameStats = localStorage.getItem('postGameStats');
                        postGameStats = JSON.parse(postGameStats);
                            // for the amount of players there are currently this will display them in the grid
                                for(let i = 0; i < postGameStats.totalPlayers.length; i++){
                                    let player = document.createElement('p');
                                    let wager = document.createElement('input');
                                    wager.setAttribute('class', 'UBPinput');
                                    let wagerStyle = {
                                        'display' : 'block',
                                        'border' : 'green solid 1px',
                                        'padding' : '-5px',
                                        'color' : 'green',
                                        'border-radius' : '20px',
                                        'width' : '50px',
                                        'margin' : '5px auto 5px auto',
                                        'background-color' : 'rgba(5,82,5, .6',
                                        'font-family' : 'midnight',
                                        'font-size' : '15px',
                                        'letter-spacing' : '1px',
                                        'text-align' : 'center'
                                    }
                                    Object.assign(wager.style, wagerStyle);
                                    player.style.margin = '5px';
                                    player.textContent = '' + postGameStats.totalPlayers[i].name;
                                    EUBPform1.appendChild(player);
                                    EUBPform1.appendChild(wager);
                                }



                        //appending the elements
                            //appending the img to the container
                            EUBPdiv1.appendChild(EUBPimg1);
                            //appending the para to the container
                            EUBPdiv1.appendChild(EUBPpara1);
                            //appending the grid to the container
                            EUBPdiv1.appendChild(EUBPform1);
                            //appending the button to the container
                            EUBPform1.appendChild(EUBPbtn1);
                            //appending the container to the html
                            endGameBody.appendChild(EUBPdiv1);



                     }

                //function that gives function to the elements created in UpdateBalancespopup
               function endUpdateBalanceselements(){
                    EUBPform1.addEventListener('submit', function(ev){
                        let EUBPtotalinputs = EUBPform1.getElementsByTagName('input');
                        let EUBPtest = true;
                        for(let i = 0; i < EUBPtotalinputs.length; i++){
                            if(EUBPtotalinputs[i].value.length > 0){
                                if(!checkWagerValidity(EUBPtotalinputs[i])){
                                    EUBPtest = false;
                                    ev.preventDefault();
                                }
                            }
                        }

                                                // if one of the wager inputs is invalid
                                                if(EUBPtest == false){
                                                    if(!document.body.contains(document.getElementById('EUBPerrormsg'))){
                                                        // creates the error msg
                                                        let EUBPerrormsg = document.createElement('p');
                                                        EUBPerrormsg.setAttribute('id', 'EUBPerrormsg');
                        
                                                                EUBPerrormsg.setAttribute('id', 'EUBPerrormsg');
                                                                EUBPerrormsg.textContent = 'please enter valid amount';
                                                                let EUBPerrormsgStyles = {
                                                                    'text-align' : 'center',
                                                                    'color' : 'red',
                                                                    'font-size' : '10px',
                                                                    'grid-column-start' : '1',
                                                                    'grid-column-end' : '3'
                                                                }
                                                            Object.assign(EUBPerrormsg.style, EUBPerrormsgStyles);
                                                        let EUBPchildnodes = EUBPform1.childNodes.length;
                        
                                                        EUBPform1.insertBefore(EUBPerrormsg, EUBPform1.childNodes[EUBPchildnodes - 1]);
                                                    }
                        
                                                }else{
                                                    for(let i = 0; i < EUBPtotalinputs.length; i++){
                                                        if(EUBPtotalinputs[i].value.length > 0){
                                                            postGameStats.totalPlayers[i].balance = UpdateBalance(EUBPtotalinputs[i].value);
                                                        }
                                                        localStorage.setItem('postGameStats', JSON.stringify(postGameStats));
                                                        postGameStats = localStorage.getItem('postGameStats');
                                                        postGameStats = JSON.parse(postGameStats);
                                                        
                                                        endPlayersAndWagers(gameStats);
                                                    }



                                                    
                                                }
                    });

                    // event that when the x is clicked it closes the menu
                    EUBPimg1.addEventListener('click', function(){
                        endGameBody.removeChild(EUBPdiv1);
                    })
                }
            






         ////   OBJECT Constructors    ////////

         // function that creates a player object
          function Player(name, wager){
            this.name = name;
            this.wager = wager;
            this.balance = wager;

        }

        //function that is on the Players prototype that updates the players balance
        let UpdateBalance = function (currentBalance) {
            return currentBalance;
        }

        // function that increases the players wager through buy in
        let IncreaseBuyin = function (original, additional){
            return parseInt(original) + parseInt(additional); 
        }
 


          function CurrentGame(){
            this.gameStatus = true;
           this.totalPlayers = [];

        }







                    // ONLOAD FOR EVERYPAGE

   window.addEventListener('load', function(){
    if(currentGameBody){
        
         
         // function that prints the players and wagers
     if(divGameInformation){
        
    
    playersAndWagers(divGameInformation);
    }

}
if(gameStats){
    endPlayersAndWagers(gameStats);
}
        
                

    });
 


