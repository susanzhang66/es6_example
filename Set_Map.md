## Set与 Map

不计入垃圾回收机制：自动删除，不会保留吧，避免内存泄漏
内存泄漏的例子
```javascript
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [   //当e1,e2不存在的时候，arr的引用还存在，不会回收垃圾，会内存泄漏。
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
//除非手动清除
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

## **Set**   成员唯一的类数组。
  - `类数组，成员是唯一的，无重复的，是一个构造函数。 `
  - 判断是否重复 有个算法是“Same-value-zero equality”，它类似于精确相等运算符（===），但NaN他认为是相等的。2个对象是不想等的。
  - 参数可以是 数组或者具有 iterable 接口的其他数据结构。
  - Array.from方法可以将 Set 结构转为数组。
  - 遍历是有次序的，按插入的顺序。
  - set结构的遍历器生成函数就是它的values方法。可以省略values方法，直接用for...of循环遍历 Set。
## **Set应用**：
 - 扩展运算符：...,：可以去除数组的重复成员。
 - 可以用 for of循环。
 - 实现并集（Union）、交集（Intersect）和差集（Difference）。
 - `Array.from方法`。直接可以转换成数组。
**Set的属性与方法：**
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。
    - **操作方法**
- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。
    - **遍历方法**
- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器  --  Set的默认遍历器生成函数。Set.prototype[Symbol.iterator] === Set.prototype.values
- Set.prototype.entries()：返回键值对的遍历器  -- 键值对的 名称都一样
- Set.prototype.forEach()：使用回调函数遍历每个成员


## **WeakSet**  不重复的值的集合、成员只能是对象、不计入垃圾回收机制
-  成员只能是对象的 构造函数。并且它是不计入垃圾回收机制。
- WeakSet 的成员只能是对象，而不能是其他类型的值。-- 参数只能是数组或者类数组对象，或者具备iterator接口的对象。
- 三。不可遍历。-- WeakSet 没有size属性，没有办法遍历它的成员。-- 成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
- 具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。
**WeakSet 方法：**
- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在

**WeakSet应用：dom集合**

## weakSet的应用示例：防止内存泄露。
```javascript
//保证了Foo的实例方法，只能在Foo的实例上调用。
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
```


## **Map**: 
  它类似于对象，也是`键值对的集合，`但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。**(key值可以是任意值的 对象。)**
    **参数**：数组，或任何具有 Iterator 接口、且每个成员都是一个**双元素的数组**的数据结构。
    对同一个对象的引用，Map 结构才将其视为同一个键。
    使用扩展运算符 转换 成数组。
**Map应用**：
    Map 的键实际上是跟内存地址绑定的，-- 可以解决第三方库同名属性一样的冲突问题。（简单类型的值（数字、字符串、布尔值）视为同一个键）
## **Map的属性和操作**
- （1） size 属性
- （2） Map.prototype.set(key, value)： 返回的是整个map解构，可以链式操作。
- （3） Map.prototype.get(key)
- （4） Map.prototype.has(key)：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- （5） Map.prototype.delete(key)：delete方法删除某个键，返回true。如果删除失败，返回false。
- （6） Map.prototype.clear() clear方法清除所有成员，没有返回值。
## **Map遍历操作：**：Map 的遍历顺序就是插入顺序。
- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。 --  Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
- Map.prototype.forEach()：遍历 Map 的所有成员。
**Map 结构转为数组结构** :使用扩展运算符（...）。

应用：
    数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。


**与其他数据结构的互相转换**
Map, Array, Object, Json,

## **WeakMap**
**WeakMap与Map的区别有两点。** 
  - 首先，WeakMap只接受对象作为键名（null除外），数组可以。
  - 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制.（注意，WeakMap 弱引用的只是键名，而不是键值。） -- 避免内存泄漏，不用手动删除，自动删除。
**WeakMap 与 Map 在 API 上的区别**
  - 一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。
  - 二是无法清空，即不支持clear方法。
  - WeakMap只有四个方法可用：get()、set()、has()、delete()。
  
**weakmap的应用**
1. dom引用
2. 部署私有属性





```javascript
// 例一   构造函数 -- 数组入参 元素是唯一的
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二 构造函数 -- 数组入参 元素是唯一的
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三 构造函数 -- iterable接口入参 元素是唯一的
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于   构造函数 -- iterable接口入参
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56

/**
 * @description:  应用
 * 去除数组的重复成员
 * 去除字符串里面的重复字符。
 * @param {type} 
 * @return: 
 */

// Array.from 将set转换成 数组。
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
// 去除数组的重复成员
[...new Set(array)]
// 去除字符串里面的重复字符。
[...new Set('ababbc')]   // [a,b,c]
[...new Set('ababbc')].join('')  //"abc"
// "abc"

/**
 * @description:   在 Set 内部，两个NaN是相等的。 内部不会发生类型转换，判断标准是===运算符。
 * @param {type} 
 * @return: 
 */
//  NaN不等于自身 的set 唯一算法。
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

//2个对象不相等。
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2


/**
 * @description: Set.prototype[Symbol.iterator] === Set.prototype.values 默认的遍历生成器。
 * @param {type} 
 * @return: 
 */
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {  //Set可以直接用 for of遍历。
  console.log(x);
}
// red
// green
// blue

/**
 * @description: 并集（Union）、交集（Intersect）和差集（Difference）。
 * @param {type} 
 * @return: 
 */
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

/**
 * @description: set默认可遍历，后iterator接口，默认是values
 * @param {type} 
 * @return: 
 */
Set.prototype[Symbol.iterator] === Set.prototype.values
// 意味可以省略 values()方法来遍历。

let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
// true


/**
 * @description: 同步改变set结构的方式。。只有重新定义new set();
 * @param {type} 
 * @return: 
 */
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6

// -------------------------------------------------
/**
 * @description:  weakSet 参数... 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。、
 * @param {type}   参数只能是数组或类似数组的对象，或者具有iterator接口的对象
 * @return: 
 */
const a = [[1, 2], [3, 4]];  //a里面是引用，所以不会报错
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}


const b = [3, 4];  //b的成员不是对象，所以报错。
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)



/**
 * @description: weakset方法，没有size, forEach
 * @param {type} 
 * @return: 
 */
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false
// 没有遍历的这些属性
ws.size // undefined
ws.forEach // undefined

ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function


/**
 * @description: 避免内存泄漏问题。  不计入垃圾回收机制。
 * @param {type} 
 * @return: 
 */
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}

/**
 * @description:  key值是对象的 
 * @param {type} 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
 * @return: 
 */
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false


/**
 * @description: 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
 * @param {type} 参数也可以是数组， 不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。
 * @return: 
 */
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
// 以上的结果类似于下面的操作
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);

/**
 * @description: 
 * @param {type} 
 * @return: 
 */
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3

/**
 * @description:  对同一个对象对引用，map才视为同一键值。
 * @param {type} 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
 * @return: 
 */
const map = new Map();

map.set(['a'], 555);  
map.get(['a']) // undefined
//---------  同一个键 的问题。  NaN还是相等的。
let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123


/**
 * @description: map的遍历操作。-- Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
 * @param {type} 
 * @return: 
 */
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()   ---------   这个需要注意一下， for of 的作用。。
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"



/**
 * @description: Map的数组转换 -- 使用扩展运算符（...）。
 *  Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
 * @param {type} 
 * @return: 
 */

conset map = new Map([[
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]]);
[...map.keys()]  // [1,2,3]

[...map.values()] //['one', 'two', 'three']

[...map.entries()] 
// [[1,'one'], [2, 'two'], [3, 'three']]


//  Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
map[Symbol.iterator] === map.entries
// true
[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]


/**
 * @description: 数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
 * @param {type} 
 * @return: 
 */

const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}


/**
 * @description:  forEach...
 * @param {type} 
 * @return: 
 */
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
// forEach方法还可以接受第二个参数，用来绑定this。
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);

/**
 * @description: 与其他数据结构的互相转换
Map, Array, Object, Json,
 * @param {type} 
 * @return: 
 */
//map 转数组
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);

[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// ----------  数组 转 Map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
// --------------Map 转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
// ---------- 对象转map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

// --------------Map 转为JSON
function strMapToJson( strMap ){
    return JSON.stringify( strMaptoObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMaptoJson(myMap);

// -----------JSON 转 Map
function jsonToStrMap( jsonStr ){
    return objToStrMap( JSON.parse(jsonStr));
}

josnToStrMap('{"yes": true, "no": false}');
// Map {'yes' => true, 'no' => false}

/**
 * @description:  WeakMap
 * @param {type} 键值的 合法
 * @return: 
 */
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"
// ------------------  只接受对象为key值。
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key

const a = function(){

}
map.set(a, 5);
// WeakMap {ƒ => 5}

/**
 * @description:  不合法的api操作。
 * @param {type} 
 * @return: 
 */
const wm = new WeakMap();

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined


/**
 * @description: 一个很好的 垃圾回收 weakmap的弱引用 证明例子
 * @param {type} 
 * @return: 
 */
// 手动执行一次垃圾回收，保证获取的内存使用状态准确
> global.gc();
undefined

// 查看内存占用的初始状态，heapUsed 为 4M 左右
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }

> let wm = new WeakMap();
undefined

// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);
undefined

// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
WeakMap {}

> global.gc();
undefined

// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }

// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
null

// 再次执行垃圾回收
> global.gc();
undefined

// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
{ rss: 20639744,
  heapTotal: 8425472,
  heapUsed: 3979792,
  external: 8956 }


/**
 * @description: Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
 * @param {type} 
 * @return: 
 */
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE

