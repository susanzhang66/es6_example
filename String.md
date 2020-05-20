
## 字符的 Unicode 表示法  -- 增加unicode双字节表示法。
6中表示法
```javascript
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true     新增，unicode双字节

'\u{1F680}' === '\uD83D\uDE80'  //true;
```
## 字符串的遍历器接口   (for of )  可以遍历识别大于0xFFFF的码点

```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```
直接输入 U+2028 和 U+2029   -- todo
## JSON.stringify() 的改造    优化JSON.parse()吧。

## **模板字符串:** （${}：里面就是执行js代码。）
- 所有的空格和缩进都会被保留在输出之中。（使用trim方法消除)。-- 可以换行。不需要用 join('')来
- 变量名写在${}。
- ${}可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性，还有引用函数。
- ${}大括号中的值不是字符串，将按照一般的规则转为字符串。
- **模板字符串可以嵌套**

## **标签模板**：它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
- 标签模板里面，可以内嵌其他语言
- 标签模板的另一个应用，就是多语言转换（国际化处理）。
```javascript
/**
 * @description: 标签模板  -- 即函数后面跟着一字符串。
 * @param {type} 
 * @return: 
 */
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

//调用：
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

message
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
```

**模板字符串的限制**  -- todo


```javascript
/**
 * @description: 
 * @param {type} 
 * @return: 
 */

/**
 * @description: 所有的空格和缩进都会被保留在输出之中。-- 很方便的换行
 * @param {type} 
 * @return: 
 */
//以前写法：
var text = (
    'cat\n' +
    'dog\n' +
    'nickelodeon'
    );
// 或者
var text = [
    'cat',
    'dog',
    'nickelodeon'
    ].join('\n');

//现在写法：
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);
/**
 * @description: ${}可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性，还有引用函数。
 * @param {type} 
 * @return: 
 */
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

// ----------------------- 引用函数
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar


/**
 * @description: 模版字符串 可以嵌套。
 * @param {type} 
 * @return: 
 */
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
//使用方式：
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));

/**
 * @description: 执行时在用模板写成函数。
 * @param {type} 
 * @return: 
 */
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"



/**
 * @description: 标签模板---
 * @param {type} 
 * @return: 
 */
alert`hello`
// 等同于
alert(['hello'])

//优先处理 函数参数
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);



/**
 * @description: 标签模板应用--- 多语言转换
 * @param {type} 
 * @return: 
 */
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"



/**
 * @description: 标签模板  -- 即函数后面跟着一字符串。
 * @param {type} 
 * @return: 
 */
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

//调用：
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

message
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>

/**
 * @description: 嵌入了其他语言。
 * @param {type} 
 * @return: 
 */
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`