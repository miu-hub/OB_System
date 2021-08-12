<template>
  <div id="fans_root">
    <div id="fans">
      <!-- 面包屑模块 -->
      <div id="crumbs">
        <ul id="crumbs_nav">
          <li><router-link to="/">首页</router-link></li>
          <span>></span>
          <li>粉丝管理</li>
        </ul>
      </div>

      <!-- 粉丝管理主体 -->
      <div id="fens_main">
        <!-- 顶部 -->
        <div id="fens_t">
          <!-- 粉丝列表 -->
          <div id="fens_list">
            <p @click="list" ref="list">粉丝列表</p>
          </div>

          <!-- 粉丝画像 -->
          <div id="fens_photo">
            <p @click="img" ref="fen_i">粉丝画像</p>
          </div>
        </div>
        <!-- 展示区 -->
        <div id="fens_bottom">
          <!-- // 粉丝数据展示 -->
          <div id="fes_data" v-for="(item, i) in fensInfo" :key="i">
            <!-- 头像 -->
            <div id="fen_photo">
              <img :src="item.photo" v-if="item.photo" />
              <img src="./demo1.jpg" v-else />
            </div>
            <!-- 名称 -->
            <p>{{ item.name }}</p>
            <!-- 关注 -->
            <button id="attention">+&nbsp; 关注</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fens_data } from "../../apis/fens";
export default {
  name: "fans",
  data() {
    return {
      // 用户粉丝的信息
      fensInfo: [],
    };
  },
  created() {
    this.getUserFensInfo();
  },
  methods: {
    // 请求粉丝数据方法
    getUserFensInfo() {
      let tokens = localStorage.getItem("token");
      fens_data(tokens, {
        per_page: 20,
        page: 1,
      })
        .then((data) => {
          let datas = data.data.data;
          // console.log(datas.results);
          this.fensInfo = datas.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击列表
    list() {
      this.$refs.list.style.backgroundColor = "red";
      this.$refs.fen_i.style.backgroundColor = "skyblue";
      this.getUserFensInfo();
    },
    // 点击画像
    img() {
      this.$refs.fen_i.style.backgroundColor = "red";
      this.$refs.list.style.backgroundColor = "skyblue";
    },
  },
};
</script>

<style lang="less" scoped>
#fans_root {
  display: flex;
  justify-content: center;
  background-color: #ccc;
  padding-top: 20px;
  height: 100%;
  // 粉丝管理主页
  #fans {
    width: 96%;
    height: 800px;
    background-color: #fff;
    min-width: 500px;

    // 面包屑模块
    #crumbs {
      width: 100%;
      height: 100px;
      background-color: #fff;
      border-bottom: 1px solid #666;

      #crumbs_nav {
        width: 40%;
        height: 100%;
        padding-left: 20px;
        span {
          float: left;
          margin-top: 40px;
        }
        li {
          float: left;
          height: 100px;
          color: #000;
          font-size: 20px;
          padding: 0px 10px;
          line-height: 100px;
        }
      }
    }

    // 粉丝管理主体
    #fens_main {
      overflow: auto;
      width: 100%;
      height: 700px;
      // 展示框的顶部
      #fens_t {
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 100px;
        background-color: #fff;
        // 粉丝列表
        #fens_list,
        #fens_photo {
          width: 100px;
          height: 50px;
          margin-left: 30px;
          background-color: skyblue;
          p {
            width: 100px;
            height: 50px;
            color: #fff;
            cursor: pointer;
            font-weight: 700;
            text-align: center;
            line-height: 50px;
          }
        }
        // 列表
        #fens_list {
          background-color: red;
        }
      }

      // 展示区
      #fens_bottom {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        width: 100%;
        // 粉丝数据展示
        #fes_data {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;
          align-items: center;
          width: 180px;
          height: 240px;
          border: 1px solid #ccc;
          margin: 10px;
          // 头像
          #fen_photo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 1px solid #ccc;
            img {
              width: 120px;
              height: 120px;
            }
          }
          // 名称
          p {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-weight: 700;
            font-size: 20px;
            text-align: center;
          }
          // 关注按钮
          #attention {
            width: 100px;
            height: 40px;
            cursor: pointer;
            border: 1px solid #000;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>