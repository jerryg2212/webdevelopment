
///every page variables
// media query variables
let mediaWidth550 = window.matchMedia("(min-width: 550px)");



////// homepage variables
    // stores the homepage body element
        let hpbody = document.getElementById('hpbody');
    // stores the homepage container div
        let hpcontainer = document.getElementById('hpcontainer');

///////// practice variables
    //stores the practice page body
        let practicebody = document.getElementById('practicebody');

/////////strategiespage variables
        let strategiespagebody = document.getElementById('strategiespagebody');

////////// graphspage variables
        let graphspagebody = document.getElementById('graphspagebody');

///////// testspage variables
        let testspagebody = document.getElementById('testspagebody');

            

    




               ///////////////// Objects //////////////////
////////////// Objects ////////////////

        ////Promise to get the strategies tables
        let strategiesPromise = new Promise((resolve,reject) => {
            //   XML shit to get the graphs and strategies
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (){
                if(this.readyState == 4){
                    resolve(JSON.parse(this.responseText));
                    
        
                }
            }
            xhr.open('get', 'strategies.json', true);
            xhr.send();
        });

                // this is the then that creates the object
                let StrategiesPromise = strategiesPromise.then(function(response){
                    
                        let _strategies = response;

                            function getTitles(){
                                
                                let titles = [];
                                for(element in _strategies){
                                    titles.push(_strategies[element].title);
                                }
                                return titles;
                            }


                            function makeTable(graph, id){
                                //console.log(graph);
                                let table = document.createElement('table');
                                if(id){
                                    table.setAttribute('id', id + '');
                                } 
                                     // makes the top header row
                                         graph.forEach(function(element, index){
                                             let row = document.createElement('tr');
                                             if(index == 0){
                                                 element.forEach(function(elements){ row.innerHTML += '<th>'+ elements + '</th>';
                                                row.lastChild.style.backgroundColor = 'white' });
                                             }else{element.forEach(function(elements, indexes){
                                                 if(indexes == 0){
                                                     
                                                     row.innerHTML += '<th>' + elements + '</th>';
                                                     row.lastChild.style.backgroundColor = 'white';
                                                     
                                                 }else{
                                                     row.innerHTML += '<td>' + elements + '</td>';
                                                     switch (elements){
                                                         case 'H' : row.lastChild.style.backgroundColor = 'red';
                                                             break;
                                                         case 'S' : row.lastChild.style.backgroundColor = 'yellow';
                                                             break;
                                                         case 'D' : row.lastChild.style.backgroundColor = 'blue';
                                                             break;
                                                         case 'P' : row.lastChild.style.backgroundColor = 'lightgreen';
                                                             break;
                                                         default : row.lastChild.style.backgroundColor = 'white';
                                                     }
                                             }})}
                                             table.appendChild(row);
                                         });
                                         
                                         return table;
                            }
                            function getStrat(){
                                return _strategies
                            }
                            function getUrls(){
                                let array = [];
                                for(element in _strategies){
                                    array.push(_strategies[element].url);
                                }
                                return array;
                            }


                         //   console.log(_strategies.BS1D);
                            return {getTitles,makeTable,getStrat,getUrls}
                    
                });

        // object that makes the tests
        class Test {
            constructor(){
                this.strategy;
                this.body = document.querySelector('body');
                this.questions;
                this.test;
                this.remainingQuestions;
                this.currentHand;
                this.currentDealerHand;
                this.answer;
                this.yourHandValuep;
                this.dealerHandValuep;
                this.matchTestType = localStorage.getItem('testType');
                this.matchTitle = localStorage.getItem('strategy');
            }
            startTest(){
                //removes the last test results
                    if(document.getElementById('testResultsdiv')) this.body.removeChild(document.getElementById('testResultsdiv'));
                StrategiesPromise.then(function(_strategies){
                    let strategies = _strategies.getStrat();
                    // going through the strategies and finding the right strategy
                    for(const property in strategies){
                        if(strategies[property].title == this.matchTitle){
                            this.strategy = strategies[property];
                            // going through the strategy's tests and finding the right one
                            for(const element in strategies[property].tests){
                                if(strategies[property].tests[element].type == this.matchTestType){
                                   // this.test = strategies[property].tests[element];
                                    this.test = Object.assign({},strategies[property].tests[element]);
                                    this.test.dealerhand = Object.assign([], strategies[property].tests[element].dealerhand);
                                    this.questions = strategies[property].tests[element].questions;
                                    this.remainingQuestions = Object.assign({},strategies[property].tests[element].questions);
                                    for(const ownobj in this.remainingQuestions){
                                        this.remainingQuestions[ownobj] = Object.assign({}, strategies[property].tests[element].questions[ownobj]);
                                        this.remainingQuestions[ownobj].yourhand = Object.assign([], strategies[property].tests[element].questions[ownobj].yourhand);
                                    }
                                    //console.log(strategies[property].tests[element].questions);
                                    //console.log(this.remainingQuestions);
                                }
                            }
                        }

                    }
                    this.testElements();
                    //gets the new question
                    this.getNewQuestion();

                }.bind(this));

            }
            testElements(){
                document.getElementById('testpageStartbutton').style.display = "none";
                this.makeQuestionLayout();
                 this.yourHandValuep = document.getElementById('yourHandValue');
                 this.dealerHandValuep = document.getElementById('dealerHandValue');
                this.answerButtons();
                this.quitbutton();
            }
              runTest(useranswer){

                   if(this.verifyAnswer(useranswer)){
                       this.removeQuestion();
                       this.getNewQuestion();
                   }
                  

                
            }
            makeQuestionLayout(){
                //creates the grid that tells you what cards you and the dealer have
                    let divQuestion = div('testpageQuestion');
                    let pDealerHand = p('pDealerHandTitle', "Dealer");
                    let pYourHand = p('pYourHandTitle', 'You');
                    divQuestion.appendChild(pYourHand);
                    divQuestion.appendChild(pDealerHand);
                    this.body.appendChild(divQuestion);

                    let pYourHandValue = p('yourHandValue',undefined);
                    let pDealerHandValue = p('dealerHandValue',undefined);
        
                    divQuestion.appendChild(pYourHandValue);
                    divQuestion.appendChild(pDealerHandValue);

            }
            getNewQuestion(){
                let tempDealerHand;
                let tempCurrentHand;
                console.log(this.test.dealerhand);
                tempDealerHand = this.test.dealerhand[Math.floor(Math.random() * this.test.dealerhand.length)];
                // finds the users hand based on the dealers hand
                for(const property in this.remainingQuestions){
                    if(tempDealerHand == this.remainingQuestions[property].value){
                         tempCurrentHand = this.remainingQuestions[property].yourhand[Math.floor(Math.random() * this.remainingQuestions[property].yourhand.length)];
                        
                    }
                }
                this.yourHandValuep.textContent = '' + tempCurrentHand;
                this.dealerHandValuep.textContent = '' + tempDealerHand;
                this.currentHand = tempCurrentHand;
                this.currentDealerHand = tempDealerHand;
            }
            answerButtons(){
                let buttonsgrid = div('buttonsgrid');
                let hitbutton = button('hitbutton', 'submit', "Hit");
                hitbutton.addEventListener('click', this.runTest.bind(this, 'H'));
                let standbutton = button('standbutton', 'submit', 'Stand');
                standbutton.addEventListener('click', this.runTest.bind(this, 'S'));
                let doubledownbutton = button('doubledownbutton', 'submit', "Double");
                doubledownbutton.addEventListener('click', this.runTest.bind(this, 'D'));
                let splitbutton = button('splitbutton', 'submit', "Split");
                splitbutton.addEventListener('click', this.runTest.bind(this, 'P'));
                appendElements(buttonsgrid, [splitbutton, doubledownbutton, standbutton, hitbutton]);
                this.body.appendChild(buttonsgrid);
            }
            quitbutton(){
                let endbutton = button('endbutton', 'submit', 'End');
                endbutton.addEventListener('click', function(){
                    this.body.removeChild(document.getElementById('testpageQuestion'));
                    this.body.removeChild(document.getElementById('buttonsgrid'));
                    this.body.removeChild(document.getElementById('endbutton'));
                    document.getElementById('testpageStartbutton').style.display = "block";

                }.bind(this));
                this.body.appendChild(endbutton);

            }
            //function that varifies the answer
            verifyAnswer(userAnswer){
                let tempUserHand;
                let correctvalue = false;
                let dealerHandIndex;
               tempUserHand = this.convertValue();
                //converts thecurrent hand into a value that can be looked up on the table

                    this.strategy.graph[0].forEach(function(element, index){
                        if(this.currentDealerHand == element) dealerHandIndex = index; 
                    }.bind(this));
                //finds the answer based on the index of the dealers hand and the users hand
                    this.strategy.graph.forEach(function(element, index){
                      //  console.log(element);
                        if(tempUserHand == element[0]){
                            this.answer = element[dealerHandIndex];
                            console.log(this.answer);
                            //checks to see if the user answer correctly and removes the answer from the answers
                                if(this.answer == userAnswer){
                                    console.log("correct");
                                    correctvalue = true;
                                   // this.removeQuestion(this.currentDealerHand,this.currentHand);
                                   // console.log(element);
                                  //  element.splice(dealerHandIndex,1);
                                   // console.log(element);
                                }else{
                                    console.log('wrong');
                                    
                                }
                        }

                    }.bind(this));
                    return correctvalue;

            }
            //method that removes a question from remaining questions after the user answered correctly
            removeQuestion(){
                
            //    console.log(this.remainingQuestions);
                for(const property in this.remainingQuestions){
                    //deletes the answer from remaining questions if it matches
                  //  console.log(this.test.dealerhand);
                    if(this.remainingQuestions[property].value == this.currentDealerHand){
                        this.remainingQuestions[property].yourhand.splice(this.remainingQuestions[property].yourhand.indexOf(this.currentHand), 1);
                     //   console.log('shiot');
                     //   console.log(this.currentHand);
                      //  console.log(this.remainingQuestions);
                        //deletes the property from remainingquestions if it is empty
                            if(this.remainingQuestions[property].yourhand.length == 0){
                                this.test.dealerhand.splice(this.test.dealerhand.indexOf(this.remainingQuestions[property].value), 1);


                                delete this.remainingQuestions[property];
 
                                console.log(this.questions);
                                console.log(this.remainingQuestions);
                                console.log('7');

                                //delete remaingQuestions if all properties are null
                                if(hasProperties(this.remainingQuestions)){
                                    this.endGame();
                                }
                            } 

                    } 

    
                }
             //   console.log(this.remainingQuestions);
            }
            convertValue(){
                let test = this.currentHand;
                              //if the current hand value is a two card value this will change it
              let singleValueRegExp = /^9?(10)?(11)?$/g ;

              if(this.currentHand.length == 2 && singleValueRegExp.test(this.currentHand.split('').reduce((total, num) => parseInt(total) + parseInt(num)))){
                  test = this.currentHand.split('').reduce((total, num) => parseInt(total) + parseInt(num));
                  if(test == 10) return "X"

 
              }
            //  console.log(test + 'conver value test');
              return test
            }
            endGame(){
                //removing the elements
                    this.body.removeChild(document.getElementById('testpageQuestion'));
                    this.body.removeChild(document.getElementById('buttonsgrid'));
                    this.body.removeChild(document.getElementById('endbutton'));
                // making the start button visable
                    document.getElementById('testpageStartbutton').style.display = 'block';
                // shows the results
                    this.showResults();

            }
            showResults(){
                let container = div('testResultsdiv');
                let timeHeader = p('timeHeaderp', "Time");
                let timeresult = p('timeResultp', "1:25 You suck");
                let incorrectheader = p('incorrectHeaderp', 'Incorrect Answers');
                let incorrectanswer = p('incorrectResultsp', '3');
                appendElements(container, [timeHeader, timeresult, incorrectheader, incorrectanswer]);
                this.body.appendChild(container);
            }
        }

        // object that keeps track of the current page
        class CurrentPageSubject {
            constructor(){
                this.observers = [];
                this.currentpage;
            }
            add(x){
                this.observers.push(x);
            }
            remove(x){
                this.observers.filter(function(item){
                    if(item !== x){
                        return item;
                    }
                });
            }

            notify(){
                this.observers.forEach(function(element , index){
                    window.removeEventListener('resize', practicepageMediaQueries);
                    element.update();
                })
            }

        }


        //Homepage object
        class HomePage {
            constructor(){
                this.body = document.querySelector('body');
                this.location = 'homepage.html';
            }
            update(){
                if(hpbody) this.loadPage();
            }
            loadPage(){
                this.assemblePage();
            }
            assemblePage(){
                this.makeLogoTitle();
                this.makeTitle();
                this.makeMenu();
                this.makeBottomNav();

            }
            makeTitle(){
                let hph1 = h1('hph1');
                let hph1text = document.createTextNode('Take Back The Advantage');
                hph1.appendChild(hph1text);
                this.body.appendChild(hph1);
            }
            makeMenu(){
                // create the ul
                let hpul = ul('hpul');
                //creates the links
                    let hpaPractice = a('hpaPractice', '', 'practice.html');
                    let hpaGraphs = a('hpaGraphs','','graphs.html');
                    let hpaStats = a('hpaStats','','stats.html');
                    let hpaCasinos = a('hpaCasinos','','casinos.html');
                // apends the li's to the links
                    hpaPractice.appendChild(li('hpliPractice', 'Practice'));
                    hpaGraphs.appendChild(li('hpliGraphs', 'Graphs'));
                    hpaStats.appendChild(li('hpliStats', 'Stats'));
                    hpaCasinos.appendChild(li('hpliCasinos', 'Casinos'));
            //appends the links to the list
                appendElements(hpul, [hpaPractice,hpaGraphs,hpaStats,hpaCasinos]);
                this.body.appendChild(hpul);
            }
            makeBottomNav(){
                this.body.appendChild(bottomnav('homepage.html'));
                document.getElementById('bottomnavlihome').style.backgroundColor = 'white';
            }
            makeLogoTitle(){
                this.body.appendChild(logoTitle());
            }

        }


        //Practice page
        class PracticePage{
            constructor(){
                this.body = document.querySelector('body');
                this.location = 'practice.html';
                this.strategies;
            }
            update(){
                if(practicebody) this.loadPage();
            }
            loadPage(){
                StrategiesPromise.then(function(_strategies){
                    this.strategies = _strategies.getStrat();
                    this.assemblePage();
                }.bind(this));

            }
            assemblePage(){
                this.makeLogoTitle();
              //  this.makeTitle();
                this.makeAlternateMenu();
               // this.makeMenu();
                this.makeBottomNav();
                this.mediaQueries();

            }
            makeBackArrow(){
                let practicediv = div('backArrowdiv');
                let practiceiconlink = a('backArrowIconLink', '', 'homepage.html');
                let practiceicon = img('backArrowIcon', 'redbackarrow.png');
                practiceiconlink.appendChild(practiceicon);
                practicediv.appendChild(practiceiconlink);
                this.body.appendChild(practicediv);
            }
            makeTitle(){
                let practiceh1 = h1('practiceh1', 'Practice');
                this.body.appendChild(practiceh1);
            }
            makeMenu(){
                    // creating the ul
                    let practiceul = ul('practiceul');
                StrategiesPromise.then(function(_strategies){
                    
                    // saving the strategies json obj 
                    let strategiesobj = _strategies.getStrat();
                    //creating a list for every strategy and adding an event listener to it
                    for( const property in strategiesobj){
                            let list = li();
                            list.textContent = strategiesobj[property].title + '';
                            let title = strategiesobj[property].title;
 
                        // event listener for when one of the li elements is clicked
                            list.addEventListener('click', function(){
                                localStorage.setItem('strategy', title);
                                

                                window.location = 'strategiespage.html';
                                //console.log(strategiesobj[property].title);

                            });
                            practiceul.appendChild(list);
                    }

                });
                this.body.appendChild(practiceul);

            }
            makeAlternateMenu(){
                let listbasic = ul('alternatebasicul');
                listbasic.setAttribute('class', 'basicmenuul');
                let listcount = ul('alternatecountul');
                listcount.setAttribute('class', 'countmenuul');
                    for(const property in this.strategies){
                        let lielement = li(undefined, undefined);
                        let title = this.strategies[property].title;
                        lielement.textContent = title + '';
                        lielement.addEventListener('click', function(){
                            localStorage.setItem('strategy', title);
                            window.location = 'strategiespage.html';
                        });
                        if(this.strategies[property].type == 'Basic') {
                            lielement.setAttribute('class', 'basicmenuli')
                            listbasic.appendChild(lielement);

                        }
                        if(this.strategies[property].type == 'Count') {
                            lielement.setAttribute('class', 'countmenuli');
                            listcount.appendChild(lielement);
                        }
                    }
                
                let divbasic = div('basicmenudiv');
                let divcount = div('countmenudiv');
                let basicmenuh1 = h1(undefined, 'Basic Strategies');
                let countmenuh1 = h1(undefined, 'Count Strategies');
                divbasic.appendChild(basicmenuh1);
                divcount.appendChild(countmenuh1);
                divbasic.appendChild(listbasic);
                divcount.appendChild(listcount);

                this.body.appendChild(divbasic);
                this.body.appendChild(divcount);

            }
            makeBottomNav(){
                this.body.appendChild(bottomnav('homepage.html'));
                document.getElementById('bottomnavlipractice').style.backgroundColor = 'white';
            }
            makeLogoTitle(){
                this.body.appendChild(logoTitle());
            }
            mediaQueries(){
                window.addEventListener('resize', practicepageMediaQueries);
                practicepageMediaQueries(); 

            }
            practicepageMediaQueries(){
                let ulbasic = document.getElementById('alternatebasicul');
                let listbasicelements = ulbasic.getElementsByTagName('li');
                let ulcount = document.getElementById('alternatecountul');
                let listcountelements = ulcount.getElementsByTagName('li');
            
                if(mediaWidth550.matches){
    
                    //for the basic elements
                        for(let i = 0; i < listbasicelements.length; i++){
                            console.log(i);
                            listbasicelements[i].setAttribute('class', 'basicmenulimedia');
                        }
        
                        ulbasic.setAttribute('class', 'basicmenuulmedia');
                    //for the count elements
                        for(let i = 0; i < listcountelements.length; i++){
                            listcountelements[i].setAttribute('class', 'countmenulimedia')
                        }
                        ulcount.setAttribute('class', 'countmenuulmedia');
                        
                }else{
                    if(ulbasic.classList.contains('basicmenuulmedia')){
                        ulbasic.setAttribute('class','basicmenuul');
                        ulcount.setAttribute('class', 'countmenuul');
                        console.log('theclasses');
                        for(let i = 0; i < listbasicelements.length; i++){
                            listbasicelements[i].setAttribute('class','basicmenuli');
                            
                        }
                        for(let i = 0; i < listcountelements.length; i++){
                            listcountelements[i].setAttribute('class', 'countmenuli');
                        }
                    }
                }
            }


    }
        


        // Strategies page object
        class StrategyPage {
            constructor(){
                this.matchTitle = localStorage.getItem('strategy');
              //  this.url = url;
                this.strategy;
                this.body = document.querySelector('body');
                this.location = 'strategiespage.html';
            }
            // function that gets called when the subject calls it
            update(){
                if(strategiespagebody) this.loadPage();
            }
            loadPage(){
               // window.location = this.url + '';
               console.log(this.matchTitle);
               StrategiesPromise.then(function(strategiesobj){
                   let _strategies = strategiesobj.getStrat();
                   for(const property in _strategies){
                       //console.log(_strategies[property].title);

                       if(_strategies[property].title == localStorage.getItem('strategy')){
                           this.strategy = _strategies[property];
                       }
                   }
                   this.assemblePage();
               }.bind(this));

            }
            //puts all the page elements together
            assemblePage(){
                this.makeLogoTitle();
                this.makeTitle();
                this.makeGraphList();
                this.makeTestList();
                this.makeDescription();
                this.makeBottomNav();
            }
            //makes the top title
            makeTitle(){
                let title = h1(undefined, this.strategy.title);
                 this.body.appendChild(title);
            }
            makeBackArrow(){
                let div1 = div('backArrowdiv');
                let link = a('backArrowIconLink',undefined, 'practice.html');
                let icon = img('backArrowIcon', 'redbackarrow.png');
                link.appendChild(icon);
                div1.appendChild(link);
                this.body.appendChild(div1);
            }
            makeGraphList(){
                let headergraph = h1('strategiesGraphh1', 'Graphs');
                let list = ul('strategiesGraphul');
                for(const property in this.strategy.graphs){
                    let listelement = li(undefined, this.strategy.graphs[property].type + '');
                    let graph = this.strategy.graphs[property].type;
                    listelement.addEventListener('click', function(){
                        localStorage.setItem('graph', graph);
                        window.location = 'graphspage.html';
                    })
                    list.appendChild(listelement);
                }
                this.body.appendChild(headergraph);
                this.body.appendChild(list);
            }
            makeTestList(){
                let headertest = h1 ('strategiesTesth1', 'Tests');
                let list = ul('strategiesTestul');
                for(const property in this.strategy.tests){
                    let lielement = li(undefined, this.strategy.tests[property].type + '') 
                    list.appendChild(lielement);
                    let testType = this.strategy.tests[property].type;
                    lielement.addEventListener('click', function(){
                        localStorage.setItem('testType', testType);
                        window.location = 'testspage.html';
                    });
                    
                }
                this.body.appendChild(headertest);
                this.body.appendChild(list);
            }
            makeDescription(){
                let des = this.strategy.description;
                let para = p('strategiesDescription', '');
                para.textContent = des;
                let div1 = div('strategiesDescriptiondiv');
                div1.appendChild(para);
                this.body.appendChild(div1);
            }
            makeBottomNav(){
                this.body.appendChild(bottomnav('practice.html'));
            }
            makeLogoTitle(){
                this.body.appendChild(logoTitle());
            }


        }


        // graph page object
        class GraphPage {
            constructor(){
                this.body = document.querySelector('body');
                this.matchTitle = localStorage.getItem('strategy');
                this.matchGraph = localStorage.getItem('graph');
                this.strategy;
                this.graph;
                this.graphType;
            }
            update(){
                if(graphspagebody) this.loadPage();
            }
            //function that loads page
            loadPage(){
                //finding the strategy and saving it
                StrategiesPromise.then(function(_strategies){
                    let strategies = _strategies.getStrat();
                   // console.log(strategies);
                    //finding the strategy and then saving it
                    for (const property in strategies){
                       // console.log(this.matchTitle);
                        if(strategies[property].title == this.matchTitle){
                             this.strategy = strategies[property];
                                                     //finding the graph and then saving it
                            for(const element in strategies[property].graphs){
                                if(strategies[property].graphs[element].type == this.matchGraph){
                                    console.log(this.matchGraph);
                                    this.graph = strategies[property].graphs[element].graph;
                                    console.log(this.graph);
                                    this.graphType = strategies[property].graphs[element].type;
                                }
                            }
                        }

                    }

                    this.assemblePage();
                }.bind(this));



            }
            assemblePage(){
                this.makeLogoTitle();
                this.makeStrategyHeader();
                this.makeGraphTypeHeader();
                this.makeGraph();
                this.makeBottomNav();
            }
            makeLogoTitle(){
                this.body.appendChild(logoTitle());
            }
            makeStrategyHeader(){

                let header = h1('graphsStrategyh1', this.strategy.title + '');
                this.body.appendChild(header);
            }
            makeGraphTypeHeader(){
                let header = h1('graphsTypeh1', this.graphType + '');
                this.body.appendChild(header);
            }
            makeGraph(){
                StrategiesPromise.then(function(_strategies){
                   // console.log(this.graph);
                   console.log(this.graph);
                this.body.appendChild(_strategies.makeTable(this.graph, 'graphstable'));
            }.bind(this));
        }
        makeBottomNav(){
            this.body.appendChild(bottomnav('strategiespage.html'));
        }
    }


        //tests page object
        class TestPage{
            constructor(){
                this.body = document.querySelector('body');
                this.matchTestType = localStorage.getItem('testType');
                this.matchTitle = localStorage.getItem('strategy');
                this.strategy;
                this.testType;
                this.questions;
                this.test;
                this.tom = {"fuck" : 10};
            }
            update(){
               if(document.getElementById('testspagebody')) this.loadPage();
            }
            loadPage(){

                StrategiesPromise.then(function(_strategies){
                    let strategies = _strategies.getStrat();
                    // going through the strategies and finding the right strategy
                    for(const property in strategies){
                        if(strategies[property].title == this.matchTitle){
                            this.strategy = strategies[property];
                            // going through the strategy's tests and finding the right one
                            for(const element in strategies[property].tests){
                                if(strategies[property].tests[element].type == this.matchTestType){
                                    this.test = strategies[property].tests[element];
                                    this.questions = strategies[property].tests[element].questions;
                                    //this.tom = this.questions;
                                }
                            }
                        }

                    }

                    this.assemblePage();
                }.bind(this));

            }
            assemblePage(){
                this.makeLogoTitle();
                this.makeStrategyHeader();
                this.makeTestTypeHeader();
                this.makeStartButton();
                this.makeBottomNav();
            }
            makeLogoTitle(){
                this.body.appendChild(logoTitle());
            }
            makeStrategyHeader(){
                let header = h1("fuck", "" + this.matchTitle);
                this.body.appendChild(header);
            }
            makeTestTypeHeader(){
                let header = h1('testspageTestTypeHeader', "" + this.matchTestType);
                this.body.appendChild(header);
            }
            makeStartButton(){
                let button1 = button('testpageStartbutton', 'submit', 'Start');
                button1.addEventListener('click', function(){
                  //  console.log(this.questions);
                    this.startTest();
                }.bind(this));
                this.body.appendChild(button1);
            }
            makeBottomNav(){
                this.body.appendChild(bottomnav('strategiespage.html'));
            }
            randomProperty(obj){
                let keys = Object.keys(obj);
                return obj[keys[keys.length * Math.random() << 0]];
            }
            startTest(){
              //  this.loadPage();
              //  let currentTest = new Test(this.body,this.questions,this.test, this.strategy);
                let currentTest = new Test();
               // console.log(this.questions);
               // console.log(this.tom);
                currentTest.startTest();
            }

        }





                                                    





                      ///////////////////////////   Main thread     //////////////////////////////////
        // variable for the current page subject
        let currentPageSubject = new CurrentPageSubject();
        //variable to hold the hompage object
        let homepage = new HomePage();
        // variable to hold the practice page
        let practicepage = new PracticePage(); 
        //variable to hold the strategy page;
        let strategypage = new StrategyPage();
        //variable to hold the graph page
        let graphpage = new GraphPage();
        //variable to hold the test page
        let testpage = new TestPage();

        
        //adding the objects to the observable
        currentPageSubject.add(homepage);
        currentPageSubject.add(practicepage);
        currentPageSubject.add(strategypage);
        currentPageSubject.add(graphpage);
        currentPageSubject.add(testpage);


    // every time the window loads it fires
        window.addEventListener('load', function(){
            currentPageSubject.notify();
        } );
       // hpbody.appendChild(img('','https://drscdn.500px.org/photo/188449661/m%3D900/v2?sig=84dc85c99bb3a50f475882052d40d4300cd018c8b82a18e56f659f1bc27e6498'));

    // sets up the homepage elements
       // if(hpbody) homepage.loadPage();
        
    //sets up the practice page Elements
      //  if(practicebody)  practicepage.loadPage();

    //set up the strategies page elements
       // if(strategiespagebody) strategypage.loadPage();
      /*  if(strategiespagebody) {
            // getting the module json object
            StrategiesPromise.then(function(_strategies){
                let strategyobj;
                // getting the title i want to match;
                let matchTitle = localStorage.getItem('strategy');
                console.log(matchTitle);
                // saving the json file to a variable
                strategies = _strategies.getStrat();
                for(property in strategies){
                    if(strategies[property].title === matchTitle){
                        strategyobj = new StrategyPage(strategies[property], 'url');
                    }
                }
                strategyobj.loadPage();
            });
        }*/




      ///////////////////////////////////////      End Main Thread            ////////////////////////////







////////                        funcitons                           ///////



        //function that sets up the practice page
     /*       function practiceSetUp(){
                //backarrow
                    let practicediv = div('practicediv');
                    let practiceiconlink = a('practiceiconlink', '', 'homepage.html');
                    let practiceicon = img('practiceicon', 'redbackarrow.png');
                    console.log(practiceicon.src);
                    practiceiconlink.appendChild(practiceicon);
                    practicediv.appendChild(practiceiconlink);
                    practicebody.appendChild(practicediv);


                // h1 element
                    let practiceh1 = h1('practiceh1', 'Practice');
                    practicebody.appendChild(practiceh1);

                //  creating the list that holds the titles
                    StrategiesPromise.then(function(_strategies){
                        // saving the strategies json obj 
                        let strategiesobj = _strategies.getStrat();
                            // creating the ul
                            let practiceul = ul('practiceul');
                        for(property in strategiesobj){
                                let list = li();
                                list.textContent = strategiesobj[property].title + '';
                                let title = strategiesobj[property].title;
                            // event listener for when one of the li elements is clicked
                                list.addEventListener('click', function(){
                                    localStorage.setItem('strategy', title);

                                    window.location = 'strategiespage.html';
                                    //console.log(strategiesobj[property].title);

                                    


                                });
                                practiceul.appendChild(list);
                        }
                        // appending the list to the body
                        practicebody.appendChild(practiceul);*/
                    /*  //array that holds the titles to all the graphs
                            let practiceTitles = _strategies.getTitles();
                        //array that holds the url to all the strategies
                            let practiceurls = _strategies.getUrls();
                        // creating the ul
                            let practiceul = ul('practiceul');
                        // creating the a and li and appending them
                            practiceurls.forEach(function(element, index){
                                let link = a();
                                let list = li();

                                list.textContent = practiceTitles[index]+ '';

                                link.appendChild(list);
                                link.href = 'strategies.html';
                                practiceul.appendChild(link);
                            });
                            practicebody.appendChild(practiceul);

                    });
                
            }*/

            //function that sets up the strategies page
         /*   function strategiespageSetUp(){
                // getting the module json object
                StrategiesPromise.then(function(_strategies){
                    let strategyobj;
                    // getting the title i want to match;
                    let matchTitle = localStorage.getItem('strategy');
                    console.log(matchTitle);
                    // saving the json file to a variable
                    strategies = _strategies.getStrat();
                    for(property in strategies){
                        if(strategies[property].title === matchTitle){
                            strategyobj = new StrategyPage(strategies[property], 'url');
                        }
                    }
                    strategyobj.loadPage();
                })
                
                }*/
    // Media Queries
   /* window.addEventListener('resize', function(){
    
           practicepageMediaQueries();
        
    });*/

    // for the practice page
        function practicepageMediaQueries(){
            let ulbasic = document.getElementById('alternatebasicul');
            let listbasicelements = ulbasic.getElementsByTagName('li');
            let ulcount = document.getElementById('alternatecountul');
            let listcountelements = ulcount.getElementsByTagName('li');
        
            if(mediaWidth550.matches){

                //for the basic elements
                    for(let i = 0; i < listbasicelements.length; i++){
                        console.log(i);
                        listbasicelements[i].setAttribute('class', 'basicmenulimedia');
                    }
    
                    ulbasic.setAttribute('class', 'basicmenuulmedia');
                //for the count elements
                    for(let i = 0; i < listcountelements.length; i++){
                        listcountelements[i].setAttribute('class', 'countmenulimedia')
                    }
                    ulcount.setAttribute('class', 'countmenuulmedia');
                    
            }else{
                if(ulbasic.classList.contains('basicmenuulmedia')){
                    ulbasic.setAttribute('class','basicmenuul');
                    ulcount.setAttribute('class', 'countmenuul');
                    console.log('theclasses');
                    for(let i = 0; i < listbasicelements.length; i++){
                        listbasicelements[i].setAttribute('class','basicmenuli');
                        
                    }
                    for(let i = 0; i < listcountelements.length; i++){
                        listcountelements[i].setAttribute('class', 'countmenuli');
                    }
                }
            }
        }









        
    //Random functions 
            function returnArrow(){
                let practicediv = div('practicediv');
                let practiceiconlink = a('practiceiconlink', '', 'homepage.html');
                let practiceicon = img('practiceicon', 'redbackarrow.png');
                console.log(practiceicon.src);
                practiceiconlink.appendChild(practiceicon);
                practicediv.appendChild(practiceiconlink);
                practicebody.appendChild(practicediv);
            }
            
            // function that makes the bottom nav
            function bottomnav(backarrowlink){
                let navlist = ul('bottomnavul');
                let liback = li(undefined);
                let lihome = li('bottomnavlihome');
                let lipractice = li('bottomnavlipractice');
                let ligraphs = li('bottomnavligraphs');
                let listats = li('bottomnavlistats');
                let licasinos = li('bottomnavlicasinos');
                let aback = a(undefined,undefined,backarrowlink);
                let ahome = a(undefined, undefined, 'homepage.html');
                let apractice = a(undefined, undefined, 'practice.html');
                let agraphs = a(undefined,undefined,'#');
                let astats = a(undefined,undefined,'#');
                let acasinos = a(undefined,undefined,'#');
                let backtext = "Back";
                let hometext = "Home";
                let practicetext = "Practice";
                let graphtext = "Graphs";
                let statstext = "Stats";
                let casinostext = "Casinos";
                let backicon = img(undefined, 'icons/backarrowgreen.png');
                let homeicon = img(undefined, 'icons/homegreen.png');
                let practiceicon = img(undefined, 'icons/practicegreen.png');
                let graphicon = img(undefined, 'icons/graphsgreen.png');
                let statsicon = img(undefined, 'icons/statsgreen.png');
                let casinoicon = img(undefined, 'icons/casinogreen.png');
                let pback = p(undefined, backtext);
                let phome = p(undefined, hometext);
                let ppractice = p(undefined, practicetext);
                let pgraphs = p(undefined,graphtext);
                let pstats = p(undefined, statstext);
                let pcasinos = p(undefined, casinostext);
                aback.appendChild(backicon);
                aback.appendChild(pback);
                ahome.appendChild(homeicon);
                ahome.appendChild(phome);
                apractice.appendChild(practiceicon);
                apractice.appendChild(ppractice);
                agraphs.appendChild(graphicon);
                agraphs.appendChild(pgraphs);
                astats.appendChild(statsicon)
                astats.appendChild(pstats);
                acasinos.appendChild(casinoicon)
                acasinos.appendChild(pcasinos);
                liback.appendChild(aback);
                lihome.appendChild(ahome);
                lipractice.appendChild(apractice);
                ligraphs.appendChild(agraphs);
                listats.appendChild(astats);
                licasinos.appendChild(acasinos);

                 appendElements(navlist, [liback, lihome, lipractice,ligraphs,listats, licasinos]);
                 let div1 = div('bottomnavdiv');
                 div1.appendChild(navlist);
                return div1;
            }

            // makes the logo title
            function logoTitle(){
                let div1 = div('headerlogodiv');
                let para = p(undefined,'');
                let span1 = span(undefined, undefined);
                let imglogo = img(undefined, 'icons/pokerchip.png');
                span1.appendChild(imglogo);
                para.appendChild(span1);
                para.appendChild(document.createTextNode('Advantage Blackjack'));
                div1.appendChild(para);
                return div1;
            }


            //function that checks if a object has any properties in it
            function hasProperties(obj){

                for(const prop in obj){
                    console.log(obj[prop]);
                    if(obj.hasOwnProperty(prop)){
                        return false;
                    }
                    
                }
                return true;
            }

            function emptyObject(obj){
                for(const property in obj){
                    if(!Object.keys(obj[property]).length === 0){
                        return false;
                    }
                }
                return true;
            }






