

/* var msg = '<h2>browser windows</h2><p>width: ' + window.innerWidth + '</p>';
msg += '<p>height: ' + window.innerHeight + '</p>';
msg += '<h2>history</h2><p>items: ' + window.history.length + '</p>';
msg += '<h2>screen</h2><p>width: ' + window.screen.width + '</p>';
msg += '<p>height: ' + window.screen.height + '</p>';
var el = document.getElementById('info');
el.innerHTML = msg;
alert('Current page: ' + window.location);

var tom = '<p><b>page title: </b>' + document.title + '<br />';
tom += '<b>page address: </b>' + document.URL + '<br />';
tom += '<b>last modified: <b/>' + document.lastModified + '</p>';

var eltom = document.getElementById('footer');
eltom.innerHTML = tom;

var fun = '<p> The pointer is at' + window.screenX + '  ' + window.screenY + '</p>';
fun += '<p> this was last modified on' + document.lastModified + '</p>';
elfun = document.getElementById('fun');
elfun.innerHTML = fun;

// Returns current date
var date = new Date();
var pearl = new Date(1941, 11, 7, 0, 0, 0);
var seconds = Math.floor(timeSince(date, pearl));
var minutes = Math.floor(timeSince(date, pearl) / 60);
var hours = Math.floor(minutes / 60);
var days = Math.floor(hours / 24);
var months = Math.floor(days / 30);
var years = Math.floor(months / 12);

eldate = document.getElementById('date');
eldate.textContent = date;

function timeSince(date, pearl) {
    var final = date.getTime() - pearl.getTime();
    var final = final / 1000;
    return final;
}

elpearl = document.getElementById('pearl');
elpearl.textContent = timeSince(date, pearl);

var total = '<p> There has been ' + seconds + 'seconds, ' + minutes + 'minutes, ' + hours + 'hours, ' + days + 'days, ' + months + 
'months, and ' + years + 'years since Pearl Harbor.'
eltotal = document.getElementById('pearl');
eltotal.textContent = total;



// Creating a switch that tells you what level you are on
    var level = 2;

    switch (level) {
        case 1:
            msg = 'Level 1';
            break;
        case 2:
            msg = 'Level 2';
            break;
        case 3:
            msg = 'Level 3';
            break;
        default:
            msg = 'Hey you wanna play?';
            break;

    }

   hg = document.getElementById('switch');
   hg.textContent = msg;

   // Targeting Elements

 /* seven = document.getElementById('info');
   seven.className = 'cool'; 

   eight = document.getElementsByTagName('div');
   if (eight.length >= 1){
       eight[4].className = 'cool';
   } */

  /* var nine = document.getElementById('new');
    
   nine.lastChild = ten;
   ten.className = 'cool';
   */
   

   //updating content in list items

    eleven = document.getElementById('two');
    twelve = eleven.innerHTML;
    eleven.innerHTML = '<ul><li> Almost </li><li> Baker</li><a href=\"http://example.org"\> <li>' + twelve + '</li></a>';
                

    var john;
    john = document.createElement('li');
    jeremy = document.createTextNode('hoy ya maggots');
    john.appendChild(jeremy);
    position = document.getElementsByTagName('ul')[0];
    position.appendChild(john);

    removeli = document.getElementsByTagName('li')[0];
    removecontainer = removeli.parentNode;
    removecontainer.removeChild(removeli);


    // switching a ul elements class

    switchclass = document.getElementById('ulid');
    if (switchclass.hasAttribute('class')) {
        switchclass.className = 'sand';
    }
        
    removeattribute = document.getElementById('ulid');
    if(removeattribute.hasAttribute('class')) {
        removeattribute.removeAttribute('class');
    }

