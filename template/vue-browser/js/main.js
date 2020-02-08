let app = new Vue({
    el: "#main",
    data: function () {
        return {
            view: "Hello vue"
        };
    },
    methods: {
        changeView() {
            this.view = new Date().toLocaleString();
        },
        restoreView() {
            this.view = "Hello vue";
        }
    }
});