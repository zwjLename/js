/**
 * permute: 返回一个字符串数组，包含给定的字符串的所有排列
 * permute('')======> []
 * permute('abc')  =====> ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
 *
 */

 function permute(str) {
     let len = str.length;
     if (len <= 1) {
         return  str ? [str] : [];
     } else {
         return newPermute(str);
     }
 }

 function newPermute(str) {
     let result = [];
     if (str.length > 1) {
         //遍历要排列的字符串
        for (let i = 0; i < str.length; i++) {
            //将第i个元素拿出来
            let ele = str[i];
            //将剩下的字符串实现全排列
            let remain = str.slice(0, i) + str.slice(i+1, str.length);
            let permutedStr = newPermute(remain);
    
            //将拿出来的第i个元素 和 剩下的字符串实现全排列结果后的字符串 连接器起来
            for (let j = 0; j < permutedStr.length; j++) {
                let newStr = ele + permutedStr[j];
                result.push(newStr);
            }
         }
     } else {
         result.push(str);
     }
     return result;
 }

 
 console.log(permute(''))
 
 console.log(permute('a'))
 
 console.log(permute('abc'))

 console.log(permute('abcd'))