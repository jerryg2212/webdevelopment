
var sx = document.getElementById('sx');

function showPosition(event) {
    sx = event.screenX;
    sy = event.pageY;
    sr = document.getElementById('sx');
    msg = "lkj " + sx + "    " + sy;
    sr.innerHTML = msg;
    
    
}
var el = document.getElementById('body');
el.addEventListener('mousemove', showPosition, false);