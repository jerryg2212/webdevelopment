function anagrams(word, words) {
  let temp = [];
  let newWord = words;
  let cut;
  let wordj;
  for( let i = 0; i < words.length; i++){
    cut = words[i];
    for( let j = 0; j < word.length; j++){
      wordj = word[j];
      if(cut.includes(wordj) === 'true'){
        cut = cut.slice(wordj);
      }    
    }
    if(cut == ''){
    temp.push(newWord[i]);
      }
  }
  console.log(temp);
  return temp;
}
anagrams('abba',['bbaa', 'abab', 'fgfg']);