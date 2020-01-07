// class只是一个语法糖
// ES6 的类，完全可以看作构造函数的另一种写法。
// 类的内部所有定义的方法，都是不可枚举的， 但es5写的模式是可以Object.keys枚举的
// constructor方法如果没有显式定义，一个空的constructor方法会被默认添加。
// constructor方法默认返回实例对象（即this）
// 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

// 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
// 类的属性名，可以采用表达式。
// 类也可以使用表达式的形式定义。
// 采用 Class 表达式，可以写出立即执行的 Class。

// 静态方法：
//     一个方法前，加上static关键字，就表示该方法不会被实例继承。
//     父类的静态方法，可以被子类继承。
//     静态方法也是可以从super对象上调用的。

// 实例属性的新写法: 写在class顶部。而且最外部是可以不用加this

// 静态属性:  用static来表示的。
    // 指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

// 5.私有方法和私有属性：  ES6 不提供，只能通过变通方法模拟实现。  提案：#

// 6.new.target 属性
//     如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

// 注意点
// （1）严格模式
// （2）不存在提升
// （3）name 属性
// （4）Generator 方法
// （5）this 的指向： 使用箭头函数。箭头函数内部的this总是指向定义时所在的对象。
//     类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。


/**
 * @description: class只是一个语法糖
 * @param {type} 
 * @return: 
 */
//es6：class只是一个语法糖
class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
}
//es5写法
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);



/**
 * @description: ES6 的类，完全可以看作构造函数的另一种写法。
 * @param {type} 
 * @return: 
 */
class Point {
    // ...
}
  
typeof Point // "function"
Point === Point.prototype.constructor // true



/**
 * @description: 原型的写法，更简洁
 * @param {type} 
 * @return: 
 */
class Point {
    constructor() {
      // ...
    }
  
    toString() {
      // ...
    }
  
    toValue() {
      // ...
    }
}
  
  // 等同于
  
  Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {},
  };


  /**
   * @description: 类的内部所有定义的方法，都是不可枚举的， 但es5写的模式是可以Object.keys枚举的
   * @param {type} 
   * @return: 
   */
  class Point {
    constructor(x, y) {
      // ...
    }
  
    toString() {
      // ...
    }
  }
  
  Object.keys(Point.prototype)    //不可枚举。
  // []
  Object.getOwnPropertyNames(Point.prototype)
  // ["constructor","toString"]


  /**
   * @description: 
        在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
   * 
   * @param {type} 
   * @return: 
   */
  class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
  }
  
  let inst = new MyClass();
  
  inst.prop = 123;
  // setter: 123
  
  inst.prop
  // 'getter'

/**
 * @description: 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
 * @param {type} 
 * @return: 
 */

class CustomHTMLElement {
    constructor(element) {
      this.element = element;
    }
  
    get html() {
      return this.element.innerHTML;
    }
  
    set html(value) {
      this.element.innerHTML = value;
    }
  }
  
  var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html"
  );
  
  "get" in descriptor  // true
  "set" in descriptor  // true


/**
 * @description: 类的属性名，可以采用表达式。
 * @param {type} 
 * @return: 
 */  
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {    //类的属性名，可以采用表达式。
    // ...
  }
}

/**
 * @description: 表达式 定义类，也可以省略Me
 * @param {type} 
 * @return: 
 */
const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  };

/**
 * @description: 采用 Class 表达式，可以写出立即执行的 Class。
 * @param {type} 
 * @return: 
 */
let person = new class {
    constructor(name) {
      this.name = name;
    }
  
    sayName() {
      console.log(this.name);
    }
  }('张三');  //立即执行的类
  
  person.sayName(); // "张三"


/**
 * @description:类的 name属性
 * @param {type} 
 * @return: 
 */
class Point {}
Point.name // "Point"


/**
 * @description: 类的  generator函数
 * @param {type} 
 * @return: 
 */
class Foo {
    constructor(...args) {
      this.args = args;
    }
    * [Symbol.iterator]() {
      for (let arg of this.args) {
        yield arg;
      }
    }
  }
  
  for (let x of new Foo('hello', 'world')) {
    console.log(x);
  }
  // hello
  // world

  /**
   * @description: 静态方法
   * @param {type} 
   * @return: 
   */
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  Foo.classMethod() // 'hello'
  
  var foo = new Foo();
  foo.classMethod()   //没有被实例继承。
  // TypeError: foo.classMethod is not a function

  /**
   * @description: 静态方法可以被子类继承。
   * @param {type} 
   * @return: 
   */
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
  }
  //可以继承父类的 静态方法。
  Bar.classMethod() // 'hello'



  /**
   * @description: 静态方法也是可以从super对象上调用的。
   * @param {type} 
   * @return: 
   */
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
    static classMethod() {
      return super.classMethod() + ', too';
    }
  }
  
  Bar.classMethod() // "hello, too"



  /**
   * @description: 实例属性新写法
   * @param {type} 
   * @return: 
   */
  class IncreasingCounter {
    _count = 0;   //实例属性，因为是在类里面的最外层，所以不用写 this._count
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }


/**
 * @description: 静态属性，静态方法是写在class内部，所以有提案把静态属性放在class内部。
 * @param {type} 
 * @return: 
 */
// 老写法
class Foo {
    // ...
}
Foo.prop = 1;
  
  // 新写法
  class Foo {
    static prop = 1;   //写在里面的静态属性。
  }


  /**
   * @description: 一种用symbol方式写的 私有属性和方法。
   * 第二  私有属性的提案 用#表示私有方法和属性，外部读取会报错
   * @param {type} 
   * @return: 
   */
  const bar = Symbol('bar');
  const snaf = Symbol('snaf');
  
  export default class myClass{
  
    // 公有方法
    foo(baz) {
      this[bar](baz);
    }
  
    // 私有方法
    [bar](baz) {
      return this[snaf] = baz;
    }
  
    // ...
  };
//提案：
class Foo {
    #a;
    #b;
    constructor(a, b) {
      this.#a = a;
      this.#b = b;
    }
    #sum() {
      return #a + #b;
    }
    printSum() {
      console.log(this.#sum());
    }
}



/**
 * @description:  new target
 * @param {type} 
 * @return: 
 */
function Person(name) {
    if (new.target !== undefined) {
      this.name = name;
    } else {
      throw new Error('必须使用 new 命令生成实例');
    }
  }
  
  // 另一种写法
  function Person(name) {
    if (new.target === Person) {
      this.name = name;
    } else {
      throw new Error('必须使用 new 命令生成实例');
    }
  }
  
  var person = new Person('张三'); // 正确
  var notAPerson = Person.call(person, '张三');  // 报错