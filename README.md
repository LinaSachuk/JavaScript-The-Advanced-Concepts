# JavaScript-The-Advanced-Concepts

https://www.udemy.com/course/advanced-javascript-concepts

## Some of the topics covered in this course are:

1. Javascript Engine: A JavaScript engine is a computer program that executes JavaScript (JS) code. The first JavaScript engines were mere interpreters, but all relevant modern engines use just-in-time compilation for improved performance. JavaScript engines are typically developed by web browser vendors, and every major browser has one.

2. Javascript Runtime: Javascript runtime refers to where your javascript code is executed when you run it. That said, javascript can be executed on google chrome, in which case your javascript runtime is v8, if on mozilla - it is spidermonkey, if IE - then its chakra and if on node, again its v8. Asynchronous Web API provided by browsers (DOM, fetch(), setTimeout())

   ```JavaScript
   console.log('1');
   setTimeout(()=> {console.log('2'), 1000});
   console.log('3);

   ```

3. Interpreter, Compiler, JIT Compiler: 
     a. AOT compiler - Ahead-of-Time (AOT): compiles before running
     b. JIT compiler - Just-in-Time (JIT) : compiles while running
     c. interpreter: runs - REPL — read-eval-print-loop.

4. Writing Optimized Code: So there is a thing called cloud. When we do a webpack build, it gets stored in cloud and our js code gets served from the cloud when user requests it. Now the cloud sends us JavaScript file, which is a junk of text basically and now to make sense it goes through a parser which parses the JavaScript file and converts it to an AST(Abstract Syntax Tree). You can think of AST as data-structure that represents what this code really means.
Now the V8 compilers take care of rest of the work. So the first step is interpreter which interprets the code and identify the hotspots which I mentioned earlier and generates semi-optimized bytecode. Any code that can be optimized then goes to the optimizing compiler. Then the optimizing compiler analyzes the code and make assumptions to make it even faster. The optimizing compiler generates highly optimized machine code, but we discussed that sometimes it has to de-optimize on runtime and change back to the byte code. Hats off to the naming of V8 team, they really know how to name their engines. The interpreter which generates the bytecode is called Ignition (yes the ignition of the car, i.e. the start) and the optimizing compiler is called TurboFan (turbo boost which speeds up the car).

5. Call Stack + Memory Heap: We need the memory heap as a place to store and write information because at the end of the day all programs just read and write operations — that is to allocate, use and release memory.
The call stack helps us keep track of where we are in the code so that we can run the code in order.  Every time we run a function we use a call stack. We can think of a call stack as a region in memory that operates in a first in last out mode. So here, it will add the calculate() function on top of the stack. And after we finish running it, it's going to remove it.

6. Stack Overflow + Memory Leaks: Stack overflow happens when we call functions nested inside each, other over and over again. If we just keep adding functions to the stack without popping them off, we will have a stack overflow. Example: Recursion function will call itself;

   ```JavaScript
   function inception(){
       inception();
   }
   inception();
   ```

   3 common memory Leaks:
   a. Global Variables

   ```JavaScript
   var a =1;
   var b=1;
   var c=1;
   ```

   Here if I just keep adding these variables to my memory, all our memory is will eventually get used up because we are just using up memory. Imagine if these were deeply nested objects, we will be using up a lot of memory.
   b. Event Listeners

   ```JavaScript
   var element = document.getElementById(‘button’)
   element.addeventListener(‘click’, onClick)
   ```

   This is a common way to leak memory because you can just keep adding event listeners and you don't remove them when you no longer need them. They will stay in the background and before you know, you have a memory leak.
   c. setInterval()
   If we put objects inside a setInterval(), they will never be garbage collected unless we remove the setInterval itself.

   ```JavaScript
   setInterval( () => { //referencing objects })
   ```

   So something to keep in mind is that memory is limited. When it comes to a call stack and memory Heap, those are two places is where javascript runs and stores memory. So we have to be careful not to have memory leaks or stack overflow if we are to have efficient code.

7. Garbage Collection: Javascript is a garbage-collected language. This means that if Javascript allocates memory, let's say within a function we create an object and that object gets stored somewhere in our memory heap, automatically when we finish calling that object and if we don't need that object anymore, and there is no reference to it in our program, Javascript is going to clean it up for us. Garbage collection in Javascript uses the Mark and sweep algorithm; when a reference to a variable is removed, its deleted.

8. Node.js

9. ES6, ES7, ES8, ES9 features

10. Single Threaded Model: Javascript is a single-threaded Programming language(synchronous)
This means that only one set of instructions is executed at any single time. It’s not doing multiple things. The best way to check if a language is single-threaded is if it has one call stack. We push and pop functions off the stack one by one. And so Javascript is synchronous — only one thing can happen at a time.

11. Execution Context

12. Lexical Environment

13. Scope Chain

14. Hoisting

15. Function Invocation

16. Function Scope vs Block Scope

17. Dynamic vs Lexical Scope

18. this - call(), apply(), bind()

19. IIFEs

20. Context vs Scope

21. Static vs Dynamically Typed

22. Primitive Types

23. Pass by Reference vs Pass by Value

24. Type Coercion

25. Arrays, Functions, Objects

26. Closures

27. Prototypal Inheritance

28. Class Inheritance

29. Memoization

30. Higher Order Functions

31. Functions vs Objects

32. Scheme + Java in JavaScript

33. OOP (Object Oriented Programming)

34. Private vs Public properties

35. Functional Programming

36. Immutability

37. Imperative vs Declarative code

38. Composition vs Inheritance

39. Currying

40. Partial Application

41. Pure Functions

42. Referential Transparency

43. Compose

44. Pipe

45. Error Handling

46. Asynchronous JavaScript

47. Callbacks, Promises, Async/Await

48. Event Loop + Callback Queue

49. Task Queue + Microtask Queue

50. Concurrency + Parallelism

51. Modules in Javascript

52. Design Patterns: Module, Prototype, Observer, and Singleton design patterns.
