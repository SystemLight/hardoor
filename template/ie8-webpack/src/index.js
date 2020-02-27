// 兼容IE8: 特殊引入define-property到全局，其它polyfill均无需手动导入，babel会自动导入
import 'core-js/stable/object/define-property';

import foo from "./foo";

let app = document.getElementById("root");

let h1 = document.createElement("h1");
h1.innerText = foo.title;

let p = document.createElement("p");
p.innerText = foo.author;

// append方法不支持，没有对应的polyfill，使用appendChild
app.appendChild(h1);
app.appendChild(p);

// 测试babel是否已经自动按需导入Promise polyfill
new Promise(function (resolve) {
    setTimeout(function () {
        resolve("Hello IE8");
    }, 2000);
}).then((result) => {
    h1.innerText = String(result);
});
