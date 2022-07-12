# ShopMall-n-ManageSystem

该仓库为Vue学习记录，完成后应包含两个vue项目
1.一个前台电商项目：shoping-mall
2.一个后台管理系统：<待添加>

### Notes：笔记总结

1.
public文件夹存放静态资源（如图片等），webpack在打包时会原封不动的将其打包到dist文件夹中。

src中的assets也是存放静态资源（一般放置多个组件共用的静态资源），webpack在打包时，会把这些静态资源当做一个模块，打包进JS文件夹里

components文件夹里放的通常都是静态非路由组件 | 全局组件
pages | views 文件夹里面放的才是路由组件

router文件夹里放的是配置的路由

2.
App.vue为项目根组件，main.js为入口文件，babel.config是关于babel配置的，package.json记录整个项目的配置信息（身份证信息），package-lock.json记录曾经的依赖都从哪来，是一个缓存性文件

3.
package.json 运行项目后面配置 `--open` 可以直接在启动项目后打开

4.
关闭eslint校验工具，因为他会在奇奇怪怪的地方校验，导致编码过程中频繁报错（比如声明变量但未使用则会报错）
关闭方法：项目根目录下创建名为 `vue.config.js` 的文件，切记，每次更改完这个文件需要重启项目才会生效

5.
后续项目在频繁引入各种相对路径时，会频繁使用如 `../../../` 的引入方式，因此，可以给src文件起别名，直接用别名开始从顶层目录开始向下寻找引用，比如将src命名为@
方法：项目根目录下创建名为 `jsconfig.json` 的文件，写进path，自行查看吧，现在最新的脚手架自动配置好了

6.
可以简单理解为：有几个页面就需要几个路由组件，路由组件就是key value，key为路由url，value为对应的路由组件

7.
项目中采用less样式，浏览器不识别less文件的样式，需要通过less、less-loader进行处理，转化为css浏览器才能识别，最新版本可能会有问题，可以用@5安装5版本
方法：npm install --save less less-loader，然后在style标签中加伤attr为 `lang="less"` 这样才能正常识别，style标签中的scoped属性意思为当前样式只为当前组件生效，实现了样式的模块化