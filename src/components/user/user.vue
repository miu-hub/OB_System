<template>
  <div id="user">
    <!-- 主体 -->
    <div id="user_main">
      <!-- 面包屑模块 -->
      <div id="crumbs">
        <ul id="crumbs_nav">
          <li>首页</li>
          <span>></span>
          <li>素材管理</li>
        </ul>
      </div>

      <!-- 用户表单部分 -->
      <div id="from_user">
        <!-- 左侧表单区 -->
        <div id="from_user_l">
          <!-- 用户编号 -->
          <div id="ids">
            <p>编号 :</p>
            <p>{{ userInfo.id }}</p>
          </div>
          <!-- 用户电话 -->
          <div id="tel">
            <p>电话 :</p>
            <p>{{ getTel }}</p>
          </div>

          <!-- 用户名称 -->
          <div id="media">
            <p>用户名 :</p>
            <input
              type="text"
              placeholder="输入用户名"
              v-model="userInfo.name"
            />
          </div>

          <!-- 头条号介绍 -->
          <div id="media_recomment">
            <p>头条号简介 :</p>
            <textarea
              name=""
              id="media_re"
              cols="30"
              rows="10"
              placeholder="输入头条号简介"
              v-model="userInfo.intro"
            ></textarea>
          </div>

          <!-- 邮箱 -->
          <div id="email">
            <p>邮箱 :</p>
            <input
              type="email"
              placeholder="请输入邮箱"
              v-model="userInfo.email"
            />
          </div>

          <!-- 保存按钮 -->
          <button id="save" @click="edit_userInfo">保存更改</button>
        </div>
        <!-- 右侧头像编辑区 -->
        <div id="from_user_r">
          <!-- 用户头像编辑区 -->
          <div id="user_img">
            <!-- 用户头像 -->
            <img :src="userInfo.photo" alt="用户头像" />
            <label for="files">修改头像</label>
            <input
              id="files"
              ref="files"
              type="file"
              hidden
              @change="updata_photo"
            />
          </div>
        </div>

        <!-- 引入对话框 -->
        <el-dialog
          title="编辑头像"
          :visible.sync="dialogVisible"
          :append-to-body="true"
          width="30%"
        >
          <!-- 预览图片设置 -->
          <img
            :src="pre_img"
            style="width: 90%; height: 300px; margin-left: 50px"
          />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { user_info, edit_user } from "../../apis/user";
export default {
  name: "user",
  data() {
    return {
      // 用户信息
      userInfo: [],
      // 弹窗展示
      dialogVisible: false,
      // 预览图片路径
      pre_img: "",
    };
  },
  created() {
    // 组件加载完成时调用
    this.getUserInfo();
  },

  methods: {
    // 获取用户的信息
    getUserInfo() {
      let tokens = localStorage.getItem("token");
      // 调用获取用户资料的请求
      user_info(tokens)
        .then((data) => {
          let datas = data.data.data;

          // 将返回的用户资料返回给渲染数据
          this.userInfo = datas;

          // 将用户头像传入Vuex
          let uname = this.userInfo.name;

          this.$store.commit("tran", uname);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 编辑用户资料（除头像）
    edit_userInfo() {
      let tokens = localStorage.getItem("token");
      // 调用请求方法
      edit_user(tokens, {
        // 传递请求需要的参数
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email,
      })
        .then((data) => {
          console.log(data);
          // 修改成功提示
          this.$message({
            type: "success",
            message: "保存信息成功!",
          });
          // 刷新页面
          this.getUserInfo();
        })
        .catch((err) => {
          console.log(err);
          // 提示信息
          this.$message({
            type: "warring",
            message: "保存信息失败!",
          });
        });
    },

    // 编辑用户头像
    updata_photo() {
      // 获取img的Dom节点
      const file = this.$refs.files;
      // 节点中的files记录着文件信息
      let img_dom = file.files[0];
      // 使用Html5新增的方法获取图片路径
      const img_url = window.URL.createObjectURL(img_dom);
      // 将图片路径传递给预览渲染模块
      this.pre_img = img_url;
      console.log(img_url);
      // 解决选择图片相同时不触发事件
      this.$refs.files.value = "";
      // 展示图片预览区
      this.dialogVisible = true;
    },
  },
  // 计算属性
  computed: {
    getTel: {
      // 对电话进行替换
      get() {
        let num = this.userInfo.mobile;
        // 判断电话是否为空
        if (num) {
          let num1 = num.substring(0, 3);
          let num2 = num.substring(8, 4);
          let str = "****";
          let tel = num1 + str + num2;
          return tel;
        } else {
          return "";
        }
      },
    },
  },
};
</script>


<style lang="less" scoped>
#user {
  display: flex;
  height: 100%;
  justify-content: center;
  background-color: #ccc;
  padding-top: 20px;
  #user_main {
    width: 90%;
    height: 800px;

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

    // 用户表单部分
    #from_user {
      width: 100%;
      height: 700px;
      background-color: #fff;

      // <!-- 左侧表单区 -->
      #from_user_l {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 50px;
        padding-top: 30px;
        float: left;
        width: 40%;
        height: 700px;

        // <!-- 用户编号 -- >
        #ids {
          width: 500px;
          height: 40px;
          p {
            float: left;
            width: 100px;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            &:nth-child(1) {
              font-weight: 700;
              color: skyblue;
            }
          }
        }
        // 用户电话
        #tel {
          width: 500px;
          height: 40px;
          p {
            float: left;
            width: 100px;
            height: 40px;
            font-size: 20px;
            line-height: 40px;
            &:nth-child(1) {
              font-weight: 700;
              color: skyblue;
            }
          }
        }
        // 用户名称
        #media {
          width: 500px;
          height: 40px;
          p {
            float: left;
            width: 120px;
            height: 40px;
            font-size: 20px;
            line-height: 40px;
            &:nth-child(1) {
              font-weight: 700;
              color: skyblue;
            }
          }
          input {
            width: 380px;
            height: 40px;
            font-size: 20px;
            text-indent: 0.5em;
          }
        }
        // 头条介绍
        #media_recomment {
          width: 500px;
          height: 160px;
          p {
            float: left;
            width: 120px;
            height: 40px;
            font-size: 20px;
            line-height: 40px;
            &:nth-child(1) {
              font-weight: 700;
              font-size: 20px;
              color: skyblue;
            }
          }
          #media_re {
            width: 380px;
            height: 120px;
            resize: none;
            padding: 5px;
          }
        }

        // 邮箱
        #email {
          width: 400px;
          height: 40px;
          p {
            float: left;
            width: 100px;
            height: 40px;
            font-size: 20px;
            line-height: 40px;
            &:nth-child(1) {
              font-weight: 700;
              color: skyblue;
            }
          }
          input {
            width: 300px;
            height: 40px;
            font-size: 20px;
            text-indent: 0.5em;
          }
        }
        // 保存按钮
        #save {
          width: 200px;
          height: 60px;
          background-color: skyblue;
          border: 0;
          margin-left: 200px;
          color: #fff;
          font-size: 25px;
          font-weight: 700;
          cursor: pointer;
        }
      }
      // <!-- 右侧头像编辑区 -->
      #from_user_r {
        position: relative;
        float: left;
        width: 60%;
        height: 100%;
        // 编辑头像区
        #user_img {
          position: absolute;
          top: 100px;
          left: 50%;
          width: 200px;
          height: 240px;
          transform: translateX(-50%);

          img {
            width: 200px;
            height: 200px;
          }

          label {
            position: absolute;
            top: 210px;
            left: 50%;
            width: 100px;
            text-align: center;
            height: 20px;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
</style>