提醒：es6模块最好以函数形式输出，避免跟commonjs模块一起，或者循环依赖加载的时候，得到不期望的值。

默认情况下，浏览器是同步加载 JavaScript 脚本

defer与async的区别：异步加载。
    defer是“渲染完再执行”，async是“下载完就执行”。
    defer脚本，会顺序加载，
    async脚本是不能保证加载顺序的。

加载 ES6 模块
    方式一、使用<script>标签，但是要加入type="module"属性。--异步加载，等同于defer。会顺序执行。
    type="module"/ async,同时有。则只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。等同于async。
    方式二、内嵌在网页中
几点注意的：
    代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
    模块脚本自动采用严格模式，不管有没有声明use strict。
    模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
    模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
    同一个模块如果加载多次，将只执行一次。

利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。

ES6 模块与 CommonJS 模块的差异 
    CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
    CommonJS 模块的顶层this指向当前模块，ES6 模块之中，顶层的this指向undefined；
Node.js 加载：
    .mjs文件总是以 ES6 模块加载。
    .cjs文件总是以 CommonJS 模块加载。
    .js文件的加载取决于package.json里面type字段的设置。

package.json模块的入口文件：main和exports
    main字段：
        exports字段的优先级高于main字段。
        // ./node_modules/es-module-package/package.json
        {
            // 格式为 ES6 模块 没有type字段默认是commonjs
            "type": "module",
            // 入口脚本为./src/index.js，
            "main": "./src/index.js"
        }
    exports字段：
        exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，  
        exports字段的优先级高于main字段。
        exports只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。
            {
                "main": "./main-legacy.cjs",   //老版本nodejs(不支持es6)
                "exports": {
                ".": "./main-modern.cjs"   //(新版本nodejs的入口文件) 优先级比较高。
                }
            }
        （1）子目录别名
             如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。
        （2）main 的别名
            exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，  
        （3）条件加载
        {
            "type": "module",
            "exports": {
            ".": {
                "require": "./main.cjs",  //require 是commonjs主入口
                "default": "./main.js"  //default代表默认其他情况，es6主入口
            }
            }
        }
ES6 模块加载 CommonJS 模块：import字段加载commonjs模块。
        // ./node_modules/pkg/package.json
    {
        "type": "module",
        "main": "./index.cjs",
        "exports": {
        "require": "./index.cjs",
        "default": "./wrapper.mjs"
        }
    }
    import命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。
    使用 Node.js 内置的module.createRequire()方法。

CommonJS 模块加载 ES6 模块    
    CommonJS 的require命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。
    (async () => {  //可以在 CommonJS 模块中运行。
        await import('./my-app.mjs');
    })();
Node.js 的内置模块
    Node.js 的内置模块可以整体加载，也可以加载指定的输出项。
    Node.js 的import命令只支持加载本地模块
    Node 的import命令是异步加载，这一点与浏览器的处理方法相同。对于路径的参数不一样视为不同链接。
循环加载：
    CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。
    CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。

ES6 模块的循环加载
    如果输出export是变量的话，有可能会发生 不期望的结果。因为有可能是因为 变量声明提升，导致的。
    所以最好不要以变量的形式输出，最好是函数。
//异步写法：
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>



/**
 * @description: 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。
 * @param {type} 
 * @return: 
 */
import utils from 'https://example.com/js/utils.js';
const x = 1;
console.log(x === window.x); //false
console.log(this === undefined); // true
const isNotModuleScript = this !== undefined;


/**
 * @description:  如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。
 * @param {type} 
 * @return: 
 */
// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';



/**
 * @description: exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，  
 * @param {type} 
 * @return: 
 */
{
    "exports": {
      ".": "./main.js"    //主入口
    }
}
  
  // 等同于  简写
{
"exports": "./main.js"
}


/**
 * @description: 条件编写
 * @param {type} 
 * @return: 
 */
{
    "type": "module",
    "exports": {
      ".": {
        "require": "./main.cjs",
        "default": "./main.js"
      }
    }
}
//或者
  {
    "exports": {
      "require": "./main.cjs",
      "default": "./main.js"
    }
  }

/**
 * @description: import命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。
 * @param {type} 
 * @return: 
 */
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';


/**
 * @description: 使用 Node.js 内置的module.createRequire()方法。
 * @param {type} 
 * @return: 
 */

 // cjs.cjs
module.exports = 'cjs';

// esm.mjs
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const cjs = require('./cjs.cjs');
cjs === 'cjs'; // true




/**
 * @description:  CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。
 * @param {type} 
 * @return: 
 */

var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法，有可能拿到的是 部分已执行的部分值。

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
