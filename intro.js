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
