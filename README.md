# JavaScript-The-Advanced-Concepts

https://www.udemy.com/course/advanced-javascript-concepts

https://www.javascripttutorial.net/

## Javascript Engine 

A JavaScript engine is a computer program that executes JavaScript (JS) code. The first JavaScript engines were mere interpreters, but all relevant modern engines use just-in-time compilation for improved performance. JavaScript engines are typically developed by web browser vendors, and every major browser has one.

## Javascript Runtime

Javascript runtime refers to where your javascript code is executed when you run it. That said, javascript can be executed on google chrome, in which case your javascript runtime is v8, if on mozilla - it is spidermonkey, if IE - then its chakra and if on node, again its v8. Asynchronous Web APIs provided by browsers (DOM, fetch(), setTimeout())

   ```JavaScript
   console.log('1');
   setTimeout(()=> {console.log('2'), 1000});
   console.log('3);
   ```

No matter how fast this setTimeout timer happens it still gets sent to the web API still get sent to the callback queue and the event loop still needs to check if the stack empty and has the entire file been run in our case.

   ```JavaScript
   1
   3
   undefined
   2
   ```

```JavaScript
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```
console.log(1) and (4) are executed 'in-line' and 2 and 3 are placed in the event queue, and don't get executed until the all of the in-line code is executed. So, even though the delay is 0 for (3), it still occurs after all statements are executed.


    ```JavaScript
    1
    4
    undefined
    3
    2
    ```

## Interpreter, Compiler, JIT Compiler

- AOT compiler - Ahead-of-Time (AOT): compiles before running
- JIT compiler - Just-in-Time (JIT) : compiles while running
- interpreter: runs - REPL — read-eval-print-loop.

## Writing Optimized Code

 So there is a thing called cloud. When we do a webpack build, it gets stored in cloud and our js code gets served from the cloud when user requests it. Now the cloud sends us JavaScript file, which is a junk of text basically and now to make sense it goes through a parser which parses the JavaScript file and converts it to an AST(Abstract Syntax Tree). You can think of AST as data-structure that represents what this code really means.
Now the V8 compilers take care of rest of the work. So the first step is interpreter which interprets the code and identify the hotspots which I mentioned earlier and generates semi-optimized bytecode. Any code that can be optimized then goes to the optimizing compiler. Then the optimizing compiler analyzes the code and make assumptions to make it even faster. The optimizing compiler generates highly optimized machine code, but we discussed that sometimes it has to de-optimize on runtime and change back to the byte code. Hats off to the naming of V8 team, they really know how to name their engines. The interpreter which generates the bytecode is called Ignition (yes the ignition of the car, i.e. the start) and the optimizing compiler is called TurboFan (turbo boost which speeds up the car).

## Call Stack + Memory Heap

We need the memory heap as a place to store and write information because at the end of the day all programs just read and write operations — that is to allocate, use and release memory.
The call stack helps us keep track of where we are in the code so that we can run the code in order.  Every time we run a function we use a call stack. We can think of a call stack as a region in memory that operates in a first in last out mode. So here, it will add the calculate() function on top of the stack. And after we finish running it, it's going to remove it.

## Stack Overflow + Memory Leaks

Stack overflow happens when we call functions nested inside each, other over and over again. If we just keep adding functions to the stack without popping them off, we will have a stack overflow. Example: Recursion function will call itself;


   ```JavaScript
   function inception(){
       inception();
   }
   inception();
   ```

### 3 common memory Leaks:

- Global Variables

   ```JavaScript
   var a =1;
   var b=1;
   var c=1;
   ```

   Here if I just keep adding these variables to my memory, all our memory is will eventually get used up because we are just using up memory. Imagine if these were deeply nested objects, we will be using up a lot of memory.

- Event Listeners

```JavaScript
var element = document.getElementById(‘button’)
element.addeventListener(‘click’, onClick)
```

This is a common way to leak memory because you can just keep adding event listeners and you don't remove them when you no longer need them. They will stay in the background and before you know, you have a memory leak.

- setInterval()
   
If we put objects inside a setInterval(), they will never be garbage collected unless we remove the setInterval itself.

```JavaScript
setInterval( () => { //referencing objects })
```

So something to keep in mind is that memory is limited. When it comes to a call stack and memory Heap, those are two places is where javascript runs and stores memory. So we have to be careful not to have memory leaks or stack overflow if we are to have efficient code.

## Garbage Collection

Javascript is a garbage-collected language. This means that if Javascript allocates memory, let's say within a function we create an object and that object gets stored somewhere in our memory heap, automatically when we finish calling that object and if we don't need that object anymore, and there is no reference to it in our program, Javascript is going to clean it up for us. Garbage collection in Javascript uses the Mark and sweep algorithm; when a reference to a variable is removed, its deleted.

## Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It has Global API. It set to be a server side platform based on asynchronous IO that is non blocking.

## ES6, ES7, ES8, ES9 features

## Single Threaded Model

Javascript is a single-threaded Programming language(synchronous)
This means that only one set of instructions is executed at any single time. It’s not doing multiple things. The best way to check if a language is single-threaded is if it has one call stack. We push and pop functions off the stack one by one. And so Javascript is synchronous — only one thing can happen at a time.

## Execution Context
 
```JavaScript
let x = 10;
function timesTen(a){
    return a * 10;
}
let y = timesTen(x);
console.log(y); // 100
```

1. The creation phase.
When a script executes for the first time, the JavaScript engine creates a Global Execution Context. During this creation phase, it performs the following tasks:
![alt tag](https://cdn.javascripttutorial.net/wp-content/uploads/2019/12/javascript-execution-context-global-execution-context-in-creation-phase.png)


  - Create a global object i.e., window in the web browser or global in Node.js.
  - Create a this object binding which points to the global object above.
  - Setup a memory heap for storing variables and function references.
  - Store the function declarations in the memory heap and variables within the global
  - execution context with the initial values as undefined.
  - Hoisting

2. The execution phase.
During the execution phase, the JavaScript engine executes the code line by line. In this phase, it assigns values to variables and executes the function calls.

![alt tag](https://cdn.javascripttutorial.net/wp-content/uploads/2019/12/javascript-execution-context-global-execution-context-in-execution-phase.png)

 For every function call, the JavaScript engine creates a new Function Execution Context. The Function Execution Context is similar to the Global Execution Context, but instead of creating the global object, it creates the arguments object that contains a reference to all the parameters passed into the function.

![alt tag](https://cdn.javascripttutorial.net/wp-content/uploads/2019/12/javascript-execution-context-function-execution-context-in-creation-phase.png)


![alt tag](https://cdn.javascripttutorial.net/wp-content/uploads/2019/12/javascript-execution-context-function-execution-context-in-execution-phase.png)

To keep track of all the execution contexts including the Global Execution Context and Function Execution Contexts, the JavaScript engine uses a data structure named call stack
    

## Lexical Environment

In JavaScript our lexical scope (available data + variables where the function was defined) determines our available variables. Not where the function is called (dynamic scope). The very first lexical environment is the global lexical environment where we write our code.

## Scope Chain

Links and gives us access to variables that are in our parent environment. Scope is where can I access that variable where's that variable in my code.

```JavaScript
// Scope:
function sayMyName() {
  var a = 'a';
  return function findName() {
    var b = 'b';
    console.log(c) // ReferenceError: c is not defined
    return function printName() {
      var c = 'c';
      return 'Andrei Neagoie'
    }
  }
}

sayMyName()()() // Andrei Neagoie
```

## Hoisting

Hosting is the behavior of moving the variables or function declarations to the top of their respective environments during compilation phase. Variables are partially hoisted and function declarations are hoisted (var and function). Hoisting is a part of the creation phase in the Global Execution Context.

```JavaScript
//during hosting one = undefined; will ignore a second declaration, because already assigned to equal undefined.
var one = 1;
var one = 2;

console.log(one) //2

// during hosting the compiler says Oh yeah I'm going to hoist this and I'm going to put this someplace in memory.
function a(){
    console.log('hi');
}

// the compiler is going to rewrite that place in memory.
function a(){
    console.log('bye');
}
//bye

```

## Function Invocation

 When we are telling JavaScript engine to run our function. 

```JavaScript
//Function Expression
var canada = () => {
    console.log('cold'); 
}

//Function Declaration
function india() { 
    console.log(arguments) //{}  arguments object created on each execution context
    console.log('warm');
}

//Function Invocation/Call/Execution
canada(); //cold
india(); //warm

```

## Function Scope vs Block Scope

- When you execute a script, the JavaScript engine creates a global execution context. It also assigns variables that you declare outside of functions to the global execution context. These variables are in the global scope. They are also known as global variables.

- Variables that you declare inside a function are local to the function. They are called local variables.

```JavaScript
//function scope
function a(){
  var secret = '12345';
}

secret; // ReferenceError: secret is not defined

//block scope
if (5 > 4) {
  var secret = '12345';
}

secret;
```

- ES6 provides the let and const keywords that allow you to declare variables in block scope. Generally, whenever you see curly brackets {}, it is a block. It can be the area within the if, else, switch conditions or for, do while, and while loops.

```JavaScript
function say(message) {
    if(!message) {
        let greeting = 'Hello'; // block scope
        console.log(greeting);
    }
    // say it again ?
    console.log(greeting); // ReferenceError
}

say();
```

## Dynamic vs Lexical Scope

##  this - call(), apply(), bind()

- this : this is the object that the function is a property of.

```JavaScript

const obj = {
  name: 'Billy',
  sing() {
    return 'lalala ' + this.name
  }
}

obj.sing(); // lalala Billy

```

- _This_ gives methods access to their object.
- With _this_  we can execute same code for multiple objects.

```JavaScript

const obj = {
  name: 'Billy',
  sing() {
    return 'lalala ' + this.name
  },
  singAgain() {
    this.sing() + '!'
  }
}

obj.singAgain(); // lalala Billy!

```

- call() apply()

```JavaScript

function a() {
  console.log('hi')
}

a.call(); // hi
a.apply() // hi
a(); //hi


// call() and  apply() allow us to use other objects methods with 'this'. call() takes parameters, apply() takes an array of parameters

const wizard = {
  name: 'Merlin',
  health: 100,
  heal: function(num1, num2) {
    this.health += num1 + num2;
  }
}

const archer = {
  name: 'Robin Hood',
  health: 50
}

wizard.heal.call(archer, 50, 60)
wizard.heal.apply(archer, [20, 30])
archer
// function borrowing
// bind() returns a function , store and we can use it later
const healArcher = wizard.heal.bind(archer, 50, 60);
console.log(archer)
healArcher()
console.log(archer)

// function currying
function multiply(a, b) {
    return a*b;
}

var multipleByTwo = multiply.bind(this, 2);
console.log(multipleByTwo(4)); //8

var multipleByThree = multiply.bind(this, 3);
console.log(multipleByThree(4)); //12


```

##  IIFEs

To avoid a global variable issue we can use an IIFE - an Immediately Invoked Function Expression. 

```JavaScript
//with first parentheses we are saying that this is not a function declaration, it's a function expression. And then after we've created an anonymous function. And then we immediately invoke it. 
// If we run this, will get : undefined
(function() {

})(); 

// If we run this, will get SyntaxError: Unexpected token
function(){}()

// Note that you can use an arrow function to define an IIFE:

(() => {
    //...
})();

// The IIFE returns an object that contains the add and multiply methods that reference the add() and multiply() functions.
const calculator = (function () {
    function add(a, b) {
        return a + b;
    }

    function multiply(a, b) {
        return a * b;
    }
    return {
        add: add,
        multiply: multiply
    }
})();
```

By placing functions and variables inside an immediately invoked function expression, you can avoid polluting them to the global object:

### Context vs Scope

- Context is most often determined by how a function is invoked with the value of _this_ keyword. 
- Scope refers to the visibility of variables.

### Static vs Dynamically Typed

JavaScript is dynamically typed. A dynamically typed language allows us to not have to say what type of variable this variable _a_ is going to be. In dynamically typed languages type checking is done during runtime. JavaScript gets run on the browser in the runtime or in JIT - Just In Time compilation.


```JavaScript
var a = 'booyaaa';
// JS is a weakly typed language 
a + 17 // booyaaa17

```

In a statically typed language, like C++ we have to say what kind of type this variable is going to be. With a statically typed language we have to declare the variables explicitly before using them. 

- Pros

1. Statically typed languages are self documenting. 
2. Autocompletion in editors.
3. Less bugs in production.

- Cons

1. Harder to read code and it taked time to learn.
2. Slower developing process.

```C++
int a;
a = 100;
```



## JavaScript Types

1. Boolean
2. Number
3. String
4. Null // the absence of value
5. Undefined // the absence of definition (there is a variable there but there's nothing there)
6. Symbol
7. Object

## Primitive Types, Non-Primitive Types

It is a data that only represents a single value.

```JavaScript
// Primitive
typeof 5 //number
typeof true // boolean
typeof 'To be or not to be' // string
typeof undefined // undefined
typeof Symbol('just me') // symbol

// Non-Primitive
// This object does not actually contain the value here directly. Instead it has a reference similar to a pointer to somewhere in a memory.
const obj1 = { 
  a: 'Tom'
  } 
typeof {} // object
typeof [] // object
typeof function(){} // object

```



## Pass by Reference vs Pass by Value

- Pass by value means we copy the value and we create that value somewhere else in the memory.

```JavaScript
//pass by value 
var a = 5;
var b = a;

b++;

console.log(a); // 5
console.log(b); // 6
```

- Pass by reference : obj1 and obj2 are both pointing somewhere in memory to the same shelg that contains this information {name: "Yao", password: '123'}; Saving a memory by pointing to one object, but can be bad where by mistake somebody else changes a property on that referenced object.


```JavaScript
//pass by reference 
let obj1 = {name: "Yao", password: '123'};
let obj2 = obj1;

obj2.password = "easypeasy";

console.log(obj1); // {name: "Yao", password: "easypeasy"}
console.log(obj2); // {name: "Yao", password: "easypeasy"}

```

## Type Coercion

Type coercion is the process of converting value from one type to another (such as string to number, object to boolean, and so on). Any type, be it primitive or an object, is a valid subject for type coercion. To recall, primitives are: number, string, boolean, null, undefined + Symbol (added in ES6).

```JavaScript
15 + 3 + "number" 
==> 18 + "number" 
==> "18number"


// coercion
1 == '1' // true
1 === '1' // false
-0 === +0 // true
Object.is(-0, +0) // false 
```

## Arrays, Functions, Objects





## Closures

In JavaScript, a closure is a function that references variables in the outer scope from its inner scope. The closure preserves the outer scope inside its inner scope.

```JavaScript
function greeting() {
    let message = 'Hi';

    function sayHi() {
        console.log(message);
    }

    return sayHi;
}
let hi = greeting();
hi(); // still can access the message variable
```
function inside the greeting() function, the greeting() function returns the sayHi() function object.

Note that functions are the first-class citizens in JavaScript, therefore, you can return a function from another function.

Outside of the greeting() function, we assigned the hi variable the value returned by the greeting() function, which is a reference of the sayHi() function.

Then we executed the sayHi() function using the reference of that function: hi(). If you run the code, you will get the same effect as the one above.

However, the interesting point here is that, normally, a local variable only exists during the execution of the function.

It means that when the greeting() function has completed executing, the message variable is no longer accessible.

In this case, we execute the hi() function that references the sayHi() function, the message variable still exists.

The magic of this is closure. In other words, the sayHi() function is a closure.

A closure is a function that preserves the outer scope in its inner scope.



```JavaScript
//Memory efficient
function heavyDuty(item) {
  const bigArray = new Array(7000).fill('😄')
  console.log('created!');
  return bigArray[item]
}

heavyDuty(699)
heavyDuty(699)
heavyDuty(699)
const getHeavyDuty = heavyDuty2();
getHeavyDuty(699)
getHeavyDuty(699)
getHeavyDuty(699)

// but i don't want to pollute the global namespace..
function heavyDuty2() {
  const bigArray = new Array(7000).fill('😄')
  console.log('created Again!')
  return function(item) {
    return bigArray[item]
  }
}



// Encapsulation
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => timeWithoutDestruction++;
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    return '💥';
  }

  setInterval(passTime, 1000);
  return {totalPeaceTime}
}

const ww3 = makeNuclearButton();
ww3.totalPeaceTime()

// Closures 3
const array = [1,2,3,4];
for(let i=0; i < array.length; i++) {
  setTimeout(function(){
    console.log('I am at index ' + array[i])
  }, 3000)
}

const array = [1,2,3,4];
for(var i=0; i < array.length; i++) {
  (function(closureI) {
    setTimeout(function(){
      console.log('I am at index ' + array[closureI])
    }, 3000)
  })(i)
}

```

## Prototypal Inheritance

 JavaScript prototype is one of the most important concepts that every JavaScript developer must understand.

By default, the JavaScript engine provides the Object() function and an anonymous object that can be referenced via the Object.prototype.

```JavaScript
console.log(Object);
console.log(Object.prototype);
```

![alt tag](https://cdn.javascripttutorial.net/wp-content/uploads/2020/03/JavaScript-Prototype-Object-function-and-Object-Object.png)

The Object.prototype object has many built-in methods and properties such as toString(), valueOf(), etc.

And it has a property named constructor that references the Object() function:

```JavaScript
console.log(Object.prototype.constructor === Object); // true
```






## Class Inheritance
 
## Memoization

## Higher Order Functions

Higher order function is a function that can take a function as an argument or a function that returns another function.

```JavaScript
const multiplyBy = function(num1) {
  return function(num2) {
    return num1 * num2
  }
}

const multiplyByTwo = multiplyBy(2);
const multiplyByFive = multiplyBy(5);

multiplyByTwo(3) // 6
multiplyByFive(5) // 25

// same function but with arrow functions
const multiplyBy = (num1) => (num2) => num1 * num2

multiplyBy(4)(6) //24
```

## Functions vs Objects

Functions are a special type of object that is a callable object with the bracket notation for invoking the function, it contains the code, it has name and it also has some properties like call(), apply() and bind().

```JavaScript
function woohoo() {
  console.log('woooohooo');
}

woohoo.name // 'woohoo'
```

Functions can be passed around, thats why functions are a first class citizen in JavaScript.

1. Functions can be assign to a variable or even an object property, which them becomes a method.

2. We can also pass functions as arguments into a function.

3. We can return functions as a values from other functions.

```JavaScript

// 1
var staff = function () {}

// 2
function a(fn) {
  fn()
}

a(function() {console.log('hi there')}) // hi there

// 3
function b(){
  return function c() { console.log('bye')}
}

b()() // bye
```

## Scheme + Java in JavaScript

## OOP (Object Oriented Programming)

## Private vs Public properties

## Functional Programming

17. Immutability

18. Imperative vs Declarative code

19. Composition vs Inheritance

20. Currying

21. Partial Application

22. Pure Functions

23. Referential Transparency

24. Compose

25. Pipe

26. Error Handling

27. Asynchronous JavaScript

28. Callbacks, Promises, Async/Await

29. Event Loop + Callback Queue

30. Task Queue + Microtask Queue

31. Concurrency + Parallelism

32. Modules in Javascript

33. Design Patterns: Module, Prototype, Observer, and Singleton design patterns.
