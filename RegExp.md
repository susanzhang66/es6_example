<!--
 * @Author: your name
 * @Date: 2020-01-17 16:33:58
 * @LastEditTime: 2020-01-17 16:38:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /miniProgram/Users/rainbow/Documents/工作/前端/learn/es6/RegExp.md
 -->
**三种声明方式，第三种es5会报错**
match()、replace()、search()和split()，从string原型 都定义在RegExp对象上了。


```javascript
第一种：
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

第二种：
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

第三种：es5不支持。
var regex = new RegExp(/xyz/, 'i');
new RegExp(/abc/ig, 'i').flags // 以后面的参数为准，。输出i.
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

