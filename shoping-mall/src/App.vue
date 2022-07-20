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
  mounted() {
    // 把放入store仓库的操作放在app入口中，后续直接从store仓库中获取，就不用每次mount TypeNav组件时再拉取一遍又一遍了
    // console.log("this === store", this.$store); // 最新的4.0.2版本的vuex访问不到$store，退回到3.6.2后就有了$store
    this.$store.dispatch("categoryList"); // dispatch的都是actions
  },
};
</script>

<style></style>
