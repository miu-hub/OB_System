<template>
  <div id="consts">
    <!-- 面包屑功能 -->
    <div id="crumbs">
      <!-- 面包屑模块导航栏 -->
      <div id="nav">
        <!-- 可以实现跳转的导航栏 -->
        <ul>
          <li><router-link to="/">首页</router-link></li>
        </ul>
      </div>

      <!-- 表单区域 -->
      <div id="select">
        <!-- 单选筛选审核状态区域 -->
        <div id="radio">
          <p>状态：</p>
          <input type="radio" id="all" name="from" checked /><label for="all"
            >全部</label
          >
          <input type="radio" id="draft " name="from" /><label for="draft "
            >草稿</label
          >
          <input type="radio" id="to_audit" name="from" /><label for="to_audit"
            >待审核</label
          >

          <input type="radio" id="pass" name="from" /><label for="pass"
            >审核通过</label
          >
          <input type="radio" id="err" name="from" /><label for="err"
            >审核失败</label
          >

          <input type="radio" id="del" name="from" /><label for="del"
            >已删除</label
          >
        </div>

        <!-- 筛选时间模块 -->
        <div id="date">
          <!-- 频道下拉菜单 -->
          <div id="channel">
            <!-- 频道设置 -->
            <p>频道：</p>
            <form>
              <select name="bottom_munes" id="bottom_munes">
                <option value="JavaScript">JavaScript</option>
                <option value="jquery">Jquery</option>
                <option value="Node.js">Node.js</option>
                <option value="Html">Html</option>
                <option value="Vue" selected>Vue</option>
                <option value="Webpack">Webpack</option>
                <option value="Ajax">Ajax</option>
                <option value="Css">Css</option>
                <option value="Git">Git</option>
                <option value="GitHub">GitHub</option>
              </select>
            </form>
          </div>

          <!-- 日期设置 -->
          <div id="set_date">
            <p style="margin-left: 0px">日期：</p>

            <!-- 引入eleui时间选择模块 -->
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            >
            </el-date-picker>
            <p>至</p>
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>

        <!-- 查询按钮 -->
        <button id="sumit">查询</button>
      </div>
    </div>

    <!-- 目录部分 -->
    <div id="mulu">
      <!-- 筛选结果总数 -->
      <p>已经过滤筛选出4444件符合条件的文章</p>

      <!-- 表格展示部分 -->
      <table>
        <!-- 头部 -->
        <thead>
          <tr>
            <td>图片</td>
            <td>标题</td>
            <td>状态</td>
            <td>时间</td>
            <td>操作</td>
          </tr>
        </thead>
        <!-- 体 -->
        <tbody>
          <!-- 利用从接口获得的数据进行遍历 -->
          <tr v-for="item in articles" :key="item.id">
            <!-- 图片文件----默认图片 -->
            <td><img src="./780.jpg" alt="" id="img_r" /></td>

            <!-- 文章标题 -->
            <td>{{ item.title }}</td>

            <!-- 处理文章审核状态的展示 -->
            <td>
              <!-- 利用从接口处获得的文件状态码status来确定文章状态 -->
              <div v-if="item.status == 0" class="caogao">草稿</div>
              <div v-else-if="item.status == 3" class="sh_loging">审核中</div>
              <div v-else-if="item.status == 1" class="sh_to">待审核</div>
              <div v-else-if="item.status == 2" class="pass">通过审核</div>
              <div v-else-if="item.status == 4" class="del">已删除</div>
            </td>

            <!-- 文章发布时间 -->
            <td>{{ item.pubdate }}</td>

            <!-- 文章的编辑删除模块 -->
            <td>
              <button id="edit_btn">编辑</button>
              <button id="del_btn">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 模块底部跳转页功能----eleui -->
      <div id="yema">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { articles } from "../../apis/article";
// 引入专门处理文章相关的请求方法
export default {
  name: "const",
  data() {
    return {
      // 文章信息------从接口方法中获得
      articles: [],
      // 时间参数
      value1: "",
      value2: "",
    };
  },

  created() {
    // 在组件加载完成时触发请求方法
    this.articles_updata();
  },

  methods: {
    // 请求文章信息方法
    articles_updata() {
      // 从本地获取用户令牌
      let tokens = localStorage.getItem("token");

      // 调用请求方法---将用户令牌传递
      articles(tokens)
        .then((data) => {
          // console.log(data.data.data.results);
          // 获取成功请求返回的数据并赋值给data中的数据
          this.articles = data.data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang='less' scoped>
// 主体
#consts {
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  padding-top: 20px;
  background-color: #ccc;
  // 面包屑模块
  #crumbs {
    width: 90%;
    height: 320px;
    background-color: #fff;

    #nav {
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #666;

      ul {
        padding-left: 20px;
        display: flex;
        justify-content: left;
        li {
          width: 10%;
          height: 80px;
          line-height: 80px;
          a {
            color: #000;
          }
        }
      }
    }

    // 下拉模块
    #select {
      width: 100%;
      height: 240px;
      background-color: #fff;
      padding-left: 40px;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      // 单选文章筛选状态
      #radio {
        width: 60%;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;

        input {
          margin-left: 10px;
          margin-right: 5px;
        }
      }
      // 时间筛选模块
      #date {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 120px;

        #channel {
          display: flex;
          align-items: center;

          #bottom_munes {
            width: 120px;
            height: 30px;
            text-indent: 2em;
            margin-left: 10px;
          }
        }

        // 时间筛选
        #set_date {
          display: flex;
          justify-content: left;
          align-items: center;
          p {
            margin: 0 10px;
          }
        }
      }

      // 查询按钮
      #sumit {
        width: 80px;
        height: 40px;
        margin-left: 60px;
        border-radius: 5px;
        background-color: skyblue;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        font-weight: 700;
      }
    }
  }

  // mulu------展示区
  #mulu {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    width: 90%;
    height: 480px;
    margin-top: 10px;
    background-color: #fff;

    p {
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 20px;
      font-weight: 700;
      font-family: "KaiTi";
      margin-left: 20px;
    }

    // 展示表格
    table {
      width: 90%;
      border: 1px solid #ccc;
      border-collapse: collapse;
      // 头
      thead {
        height: 40px;
        background-color: #fff;
        td {
          text-align: center;
        }
      }
      // 体
      tbody {
        width: 100%;
        border-top: 1px solid #ccc;
        td {
          padding-left: 20px;
          height: 180px;
          text-align: center;
          border: 1px solid #ccc;

          // 文章审核状态样式
          .caogao,
          .sh_loging,
          .pass,
          .del,
          .sh_to {
            width: 100px;
            height: 40px;
            color: #fff;
            line-height: 40px;
            margin-left: 10px;
            font-weight: 700;
          }

          .caogao {
            background-color: yellow;
          }

          .pass {
            background-color: rgb(126, 241, 116);
          }

          .sh_loging {
            background-color: rgb(207, 178, 46);
          }

          .del {
            background-color: red;
          }
          .sh_to {
            background-color: rgb(74, 35, 216);
          }

          // 编辑-删除按钮样式
          #edit_btn,
          #del_btn {
            width: 50px;
            height: 50px;
            outline: 0;
            border: 0px;
            color: #fff;
            font-weight: 700;
            border-radius: 50%;
          }

          #edit_btn {
            background-color: skyblue;
          }
          #del_btn {
            margin-left: 10px;
            background-color: red;
          }
        }
      }
    }

    // 跳转页码
    #yema {
      margin: 20px 0px;
    }
  }
  // 文章配图样式
  #img_r {
    width: 100px;
    height: 100px;
  }
}
</style>