const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}
let storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
let insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
let insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
let insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];


randomize.addEventListener('click', result);

function result() {

  if(customName.value !== '') {
    let name = customName.value;
    newStory = storyText;
    xItem = insertX.randomValueFromArray();
    yItem = insertY.randomValueFromArray();
    zItem = insertZ.randomValueFromArray();
    newStory = newStroy.replace('insertx', xItem);
    newstory += newStory.replace('inserty', yItem);
    newStory += newStory.replace('insertz', zItem);

  }

  if(document.getElementById("uk").checked) {
    let weight = Math.round(300 * 0.0714286) + ' Stones';
    let temperature =  Math.round((94 - 32) * (9/5)) + ' Degree celcius';

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}