  **1. 数组的解构赋值** ：模式匹配：左右2边模式要匹配，并且右边要 可遍历解构（iterator接口的，包括set,generator函数）
  
- “模式匹配”，只要等号两边的模式相同，(右边)
- 解构不成功，变量的值就等于undefined。
- 如果等号的右边不是数组（不可遍历的解构，iterator）会报错
- 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
- 解构赋值允许指定默认值。(只有是undefined,默认值才会生效)
- 默认值是一个表达式则惰性求值，用到才运行
- 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。
- Set 结构，也可以使用数组的解构赋值。

**2. 对象的解构赋值**    ： 
- 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。（没有次序之分）
- 解构也可以用于嵌套结构的对象。
- 解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
- 解构赋值可以拿到原型的值。
   
    **默认值**
- 对象的解构也可以指定默认值。
- 默认值生效的条件是，对象的属性值严格等于undefined。

    **注意点**
- 将一个已经声明的变量用于解构赋值，不要把{}放首行，可以用（）代替。
- 可以对数组进行对象属性的解构。

**3.字符串的解构赋值** ：字符串被转换成了一个类似数组的对象。

**4.数值和布尔值的解构赋值**
- 等号右边是数值和布尔值，则会先转为对象。
- 等号右边的值不是对象或数组，就先将其转为对象。
- （右边等于null, undefined会报错）

**5.函数参数的解构赋值**
- 1.传入参数的那一刻，数组参数就被解构成变量
- 2.undefined就会触发函数参数的默认值。

**圆括号问题**
 是表达式 还是 模式？？？-- 尽量不要在模式中放圆括号。
    
**不能使用圆括号的情况**  
    1）变量声明语句
    2）函数参数
    3）赋值语句的模式
    
**可以使用圆括号的情况**
    - 赋值语句的非模式部分，可以使用圆括号。

**用途**
- （1）交换变量的值
- （2）从函数返回多个值
- （3）函数参数的定义
- （4）提取 JSON 数据
- （5）函数参数的默认值
- （6）遍历 Map 结构
- （7）输入模块的指定方法

```javascript
/**
 * @description: 如果等号的右边不是数组（不可遍历的解构，iterator）会报错
 * 因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。
 * @param {type} 
 * @return: 
 */
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};


/**
 * @description: 右边结构是 函数
 * @param {type} 
 * @return: 
 */
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5


/**
 * @description: 解构赋值允许指定默认值。(只有是undefined,默认值才会生效)
 * @param {type} 
 * @return: 
 */

let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
// 默认值是表达式，惰性求值。
function f() {
  console.log('aaa');
}

let [x = f()] = [1];


/**
 * @description: 对象的解构赋值，其实是如下的简写。也是模式匹配，
 * 变量名与属性名不一致，
 * 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
 * @param {type} 
 * @return: 
 */

let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
//变量名与属性名不一致
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
//对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined

/**
 * @description: 对象的嵌套解构
 * @param {type} 
 * @return: 
 */
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}



/**
 * @description: 解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
 * @param {type} 
 * @return: 
 */
// 报错
let {foo: {bar}} = {baz: 'baz'};

/**
 * @description: 解构赋值可以拿到原型的值
 * @param {type} 
 * @return: 
 */
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"



/**
 * @description: 默认值
 * @param {type} 
 * @return: 
 */
var {x: y = 3} = {x: 5};
y // 5
//默认值，生效，要右边严格等于undefined
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null

/**
 * @description: 将一个已经声明的变量用于解构赋值，不要把{}放首行，可以用（）代替。
 * @param {type} 
 * @return: 
 */
// 错误的写法
let x;
// JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
{x} = {x: 1};
// SyntaxError: syntax error
// 正确的写法
let x;
({x} = {x: 1});


/**
 * @description: 可以对数组进行对象属性的解构。 因为是类对象。
 * @param {type} 
 * @return: 
 */
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3



/**
 * @description: 字符串 转换了 类数组的对象。
 * 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
 * @param {type} 
 * @return: 
 */
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
len // 5



/**
 * @description: 布尔值，数值的解构赋值
 * 
 * @param {type} 
 * @return: 
 */
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError




/**
 * @description: 注意：函数参数 解构，不同写法不同含义
 * @param {type} 
 * @return: 
 */
//
//为对象 参数赋值默认值（传参时就解构 默认值。）
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

//这种是 为函数参数，赋值默认值，（不是传参时候的解构。）
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]


/**
 * @description: undefined就会触发函数参数的默认值。
 * @param {type} 
 * @return: 
 */

[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]



/**
 * @description: 不可以使用圆括号的 -- 变量声明不可用
 * @param {type} 
 * @return: 
 */
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
//函数参数
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
// 赋值语句模式：
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];

// 报错
[({ p: a }), { x: c }] = [{}, {}];
/**
 * @description: 可以使用圆括号
 * 赋值语句的非模式部分，可以使用圆括号。  --- 感觉像 把括号放在 定义的属性上就可以
 * @param {type} 
 * @return: 
 */
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确


/**
 * @description: 用途
 * @param {type}  交换变量
 * @return: 
 */

let x = 1;
let y = 2;

[x, y] = [y, x];

/**
 * @description: （2）从函数返回多个值
 * @param {type} 
 * @return: 
 */
// -------------
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

/**
 * @description: （3）函数参数的定义
 * @param {type} 
 * @return: 
 */
// --------
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
// -----------
/**
 * @description: json提取值。
 * @param {type} 
 * @return: 
 */
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]


/**
 * @description: 函数参数默认值
 * @param {type} 
 * @return: 
 */
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};

/**
 * @description: （6）遍历 Map 结构
 * @param {type} 
 * @return: 
 */
// ----------
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// -----
/**
 * @description: （7）输入模块的指定方法
 * @param {type} 
 * @return: 
 */
const { SourceMapConsumer, SourceNode } = require("source-map");
```