<template>
  <div>
    <!-- TypeNav是全局组件，在main.js里引入 -->
    <TypeNav />
    <!-- 下面两个是内部组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank },
};
</script>

<style></style>
