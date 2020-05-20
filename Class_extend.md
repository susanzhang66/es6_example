**Class 的继承**
- 子类必须在constructor方法中调用super方法。
- 子类没有定义constructor方法，这个方法会被默认添加，
- 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
- 父类的静态方法，也会被子类继承。继承在b._proto_（指向父类的）
- **super这个关键字，既可以当作函数使用，也可以当作对象使用。**
- super作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
- super作为对象时，
  - **在普通方法中，super指向父类的原型对象，父类方法内的this指向子类实例，super拿不到父类实例方法和属性；在静态方法中，super指向父类。而父类方法内的this也是指向子类。**
  - 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
    在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
         ---super()在这里相当于A.prototype.constructor.call(this)。
    定义在父类实例上的方法或属性，是无法通过super调用的。因为super指向父类的原型对象
    如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。因为this指向子类实例，所以
- new.target指向当前正在执行的函数。
- 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

**类的 prototype 属性和__proto__属性**
  1. 子类的__proto__属性，表示构造函数的继承，总是指向**父类**。
  2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向**父类的prototype属性**。

**实例的 __proto__ 属性**
    子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。

ES6 允许继承原生构造函数定义子类（ES5做不到，因为 .apply(this)忽略了）
    继承Object的子类，有一个行为差异。（不允许构造函数传参到父类）

**Mixin 模式的实现，** 

```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}


/**
 * @description: 子类没有定义constructor方法，这个方法会被默认添加，

 * @param {type} 
 * @return: 
 */
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}

/**
 * @description: 只有调用super之后，才可以使用this关键字，否则会报错。
 * @param {type} 
 * @return: 
 */
class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}
  
  class ColorPoint extends Point {
    constructor(x, y, color) {
      this.color = color; // ReferenceError, 只有调用super之后，才可以使用this关键字，否则会报错。
      super(x, y);
      this.color = color; // 正确
    }
  }

  /**
   * @description: super代表调用父类的构造函数
   * @param {type} 
   * @return: 
   */
  class A {}

  class B extends A {
    constructor() {
      super();   //这里等于 A.prototype.constructor.call(this)。
    }
  }

  /**
   * @description: 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。--- 不是很明白
   * @param {type} 
   * @return: 
   */  
  class A {
    constructor() {
      this.x = 1;
    }
  }
  
  class B extends A {
    constructor() {  //相当于constructor里面的super对象 == this对象。
      super();
      this.x = 2;
      super.x = 3;   //此时super对属性赋值，super == this.
      console.log(super.x); // undefined
      console.log(this.x); // 3
    }
  }
  
  let b = new B();


  /**
   * @description: 总结：静态方法中用super对应的都是实体，不是实例
   * @param {type} 
   * @return: 
   */
  class Parent {
    static myMethod(msg) {
      console.log('static', msg);
    }
  
    myMethod(msg) {
      console.log('instance', msg);
    }
  }
  
  class Child extends Parent {
    static myMethod(msg) {
      super.myMethod(msg);
    }
  
    myMethod(msg) {
      super.myMethod(msg);
    }
  }
  
  Child.myMethod(1); // static 1
  
  var child = new Child();
  child.myMethod(2); // instance 2



/**
 * @description: 总结：子类调用父类的静态方法里的 this指向静态属性或方法。
 * 子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
 * @param {type}  
 * @return: 
 */  

  class A {
    constructor() {
      this.x = 1;
    }
    static print() {
      console.log(this.x); // 被子类调用时，this指向的是子类的 属性。
    }
  }
  
  class B extends A {
    constructor() {
      super();
      this.x = 2;
    }
    static m() {
      super.print();  //这里调用了父类的方法，
    }
  }
  
  B.x = 3;
  B.m() // 3


  

/**
 * @description: 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
 * @param {type} 
 * @return: 
 */
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错  这没有说明是函数还是对象的使用，会报错。
  }
}
  
/**
 * @description: 
 * （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

    （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
 * @param {type} 
 * @return: 
 */
class A {
}

class B extends A {
}

B.__proto__ === A // true     b继承a的静态属性
B.prototype.__proto__ === A.prototype // true   ，b的实例继承a的实例



/**
 * @description: 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。
 * @param {type} 
 * @return: 
 */
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
/**
 * @description: ---   这里要注意：-- super.x 指的是this了，而取值的时候取不到
 * 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
 * @param {type} 
 * @return: 
 */
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;    //-----------厉害了。。。
    console.log(super.x); // undefined     厉害了。。。。
    console.log(this.x); // 3
  }
}

let b = new B();

/**
 * @description: ES6 允许继承原生构造函数定义子类（ES5做不到，因为 .apply(this)忽略了）
 * 说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
 * @param {type} 
 * @return: 
 */
class MyArray extends Array {
    constructor(...args) {
      super(...args);
    }
}
  
  var arr = new MyArray();
  arr[0] = 12;
  arr.length // 1
  
  arr.length = 0;
  arr[0] // undefined



/**
 * @description: 继承Object的子类，有一个行为差异。
 * @param {type} 
 * @return: 
 */
class NewObj extends Object{
    constructor(){
      super(...arguments);
    }
}
  var o = new NewObj({attr: true});
  o.attr === true  // false



  /**
   * @description: mixins模式
   * @param {type} 
   * @return: 
   */
//简单方式
  const a = {
    a: 'a'
  };
  const b = {
    b: 'b'
  };
  const c = {...a, ...b}; // {a: 'a', b: 'b'}
// 函数方式
  function mix(...mixins) {
    class Mix {
      constructor() {
        for (let mixin of mixins) {
          copyProperties(this, new mixin()); // 拷贝实例属性
        }
      }
    }
  
    for (let mixin of mixins) {
      copyProperties(Mix, mixin); // 拷贝静态属性
      copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
  
    return Mix;
  }
  
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if ( key !== 'constructor'
        && key !== 'prototype'
        && key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

  class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
  }