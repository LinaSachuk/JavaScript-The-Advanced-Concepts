# JavaScript-The-Advanced-Concepts

https://www.udemy.com/course/advanced-javascript-concepts

## Some of the topics covered in this course are:

**1. Javascript Engine**: A JavaScript engine is a computer program that executes JavaScript (JS) code. The first JavaScript engines were mere interpreters, but all relevant modern engines use just-in-time compilation for improved performance. JavaScript engines are typically developed by web browser vendors, and every major browser has one.

**2. Javascript Runtime**: Javascript runtime refers to where your javascript code is executed when you run it. That said, javascript can be executed on google chrome, in which case your javascript runtime is v8, if on mozilla - it is spidermonkey, if IE - then its chakra and if on node, again its v8. Asynchronous Web APIs provided by browsers (DOM, fetch(), setTimeout())

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

**3. Interpreter, Compiler, JIT Compiler**: 
     - AOT compiler - Ahead-of-Time (AOT): compiles before running
     - JIT compiler - Just-in-Time (JIT) : compiles while running
     - interpreter: runs - REPL — read-eval-print-loop.

**4. Writing Optimized Code**: So there is a thing called cloud. When we do a webpack build, it gets stored in cloud and our js code gets served from the cloud when user requests it. Now the cloud sends us JavaScript file, which is a junk of text basically and now to make sense it goes through a parser which parses the JavaScript file and converts it to an AST(Abstract Syntax Tree). You can think of AST as data-structure that represents what this code really means.
Now the V8 compilers take care of rest of the work. So the first step is interpreter which interprets the code and identify the hotspots which I mentioned earlier and generates semi-optimized bytecode. Any code that can be optimized then goes to the optimizing compiler. Then the optimizing compiler analyzes the code and make assumptions to make it even faster. The optimizing compiler generates highly optimized machine code, but we discussed that sometimes it has to de-optimize on runtime and change back to the byte code. Hats off to the naming of V8 team, they really know how to name their engines. The interpreter which generates the bytecode is called Ignition (yes the ignition of the car, i.e. the start) and the optimizing compiler is called TurboFan (turbo boost which speeds up the car).

**5. Call Stack + Memory Heap**: We need the memory heap as a place to store and write information because at the end of the day all programs just read and write operations — that is to allocate, use and release memory.
The call stack helps us keep track of where we are in the code so that we can run the code in order.  Every time we run a function we use a call stack. We can think of a call stack as a region in memory that operates in a first in last out mode. So here, it will add the calculate() function on top of the stack. And after we finish running it, it's going to remove it.

**6. Stack Overflow + Memory Leaks**: Stack overflow happens when we call functions nested inside each, other over and over again. If we just keep adding functions to the stack without popping them off, we will have a stack overflow. Example: Recursion function will call itself;


   ```JavaScript
   function inception(){
       inception();
   }
   inception();
   ```

   3 common memory Leaks:

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

**7. Garbage Collection**: Javascript is a garbage-collected language. This means that if Javascript allocates memory, let's say within a function we create an object and that object gets stored somewhere in our memory heap, automatically when we finish calling that object and if we don't need that object anymore, and there is no reference to it in our program, Javascript is going to clean it up for us. Garbage collection in Javascript uses the Mark and sweep algorithm; when a reference to a variable is removed, its deleted.

**8. Node.js**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It has Global API. It set to be a server side platform based on asynchronous IO that is non blocking.

**9. ES6, ES7, ES8, ES9 features**:

**10. Single Threaded Model**: Javascript is a single-threaded Programming language(synchronous)
This means that only one set of instructions is executed at any single time. It’s not doing multiple things. The best way to check if a language is single-threaded is if it has one call stack. We push and pop functions off the stack one by one. And so Javascript is synchronous — only one thing can happen at a time.

**11. Execution Context**: 
    
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
    

**12. Lexical Environment**: In JavaScript our lexical scope (available data + variables where the function was defined) determines our available variables. Not where the function is called (dynamic scope). The very first lexical environment is the global lexical environment where we write our code.

**13. Scope Chain**: Links and gives us access to variables that are in our parent environment. Scope is where can I access that variable where's that variable in my code.


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

**14. Hoisting**: Hosting is the behavior of moving the variables or function declarations to the top of their respective environments during compilation phase. Variables are partially hoisted and function declarations are hoisted (var and function). Hoisting is a part of the creation phase in the Global Execution Context.

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

**15. Function Invocation**: we are telling JavaScript engine to run our function. 

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

**16. Function Scope vs Block Scope**: 

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



1.  Dynamic vs Lexical Scope

2.  this - call(), apply(), bind()

3.  IIFEs

4.  Context vs Scope

5.  Static vs Dynamically Typed

6.  Primitive Types

7.  Pass by Reference vs Pass by Value

8.  Type Coercion

9.  Arrays, Functions, Objects

10. Closures

11. Prototypal Inheritance

12. Class Inheritance

13. Memoization

14. Higher Order Functions

15. Functions vs Objects

16. Scheme + Java in JavaScript

17. OOP (Object Oriented Programming)

18. Private vs Public properties

19. Functional Programming

20. Immutability

21. Imperative vs Declarative code

22. Composition vs Inheritance

23. Currying

24. Partial Application

25. Pure Functions

26. Referential Transparency

27. Compose

28. Pipe

29. Error Handling

30. Asynchronous JavaScript

31. Callbacks, Promises, Async/Await

32. Event Loop + Callback Queue

33. Task Queue + Microtask Queue

34. Concurrency + Parallelism

35. Modules in Javascript

36. Design Patterns: Module, Prototype, Observer, and Singleton design patterns.
