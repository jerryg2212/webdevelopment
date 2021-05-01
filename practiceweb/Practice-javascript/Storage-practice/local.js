

// Recieves input
if (window.localStorage) {
    var txtusername = document.getElementById('username');
    var txtanswer = document.getElementById('answer');

    txtusername.value = localStorage.getItem('username');
    txtanswer.value = localStorage.getItem('answer');

    txtusername.addEventListener('input', function () {
        localStorage.setItem('username', txtusername.value);
    }, false);

    txtanswer.addEventListener('input', function () {
        localStorage.setItem('answer', txtanswer.value);
    }, false);
}

    usernameoutput = docuement.getElementById('output');
    usernameoutput.addEventListener('click', function () {
        username1 = localStorage.getItem('username');
        usernameoutput.innerHTML = '<p>Your Username is:' + username1 + '</p>';
    }, false);

/*
answer = localStorage.getItem('answer');
username = localStorage.getItem('username');
var output = document.getElementById('output');
output.innerHTML = '<p> Your Answer is' + answer
*/