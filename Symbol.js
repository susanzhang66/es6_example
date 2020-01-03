// 用于定义一组常量
// 该属性Symbol不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。要用Object.getOwnPropertySymbols
// Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
// Symbol.for(): 获取相同的Symbol值。 Symbol.keyFor()：返回一个已登记的 Symbol 类型值的key。
// Symbol.for()的这个全局登记特性， 不同的 iframe 或 service worker 中取到同一个值。
// 内置的 Symbol 值
    // Symbol.hasInstance ： 对象的Symbol.hasInstance属性，指向一个内部方法，调用instanceof方法时，会触发hasInstance方法。
    // Symbol.isConcatSpreadable：等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。‘
                // 数组的默认行为是可以展开
                // 类似数组的对象正好相反，默认不展开。
     // Symbol.species：指向一个构造函数。创建衍生对象时，会使用该属性
                     // 定义Symbol.species属性要采用get取值器。
    // Symbol.match：属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
    // Symbol.replace：对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
    // Symbol.search；，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
    // Symbol.split：，对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。
    // Symbol.iterator：对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
    // Symbol.toPrimitive：指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
    // Symbol.toStringTag：属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。
    // Symbol.unscopables：指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
// Symbol函数前不能使用new命令
// 相同参数的Symbol函数的返回值是不相等的。
// Symbol 值不能与其他类型。的值进行运算，会报错。
// Symbol 值也可以转为布尔值，但是不能转为数值。
// 实例属性description，直接返回 Symbol 的描述。
// Symbol 值作为对象属性名时，不能用点运算符。
// 如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个 Symbol 值。
// 消除魔术字符串： 在代码中重复用到字符串的问题，后续更改会容易出错。

// ES6 新增内置对象的Symbol.toStringTag属性值如下。

// JSON[Symbol.toStringTag]：'JSON'
// Math[Symbol.toStringTag]：'Math'
// Module 对象M[Symbol.toStringTag]：'Module'
// ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
// DataView.prototype[Symbol.toStringTag]：'DataView'
// Map.prototype[Symbol.toStringTag]：'Map'
// Promise.prototype[Symbol.toStringTag]：'Promise'
// Set.prototype[Symbol.toStringTag]：'Set'
// %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
// WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
// WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
// %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
// %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
// %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
// Symbol.prototype[Symbol.toStringTag]：'Symbol'
// Generator.prototype[Symbol.toStringTag]：'Generator'
// GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

let s = Symbol(); // Symbol函数前不能使用new命令

typeof s  //独一无二的数据。
// "symbol"

/**
 * @description: 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法
 * @param {type} 
 * @return: 
 */
const obj = {
    toString() {
      return 'abc';
    }
};
  const sym = Symbol(obj);
  sym // Symbol(abc)

/**
 * @description: 相同参数的Symbol函数的返回值是不相等的。
 * @param {type} 
 * @return: 
 */

  // 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false


/**
 * @description: Symbol 值不能与其他类型的值进行运算，会报错。
 * @param {type} 
 * @return: 
 */
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string


/**
 * @description: Symbol 值也可以转为布尔值，但是不能转为数值。
 * @param {type} 
 * @return: 
 */
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError


/**
 * @description: 实例属性description，直接返回 Symbol 的描述。
 * @param {type} 
 * @return: 
 */
const sym = Symbol('foo');

sym.description // "foo"


/**
 * @description: Symbol 值作为对象属性名时，不能用点运算符。否则当成字符串。
 * @param {type} 
 * @return: 
 */

const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';   //Symbol 值作为对象属性名时，不能用点运算符。，故当作字符串属性
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

let obj = {
    [s](arg) { ... }   //放在[]中括号内 当作symbol.
};


/**
 * @description: 用于定义常量。
 * @param {type} 
 * @return: 
 */
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}

/**
 * @description: 该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
 * @param {type} 
 * @return: 
 */
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]

/**
 * @description: Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
 * @param {type} 
 * @return: 
 */
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
  };
  
  Reflect.ownKeys(obj)
  //  ["enum", "nonEnum", Symbol(my_key)]

/**
 * @description: // Symbol.for(): 获取相同的Symbol值。 Symbol.keyFor()：返回一个已登记的 Symbol 类型值的key。
 * @param {type} 
 * @return: 
 */
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false

let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");   //这个Symbol()不会登记，所以找不到。
Symbol.keyFor(s2) // undefined


/**
 * @description: 对象的Symbol.hasInstance属性，指向一个内部方法，调用instanceof方法时，会触发hasInstance方法。
 * @param {type} 
 * @return: 
 */
class Even {
    static [Symbol.hasInstance](obj) {
      return Number(obj) % 2 === 0;
    }
  }
  
  // 等同于
  const Even = {
    [Symbol.hasInstance](obj) {
      return Number(obj) % 2 === 0;
    }
  };
  
  1 instanceof Even // false
  2 instanceof Even // true
  12345 instanceof Even // false


/**
 * @description: Symbol.isConcatSpreadable
 * 等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
                // 数组的默认行为是可以展开
                // 类似数组的对象正好相反，默认不展开。
 * @param {type} 
 * @return: 
 */
class A1 extends Array {
    constructor(args) {
      super(args);
      this[Symbol.isConcatSpreadable] = true;
    }
  }
  class A2 extends Array {
    constructor(args) {
      super(args);
    }
    get [Symbol.isConcatSpreadable] () {
      return false;
    }
  }
  let a1 = new A1();
  a1[0] = 3;
  a1[1] = 4;
  let a2 = new A2();
  a2[0] = 5;
  a2[1] = 6;
  [1, 2].concat(a1).concat(a2)
  // [1, 2, 3, 4, [5, 6]]

/**
 * @description: Symbol.species：指向一个构造函数。创建衍生对象时，会使用该属性
 * 定义Symbol.species属性要采用get取值器。
 * @param {type} 
 * @return: 
 */
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true

class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
}

/**
 * @description: Symbol.match：指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
 * @param {type} 
 * @return: 
 */
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1

/**
 * @description: Symbol.replace：对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
 * @param {type} 
 * @return: 
 */
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)

const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]


/**
 * @description: Symbol.toPrimitive 接收参数
 * Number：该场合需要转成数值
* String：该场合需要转成字符串
* Default：该场合可以转成数值，也可以转成字符串
 * @param {type} 
 * @return: 
 */
let obj = {
    [Symbol.toPrimitive](hint) {
      switch (hint) {
        case 'number':
          return 123;
        case 'string':
          return 'str';
        case 'default':
          return 'default';
        default:
          throw new Error();
       }
     }
  };
  
  2 * obj // 246
  3 + obj // '3default'
  obj == 'default' // true
  String(obj) // 'str'



  /**
   * @description: Symbol.toStringTag：Object.prototype.toString方法触发，
   * 用来定制[object Object]或[object Array]中object后面的那个字符串。
   * @param {type} 
   * @return: 
   */
  // 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"



/**
 * @description: Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
 * 下面代码说明，数组有 7 个属性，会被with命令排除。
 * @param {type} 
 * @return: 
 */
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
