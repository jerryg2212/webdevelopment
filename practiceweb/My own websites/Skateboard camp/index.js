

function checklength(e, minlength) {
    var el, elmsg;
    el = e.target;
    elmsg = document.getElementById('first1');

    if (el.value.length < minlength) {
        elmsg.innerHTML = 'Username must be ' + minlength + 'characters or more';
    } else {
        elmsg.innerHTML = '';
    }
}


var first = document.getElementById('first');
if (first.addEventListener) {
    first.addEventListener('blur', function(e) {
        checklength(e, 5);
    }, false);
}

function changeColor(e){
    var el = e.target;
    el.className = 'coms';
}

var back = document.getElementById('green');
back.addEventListener('click', function(e) {
    changeColor(e);
}, false);

function changeBack(e) {
    var re = e.target;
    re.className = 'comss';
}

var from = document.getElementById('green');
from.addEventListener('click', function(e) {
    changeBack(e);
}, false);