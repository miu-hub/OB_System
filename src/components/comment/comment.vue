<template>
  <div id="user_comment">
    <!-- 评论模块主体 -->
    <div id="comment_main">
      <!-- 面包屑模块 -->
      <div id="crumbs">
        <ul id="crumbs_nav">
          <li><router-link to="/">首页</router-link></li>
          <span>></span>
          <li>评论管理</li>
        </ul>
      </div>

      <!-- 表格部分 -->
      <div id="comment_table">
        <table>
          <!-- 头 -->
          <thead>
            <tr>
              <td>标题</td>
              <td>总评论数</td>
              <td>粉丝评论</td>
              <td>评论状态</td>
              <td>操作</td>
            </tr>
          </thead>
          <!-- 主体 -->
          <tbody>
            <tr v-for="(item, i) in comment_data" :key="i">
              <!-- 标题 -->
              <td>{{ item.title }}</td>
              <!-- 总评论数 -->
              <td>{{ item.total_comment_count }}</td>
              <!-- 粉丝评论数 -->
              <td>{{ item.fans_comment_count }}</td>
              <!-- 评论开启状态 -->
              <td>{{ item.comment_status ? "正常评论" : "评论已关闭" }}</td>
              <!-- 开启or关闭评论 -->
              <td>
                <!-- 动态控制按钮的展示内容和样式 -->
                <button
                  :disabled="is_btn"
                  :class="{
                    btn_on: !item.comment_status,
                    btn_off: item.comment_status,
                  }"
                  @click="updata_comment(item.id, item.comment_status)"
                >
                  {{ item.comment_status ? "关闭评论" : "开启评论" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 分页 -->
        <el-pagination
          :disabled="is_btn"
          id="fen"
          @current-change="page_chang"
          :current-page.sync="page"
          background
          layout="prev, pager, next"
          :total="total_page"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { articles } from "../../apis/article";
import { comment_status } from "../../apis/comment";
export default {
  name: "comment",
  data() {
    return {
      // 评论数据
      comment_data: [],

      // 当前页数
      page: 1,

      // 页总数
      total_page: 0,
      // 管理按钮禁用
      is_btn: false,
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    // 获取评论内容方法
    getComment() {
      // 开启按钮禁用
      this.is_btn = true;
      let tokens = localStorage.getItem("token");
      // 请求方法
      articles(tokens, {
        // 传入query参数
        response_type: "comment",
        // 请求第几页的数据
        page: this.page,
      })
        .then((data) => {
          let datas = data.data.data.results;
          // 服务器响应值传递给data中的数据进行渲染
          this.comment_data = datas;

          //  获取文章总数/每页文章数
          let num_page = Math.ceil(data.data.data.total_count / 10);
          // 页数*10 添加到组件上
          this.total_page = num_page * 10;

          // 关闭按钮禁用
          this.is_btn = false;
        })
        .catch((err) => {
          console.log(err);
          // 关闭按钮禁用
          this.is_btn = false;
        });
    },

    // 修改文章评论状态
    updata_comment(id, isStatus) {
      let pl_id = id.toString();
      // 开启按钮禁用
      this.is_btn = true;
      let tokens = localStorage.getItem("token");
      // 将评论状态取反
      let is_allow = !isStatus;
      // 调用更改评论状态的接口-----传入相应的参数
      comment_status(tokens, { allow_comment: is_allow }, { article_id: pl_id })
        .then((data) => {
          // 弹窗
          let is = is_allow ? "开启" : "关闭";
          this.$message({
            type: "success",
            message: `${is}成功`,
          });
          // 关闭按钮禁用
          this.is_btn = false;
          // 刷新列表
          this.getComment();
        })
        .catch((err) => {
          // 关闭按钮禁用
          this.is_btn = false;
          // 弹窗
          let is = is_allow ? "开启" : "关闭";
          this.$message({
            type: "warring",
            message: `${is}失败`,
          });
          console.log(err);
        });
    },
    // 页码改变
    page_chang() {
      this.getComment();
    },
  },
};
</script>
<style lang="less" scoped>
#user_comment {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  // 评论模块主体
  #comment_main {
    width: 96%;
    height: 800px;
    background-color: #fff;
    // 面包屑模块
    #crumbs {
      width: 100%;
      height: 100px;
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

    // 表格部分
    #comment_table {
      overflow: auto;
      width: 100%;
      height: 700px;
      margin-left: 40px;
      padding: 40px 0px;

      table {
        width: 96%;
        border-collapse: collapse;
        thead {
          width: 100%;
          height: 40px;

          tr {
            width: 100%;
            height: 40px;
            td {
              width: 20%;
              height: 80px;
              line-height: 40px;
              text-align: center;
              font-weight: 700;
              color: #fff;
              background-color: rgba(58, 53, 53, 0.527);
              border: 1px solid #000;
            }
          }
        }

        tbody {
          width: 100%;
          tr {
            width: 100%;
            height: 40px;
            &:nth-child(odd) {
              background-color: #fff;
            }

            &:nth-child(even) {
              background-color: rgba(204, 204, 204, 0.582);
            }
            td {
              padding: 20px;
              border: 1px solid #000;
              // 更改评论状态按钮----关闭
              .btn_off {
                width: 150px;
                height: 50px;
                margin-left: 40px;
                font-size: 20px;
                font-weight: 700;
                color: #fff;
                cursor: pointer;
                background-color: rgb(216, 89, 50);
              }
              // 更改评论状态按钮---开启
              .btn_on {
                width: 150px;
                height: 50px;
                margin-left: 40px;
                font-size: 20px;
                font-weight: 700;
                color: #fff;
                cursor: pointer;
                background-color: rgb(132, 236, 132);
              }
            }
          }
        }
      }

      #fen {
        margin: 50px 0px 0px 50%;
      }
    }
  }
}
</style>