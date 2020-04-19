/**
 * go('x') = 'gox';
 * go()('x') = 'goox';
 * go()()('x') = 'gooox'
 */

 function go(param1, temp = 'go') {
     if (!param1) {
         return function (param2) {
            return go(param2, `${temp}o`)
         }
     } else {
         return `${temp}x`;
     }
 }


console.log(go('x'));
console.log(go()('x'));
console.log(go()()('x'));