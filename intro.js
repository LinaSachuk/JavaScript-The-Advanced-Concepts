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