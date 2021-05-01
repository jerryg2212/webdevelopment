//holds the container div
let container = document.getElementById('container');
let ex = 10;


/*let ww = new Promise(() => {
    if(true){
      //  answer();
        let temp;
        for(let i = 0; i < 1000000000; i++){
            temp = i;
        }
        console.log(temp);
        

    }else{
       // reject();
    }
});
ww.then( printNumber(10));*/


/*let tt = new Promise(message);
tt.then(reslut => goodbye(reslut));*/


/*let seven = new Promise((answer, wrong) => {
     answer(message('fuck you'));
})
seven.then(result => goodbye(result));*/

let skate = fetch('skate.jpg');
skate.then(result => result.blob()).then(myblob => {
    objurl = URL.createObjectURL(myblob);
    let img = document.createElement('img');
    img.src = objurl;
    container.appendChild(img);
})



// funcitons
 function countNumber(number) {

    return number;
}

 function printNumber(number){
    console.log(number);
}
function message(tim){
    return tim;
}
function goodbye(message){
    let gb = document.createElement('p');
    gb.textContent = '' + message;
    container.appendChild(gb);
}

/*function reject () {
    console.log('rejected');
}
function resolve () {
    console.log('resolved');
}*/
/*function somego() {
    return new Promise((resolve, reject) => {
        if(true){
            resolve(' fuck you11');
        }else{
            reject();
        }
    });
}*/