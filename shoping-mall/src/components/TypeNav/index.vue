<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{ categoryList }}</h1> -->
    <div class="container">
      <h2 class="all" @mouseenter="enterShow" @mouseleave="leaveShow">
        全部商品分类
      </h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <!-- 利用事件委派 和 编程式导航push|replace -->
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-categoryType1="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-categoryType2="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-categoryType="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash"; // 引入lodash全部的功能

export default {
  name: "TypeNav",
  data() {
    return {
      show: true,
    };
  },
  // 组件挂载完毕就可以去获取数据了
  mounted() {
    // search组件挂载完毕时show为false，可以通过路由判断
    if (this.$route.path != "/home") this.show = false;
  },
  computed: {
    // mapState的作用类似于redux的connect高阶函数，将vuex管理的statemap到当前组件的props中去
    ...mapState({
      // 右侧需要的是一个 函数fucntion，当使用这个计算属性的时候，右侧函数会立即执行一次
      categoryList: (state) => {
        // console.log(state); // 需要在h5中使用该属性，控制台才能打印
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // throttle回调函数不要用箭头函数，可能回头上下文this指向问题
    // changeIndex: throttle(function (index) {
    //   this.currentIndex = index;
    // }, 50),
    goSearch(event) {
      // 需要知道点击的是a标签
      // 需要知道参数
      // 注意a标签的href默认跳转要关了才有下面这些东西
      let element = event.target;
      console.log(element.dataset);
      // 需要当前这个事件节点【h3 a dt dl】，需要带有data-categoryName数据的，节点有个dataset属性 element.dataset
      let { categoryname, categorytype1, categorytype2, categorytype3 } =
        element.dataset; // dataset将属性名默认都改成小写
      if (categoryname) {
        // 能进来说明点击的都是a标签，拿到了绑定的dataset数据
        // 然后进行判断三级标签的内容
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (categorytype1) {
          // 点击三级分类
          query.category1Id = categorytype1;
        } else if (categorytype2) {
          query.category2Id = categorytype2;
        } else if (categorytype3) {
          query.category3Id = categorytype3;
        }
        // 如果路由跳转的时候带有params参数，则也得传递过去，用来将先点分类后搜索两次的参数合并
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location); // 完成路由跳转，只需要配路径参数和query
        }
      }
    },
    enterShow() {
      // 鼠标进入时显示一级列表
      if (this.$route.path != "/home") this.show = true;
    },
    leaveShow() {
      if (this.$route.path != "/home") this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;

                  a:hover {
                    color: skyblue;
                  }
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;

                    a:hover {
                      color: skyblue;
                      // font-weight: larger;
                      // background-color: skyblue;
                    }
                  }
                }
              }
            }
          }

          &:hover {
            background: skyblue;
            cursor: pointer;
            .item-list {
              display: block;
            }
          }
        }
      }
    }

    .sort-enter {
      // 过渡动画开始
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
