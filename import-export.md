
## **ES6 模块**
    静态化，编译时确定依赖，和输出输入变量。  `动态更新`
## **CommonJS 和 AMD 模块**
    运行时加载。--`不能动态更新`
    require是运行时加载模块，import命令无法取代require的动态加载功能。
     < ES2020提案 引入import()函数，支持动态加载模块。>  import(specifier):import()返回一个 Promise 对象。
## **export 命令**
  - export输出的变量就是本来的名字，但是可以使用as关键字重命名。
  - export必须与模块内部的变量建立一一对应关系。接口名与模块内部变量之间，建立了一一对应的关系。
  - export命令可以出现在模块的任何位置，只要处于模块顶层就可以。


## **import命令：**
  - 大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。`除非是export default输出的不用`
  - 使用as关键字，将输入的变量重命名。
  - import命令输入的变量都是只读的，即不允许修改输入接口。 但是，如果是一个对象，可以改写对象的属性
  - import的路径可以是相对，也可以是绝对路径
  - `import命令具有提升效果，会提升到整个模块的头部，首先执行。`
  - `import命令 不能用表达式，因为它是静态化确定的，不能像运行时才确定的`
  - import语句会执行所加载的模块
  - CommonJS 模块的require命令和 ES6 模块的import命令 可以同时使用，`但es6是最早执行的，可能会得到非预期结果`
  - 模块的整体加载： import * as circle from './circle'; 注意是静态分析的，不允许修改circle。


## **export default 命令**
  - import命令可以为匿名函数指定任意名字。前提是export default输出的。``这时import命令后面，不使用大括号。``
  - `export default 命令后面不能跟变量声明语句。因为default就是变量了。`
  - export default后面可以是一个 值。因为本质是后面的值用来赋值给default变量。
  - export default也可以用来输出类。
  - 可以同时import输入 export、export default的输出。
**export 与 import 的复合写法**

**模块的继承**

**跨模块常量**

**import():动态加载，即运行时确定的。返回的是promise对象。**    
ES2020提案 引入import()函数，支持动态加载模块。 import(specifier):import()返回一个 Promise 对象。 
    （1）按需加载。
    （2）条件加载
    （3）动态的模块路径



```javascript
/**
 * @description: export必须与模块内部的变量建立一一对应关系。接口名与模块内部变量之间，建立了一一对应的关系。
 * @param {type} 
 * @return: 
 */
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };



/**
 * @description: export输出重命名--- export输出的变量就是本来的名字，但是可以使用as关键字重命名。
 * @param {type} 
 * @return: 
 */
function v1() { ... }
function v2() { ... } 

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

/**
 * @description: 大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
 *  重命名：
 * @param {type} 
 * @return: 
 */

import { firstName, lastName, year } from './profile.js';

import { lastName as surname } from './profile.js';


/**
 * @description: import命令 不能用表达式，因为它是静态化确定的，不能像运行时才确定的
 * @param {type} 
 * @return: 
 */
// 报错-- 因为是静态化确定输入的，
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}

/**
 * @description: import语句会执行所加载的模块
 * @param {type} 
 * @return: 
 */
import 'lodash';   //只执行一次
import 'lodash';


/**
 * @description: 整体模块加载，并且不可修改输入接口
 * @param {type} 
 * @return: 
 */
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};



/**
 * @description: export default 用import的区别哦、
 * @param {type} 
 * @return: 
 */
// 第一组
export default function crc32() { // 输出
    // ...
  }
  
import crc32 from 'crc32'; // 输入   这里不需要加大括号。
  
  // 第二组
  export function crc32() { // 输出
    // ...
  };
  
  import {crc32} from 'crc32'; // 输入   这里需要加大括号




  
/**
 * @description: export default 命令后面不能跟变量声明语句。因为default就是变量了。
 * export default后面可以是一个 值。因为本质是后面的值用来赋值给default变量。
 * @param {type} 
 * @return: 
 */  
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
//------------------------
// 正确：export default后面可以是一个 值
export default 42;

// 报错
export 42;


/**
 * @description: export default也可以用来输出类。
 * @param {type} 
 * @return: 
 */
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();


/**
 * @description: import _, { each, forEach } from 'lodash';
 * @param {type} 
 * @return: 
 */
import _, { each, forEach } from 'lodash';




/**
 * @description: export 与 import 的复合写法
 * @param {type} 
 * @return: 
 */
//1.
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
//2.------
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 3. 默认接口的写法如下。
export { default } from 'foo';
// 4.具名接口改为默认接口的写法如下。
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
// 5.默认接口也可以改名为具名接口。
export { default as es6 } from './someModule';




/**
 * @description: 动态加载import,即运行时加载。 import()返回一个 Promise 对象。
 * import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
 * @param {type} 
 * @return: 
 */
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
  //动态的 路径,,,异步的。。
  import(f())
  .then(...);



/**
 * @description: import():动态加载，即运行时确定的。返回的是promise对象。
 * @param {type} 
 * @return: 
 */

import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});

// 模块有default输出接口，可以用参数直接获得。
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});

// 使用具名输入的形式。
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});

// 同时加载多个模块
Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js'),
  ])
  .then(([module1, module2, module3]) => {
     ···
  });
// 结合async函数
  async function main() {
    const myModule = await import('./myModule.js');
    const {export1, export2} = await import('./myModule.js');
    const [module1, module2, module3] =
      await Promise.all([
        import('./module1.js'),
        import('./module2.js'),
        import('./module3.js'),
      ]);
  }
  main();

  ```


