<template>
  <div>
    <Header></Header>
    <!-- 加入路由组件 -->
    <router-view></router-view>
    <!-- Footer组件在登录、注册时隐藏，在其他路由页面显示，上面写法不好因为如果路由路径过多则非常累赘，因此使用vue提供的路由属性meta，自定义添加控制显示隐藏的属性 -->
    <!-- <Footer
      v-show="$route.path == '/home' || $route.path == '/search'"
    ></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
