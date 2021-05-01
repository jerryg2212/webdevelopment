 
// creating the title
    let h1 = document.createElement('h1');
    h1.textContent = "Conway's Game Of Life";
    document.body.appendChild(h1);

//creating the select option that lets the user choose how many squares to play
    let numberSelect = document.createElement('select');
    //creating the options
        for(let i = 10; i <=30; i = i + 5){
            let option = document.createElement('option');
            option.value = i;
            option.textContent = '' + i;
            numberSelect.appendChild(option);
        }
//creating the button the lets the user start the game
    let startGameButton = document.createElement('button');
    startGameButton.id = 'startGameButton';
    startGameButton.textContent = 'Start';
    startGameButton.addEventListener('click', function() {
        let select = document.querySelector('select');
        if(select.value){
            createGame(select.value);
        }
    });

//creating div to hold the select button and the button
    let startContainer = document.createElement('div');
    startContainer.id = 'startContainer';
    startContainer.appendChild(numberSelect);
    startContainer.appendChild(startGameButton);
//appending the container to the body
    document.body.appendChild(startContainer);

//function that loads the game
    function createGame(matrix){
        if(document.getElementById('gameContainer')) document.getElementById('gameContainer').remove();
        let gameContainer = document.createElement('div');
        gameContainer.id = 'gameContainer';
        //makeing the select boxes based on how many the user selected
        for(let i = 0; i < matrix; i++){
            let p = document.createElement('p');
            for(let j = 0; j < matrix; j++){
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                if(Math.random() * 10 < 5){
                    checkbox.checked = true;
                }
                p.appendChild(checkbox);
            }
            gameContainer.appendChild(p);
        }        
        //creating the run level button
            let runLevel = document.createElement('button');
            runLevel.id = 'runButton';
            runLevel.textContent = 'Run';
            runLevel.addEventListener('click', updateGame);

        document.body.appendChild(gameContainer);
        document.getElementById('startContainer').appendChild(runLevel);
    }

//function that updates the game
    function updateGame(){
        let container = document.getElementById('gameContainer');
        let oldGame = [];
        let rows = container.querySelectorAll('p');
        Array.from(rows).forEach((elm, index, arr) => {
            oldGame.push(Array.from(elm.querySelectorAll('input')).map((element, ind) => element.checked));
        });
        console.log(oldGame);
        let newGame = [];
        for(let i = 0; i < oldGame[0].length; i++){
            let temp = [];
            for(let j = 0; j < oldGame.length; j++){
                //counting the neighbors
                let neighbors = 0;
                    if(oldGame[i - 1]){
                        if(oldGame[i - 1][j - 1]) neighbors++;
                        if(oldGame[i - 1][j])neighbors++;
                        if(oldGame[i - 1][j + 1]) neighbors++
                    }
                    if(oldGame[i + 1]){
                        if(oldGame[i + 1][j - 1]) neighbors++;
                        if(oldGame[i + 1][j]) neighbors++;
                        if(oldGame[i + 1][j + 1]) neighbors++
                    }
                    if(oldGame[i][j - 1]) neighbors++;
                    if(oldGame[i][j + 1]) neighbors++;
                
                    //console.log(neighbors);
                    // if the element is false
                    if(!oldGame[i][j]){
                        if (neighbors == 3) {temp.push(true);}
                        else {temp.push(false)}
                    }
                    if(oldGame[i][j]){
                        if(neighbors == 2 || neighbors == 3) {temp.push(true)}
                        else{temp.push(false);}
                    }
            }
            newGame.push(temp);
        }
        makeGame(newGame);
    }

//makes the game after it is ran
    function makeGame(game){
        if(document.getElementById('gameContainer')) document.getElementById('gameContainer').remove();
        let gameContainer = document.createElement('div');
        gameContainer.id = 'gameContainer';
        //makeing the select boxes based on how many the user selected
        for(let i = 0; i < game.length; i++){
            let p = document.createElement('p');
            for(let j = 0; j < game[i].length; j++){
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                if(game[i][j]){
                    checkbox.checked = true;
                }
                p.appendChild(checkbox);
            }
            gameContainer.appendChild(p);
        }        
        document.body.appendChild(gameContainer);
    }