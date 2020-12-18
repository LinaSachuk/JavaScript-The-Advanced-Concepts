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

