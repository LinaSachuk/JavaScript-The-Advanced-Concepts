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


// factory function make/create obect for us
function createElf(name, weapon) {
    //we can also have closures here to hide properties from being changed.
    return {
        name: name,
        weapon: weapon,
        atack() {
            return 'atack with ' + weapon
        }
    }
}
const sam = createElf('Sam', 'bow');
const peter = createElf('Peter', 'fire');

sam.atack()


// Implementing an Array
class MyArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }
    get(index) {
        return this.data[index];
    }
    push(item) {
        this.data[this.length] = item;
        this.length++;
        return this.data;
    }
    pop() {
        const lastItem = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastItem;
    }
    deleteAtIndex(index) {
        const item = this.data[index];
        this.shiftItems(index);
        return item;
    }
    shiftItems(index) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        console.log(this.data[this.length - 1]);
        delete this.data[this.length - 1];
        this.length--;
    }
}

const myArray = new MyArray();
myArray.push('hi');
myArray.push('you');
myArray.push('!');
myArray.pop();
myArray.deleteAtIndex(0);
myArray.push('are');
myArray.push('nice');
myArray.shiftItems(0);
console.log(myArray);


// Reverse a String
function reverse(str) {
    // check input
    if (!str || typeof str != 'string' || str.length < 2) return str;

    const backwards = [];
    const totalItems = str.length - 1;
    for (let i = totalItems; i >= 0; i--) {
        backwards.push(str[i]);
    }
    return backwards.join('');
}

function reverse2(str) {
    //check for valid input
    return str.split('').reverse().join('');
}

const reverse3 = str => [...str].reverse().join('');

reverse('Timbits Hi')
reverse('Timbits Hi')
reverse3('Timbits Hi')

