export let is = {
    isObject: function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
};

export let fastChar = {
    cutEnd: function (str, cutStr) {
        if (str.endsWith(cutStr)) {
            return str.substr(0, str.length - cutStr.length);
        }
        return str;
    },
    cutStart: function (str, cutStr) {
        if (str.startsWith(cutStr)) {
            return str.substr(0 + cutStr.length, str.length);
        }
        return str;
    },
    lStrip: function (str, removeStr) {
        while (removeStr.includes(str[0])) {
            str = str.substr(1, str.length);
        }
        return str;
    },
    rStrip: function (str, removeStr) {
        while (removeStr.includes(str[str.length - 1])) {
            str = str.substr(0, str.length - 1);
        }
        return str;
    },
    strip: function (str, removeStr) {
        return this.rStrip(this.lStrip(str, removeStr), removeStr);
    }
};

export let performance = {
    debounce: function (fn, wait) {
        let timer = 0;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(this, args);
            }, wait);
        }
    },
    throttle: function (fn, wait) {
        let timer = null;
        return function (...args) {
            if (timer) {
                return;
            }
            timer = setTimeout(function () {
                fn.apply(this, args);
                timer = null;
            }, wait);
        }
    }
};

export let copy = {
    clone: function (obj) {
        if (Array.isArray(obj)) {
            return [...obj];
        } else {
            return {...obj};
        }
    },
    deepClone: function (obj) {
        let newObj = Array.isArray(obj) ? [] : {};
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (Array.isArray(obj[i]) || is.isObject(obj[i])) {
                    newObj[i] = this.deepClone(obj[i]);
                } else {
                    newObj[i] = obj[i];
                }
            }
        }
        return newObj;
    }
};

export default {
    id: function (idStr) {
        return document.getElementById(idStr);
    },
    q: function (selector) {
        return document.querySelector(selector);
    },
    qa: function (selector) {
        return document.querySelectorAll(selector);
    },
    style: function (dom, prop) {
        return dom.style[prop] || getComputedStyle(dom)[prop];
    },
    stylePx: function (dom, prop) {
        let val = this.style(dom, prop);
        if (isFinite(val)) {
            return Number(val);
        } else {
            return Number(fastChar.cutEnd(val, "px"));
        }
    },
    getOuterWidth: function (dom) {
        return dom.offsetWidth + this.stylePx(dom, "marginLeft") + this.stylePx(dom, "marginRight");
    },
    getOuterHeight: function (dom) {
        return dom.offsetHeight + this.stylePx(dom, "marginTop") + this.stylePx(dom, "marginBottom");
    },
    width: function (dom, what) {
        return dom.clientWidth - this.stylePx(dom, "paddingLeft") - this.stylePx(dom, "paddingRight");
    },
    height: function (dom, what) {
        return dom.clientHeight - this.stylePx(dom, "paddingTop") - this.stylePx(dom, "paddingBottom");
    }
};
