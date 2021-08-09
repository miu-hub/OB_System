<template>
  <div id="user_comment">
    <!-- 评论模块主体 -->
    <div id="comment_main">
      <!-- 面包屑模块 -->
      <div id="crumbs">
        <ul id="crumbs_nav">
          <li>首页</li>
          <span>></span>
          <li>素材管理</li>
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
              <td>状态</td>
              <td>操作</td>
            </tr>
          </thead>
          <!-- 主体 -->
          <tbody>
            <tr>
              <td>123121</td>
              <td>123123123</td>
              <td>1231231</td>
              <td>12313</td>
              <td>123132123</td>
            </tr>
            <tr>
              <td>123121</td>
              <td>123123123</td>
              <td>1231231</td>
              <td>12313</td>
              <td>123132123</td>
            </tr>
            <tr>
              <td>123121</td>
              <td>123123123</td>
              <td>1231231</td>
              <td>12313</td>
              <td>123132123</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
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
              height: 40px;
              line-height: 40px;
              text-align: center;
              border: 1px solid #000;
            }
          }
        }

        tbody {
          width: 100%;
          tr {
            width: 100%;
            height: 40px;
            td {
              padding-left: 20px;
              border: 1px solid #000;
            }
          }
        }
      }
    }
  }
}
</style>