
Reflect

1. Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。

2. Reflect对象的设计目的有以下：

1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。

2. 修改某些Object方法的返回结果，让其变得更合理。

3. 让Object操作都变成函数行为。
4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。

Reflect对象一共有 13 个静态方法。

Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)

/**
 * @description: 修改某些Object方法的返回结果
 * @param {type} 
 * @return: 
 */
// 老写法
try {
Object.defineProperty(target, property, attributes);
// success
} catch (e) {
// failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
// success
} else {
// failure
}


/**
 * @description: 让Object操作都变成函数行为。
 * @param {type} 
 * @return: 
 */
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true


/**
 * @description: Reflect对象的方法与Proxy对象的方法一一对应，
 * 确保完成原有的行为，然后再部署额外的功能。
 * @param {type} 
 * @return: 
 */
var loggedObj = new Proxy(obj, {
    get(target, name) {
      console.log('get', target, name);
      //确保完成原有的行为，然后再部署额外的功能。
      return Reflect.get(target, name);  
    },
    deleteProperty(target, name) {
      console.log('delete' + name);
    //   确保完成原有的行为，然后再部署额外的功能。
      return Reflect.deleteProperty(target, name);
    },
    has(target, name) {
      console.log('has' + name);
    //   确保完成原有的行为，然后再部署额外的功能。
      return Reflect.has(target, name);
    }
  });



/**
 * @description: 使用 Proxy 实现观察者模式
 * @param {type} 
 * @return: 
 */
const person = observable({
    name: '张三',
    age: 20
});

function print() {
    console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20

const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}