

**三种声明方式，第三种es5会报错**
match()、replace()、search()和split()，从string原型 都定义在RegExp对象上了。

**的 u修饰符** ：用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。

    （1）点字符
    对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
    （2）Unicode 字符表示法
    大括号+u修饰符 表示 Unicode 字符，否则会被解读为量词。
    （3）量词
    使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。
    （4）预定义模式
     u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符。
     （5）i 修饰符
     有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。
     （6）转义
     没有u修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在u模式会报错。
    RegExp.prototype.unicode 属性:正则实例对象新增unicode属性，表示是否设置了u修饰符。

**y 修饰符**：叫做“粘连”（sticky）修饰符。从示例解释吧。
- :y修饰符号隐含了头部匹配的标志^。
- 实际是--头部匹配的标志^在全局匹配中都有效。
- RegExp.prototype.sticky 属性
- 与y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符。

**RegExp.prototype.flags 属性**： 新增了flags属性，会返回正则表达式的修饰符。      -source属性是 正文


**s 修饰符：dotAll 模式** 对.字符更好对补充，比如可以匹配换行。

**后行断言**
    ?= :先行断言，必须要等于?=后面的。
    ?!= :先行不断言。
    ?<= :后行断言。
    ?<!=: 后行不断言。
    “后行断言”的实现，需要先匹配/(?<=y)x/的x，然后再回到左边，匹配y的部分。（先右后左）  -- todo..


**具名组匹配**： （?<组名>）
  - 允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
  - 具名组匹配的解构赋值和替换
    - $<组名>引用具名组。
    - 变量赋值。
    - 具名组匹配，replace函数的应用。

**引用**   todo...

**String.prototype.matchAll()**   todo...
    可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。
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
/\u{61}/u.test('a') // true  -- 有大括号的，要加上u修饰符否则识别为量词。
/\u{20BB7}/u.test('𠮷') // true




/**   量词
 * @description: 量词-- 他会正确识别 码点大于0xFFFF的 Unicode 字符。
 * @param {type} 
 * @return: 
 */
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false  
/𠮷{2}/u.test('𠮷𠮷') // true  -- 大于oxffff，会正确识别



/**
 * @description: 
 * @param {type} 
 * @return: 
 */
//\S是预定义模式，加上u修饰符才可以匹配 大于xffff的字符。
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true

/**
 * @description: 匹配正常长度的。
 * @param {type} 
 * @return: 
 */
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2

/**
 * @description: （5）i 修饰符 如果没有加上u修饰符，不能正确识别 非规范的 K。
 * @param {type} 
 * @return: 
 */
/[a-z]/i.test('\u212A') // false   没有加上u修饰符，不能识别 分规范的K.
/[a-z]/iu.test('\u212A') // true



/**
 * @description: 非转义的加了斜杠，在u字符修饰下，会报错。
 * @param {type} 
 * @return: 
 */
/\,/ // /\,/
/\,/u // 报错


/**
 * @description: 实例：新增的 unicode属性
 * @param {type} 
 * @return: 
 */
const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true

/**
 * @description:Y修饰符 叫做“粘连”（sticky）修饰符。
 * @param {type} 
 * @return: 
 */

var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]  从剩余的匹配就行
r2.exec(s) // null   从剩余的当中，必须是第一个位置开始匹配，所以匹配不成功。

/**
 * @description: 实际上，y修饰符号隐含了头部匹配的标志^。
 * @param {type} 
 * @return: 
 */
/b/y.exec('aba')  //不是从头匹配，所以没有成功
// null



/**
 * @description: y修饰符的应用， 避免漏掉非法字符，提取词元。
 * @param {type} 
 * @return: 
 */

const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4')
// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4')
// [ '3', '+', '4' ]

function tokenize(TOKEN_REGEX, str) {
  let result = [];
  let match;
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1]);
  }
  return result;
}
tokenize(TOKEN_Y, '3x + 4')   //y修饰符正确识别
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')   //g修饰符不能正确识别非法字符。
// [ '3', '+', '4' ]

/**
 * @description: flags属性。返回修饰符
 * @param {type} 
 * @return: 
 */
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'


/**
 * @description:  \s 修饰符-- ，是.字符的补充，可以匹配任何字符，包括换行，回车等。
 * @param {type} 
 * @return: 
 */
const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'


/**
 * @description: 后行断言。
 * @param {type} 
 * @return: 
 */
//先行断言
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]  括号内也不计入。
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
 //后行断言
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]

//非预期结果。。 todo..

/(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
/^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]

//-- todo
/(?<=(o)d\1)r/.exec('hodor')  // null
/(?<=\1d(o))r/.exec('hodor')  // ["r", "o"]


/**
 * @description: 具名匹配  （?<组名>）
 * @param {type} 
 * @return: 
 */
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31



/**
 * @description: 具名组匹配的解构赋值和替换
 * @param {type} 
 * @return: 
 */
// 变量赋值
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar

// 使用$<组名>引用具名组。
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'


// 具名组匹配，replace函数的应用。
'2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = groups;
 return `${day}/${month}/${year}`;
});
