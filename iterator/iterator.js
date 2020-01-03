// 类  部署 Iterator 接口的写法 ，也可以部署在原型上。
class RangeIterator {
    constructor(start, stop) {
      this.value = start;
      this.stop = stop;
    }
  
    [Symbol.iterator]() { return this; }  //部署iterator接口
  
    next() {
      var value = this.value;
      if (value < this.stop) {
        this.value++;
        return {done: false, value: value};
      }
      return {done: true, value: undefined};
    }
}
  //调用类的 iterator接口
  function range(start, stop) {
    return new RangeIterator(start, stop);
  }
  
  for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
  }


//   2.类似数组的对象的iterator接口部署
let iterable = {
    0: 'a',    //必须是 0，1，2这样key的才可以
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
  for (let item of iterable) {
    console.log(item); // 'a', 'b', 'c'
  }

// 3. 使用while来遍历 iterator接口
  var $iterator = ITERABLE[Symbol.iterator]();
  var $result = $iterator.next();
  while (!$result.done) {
    var x = $result.value;
    // ...
    $result = $iterator.next();
  }


// 使用场景：
// 1. 解构赋值
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];

// 2.（2）扩展运算符
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']

// 3. （3）yield*
let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
  };
  
  var iterator = generator();
  
  iterator.next() // { value: 1, done: false }
  iterator.next() // { value: 2, done: false }
  iterator.next() // { value: 3, done: false }
  iterator.next() // { value: 4, done: false }
  iterator.next() // { value: 5, done: false }
  iterator.next() // { value: undefined, done: true }


//   字符串场景
  var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }


// Iterator 接口与 Generator 函数
let myIterable = {
    [Symbol.iterator]: function* () {
      yield 1;
      yield 2;
      yield 3;
    }
  }
  [...myIterable] // [1, 2, 3]
  
  // 或者采用下面的简洁写法
  
  let obj = {
    * [Symbol.iterator]() {
      yield 'hello';
      yield 'world';
    }
  };
  
  for (let x of obj) {
    console.log(x);
  }
  // "hello"
  // "world"



  /**
   * @description:  具有的 return(), throw()接口
   * @param {type} 
   * @return: 
   */  
  function readLinesSync(file) {
    return {
      [Symbol.iterator]() {
        return {
          next() {     //1. 部署来next接口
            return { done: false };
          },
          return() {    //2。同时还部署来return接口。
            file.close();
            return { done: true };
          }
        };
      },
    };
  }

  // 情况一  调用readLinesSync
for (let line of readLinesSync(fileName)) {
    console.log(line);     //会先执行 return接口的 函数。
    break;
  }
  
  // 情况二 readLinesSync
  for (let line of readLinesSync(fileName)) {
    console.log(line);     //也会先执行 return接口再抛错。
    throw new Error();
  }


  /**
   * @description:  Set 和 Map 结构  直接使用for...of循环。
   * @param {type} 
   * @return: 
   */  

var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262


/**
 * @description:  用Array.from方法 解决类数组 for of遍历问题。
 * @param {type} 
 * @return: 
 */
//不是所有类似数组的对象都具有 Iterator 接口
let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
  console.log(x);
}
//使用Array.from方法将其转为数组。
// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}

/**
 * @description:  对象的包装 iteretor接口，个人觉得没必要。用for in就好
 * @param {type} 
 * @return: 
 */
function* entries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]];
    }
  }
  
  for (let [key, value] of entries(obj)) {
    console.log(key, '->', value);
  }
  // a -> 1
  // b -> 2
  // c -> 3


  /**
   * @description: 
   * for...in循环主要是为遍历对象而设计的
   * for....of 优点：
   * 1. 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
    2 不同于forEach方法，它可以与break、continue和return配合使用。
    3。 提供了遍历所有数据结构的统一操作接口。
   * @param {type} 
   * @return: 
   */
  for (var n of fibonacci) {
    if (n > 1000)
      break;
    console.log(n);
  }

