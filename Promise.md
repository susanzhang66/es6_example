从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
// then,接收2个函数参数，一个作为，resolve,另一个reject。，第二个参数可选。
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
**注意点**

1) 不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。。
**但是**这个如果f是同步的，也会在末尾执行，即是变成了异步。
```javascript
Promise.resolve().then(f)
```
**解决：**2种方案
```javascript
//1.async
const f = () => console.log('now');
(async () => f())();
console.log('next');

//2.立即执行函数
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
//3.Promise.try  好像支持度
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```
**特点**
1）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
2）无法取消Promise，一旦新建它就会立即执行，无法中途取消。
3）如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
4）如果某些事件不断地反复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署`Promise`更好的选择。

**语法**
* ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
* promise构造函数接受一个函数作为参数，该函数的两个参数分别是_**resolve和reject**。它们是两个函数，**由 JavaScript 引擎提供**，不用自己部署。_
* Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
* 一个promise 依赖于 另一个promise状态， 则后者决定前者的状态（是resolve或reject）
* 调用resolve或reject并不会终结 Promise 的参数函数的执行。

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})
//后者决定前者状态。
p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ... p2的状态由P1决定
  resolve(p1);
})
```
**Promise 新建后就会立即执行:**
```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});
console.log('Hi!');
promise.then(function() {
  console.log('resolved.');
});
// Promise
// Hi!
// resolved
```

## **Promise.prototype.then()**
  * then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
  * __then方法返回的是一个新的Promise实例__（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
  * `采用链式的then，可以指定一组按照次序调用的回调函数`
```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
```
## **注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。总是晚于本轮循环的同步任务。**, 
```javascript
new Promise((resolve, reject) => {
  resolve(1);   //总是晚于本轮循环的同步任务。
  console.log(2);， 最好不好写在resolve等后面，需要后面执行的化，最好放在then方法里。
}).then(r => {
  console.log(r);
});
// 2
// 1
```
**Promise.prototype.catch()**
Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
```javascript
// bad，不好的写法。
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good 好的写法
// 理由一：catch也可以捕获then里面的错误。
// 理由二：更接近try-catch
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });



/**
 * @description:  catch会一直冒泡到最外层， 所以下面的catch可以捕获前面3个promise产生的错误。
 * @param {type} 
 * @return: 
 */
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

```

## **Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误” .所以一般用catch捕获**

**Promise.prototype.finally()**
   finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
它的实现原理：
```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
**Promise.all()**
对比：Promise.allSettled()，我们不关心异步操作的结果，只关心这些操作有没有结束。
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
* 参数也会自动转化成promise实例。
* 等参数返回结果才会触发resolve。
* 若有一个返回了reject也就结束触发reject。
**特殊的注意：** 假设如下p1,p2有各自捕获的catch,最后也会变成resolved,则不会调用Promise.all的catch了。而是会把错误信息返回给到Promise.all。
```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```
**Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。**
谁先返回则率先决定状态。会将参数自动转化Promise实例
```javascript
//如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```
**Promise.allSettled()**
* 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
* 该方法返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。
* 返回等信息是一个数组对象，**每个对象都有status属性**。如下注释

```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```
**Promise.any()**  应该叫` any fulfilled`, 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
* 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
* 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
```javascript
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];
try {
  //Any of the promises was fulfilled.
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
// All of the promises were rejected.
  console.log(error);
}
//或者 如下捕获
Promise.any(promises).then(
  (first) => {
    // Any of the promises was fulfilled.
  },
  (error) => {
    // All of the promises were rejected.
  }
);
```
**Promise.resolve()** 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
```javascript
//转化为promise对象
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
等价于
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
入参：
（1）参数是一个 Promise 实例
（2）参数是一个thenable对象
  (3）参数不是具有then方法的对象，或根本就不是对象
（4）不带有任何参数: 直接返回一个resolved状态的 Promise 对象。

**Promise.reject(reason)**:方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

**Promise.try** 就是模拟try代码块，就像promise.catch模拟的是catch代码块。
开头注意那里有交代。
