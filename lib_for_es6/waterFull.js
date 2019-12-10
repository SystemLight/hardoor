let WaterFull = (function () {
    let obj = function (selector, opt) {
        this.opt = Object.assign({
            waterItemMargin: "margin: 15px;",
            waterItemWidth: "width: 100px;"
        }, opt);
        this.waterContainer = document.querySelector(selector);
        this.waterItem = this.waterContainer.querySelectorAll(".waterfall-item");
        this.setStyle();
        this.initWaterItem();
        this.windowTimer = null;
    };
    obj.prototype = {
        getOuterWidth: function (item) {
            return this.getOuter(item, "w");
        },
        getOuterHeight: function (item) {
            return this.getOuter(item, "h");
        },
        getOuter: function (item, what) {
            let whatContent = {
                "w": ["marginLeft", "marginRight", "offsetWidth"],
                "h": ["marginTop", "marginBottom", "offsetHeight"],
            };
            let wc = whatContent[what];
            let itemMT = item.style[wc[0]];
            let itemMB = item.style[wc[1]];
            itemMT = parseInt(itemMT.substr(0, itemMT.length - 2));
            itemMB = parseInt(itemMB.substr(0, itemMB.length - 2));
            return itemMT + item[wc[2]] + itemMB;
        },
        setItemLayout: function (item, colCount, colHeightArray, nowWaterItemWidth) {
            let minValue = colHeightArray[0];
            let minIndex = 0;
            for (let i = 0; i < colCount; i++) {
                if (colHeightArray[i] < minValue) {
                    minValue = colHeightArray[i];
                    minIndex = i
                }
            }
            item.style.left = minIndex * nowWaterItemWidth + "px";
            item.style.top = minValue + "px";
            return [minIndex, this.getOuterHeight(item)];
        },
        resetLayout: function () {
            let nowWaterItemWidth = this.getOuterWidth(this.waterItem[0]);
            let colCount = Math.floor(this.waterContainer.clientWidth / this.getOuterWidth(this.waterItem[0]));
            let colHeightArray = (new Array(colCount)).fill(0);
            this.waterItem.forEach(item => {
                let value = this.setItemLayout(item, colCount, colHeightArray, nowWaterItemWidth);
                colHeightArray[value[0]] += value[1];
            });
        },
        setStyle: function () {
            this.waterContainer.style.cssText = "position: relative;";
            this.waterItem.forEach(item => {
                item.style.cssText = "position: absolute;left: 0;top: 0;transition: all .6s;"
                    + this.opt.waterItemMargin + this.opt.waterItemWidth;
            });
        },
        windowResizeCallback: function () {
            if (!this.windowTimer) {
                this.windowTimer = setTimeout(() => {
                    this.resetLayout();
                    this.windowTimer = null;
                }, 500);
            }
        },
        windowResize: function (toggle) {
            if (toggle) {
                window.addEventListener("resize", this.windowResizeCallback.bind(this));
            } else {
                window.removeEventListener("resize", this.windowResizeCallback);
            }
        },
        initWaterItem: function () {
            let that = this;
            let nowWaterItemWidth = this.getOuterWidth(this.waterItem[0]);
            let colCount = Math.floor(this.waterContainer.clientWidth / nowWaterItemWidth);
            let colHeightArray = (new Array(colCount)).fill(0);
            this.resetLayout(colCount, colHeightArray);
            this.waterItem.forEach(item => {
                if (item.toString() === "[object HTMLImageElement]") {
                    item.addEventListener("load", function () {
                        let value = that.setItemLayout(this, colCount, colHeightArray, nowWaterItemWidth);
                        colHeightArray[value[0]] += value[1];
                    });
                }
            });
        }
    };

    return obj;
})();