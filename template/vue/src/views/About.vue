<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>

<script>
    import {http} from "@/store/action/action";

    http.get("/").then(result => {
        console.log("[About组件] 代理请求数据测试：", result);
    });

    export default {
        name: "About"
    }
</script>
