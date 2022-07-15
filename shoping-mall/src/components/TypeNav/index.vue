<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{ categoryList }}</h1> -->
    <div class="container">
      <h2 class="all">全部商品分类</h2>
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
      <div class="sort">
        <div class="all-sort-list2">
          <!-- <div class="item bo">
            <h3>
              <a href="">图书、音像、数字商品</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore">
                  <dt>
                    <a href="">电子书</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="">婚恋/两性</a>
                    </em>
                    <em>
                      <a href="">文学</a>
                    </em>
                    <em>
                      <a href="">经管</a>
                    </em>
                    <em>
                      <a href="">畅读VIP</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div> -->
          <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
            <h3>
              <a href="">{{ c1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <div
                class="subitem"
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a href="">{{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a href="">{{ c3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  // 组件挂载完毕就可以去获取数据了
  mounted() {
    // console.log("this === store", this.$store); // 最新的4.0.2版本的vuex访问不到$store，退回到3.6.2后就有了$store
    this.$store.dispatch("categoryList"); // dispatch的都是actions
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
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
