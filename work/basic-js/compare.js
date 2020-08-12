"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  guess=guess.toUpperCase();
  let count = 0;
  const obj = guess.split("");
  for(let str of word){
   let idx = obj.findIndex(s => s === str);
   if(idx >= 0){
     count++;
     obj.splice(idx, 1);
   }
  }
  return count;
  //return 0; // this line is wrong
}
