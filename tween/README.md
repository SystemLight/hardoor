# sTween.js

sTween是一个超级轻量级的补间动画。

## Installation

```
npm install stween
```

## Usage

```
let div = document.getElementsByTagName("div")[0];

LsTween.setTransform(div, "translateY", 0);
LsTween({
    el: div,
    duration: 200,
    attr: {
        width: 1000,
        translateY: 300
    }
});
```

## 设置特殊css属性

```
LsTween.setTransform(dom, 属性名, 当前值);
```

## 缓动函数

```
LsTween({
    el: div,
    fx: "easeOut",
    attr: {
        width: 1000,
    }
});

可使用的：
linear
easeIn
easeOut
easeBoth
easeInStrong
easeOutStrong
easeBothStrong
elasticIn
elasticOut
elasticBoth
backIn
backOut
backBoth
bounceIn
bounceOut
bounceBoth
```