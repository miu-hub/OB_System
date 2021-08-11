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
            <input
              maxlength="30"
              minlength="5"
              type="text"
              id="public_title"
              placeholder="请输入标题"
              v-model="info.title"
            />
          </div>
          <!-- 内容 -->
          <div id="content">
            <p>文章内容：</p>
            <!-- 利用富文本编辑器完成 -->
            <el-tiptap
              v-model="info.content"
              width="80%"
              height="400px"
              :extensions="extensions"
              lang="zh"
            />
          </div>
          <!-- 封面 -->
          <div id="cover">
            <!-- 单选案例 -->
            <div id="public_cover">
              <!-- 封面 -->
              <p>封面</p>
              <input
                type="radio"
                id="one"
                v-model="info.cover.type"
                :value="1"
                name="_cover"
              /><label for="one">单图</label>
              <input
                type="radio"
                id="three"
                v-model="info.cover.type"
                :value="3"
                name="_cover"
              /><label for="three">三图</label>
              <input
                type="radio"
                id="no_w"
                v-model="info.cover.type"
                :value="0"
                name="_cover"
              /><label for="no_w">无图</label>
              <input
                type="radio"
                id="auto"
                v-model="info.cover.type"
                :value="-1"
                name="_cover"
              /><label for="auto">自动</label>
            </div>
            <!-- 封面图 -->
            <Cover :num="info.cover.type" />
          </div>
          <!-- 活动区域 -->
          <div id="activity">
            <p>频道：</p>
            <div id="public_activity">
              <select name="" id="channel" v-model="info.channel_id">
                <option value="">请选择</option>
                <option v-for="(item, i) in article" :key="i" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- button提交 -->
          <div id="btn">
            <button
              id="commit_channel"
              @click="request(false)"
              :disabled="is_button"
            >
              发布文章
            </button>
            <button
              id="commit_draft"
              @click="request(true)"
              :disabled="is_button"
            >
              存草稿
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cover from "./component/cover.vue";
import {
  //实例
  ElementTiptap,
  // 需要的 extensions-----功能项
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Image,
  ListItem,
  BulletList,
  OrderedList,
} from "element-tiptap";
// 请求方法
import {
  public_article,
  channel,
  id_article,
  edit_article,
} from "../../apis/article";
import { user_img } from "../../apis/user_matter";
export default {
  name: "issue",
  // 注册el-tiptap组件接收
  components: {
    "el-tiptap": ElementTiptap,
    Cover: cover,
  },
  data() {
    return {
      // 存储文章的信息
      article: [],

      // 提交按钮禁用状态
      is_button: false,

      // 提交请求的数据
      info: {
        // 文章频道状态
        channel_id: "",

        // img图片状态
        cover: { type: "1", images: [] },

        // 标题
        title: "",
        // 富文本
        content: "",
      },

      // ele-tiptap数据
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new Image({
          // images的配置---uploadRequest接收一个参数，即用户使用的图片信息
          uploadRequest(flie) {
            let tokens = localStorage.getItem("token");

            // 使用FormData后不用添加content-type，并且将image以对象键值的方法添加到data
            let data = new FormData();
            data.append("image", flie);
            // 使用user_img请求·---这里返回promies对象-----必须
            return user_img(tokens, data).then((data) => {
              let url = data.data.data.url;
              // 返回返回数据中的图片路径------必须
              return url;
            });
          },
        }),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
    };
  },

  created() {
    // 组件构建完成后加载请求频道模块
    this.get_article();
    // 判断是否有路径参数值
    if (this.$route.query.id) {
      // 将id传入获取方法
      this.put_article(this.$route.query.id);
    }
  },

  methods: {
    // 请求方法------将文章数据提交
    request(isCaoGao) {
      // 开启禁用状态
      this.is_button = true;
      // 获取用户令牌
      let tokens = localStorage.getItem("token");

      // 数据长度-----去除空格
      let title_length = this.info.title.trim().length;
      let content_length = this.info.content.trim().length;
      // let cover_length = this.info.cover.type.trim().length;
      // let id_length = this.info.channel_id;
      // 判断数据长度是否符合规范
      if (
        title_length >= 5 &&
        title_length <= 30 &&
        content_length > 0
        // cover_length > 0 &&
        // id_length > 0
      ) {
        // 修改的请求情况下
        if (this.$route.query.id) {
          let id = this.$route.query.id;
          // 调用更改文章的接口
          edit_article(tokens, id, this.info, isCaoGao)
            .then((data) => {
              alert("编辑成功");
              // 修改完成后跳转内容区
              // 关闭禁用状态
              this.is_button = false;
              this.$router.push("/conest");
            })
            .catch((err) => {
              console.log(err);
              // 关闭禁用状态
              this.is_button = false;
            });
        }
        // 非修改只发布
        else {
          // 调用发送文章的请求
          // 有三个参数------tokens即为用户令牌：用于验证-----this.info接口规定的发布文章的数据--以body形式发送
          // isCaoGao即为是否存草稿-----query传递
          console.log(isCaoGao);
          public_article(tokens, this.info, isCaoGao)
            .then((data) => {
              // 返回状态码并返回文章id
              console.log(data.data.data.id.toString());
              // 关闭禁用状态
              this.is_button = false;
              console.log("发布成功");
              this.$router.push("/conest");
            })
            .catch((err) => {
              console.log("出错了" + err);
              // 关闭禁用状态
              this.is_button = false;
            });
        }
      } else {
        alert("所有项必填");
        // 关闭禁用状态
        this.is_button = false;
        // 重置数据
        this.info.title = "";
        this.info.content = "";
      }
    },

    // 获取文章信息
    get_article() {
      // 从本地获取用户令牌
      let tokens = localStorage.getItem("token");
      // 调用文章获取方法
      channel(tokens).then((data) => {
        let arr = data.data.data.channels;
        // 向数据中添加一个一个自定义全部数据及id
        // id为空时筛选全部频道数据
        arr.push({ name: "全部", id: undefined });
        // 交给vue来渲染
        this.article = arr;
      });
    },

    // 修改文章信息
    put_article(id) {
      // 从本地获取用户令牌
      let tokens = localStorage.getItem("token");
      // 调用获取用户id的方法
      id_article(tokens, id)
        .then((data) => {
          let datas = data.data.data;
          //  将获取的用户文章数据给到info对象重新渲染
          this.info = datas;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
            color: #000;
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