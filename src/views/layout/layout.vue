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
      <!-- 遍历导航路由 -->
      <ul>
        <!-- 绑定点击触发的样式类 -->
        <!-- 使用绑定样式类来导入字体图标和文字/路由路径 -->
        <li
          :class="{ li_click: item.isclick }"
          v-for="(item, i) in rout"
          :key="i"
          @click="updata_style(i)"
        >
          <router-link :to="'/' + item.to"
            ><i :class="['iconfont', 'icon-' + item.class_icon]"></i>&nbsp;{{
              item.text
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
          <!-- 跳转方法 -->
          <p @click="push">未登录</p>
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
      // 导航栏的详细配置
      // to：路由路径
      // class_icon---所需的字体图标
      // text----展示的文字内容
      // isclick----决定点击后li的样式
      rout: [
        { to: "", class_icon: "shouye", text: "首页", isclick: false },
        {
          to: "conest",
          class_icon: "rizhimingxi",
          text: "内容管理",
          isclick: false,
        },
        {
          to: "matter",
          class_icon: "icon_huabanfuben",
          text: "素材管理",
          isclick: false,
        },
        {
          to: "issue",
          class_icon: "tubiao-",
          text: "发布文章",
          isclick: false,
        },
        {
          to: "comment",
          class_icon: "pinglun",
          text: "评论管理",
          isclick: false,
        },
        {
          to: "fans",
          class_icon: "weibiaoti-",
          text: "粉丝管理",
          isclick: false,
        },
        {
          to: "user",
          class_icon: "shezhi",
          text: "个人设置",
          isclick: false,
        },
      ],
    };
  },

  methods: {
    // 鼠标点击路由导航
    updata_style(i) {
      //i------获取的点击到元素的序号
      const rout = this.rout;

      // 使用foreach方法来遍历路由信息-----利用排他案例来改变除点击元素的样式
      rout.forEach((item) => {
        item.isclick = false;
      });

      // 点击的元素的样式状态改变
      rout[i].isclick = true;
    },

    // 跳转方法----在未登录状态下跳转至登录页
    push() {
      this.$router.push({
        name: "login",
      });
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
      // 路由导航
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
        // 鼠标经过
        &:hover {
          a {
            color: yellow;
          }
        }
      }

      // 路由点击的样式
      .li_click {
        background-color: rgba(0, 0, 0, 0.3);
        a {
          color: red;
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
          border: 1px solid #666;
          border-radius: 50%;
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