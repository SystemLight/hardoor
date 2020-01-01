# 项目名称

** 项目说明 **
特别注意，这是一个原始react的webpack配置项目，它缺少基本的Basic_items，
请将Basic_items中的public和src引入到根目录中


## 技术栈

#### 托管平台

- [x] github

#### 服务器

- [x] ubuntu18
    - [x] nginx

#### 数据库

- [x] mysql5

#### 后端

- [x] python3.5
    - [x] tornado6.3

#### 前端

- [x] JQuery3.3
- [x] bootstrap4


## 项目功能实现

- [x] 1.增加数据
- [x] 2.删除数据
- [ ] 3.修改数据
- [ ] 4.查询数据


## 参考资料

#### 1. 关于pages.config.js

- 简述

```
`pages.config.js` 是一个webpack页面配置项，暂时还未实现完全动态化，目前你至少需要把你的页面名称写到pages参数中
如果你只有一个页面：pages可以直接写成index，它对应你的src下的index.js文件，同时生成index.html
多个文件情况下，你可以将pages设置为["index","about"]
如果你的文件配置具有个性化内容，你可以写成[{pageName:"index",其它个性参数},{pageName:"about",其它个性参数}]
这只是简单的讲解，实际上多页面情况涉及到代码拆分问题，需要进行chunks参数设置，同时要设置splitChunks
具体怎么设置，这里不再提及，请参考更详细的说明
```

- 个性参数

```
{
    title: '页面标题',
    keywords: "页面关键字",
    description: "页面描述",
    iconPath: "./favicon.ico",
    style: "页面全局style",
    pageName: "index",//页面名称
    template: "./draft/template.html",//页面模板
    chunks: []//打入页面的chunks，与splitChunks参数配置有关
}
```

- chunks

```
与webpack原始的chunks略有不同，你只需要写公共chunks名称就好，默认会把当前页面chunks包含进去
```

#### 2. 生产模式和开发模式

```
注意：为了不使打包出现未知错误，请在pages.config.js修改workEnv参数，指定当前环境
开发模式下切记不要设置workEnv:production，会给webpack造成困扰
```

#### 3. 注意事项

```
图片导入建议使用，require("图片路径")
esModule默认被设置false，如果想启用请在webpack.config.js中设置
```