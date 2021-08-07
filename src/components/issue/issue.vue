<template>
  <!--发布文章模块-->
  <div id="issue">
    <!-- 发布文章主题部分 -->
    <div id="main_issue">
      <!-- 面包屑模块 -->
      <div id="crumbs">
        <ul id="crumbs_nav">
          <li>首页</li>
          <span>></span>
          <li>发布文章</li>
        </ul>
      </div>

      <!-- 发布文章主体 -->
      <div id="public">
        <!-- 主体 -->
        <div id="public_main">
          <!-- 标题 -->
          <div id="title">
            <p>标题：</p>
            <!-- 标题输入框 -->
            <input type="text" id="public_title" />
          </div>
          <!-- 内容 -->
          <div id="content">
            <p>文章内容：</p>
            <textarea
              name=""
              id="public_content"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <!-- 封面 -->
          <div id="cover">
            <!-- 单选案例 -->
            <div id="public_cover">
              <!-- 封面 -->
              <p>封面</p>
              <input type="radio" id="one" name="_cover" /><label for="one"
                >单图</label
              >
              <input type="radio" id="three" name="_cover" /><label for="three"
                >三图</label
              >
              <input type="radio" id="no_w" name="_cover" /><label for="no_w"
                >无图</label
              >
              <input type="radio" id="auto" name="_cover" /><label for="auto"
                >自动</label
              >
            </div>
            <!-- 封面图 -->
            <div id="img"></div>
          </div>
          <!-- 活动区域 -->
          <div id="activity">
            <p>频道：</p>
            <div id="public_activity">
              <select name="" id="channel">
                <option value="">未选择</option>
              </select>
            </div>
          </div>
          <!-- button提交 -->
          <div id="btn">
            <button id="commit_channel">发布文章</button>
            <button id="commit_draft">存草稿</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "issue",
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
#issue {
  display: flex;
  justify-content: center;
  align-items: top;
  width: 100%;
  height: 100%;
  background-color: #ccc;

  // 主题部分
  #main_issue {
    width: 90%;
    height: 84%;
    margin: 10px;
    background-color: #fff;

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
    // 发布文章模块
    #public {
      width: 100%;
      height: 720px;
      overflow: auto;
      background-color: #fff;
      // 主体
      #public_main {
        display: flex;
        flex-direction: column;
        align-items: center;
        // 标题模块
        #title {
          padding-left: 60px;
          display: flex;
          align-items: center;
          width: 90%;
          height: 150px;
          // 标题
          p {
            height: 25px;
            color: skyblue;
            font-size: 20px;
          }
          // 标题输入
          #public_title {
            width: 60%;
            height: 60px;
            text-indent: 0.5em;
            font-size: 24px;
            color: #ccc;
          }
        }
        // 内容
        #content {
          padding-left: 20px;
          display: flex;
          align-items: center;
          width: 90%;
          height: 500px;
          border-top: 1px solid #ccc;
          // 文章内容
          p {
            height: 30px;
            color: skyblue;
            font-size: 20px;
          }
          // 文章内容输入
          #public_content {
            padding: 10px 10px;
            width: 80%;
            height: 400px;
            font-size: 24px;
            color: #ccc;
            // 禁止拖拽
            resize: none;
          }
        }
        // 封面
        #cover {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          width: 90%;
          height: 450px;
          border-top: 1px solid #ccc;

          // 封面选择
          #public_cover {
            display: flex;
            align-items: center;
            width: 80%;
            height: 100px;
            // 禁止拖拽
            resize: none;

            // 封面标题
            p {
              height: 30px;
              color: skyblue;
              font-size: 20px;
            }
            // 单选表单
            input {
              margin-left: 20px;
              margin-right: 5px;
              font-size: 15px;
              font-weight: 700;
            }
          }
          // 上传图片
          #img {
            width: 80%;
            margin-left: 90px;
            height: 300px;
            background-color: #ccc;
          }
        }
        // 活动区域
        #activity {
          padding-left: 20px;
          display: flex;
          align-items: center;
          border-top: 1px solid #ccc;
          width: 90%;
          height: 120px;

          // 文章内容
          p {
            height: 30px;
            color: skyblue;
            font-size: 20px;
            margin-right: 30px;
          }
          // 文章内容输入
          #public_activity {
            width: 20%;
            height: 40px;
            background-color: #000;
            // 下拉选择框
            #channel {
              width: 100%;
              height: 100%;
              padding-left: 20px;
            }
          }
        }

        // button提交
        #btn {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 90%;
          height: 80px;
          border-top: 1px solid #ccc;

          // 提交按钮
          #commit_channel,
          #commit_draft {
            width: 120px;
            height: 60px;
            font-weight: 700;
            color: #fff;
            border: 0;
            cursor: pointer;
            font-size: 20px;
            background-color: skyblue;
          }
        }
      }
    }
  }
}
</style>