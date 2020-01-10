默认情况下，浏览器是同步加载 JavaScript 脚本

defer与async的区别：异步加载。
    defer是“渲染完再执行”，async是“下载完就执行”。
    defer脚本，会顺序加载，
    async脚本是不能保证加载顺序的。


加载 ES6 模块
    方式一、使用<script>标签，但是要加入type="module"属性。异步加载，等同于defer。会顺序执行。
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