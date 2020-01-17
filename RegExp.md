<!--
 * @Author: your name
 * @Date: 2020-01-17 16:33:58
 * @LastEditTime: 2020-01-17 18:20:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /miniProgram/Users/rainbow/Documents/工作/前端/learn/es6/RegExp.md
 -->

**三种声明方式，第三种es5会报错**
match()、replace()、search()和split()，从string原型 都定义在RegExp对象上了。

**的 u修饰符**

    （1）点字符
    对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
    （2）Unicode 字符表示法
    大括号+u修饰符 表示 Unicode 字符，否则会被解读为量词。
    （3）量词
    使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。
```javascript
// 第一种：
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

// 第二种：
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

// 第三种：es5不支持。
var regex = new RegExp(/xyz/, 'i');
new RegExp(/abc/ig, 'i').flags // 以后面的参数为准，。输出i.
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

/**
 * @description: 对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
 * @param {type} 
 * @return: 
 */
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true


/**
 * @description: 大括号+u修饰符 表示 Unicode 字符，否则会被解读为量词。
 * @param {type} 
 * @return: 
 */
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true




/**
 * @description: 量词-- 他会正确识别 码点大于0xFFFF的 Unicode 字符。
 * @param {type} 
 * @return: 
 */
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true

