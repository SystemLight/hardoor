export let tool = {
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
    getOuter: function (dom, what) {
        let whatContent = {
            "w": ["marginLeft", "marginRight", "offsetWidth"],
            "h": ["marginTop", "marginBottom", "offsetHeight"],
        };
        let wc = whatContent[what];
        let itemMT = dom.style[wc[0]] || getComputedStyle(dom)[wc[0]];
        let itemMB = dom.style[wc[1]] || getComputedStyle(dom)[wc[1]];
        itemMT = parseInt(itemMT.substr(0, itemMT.length - 2));
        itemMB = parseInt(itemMB.substr(0, itemMB.length - 2));
        return itemMT + dom[wc[2]] + itemMB;
    }
};