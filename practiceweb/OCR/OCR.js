
/*let first = document.createElement('img');
first.src = '3.png';
first.setAttribute('id' ,'images');

let firstStyle = {
    'width' : '500px',
    'margin' : '50px auto',
    'display' : 'block'
}
Object.assign(first.style, firstStyle);

let body = document.querySelector('body');
body.appendChild(first);
let images = document.getElementById('images');
/*let canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas1');
body.appendChild(canvas);

let canvas1 = document.getElementById('canvas1');
let context = canvas1.getContext('2d');
context.drawImage(first, 0,0);
let text = OCRAD(context);
console.log(text);*/
//let sd = OCRAD(images);
//console.log(sd);
const { createWorker }  = require('tesseract.js')
const PSM = require('tesseract.js/src/constants/PSM.js')
async function getTextFromImage() {
  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.AUTO,
  })
  const { data: { text } } = await worker.recognize('3.png');
  await worker.terminate()
  
  return text
}
getTextFromImage()
  .then(console.log)



/*body.appendChild(first);
const worker = new Tesseract.TesseractWorker();
worker.recognize(file, $("#langsel").val())
.progress(function(packet){
    console.info(packet)
    progressUpdate(packet)
})
.then(function(data){
    console.log(data)
    progressUpdate({ status: 'done', data: data })
});
console.log(worker);*/



