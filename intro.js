// we send in the function as an argument to be
// executed from inside the calling function
function performOperation(a, b, cb) {
    var c = a + b;
    cb(c);
}

performOperation(2, 3, function (result) {
    // prints out 5
    console.log("The result of the operation is " + result);
})

// ===========================================================================
// call stack will have :
// calculate
// subractTwo (And after we finish running it, it's going to remove it.)
// back to calculate (And after we finish running it, it's going to remove it.)


function subractTwo(num) {
    return num - 2;
}

function calculate() {
    const sumTotal = 4 + 5;
    return subractTwo(sumTotal);
}


console.log(calculate());

// ===========================================================================
// hoisting

var favoriteFood = 'grapes';

var foodThoughts = function () {
    console.log('Original favorite food: ' + favoriteFood);


    var favoriteFood = 'sushi';

    console.log('New favorite food: ' + favoriteFood);

};

foodThoughts(); //outputs: 
// Original favorite food: undefined
// New favorite food: sushi
// ===========================================================================
function bigBrother() {
    function littleBrother() {
        return 'it is me!';
    }
    return littleBrother();
    function littleBrother() {
        return 'no me!';
    }
}

// Before running this code, what do you think the output is?
bigBrother(); //outputs: no me!

// ===========================================================================

//Function Scope
function loop() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log(i)
}

//Block Scope
function loop2() {
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log(i)
}

loop();
loop2();
//   ======================================
//this
const obj = {
    name: 'Billy',
    sing: function () {
        return 'llala ' + this.name + '!'
    },
    singAgain: function () {
        return this.sing()
    }
}

function importantPerson() {
    console.log(this.name)
}

const name = 'Sunny';
const obj1 = { name: 'Cassy', importantPerson: importantPerson }
const obj2 = { name: 'Jacob', importantPerson: importantPerson }

obj2.importantPerson()
//   ======================================
// object cloning
var c = [1, 2, 3];
var d = c;
d.push(4);

console.log(c);   // [1,2,3,4]
console.log(d);   // [1,2,3,4]

var a = 5;
var b = a;

b++;

let obj = {
    a: 'a',
    b: 'b',
    c: {
        deep: 'try and copy me'
    }
};
// shallow cloning
let clone = Object.assign({}, obj);
let clone2 = { ...obj } // spread operator

// deep cloning
let superClone = JSON.parse(JSON.stringify(obj))

obj.c.deep = 'hahaha';
console.log(obj) // { a: 'a', b: 'b', c: { deep: 'hahaha' } }
console.log(clone) // { a: 'a', b: 'b', c: { deep: 'hahaha' } }
console.log(clone2)// { a: 'a', b: 'b', c: { deep: 'hahaha' } }
console.log(superClone) // { a: 'a', b: 'b', c: { deep: 'try and copy me' } }




// ----------------
// Create our own prototypes:
var human = { mortal: true }
var socrates = Object.create(human);
human.isPrototypeOf(socrates); // true

//Array.map() => to print '🗺'
Array.prototype.map = function () { // what happens with arrow function here?
    arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push((this[i] + '🗺'));
    }
    return arr;
}
console.log([1, 2, 3].map())

//Date object => to have method .yesterday() which shows you yesterday's day in 'YYYY-MM-DD' format.
Date.prototype.lastYear = function () {
    return this.getFullYear() - 1;
}

new Date('1900-10-10').lastYear()
  // don't worry if you didn't get this... we will expand on this later.