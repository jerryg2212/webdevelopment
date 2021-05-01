const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i = 1; i<=5; i++){
const newImage = document.createElement('img');
let xxx = 'images/pic' + i + '.jpg';
newImage.setAttribute('src', xxx);
thumbBar.appendChild(newImage);
newImage.addEventListener('click', function () {
    displayedImage.setAttribute('src', xxx);
});
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', function () {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark'){
        btn.setAttribute('class', 'light');
        overlay.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        btn.textContent = 'lighten';
    }else {
        btn.setAttribute('class', 'dark');
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        btn.textContent = 'Darken';
    }
});

