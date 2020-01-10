
// async 函数 : 它就是 Generator 函数的语法糖。
// async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
// async 函数：返回的是promise对象
// 根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。
// 错误处理
// 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
// 顶级await使用场景
    // import() 方法加载
    // 依赖回滚
    // 数据库操作
// 使用注意点：
// 1， 最好把await命令放在try...catch代码块中。
// 2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。可以结合使用promise.all
// 3. await命令只能用在async函数之中，如果用在普通函数，就会报错。
// 4. async 函数可以保留运行堆栈。--- 指抛出外层的调用函数。
// 5.如果加载多个包含顶层await命令的模块，加载命令是同步执行的。

// async函数对 Generator 函数的改进，体现在以下四点。
// （1）内置执行器。
// （2）更好的语义。
// （3）更广的适用性。 Generator后面只能是trunk函数或者Promise函数，await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
// （4）返回值是 Promise。
// 个人总结：使用多个异步执行，使用这个最好了，因为有自动执行步骤，promise又看的不舒服，generator没有自执行的步骤。


/**
 * @description: async 函数 : 它就是 Generator 函数的语法糖。
 * @param {type} 
 * @return: 
 */
//Generator函数
const gen = function* () {
    const f1 = yield readFile('/etc/fstab');
    const f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
//async 函数
const asyncReadFile = async function () {
    const f1 = await readFile('/etc/fstab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};


/**
 * @description: 返回的是promise对象，用法如下：
 * @param {type} 
 * @return: 
 */
async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPrice(symbol);
    return stockPrice;
}
  
getStockPriceByName('goog').then(function (result) {
    console.log(result);
});


/**
 * @description: 第四点，async 函数可以保留运行堆栈。
 * @param {type} 
 * @return: 
 */
//这里错误栈不包含 a,
const a = () => {
    b().then(() => c());
};
//这里错误栈 会包含a。
const a = async () => {
    await b();
    c();
};


/**
 * @description: async实现原理
 * @param {type} 
 * @return: 
 */
async function fn(args) {
    // ...
}
  
  // 等同于
  
function fn(args) {
    return spawn(function* () {
        // ...
    });
}
function spawn(genF) {
    return new Promise(function(resolve, reject) {
      const gen = genF();
      function step(nextF) {
        let next;
        try {
          next = nextF();
        } catch(e) {
          return reject(e);
        }
        if(next.done) {
          return resolve(next.value);
        }
        Promise.resolve(next.value).then(function(v) {
          step(function() { return gen.next(v); });
        }, function(e) {
          step(function() { return gen.throw(e); });
        });
      }
      step(function() { return gen.next(undefined); });
    });
}






/**
 * @description: 错误捕获。最好捕获。
 * @param {type} 
 * @return: 
 */
async function myFunction() {
    try {
      await somethingThatReturnsAPromise();
    } catch (err) {
      console.log(err);
    }
  }
  
  // 另一种写法
  
  async function myFunction() {
    await somethingThatReturnsAPromise()
    .catch(function (err) {
      console.log(err);
    });
  }


  /**
   * @description: 不存在依赖，最好同时触发。
   * @param {type} 
   * @return: 
   */
  let foo = await getFoo();
  let bar = await getBar();

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

/**
 * @description: 三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。
 * 不要用foreach, 要用 for of触发
 * @param {type} 
 * @return: 
 */
// 错误写法：forEach
function dbFuc(db) { //这里不需要 async
    let docs = [{}, {}, {}];
  
    // 可能得到错误结果
    docs.forEach(async function (doc) {
      await db.post(doc);
    });
}
//正确写法  for of
async function dbFuc(db) {
    let docs = [{}, {}, {}];
  
    for (let doc of docs) {
      await db.post(doc);
    }
}


/**
 * @description:  多个一起触发：使用Promise.all好。
 * @param {type} 
 * @return: 
 */
async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));
  
    let results = await Promise.all(promises);
    console.log(results);
}
  
  // 或者使用下面的写法
  
  async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));
  
    let results = [];
    for (let promise of promises) {
      results.push(await promise);
    }
    console.log(results);
  }

/**
 * @description: 顶级await使用场景。
 * @param {type} 
 * @return: 
 */

// awaiting.js
let output;
(async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
export { output };

// awaiting.js
let output;
export default (async function main() {   
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
export { output };
// 使用 确保了promise，输出了。但这个有弊端
import promise, { output } from "./awaiting.js";  

/**
 * @description: 顶级await使用场景
 * // import() 方法加载
 * // 依赖回滚
 * // 数据库操作
 * @param {type} 
 * @return: 
 */
// import() 方法加载
const strings = await import(`/i18n/${navigator.language}`);

// 数据库操作
const connection = await dbConnector();

// 依赖回滚
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}


/**
 * @description: 如果加载多个包含顶层await命令的模块，加载命令是同步执行的。
 * // 输出结果：
// X1, Y, X2, Z
// 并没有等待x.js才去加载y.js
 * @param {type} 
 * @return: 
 */

// x.js
console.log("X1");
await new Promise(r => setTimeout(r, 1000));
console.log("X2");

// y.js
console.log("Y");

// z.js
import "./x.js";
import "./y.js";
console.log("Z");

// 输出结果：
// X1, Y, X2, Z
// 并没有等待x.js才去加载y.js


/**
 * @description:  async 函数与 Promise、Generator 函数的比较
 * @param {type} 
 * 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。
 * 如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。
 * @return: 
 */
//promise写法， 看上去太乱，一眼看不出来是啥
function chainAnimationsPromise(elem, animations) {

    // 变量ret用来保存上一个动画的返回值
    let ret = null;
  
    // 新建一个空的Promise
    let p = Promise.resolve();
  
    // 使用then方法，添加所有动画
    for(let anim of animations) {
      p = p.then(function(val) {
        ret = val;
        return anim(elem);
      });
    }
  
    // 返回一个部署了错误捕捉机制的Promise
    return p.catch(function(e) {
      /* 忽略错误，继续执行 */
    }).then(function() {
      return ret;
    });
  
}
//generator写法，但是这里要写自执行代码
function chainAnimationsGenerator(elem, animations) {

    return spawn(function*() {   //但是这里要写自执行代码
      let ret = null;
      try {
        for(let anim of animations) {
          ret = yield anim(elem);
        }
      } catch(e) {
        /* 忽略错误，继续执行 */
      }
      return ret;
    });
  
}
//async函数写法，简洁清晰。
async function chainAnimationsAsync(elem, animations) {
    let ret = null;
    try {
      for(let anim of animations) {
        ret = await anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
}