// function test(){
//     console.log("test:",this.name)
// }

// const person = {
//     name:'test-name',
//     sayHello: test
// }

// const person1 = {
//     name:'test-name1',
//     sayHello(){
//         test(); // 会答应undefined
//         test.call(this)
//     }
// }
// person.sayHello()

// person1.sayHello()

// 'use strict'
function show(){
    console.log(this)
}
show()