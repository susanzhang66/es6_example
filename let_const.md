let const

**let命令**
* let命令所在的代码块内有效。
* JavaScript 引擎内部会记住上一轮循环的值（for循环值 与块级里的值 不同。）
* for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
* 函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
* 不存在变量提升（ const同样）
* **暂时性死区：有霸占位置的意思。**不会被其他位置的影响。（ const同样）
* “暂时性死区”导致typeof 遇到时，会报错。（ const同样）
* 不允许重复声明 （ const同样）

**块级作用域**
  - ES6 允许块级作用域的任意嵌套。
  - ES6 的块级作用域必须有大括号
  - 块级作用域写法  代替了 匿名立即执行函数表达式
  - ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
  ---应该避免在块级作用域内声明函数。也应该写成函数表达式，而不是函数声明语句。

**es6块级函数规则**
- 允许在块级作用域内声明函数。
- 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

**const命令** 
  - const声明一个只读的常量。
  - 常量的值就不能改变。
  - **只声明不赋值，会报错。**
  - 只在声明所在的块级作用域内有效。
  - 声明的常量也是不提升，存在暂时性死区
  - 不可重复声明。

**const本质**
  - 本质指向的地址数据不能变，而常量的地址内容就是数据本身，数组和对象只要地址不变即可，所以它还是可以添加删除属性的。
  - ---真的想将对象冻结，应该使用Object.freeze方法。

**ES6声明变量的六种方法**
- es6顶层对象 不是 全局变量
    
**globalThis对象**
  - 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
  - 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
  - Node 里面，顶层对象是global，但其他环境都不支持。

```javascript
/**
 * @description: 函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
 * @param {type} 
 * @return: 
 */
for (let i = 0; i < 3; i++) {  //循环内的值 跟 块作用域这里的abc 互不影响。
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc


/**
 * @description: 不存在变量提升
 * @param {type} 
 * @return: 
 */
 // var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;


/**
 * @description: 暂时性死区：有霸占位置的意思。不会被其他位置的影响。

 * @param {type} 
 * @return: 
 */
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}


/**
 * @description:  隐蔽的死区。
 * @param {type} 
 * @return: 
 */
function bar(x = y, y = 2) {   //y还没有声明的可能，就赋值操作了。
  return [x, y];
}

bar(); // 报错

/**
 * @description: 不允许重复声明。
 * @param {type} 
 * @return: 
 */
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
//函数内的参数也不可以在 内部重复声明。
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错


/**
 * @description: 允许多层嵌套。
 * @param {type} 
 * @return: 
 */
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};




/**
 * @description: es6块级函数 有不一样到 自己行为
 * @param {type} 
 * @return: 
 */
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();   //es5 是i am inside.因为函数声明提升。到外部。  es6是 undefined is not a function.因为类似于var变量提升。
}());



/**
 * @description: ES6 的块级作用域必须有大括号
 * @param {type} 
 * @return: 
 */
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}

// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}




/**
 * @description: 只在声明所在的块级作用域内有效。
 * @param {type} 
 * @return: 
 */
 if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined




/**
 * @description: const的指向数据不变。
 * @param {type} 
 * @return: 
 */
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only




/**
 * @description: es6顶层对象 不是 全局变量
 * @param {type} 
 * @return: 
 */
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined





/**
 * @description: 取顶层对象的方式
 * @param {type} 
 * @return: 
 */

 // 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

```
