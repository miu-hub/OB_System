<template>
  <div id="root">
    <!-- 左侧导航 -->
    <div id="side_nav">
      <!-- logo -->
      <div id="side_logo">
        <div id="logo"></div>
        <p>头条管理系统</p>
      </div>

      <!-- 分类组件 -->
      <ul>
        <li v-for="(item, i) in to" :key="i" @click="updata_style(i)">
          <router-link :to="'/' + to[i]"
            ><i :class="['iconfont', 'icon-' + class_icon[i]]"></i>&nbsp;{{
              text[i]
            }}</router-link
          >
        </li>
      </ul>
    </div>

    <!-- 右侧导航栏 -->
    <div id="side_nav_r">
      <!-- 头部导航 -->
      <div id="header_nav">
        <!-- 公司信息 -->
        <div id="firm">
          <i class="iconfont icon-zhedie"></i>
          &nbsp;
          <p>ABC公司制作的头条管理系统</p>
        </div>

        <!-- 用户信息区 -->
        <div id="user_info">
          <div id="head_port"></div>
          &nbsp;&nbsp;
          <p>未登录</p>
          &nbsp;&nbsp;
          <i class="iconfont icon-linecar105"></i>
        </div>
      </div>

      <!-- 主体 -->
      <div id="main">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      to: ["", "conest", "matter", "issue", "comment", "fans", "user"],
      class_icon: [
        "shouye",
        "rizhimingxi",
        "icon_huabanfuben",
        "tubiao-",
        "pinglun",
        "weibiaoti-",
        "shezhi",
      ],
      text: [
        "首页",
        "内容管理",
        "素材管理",
        "发布文章",
        "评论管理",
        "粉丝管理",
        "个人设置",
      ],
    };
  },
  methods: {
    updata_style(i) {
      console.log(i);
    },
  },
};
</script>

<style lang="less" scoped>
#root {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  // 左侧
  #side_nav {
    float: left;
    width: 16%;
    height: 100%;
    background-color: rgb(29, 17, 63);

    // logo
    #side_logo {
      display: flex;
      width: 100%;
      height: 15%;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #fff;

      #logo {
        width: 80px;
        height: 80px;
        background-image: url("./head_logo.png");
        background-size: contain;
        background-repeat: no-repeat;
      }

      p {
        color: #fff;
        font-size: 25px;
        font-weight: 700;
        width: 180px;
        height: 50px;
        line-height: 50px;
      }
    }

    ul {
      margin-top: 10px;
      width: 100%;
      height: 90%;

      li {
        width: 100%;
        height: 10%;
        line-height: 88px;
        font-size: 18px;
        cursor: pointer;
        a {
          display: block;
          padding-left: 10%;
          width: 100%;
          height: 100%;
          color: #fff;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
          a {
            color: yellow;
          }
        }
      }
    }
  }

  // 右侧
  #side_nav_r {
    float: left;
    width: 84%;
    height: 100%;

    // 右侧头部
    #header_nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 15%;
      background-color: #fff;
      border-bottom: 1px solid #666;

      // 公司信息
      #firm {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 40%;

        i {
          font-size: 26px;
          font-weight: 700;
        }

        p {
          color: rgb(29, 17, 63);
          font-size: 26px;
          font-weight: 700;
        }
      }

      // 用户信息
      #user_info {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15%;
        height: 60%;

        // 用户头像
        #head_port {
          width: 50px;
          height: 50px;
          cursor: pointer;
          background-color: #666;
          background-image: url("../index/user_header.jpg");
          background-repeat: no-repeat;
          background-size: cover;
        }

        // 下拉用户信息
        i,
        p {
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }
      }
    }

    // 展示区
    #main {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>