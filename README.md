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

Scoping itself is how you search for a variable with a given name. A variable has a scope which is the whole area in which that variable can be accessed by name.

In Javascript, we can call Scope as the set of rules that govern how the Engine can look up a variable by its identifier name and find it.
There are two types of Scope models that are widely used. By far the most commonly used Scope model by vast majority of programming languages is Lexical Scope, also Javascript uses this Lexical Scope model. The other model which is still used by some languages like Bash scripting is called Dynamic Scope. 

- Dynamic Scope
In dynamic scoping, you search in the local function first, then you search in the function that called the local function, then you search in the function that called that function, and so on, up the call-stack.


The arrow functions are lexically bound. Arrow functions have a lexical behavior unlike normal functions.




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



// new binding
function Person(name, age) {
  this.name = name;
  this.age =age;
  console.log(this);
}

const person1 = new Person('Xavier', 55)

//implicit binding
const person = {
  name: 'Karen',
  age: 40,
  hi() {
    console.log('hi' + this.name)
  }
}

person.hi()

//explicit binding
const person3 = {
  name: 'Karen',
  age: 40,
  hi: function() {
    console.log('hi' + this.setTimeout)
  }.bind(window)
}

person3.hi()

// arrow functions
const person4 = {
  name: 'Karen',
  age: 40,
  hi: function() {
    var inner = () => {
      console.log('hi ' + this.name)
    }
    return inner()
  }
}

person4.hi()

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

```JavaScript

const strings= ['a', 'b', 'c', 'd'];
const numbers = [1,2,3,4,5];
// Variable array is somewhere in memory and the computer knows it.
// When I do array[2], i'm telling the computer, hey go to the array and grab the 3rd item from where the array is stored.


//push
strings.push('e');

//pop
strings.pop();
strings.pop(); // O(1)

//unshift
strings.unshift('x') // O(n)

//splice
strings.splice(2, 0, 'alien'); // O(n)

console.log(strings)


```






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

All JavaScript objects inherit properties and methods from a prototype.

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

Inheritance is an object getting access to the properties ans methods of another object.

```JavaScript
// use an object constructor:
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");


```

All JavaScript objects inherit properties and methods from a prototype:

1. Date objects inherit from Date.prototype
2. Array objects inherit from Array.prototype
3. Person objects inherit from Person.prototype
4. The Object.prototype is on the top of the prototype inheritance chain:

Date objects, Array objects, and Person objects inherit from Object.prototype.


The JavaScript prototype property allows you to add new properties to object constructors:

```JavaScript
// an object constractor
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
// The JavaScript prototype property allows you to add new properties to object constructors:
Person.prototype.nationality = "English";

// The JavaScript prototype property also allows you to add new methods to objects constructors:
Person.prototype.name = function() {
  return this.firstName + " " + this.lastName;
};
```

Only modify your own prototypes. Never modify the prototypes of standard JavaScript objects.
Did You Know?
As you can see above, JavaScript has object versions of the primitive data types String, Number, and Boolean. But there is no reason to create complex objects. Primitive values are much faster.

ALSO:

- Use object literals {} instead of new Object().

- Use string literals "" instead of new String().

- Use number literals 12345 instead of new Number().

- Use boolean literals true / false instead of new Boolean().

- Use array literals [] instead of new Array().

- Use pattern literals /()/ instead of new RegExp().

- Use function expressions () {} instead of new Function().


----------------------------------------------------------------
String Objects
Normally, strings are created as primitives: var firstName = "John"

But strings can also be created as objects using the new keyword: var firstName = new String("John")

----------------------------------------

Number Objects
Normally, numbers are created as primitives: var x = 123

But numbers can also be created as objects using the new keyword: var x = new Number(123)

-----------------------------

Boolean Objects
Normally, booleans are created as primitives: var x = false

But booleans can also be created as objects using the new keyword: var x = new Boolean(false)


-----------------------



ES5 New Object Methods:


```JavaScript
// Adding or changing an object property
Object.defineProperty(object, property, descriptor)

// Adding or changing many object properties
Object.defineProperties(object, descriptors)

// Accessing Properties
Object.getOwnPropertyDescriptor(object, property)

// Returns all properties as an array
Object.getOwnPropertyNames(object)

// Returns enumerable properties as an array
Object.keys(object)

// Accessing the prototype
Object.getPrototypeOf(object)

// Prevents adding properties to an object
Object.preventExtensions(object)
// Returns true if properties can be added to an object
Object.isExtensible(object)

// Prevents changes of object properties (not values)
Object.seal(object)
// Returns true if object is sealed
Object.isSealed(object)

// Prevents any changes to an object
Object.freeze(object)
// Returns true if object is frozen
Object.isFrozen(object)


```


1. Changing a Property Value

```JavaScript
// Adding or changing an object property
Object.defineProperty(object, property, descriptor)

// Syntax
Object.defineProperty(object, property, {value : value})

// Example
var person = {
  firstName: "John",
  lastName : "Doe",
  language : "EN"
};

// Change a property
Object.defineProperty(person, "language", {value : "NO"});

```

2. Changing Meta Data
ES5 allows the following property meta data to be changed:

```JavaScript
writable : true      // Property value can be changed
enumerable : true    // Property can be enumerated
configurable : true  // Property can be reconfigured
writable : false     // Property value can not be changed
enumerable : false   // Property can be not enumerated
configurable : false // Property can be not reconfigured

```
ES5 allows getters and setters to be changed:

```JavaScript
// Defining a getter
get: function() { return language }
// Defining a setter
set: function(value) { language = value }
```

This example makes language read-only:

```JavaScript
Object.defineProperty(person, "language", {writable:false});
```

This example makes language not enumerable:


```JavaScript
Object.defineProperty(person, "language", {enumerable:false});

```

3. Listing All Properties

  This example list all properties of an object:

```JavaScript
var person = {
  firstName: "John",
  lastName : "Doe",
  language : "EN"
};

Object.getOwnPropertyNames(person);  // Returns an array of properties

```

4. Listing Enumerable Properties

This example list only the enumerable properties of an object:



```JavaScript
var person = {
  firstName: "John",
  lastName : "Doe",
  language : "EN"
};

Object.defineProperty(person, "language", {enumerable:false});
Object.keys(person);  // Returns an array of enumerable properties

```


```JavaScript

let dragon = {
  name: 'Tanya',
  fire: true,
  fight() {
    return 5
  },
  sing() {
    if (this.fire) {
      return `I am ${this.name}, the breather of fire`
    }
  }
}

let lizard = {
  name: 'Kiki',
  fight() {
    return 1
  }
}
// Don't do this, bad performance. Show with bind.
lizard.__proto__ = dragon;
dragon.isPrototypeOf(lizard);
console.log(lizard.fire)
console.log(lizard.sing())
const lizardFire =dragon.sing.bind(lizard)
console.log(lizardFire())



//Every Prototype chain links to a prototype object{}
function multiplyBy5(num) {
  return num*5
}

multiplyBy5.__proto__ //[Function]
Function.prototype
multiplyBy5.__proto__.__proto__ //{}
Object.prototype
multiplyBy5.__proto__.__proto__.__proto__ //null
typeof Object
typeof {}







```






## Class Inheritance

```JavaScript
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return 'atack with ' + this.weapon
  }
}

class Elf extends Character { 
  constructor(name, weapon, type) {
    // console.log('what am i?', this); this gives an error
    super(name, weapon) 
    console.log('what am i?', this);
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  makeFort() { // this is like extending our prototype.
    return 'strongest fort in the world made'
  }
}

const houseElf = new Elf('Dolby', 'cloth', 'house')
//houseElf.makeFort() // error
const shrek = new Ogre('Shrek', 'club', 'green')
shrek.makeFort()

```
 
## Memoization

Memoization is an optimization technique that speeds up applications by storing the results of expensive function calls and returning the cached result when the same inputs are supplied again.

```JavaScript

//learn to cache
function addTo80(n) {
  return n + 80;
}

addTo80(5)

let cache = {};
function memoizeAddTo80(n) {
  if (n in cache) {
    return cache[n];
  } else {
    console.log('long time');
    const answer = n + 80;
    cache[n] = answer;
    return answer;
  }
}

// console.log(1, memoizeAddTo80(6))
// // console.log(cache)
// // console.log('-----------')
// console.log(2, memoizeAddTo80(6))

// let's make that better with no global scope. This is closure in javascript so.
function memoizeAddTo80(n) { 
  let cache = {};
  return function(n) {
    if (n in cache) {
      return cache[n];
    } else {
      console.log('long time');
      const answer = n + 80;
      cache[n] = answer;
      return answer;
    }
  }
}

const memoized = memoizeAddTo80();
console.log(1, memoized(6))
// console.log(cache)
// console.log('-----------')
console.log(2, memoized(6))


```


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

## OOP (Object Oriented Programming) 

OOP says that bringing together the data and its behavior in a single location called an object and containing all of that in a box makes it easier to understand how out programs work.
The beauty of JavaScript is that it is multi paradigm and we can use OOP and FP techniques to make our code easy to reason about, to make it clearer, to make it more understandable and easy to extend.

1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism



```JavaScript
// In OOP this data called state. The object attributes or properties allows to keep track of the state of the object and these methods allow us mamipulate the state of the object.
let dragon = {
  name: 'Tanya',
  fire: true,
  fight() {
    return 5
  }, 
  sing() {
    if (this.fire) {
      return `I am ${this.name}, the breather of fire`
    }
  }
}

```

```JavaScript
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return 'atack with ' + this.weapon
  }
}

class Queen extends Character { 
  constructor(name, weapon, kind) {
    super(name, weapon) 
    this.kind = kind;
  }
  attack() {
    console.log(super.attack()); // atack with army
    return `I am the ${this.name} of ${this.kind}, now bow down to me! ` // I am the Victoria of hearts, now bow down to me!
  }
}

const victoria = new Queen('Victoria', 'army', 'hearts');
victoria.attack()



```

## Encapsulation

Encapsulation is the bundling of data and the methods that act on that data such that access to that data is restricted from outside the bundle, or as Alan Kay describes it, “local retention and protection and hiding of state-process.” In OOP, that means that an object stores its state privately, and only the object’s methods have access to change it.

If you want to change encapsulated state, you don’t reach out and directly mutate some object’s props. Instead, you call a method on the object, and maybe the object will respond by updating its state.

When you want to update React component state with useState or setState, those changes don't directly manipulate the component state. Instead, they may enqueue potential state changes which get applied after the render cycle has completed. You don't directly set React's component state; React does.

From Java, JavaScript got the notion of constructor functions, (eventually) classes, and the new keyword (among other things).

```JavaScript

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

// =========================================
const elfFunctions = {
  attack: function() {
    return 'atack with ' + this.weapon
  }
}
function createElf(name, weapon) {
  //Object.create creates __proto__ link
  newElf = Object.create(elfFunctions)
  newElf.name = name;
  newElf.weapon = weapon
  return newElf
}



const sam = createElf('Sam', 'bow');
const peter = createElf('Peter', 'fire');
sam.attack()


// ================================
//Constructor Functions
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

Elf.prototype.attack = function() { 
  return 'atack with ' + this.weapon
}
const sam = new Elf('Sam', 'bow');
const peter = new Elf('Peter', 'bow');
sam.attack()

// ===============ES6 Class
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return 'atack with ' + this.weapon
  }
}

//Instantiating a class - creting a new instance of the class
const fiona = new Elf('Fiona', 'ninja stars');
console.log(fiona instanceof Elf) // true
const ben = new Elf('Ben', 'bow');
fiona.attack()



```


## Private vs Public properties

- Public: These members of the class and available to everyone that can access the (owner) class instance.

- Private: These members are only accessible within the class that instantiated the object.

- Protected: This keyword allows a little more access than private members but a lot less than the public. A protected member is accessible within the class (similar to private) and any object that inherits from it. A protected value is shared across all layers of the prototype chain. It is not accessible by anybody else.





## Functional Programming

FP says that data and behavior are distinctly different things and should be kept separate for clarity.

Pure Functions - all objects in functional programming are immutable, once something is created it cannot be changed. We avoid things like shared state and we adhere to this principle of pure functions.
1. No side effects

```JavaScript
//Side effects:
const array = [1,2,3];
function mutateArray(arr) {
  arr.pop()
}
function mutateArray2(arr) {
  arr.forEach(item => arr.push(1
  ))
}
//The order of the function calls will matter.
mutateArray(array) // [1 , 2, ]
mutateArray2(array) // [1, 2, 1, 1]
array




```

2. input -> output (always returns the same output with the same input)





## Immutability

In object-oriented and functional programming, an immutable object is an object whose state cannot be modified after it is created.

```JavaScript

const obj = {name: 'Andrei'}
function clone(obj) {
  return {...obj}; // this is pure
}

function updateName(obj) {
  const obj2 = clone
  (obj);
  obj2.name = 'Nana'
  return obj2
}

const updatedObj = updateName(obj)
console.log(obj, updatedObj)
```

## Imperative vs Declarative code

Declarative programming is a programming paradigm … that expresses the logic of a computation without describing its control flow.
Imperative programming is a programming paradigm that uses statements that change a program’s state.

```JavaScript
//imperative
for (let i=0; i< 1000; i ++) {
  console.log(i)
}


//declarative
[1,2,3].forEach(item => console.log(item))
```

## Composition vs Inheritance

Whereas inheritance derives one class from another, composition defines a class as the sum of its parts. Classes and objects created through inheritance are tightly coupled because changing the parent or superclass in an inheritance relationship risks breaking your code.



## Currying

Currying is an advanced technique of working with functions. It's used not only in JavaScript, but in other languages as well. Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c) . Currying doesn't call a function. It just transforms it.

```JavaScript

//Currying
const multiply = (a, b) => a * b
const curriedMultiply = (a) => (b) => a * b
curriedMultiply(5)(20)
const multiplyBy5 = curriedMultiply(5)
multiplyBy5(20)

```

## Partial Application

Partial application starts with a function. We take this function and create a new one with one or more of its arguments already “set” or partially applied. This sounds odd, but it will reduce the number of parameters needed for our functions.

```JavaScript
//Partial Application
const multiply = (a, b, c) => a * b * c
const partialMultiplyBy5 = multiply.bind(null, 5)
partialMultiplyBy5(10, 20)

```

## Pure Functions

- A pure function is a function which:
Given the same input, will always return the same output.

- Produces no side effects.

## Referential Transparency

Referential transparency means that a function call can be replaced by its value or another referentially transparent call with the same result. It makes reasoning about programs easier. It also makes each subprogram independent, which greatly simplifies unit testing and refactoring.

 A function is referentially transparent if it’s a pure function whose parameters are immutable.
## Compose and Pipe

 - Pipe
 
The concept of pipe is simple — it combines n functions. It’s a pipe flowing left-to-right, calling each function with the output of the last one. Instead of jamming functions within functions or creating a bunch of intermediate variables, let’s pipe all the things!

```JavaScript

pipe(
  getName,
  uppercase,
  get6Characters,
  reverse 
)({ name: 'Buckethead' }) //'TEKCUB'


```
 - Compose
 
 It’s just pipe in the other direction.
So if you wanted the same result as our pipe above, you’d do the opposite.

```JavaScript

compose(
  reverse,
  get6Characters,
  uppercase,
  getName,
)({ name: 'Buckethead' })


```

```JavaScript

const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: []
}
const history1 = [];
const compose = (f, g) => (...args) => f(g(...args))
const pipe = (f, g) => (...args) => g(f(...args))
const purchaseItem  = (...fns) => fns.reduce(compose);
const purchaseItem2  = (...fns) => fns.reduce(pipe);
purchaseItem2(
  addItemToCart,
  applyTaxToItems,
  buyItem,
  emptyUserCart,
)(user, {name: 'laptop', price: 60})
// purchaseItem(
//   emptyUserCart,
//   buyItem,
//   applyTaxToItems,
//   addItemToCart
// )(user, {name: 'laptop', price: 50})
function addItemToCart(user, item) {
  history1.push(user)
  const updatedCart = user.cart.concat(item)
  return Object.assign({}, user, {cart: updatedCart});
}

function applyTaxToItems(user) {
  history1.push(user)
  const {cart} = user;
  const taxRate = 1.3;
  const updatedCart = cart.map(item => {
    return {
      name: item.name,
      price: item.price*taxRate
    }
  })
  return Object.assign({}, user, { cart: updatedCart });
}

function buyItem(user) {
  history1.push(user)
  const itemsInCart = user.cart;
  return Object.assign({}, user, { purchases: itemsInCart });
}
function emptyUserCart(user) {
  history1.push(user)
  return Object.assign({}, user, { cart: [] });
}

function refundItem() {

}

function getUserState() {

}

function goBack() {

}

function goForward() {

}


```

## Error Handling

The _try_ statement lets you test a block of code for errors.

The _catch_ statement lets you handle the error.

The _throw_ statement lets you create custom errors.

The _finally_ statement lets you execute code, after try and catch, regardless of the result.



## Asynchronous JavaScript

"I will finish later!"

Functions running in parallel with other functions are called asynchronous

A good example is JavaScript setTimeout()



## Callbacks, Promises, Async/Await

- Callbacks

In JavaScript, a callback is a function passed into another function as an argument to be executed later. Callback functions can be synchronous or asynchronous.

However, this callback strategy does not scale well when the complexity grows significantly.

Nesting many asynchronous functions inside callbacks is known as the pyramid of doom or the callback hell:

```JavaScript

asyncFunction(function(){
    asyncFunction(function(){
        asyncFunction(function(){
            asyncFunction(function(){
                asyncFunction(function(){
                    ....
                });
            });
        });
    });
});

```

To avoid the pyramid of doom, you use promises or async/await functions.


- Promise

In JavaScript, a promise is an object that returns a value which you hope to receive in the future, but not now.

Because the value will be returned by the promise in the future, the promise is very well-suited for handling asynchronous operations.

A promise has three states:

1. Pending: you don’t know if you will complete learning JavaScript by the next month.
2. Fulfilled: you complete learning JavaScript by the next month.
3. Rejected: you don’t learn JavaScript at all.

```JavaScript

const promise = new Promise((resolve, reject) => {
  if(true) {
    resolve('Stuff worked')
  } else {
    reject('Error, it broke')
  }
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'Hiii')
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'Pokie')
})

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'Is it me you are looking for?')
})

Promise.all([promise, promise2, promise3, promise4])
  .then(values => {
    console.log(values);
  })
  .catch(() => console.log('error'))
  .finally(() => console.log('extra'));

```


- Async Await

ES2017 introduced the async/await keywords that build on top of promises, allowing you to write asynchronous code that looks more like synchronous code and more readable. Technically speaking, the async / await is syntactic sugar for promises.

If a function returns a Promise, you can place the await keyword in front of the function call, like this:

```JavaScript

let result = await f();

```


The await will wait for the Promise returned from the f() to settle. The await keyword can be used only inside the async functions. 

The async keyword allows you to define a function that handles asynchronous operations. Asynchronous functions execute asynchronously via the event loop. It always returns a Promise.

The following defines an async function that calls the three asynchronous operations in sequence:

```JavaScript

async function showServiceCost() {
    let user = await getUser(100);
    let services = await getServices(user);
    let cost = await getServiceCost(services);
    console.log(`The service cost is ${cost}`);
}

showServiceCost();


// for await of loop
const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'

]


const getData = async function() {
  const arrayOfPromises = urls.map(url => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }

}






```


## Event Loop + Callback Queue

![alt tag](https://miro.medium.com/max/1400/1*iHhUyO4DliDwa6x_cO5E3A.gif)

- Stack: This is where all your javascript code gets pushed and executed one by one as the interpreter reads your program, and gets popped out once the execution is done. If your statement is asynchronous: setTimeout, ajax(), promise, or click event, then that code gets forwarded to Event table, this table is responsible for moving your asynchronous code to callback/event queue after specified time.
- Heap: This is where all the memory allocation happens for your variables, that you have defined in your program.
- Callback Queue: This is where your asynchronous code gets pushed to, and waits for the execution.
Event Loop: Then comes the Event Loop, which keeps running continuously and checks the Main stack, if it has any frames to execute, if not then it checks Callback queue, if Callback queue has codes to execute then it pops the message from it to the Main Stack for the execution.
- Job Queue: Apart from Callback Queue, browsers have introduced one more queue which is “Job Queue”, reserved only for new Promise() functionality. So when you use promises in your code, you add .then() method, which is a callback method. These `thenable` methods are added to Job Queue once the promise has returned/resolved, and then gets executed.

## Task Queue + Microtask Queue (Job Queue)

Job Q (for Promises) is now just like the callback Q in our JavaScript runtime implemented by the browser. But the event loop is going to check the job Q first, make sure that that's empty before we start putting some of the callback Q functions onto the call stack.

## Threads, Concurrency and Parallelism

- Concurrency - Single core CPU.

- Concurrency + Parallelism - Multi-core CPU

On the browser we have multiple worker threads in the background for us. A Web Worker is a JavaScript program running on a different thread in parallel to our main thread.

```JavaScript

var worker = new Worker('worker.js');
worker.postMessage('Hello');

```

## Parallel, Sequence and Race

```JavaScript

const promisify = (item, delay) =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `parallel is done: ${output1} ${output2} ${output3}`
}

async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `sequence is done ${output1} ${output2} ${output3}`
}

sequence().then(console.log)
parallel().then(console.log)
race().then(console.log)

```




## Modules in Javascript

Modules - they are highly self-contained and grouped together with their own specific functionality allowing them to be moved around, used by other places or even removed without disrupting the whole system.



## Async Error Handling

```JavaScript
// wrap the code in the try-catch block
(async function() {
    try {
        await Promise.reject('oopsie')
    } catch (err) {
        console.error(err)
    }

    console.log('This is still good!')
})()

```





## Design Patterns: Constructor, Module, Prototype, Observer, and Singleton design patterns

A design pattern is a term used in software engineering for a general, reusable solution to a commonly occurring problem in software design.

Design patterns are beneficial for various reasons. They are proven solutions that industry veterans have tried and tested. They are solid approaches that solve issues in a widely accepted way and reflect the experience and insights of the industry-leading developers that helped define them. Patterns also make your code more reusable and readable while speeding up the development process vastly.
Design patterns are by no means finished solutions. They only provide us with approaches or schemes to solve a problem.

- Constructor pattern

JavaScript allows you to create a custom constructor function that defines the properties and methods of user-defined objects.

By convention, the name of a constructor function in JavaScript starts with an uppercase letter.

For example, the following rewritten the animal object of the prior example:

```JavaScript

function Animal(name) {
    this.name = name;
    this.identify = function() {
        console.log("I'm " + this.name);
    };
}

// To create a new instance of Animal, you use the new operator. For example:
var donald = new Animal('Donald');

```


- Module Pattern

The Module Pattern is one of the important patterns in JavaScript. It is a commonly used Design Pattern which is used to wrap a set of variables and functions together in a single scope.
It is used to define objects and specify the variables and the functions that can be accessed from outside the scope of the function. We expose certain properties and function as public and can also restrict the scope of properties and functions within the object itself, making them private. This means that those variables cannot be accessed outside the scope of the function. We can achieve data hiding an abstraction using this pattern in the JavaScript.
Let's look for the simple implementation of Module Pattern with only public fields:

```JavaScript 

function EmployeeDetails() {
  var name: "Mayank";
  var age = 30;
  var designation = "Developer"
  
  return {
    name: name,
    age: age,
    designation: designation
  }
}

var newEmployee = EmployeeDetails()

var userName = newEmployee.name;
var userAge = newEmployee.age;
var userDesignation = newEmployee.designation;

```






- Prototype pattern

This pattern is an object-based creational design pattern. In this, we use a sort of a “skeleton” of an existing object to create or instantiate new objects.
This pattern is specifically important and beneficial to JavaScript because it utilizes prototypal inheritance instead of a classic object-oriented inheritance. Hence, it plays to JavaScript’s strength and has native support.
In this example, we have a car object that we use as the prototype to create another object myCar with JavaScript’s Object.create feature and define an extra property owner on the new object.

```JavaScript

// using Object.create as was recommended by ES5 standard
const car = {
  noOfWheels: 4,
  start() {
    return 'started';
  },
  stop() {
    return 'stopped';
  },
};

// Object.create(proto[, propertiesObject])

const myCar = Object.create(car, { owner: { value: 'John' } });

console.log(myCar.__proto__ === car); // true


```


- Observer Pattern

It is a crucial behavioral design pattern that defines one-to-many dependencies between objects so that when one object (publisher) changes its state, all the other dependent objects (subscribers) are notified and updated automatically. This is also called PubSub (publisher/subscribers) or event dispatcher/listeners pattern. The publisher is sometimes called the subject, and the subscribers are sometimes called observers.

Chances are, you’re already somewhat familiar with this pattern if you have used addEventListener or jQuery’s .on to write even-handling code. It has its influences in Reactive Programming (think RxJS) as well.






- Singleton Pattern

Singleton is a special creational design pattern in which only one instance of a class can exist. It works like this — if no instance of the singleton class exists then a new instance is created and returned, but if an instance already exists, then the reference to the existing instance is returned.
A perfect real-life example would be that of mongoose (the famous Node.js ODM library for MongoDB). It utilizes the singleton pattern.
In this example, we have a Database class that is a singleton. First, we create an object mongo by using the new operator to invoke the Database class constructor. This time an object is instantiated because none already exists. The second time, when we create the mysql object, no new object is instantiated but instead, the reference to the object that was instantiated earlier, i.e. the mongo object, is returned.


```JavaScript

class Database {
  constructor(data) {
    if (Database.exists) {
      return Database.instance;
    }
    this._data = data;
    Database.instance = this;
    Database.exists = true;
    return this;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data;
  }
}

// usage
const mongo = new Database('mongo');
console.log(mongo.getData()); // mongo

const mysql = new Database('mysql');
console.log(mysql.getData()); // mongo

```


## ES2020

- allSettled()

```JavaScript

const promiseOne = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000);
})

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(reject, 3000);
})
// Promise.allSettled runs all promises, regardless of whether they reject or not.
Promise.allSettled([promiseOne, promiseTwo]).then(data => console.log(data))
  .catch(err => console.error(err))

```

- BigInt (new type of)

BigInt is a built-in object that provides a way to represent whole numbers larger than 253 - 1, which is the largest number JavaScript can reliably represent with the Number primitive and represented by the Number.MAX_SAFE_INTEGER constant. BigInt can be used for arbitrarily large integers.

A BigInt is created by appending n to the end of an integer literal — 10n — or by calling the function BigInt().

```JavaScript

const previouslyMaxSafeInteger = 9007199254740991n

const alsoHuge = BigInt(9007199254740991)
// ↪ 9007199254740991n

const hugeString = BigInt("9007199254740991")
// ↪ 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff")
// ↪ 9007199254740991n

const hugeOctal = BigInt("0o377777777777777777")
// ↪ 9007199254740991n

const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111")
// ↪ 9007199254740991n

// When tested against typeof, a BigInt will give "bigint":
typeof 1n === 'bigint'           // true
typeof BigInt('1') === 'bigint'  // true

// When wrapped in an Object, a BigInt will be considered as a normal "object" type:
typeof Object(1n) === 'object'  // true

// An operation with a fractional result will be truncated when used with a BigInt.
const expected = 4n / 2n
// ↪ 2n

const rounded = 5n / 2n
// ↪ 2n, not 2.5n


// A BigInt is not strictly equal to a Number, but it is loosely so:
0n === 0
// ↪ false

0n == 0
// ↪ true

```

- Optional Chaining Operator (?.) 

The optional chaining operator (?.) permits reading the value of a property located deep within a chain of connected objects without having to expressly validate that each reference in the chain is valid. The ?. operator functions similarly to the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined. When used with function calls, it returns undefined if the given function does not exist.

This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the content of an object when there's no known guarantee as to which properties are required.

Optional chaining cannot be used on a non-declared root object, but can be used with an undefined root object.



```JavaScript

const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined

// syntax
obj.val?.prop
obj.val?.[expr]
obj.arr?.[index]
obj.func?.(args)



// By using the ?. operator instead of just ., JavaScript knows to implicitly check to be sure obj.first is not null or undefined before attempting to access obj.first.second. If obj.first is null or undefined, the expression automatically short-circuits, returning undefined.
let nestedProp = obj.first?.second;


// The nullish coalescing operator (??) may be used after optional chaining in order to build a default value when none was found:
let customer = {
  name: "Carl",
  details: { age: 82 }
};
const customerCity = customer?.city ?? "Unknown city";
console.log(customerCity); // Unknown city

```

- globalThis

The global globalThis property contains the global this value, which is akin to the global object.

Historically, accessing the global object has required different syntax in different JavaScript environments. On the web you can use window, self, or frames - but in Web Workers only self will work. In Node.js none of these work, and you must instead use global.
The this keyword could be used inside functions running in non–strict mode, but this will be undefined in Modules and inside functions running in strict mode. You can also use Function('return this')(), but environments that disable eval(), like CSP in browsers, prevent use of Function in this way.

The globalThis property provides a standard way of accessing the global this value (and hence the global object itself) across environments. Unlike similar properties such as window and self, it's guaranteed to work in window and non-window contexts. In this way, you can access the global object in a consistent manner without having to know which environment the code is being run in. To help you remember the name, just remember that in global scope the this value is globalThis.


```JavaScript

function canMakeHTTPRequest() {
  return typeof globalThis.XMLHttpRequest === 'function';
}

console.log(canMakeHTTPRequest());
// expected output (in a browser): true



```

- Import meta data

The import.meta object provides metadata for the current module. The JavaScript engine creates it, and its current available property is url. This property's value is the URL from which the module was loaded, including any query parameter or hash.

As an example, you could use the import.meta.url property to build the URL of a data.json file stored in the same folder of the current module. The following code gets this result:

```JavaScript
const dataUrl = new URL("data.json", import.meta.url);

```

In this case, the import.meta.url provides the URL class with the base URL for the data.json file.





## RxJS (ReactiveX)

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

The essential concepts in RxJS which solve async event management are:

- Observable: represents the idea of an invocable collection of future values or events.
- Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
- Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
- Subject: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.


First examples:

```JavaScript
// Normally you register event listeners.
document.addEventListener('click', () => console.log('Clicked!'));

// Using RxJS you create an observable instead.
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));

```

Purity.

What makes RxJS powerful is its ability to produce values using pure functions. That means your code is less prone to errors.

Normally you would create an impure function, where other pieces of your code can mess up your state.


```JavaScript

let count = 0;
document.addEventListener('click', () => console.log(`Clicked ${++count} times`));

// Using RxJS you isolate the state.
// The scan operator works just like reduce for arrays. It takes a value which is exposed to a callback. The returned value of the callback will then become the next value exposed the next time the callback runs.


import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(scan(count => count + 1, 0))
  .subscribe(count => console.log(`Clicked ${count} times`));

```

Flow.

RxJS has a whole range of operators that helps you control how the events flow through your observables.

This is how you would allow at most one click per second, with plain JavaScript:


```JavaScript
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});

// With RxJS:
import { fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    scan(count => count + 1, 0)
  )
  .subscribe(count => console.log(`Clicked ${count} times`));
// Other flow control operators are filter, delay, debounceTime, take, takeUntil, distinct, distinctUntilChanged etc.

```

Values.
You can transform the values passed through your observables.

Here's how you can add the current mouse x position for every click, in plain JavaScript:

```JavaScript
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener('click', event => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count);
    lastClick = Date.now();
  }
});

// With RxJS:
import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe(count => console.log(count));

  // Other value producing operators are pluck, pairwise, sample etc.


```

## Observable


Example. The following is an Observable that pushes the values 1, 2, 3 immediately (synchronously) when subscribed, and the value 4 after one second has passed since the subscribe call, then completes:

```JavaScript

import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

// To invoke the Observable and see these values, we need to subscribe to it:
console.log('just before subscribe');
observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
console.log('just after subscribe');

// Which executes as such on the console:
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done

```

### Pull versus Push
Pull and Push are two different protocols that describe how a data Producer can communicate with a data Consumer.

- What is Pull? In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the data will be delivered to the Consumer.

Every JavaScript Function is a Pull system. The function is a Producer of data, and the code that calls the function is consuming it by "pulling" out a single return value from its call.

ES2015 introduced generator functions and iterators (function*), another type of Pull system. Code that calls iterator.next() is the Consumer, "pulling" out multiple values from the iterator (the Producer).

- What is Push? In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.

Promises are the most common type of Push system in JavaScript today. A Promise (the Producer) delivers a resolved value to registered callbacks (the Consumers), but unlike functions, it is the Promise which is in charge of determining precisely when that value is "pushed" to the callbacks.

RxJS introduces Observables, a new Push system for JavaScript. An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).

A Function is a lazily evaluated computation that synchronously returns a single value on invocation.
A generator is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration.
A Promise is a computation that may (or may not) eventually return a single value.
An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.