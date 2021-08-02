<template>
  <div id="login">
    <el-form ref="form" :model="user" id="login_box">
      <div id="log">
        <div id="logo"></div>
        <h1>头条管理系统</h1>
      </div>

      <el-form-item>
        <el-input v-model="user.tel" placeholder="请输入联系电话"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          type="text"
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>

      <div id="deal">
        <input type="checkbox" id="isOk" v-model="isCheck_deal" />&nbsp;
        <label for="isOk">我已阅读并同意该协议和隐私条款</label>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" id="btn_login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

  

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        tel: "",
        code: "",
      },
      isCheck_deal: false,
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: url("./R-C.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  #login_box {
    padding: 50px 75px 10px 75px;
    background-color: #fff;
    min-width: 500px;
    border-radius: 5px;
    // 头条字样
    #log {
      width: 100%;
      height: 75px;
      line-height: 75px;
      // logo图
      #logo {
        float: left;
        width: 30%;
        height: 100%;
        background-image: url("./samantha-600x315.jpg");
        background-repeat: no-repeat;
        background-position: 0 -18px;
        background-size: cover;
        background-color: #666;
      }

      h1 {
        float: left;
        width: 70%;
        margin-bottom: 20px;
      }
    }
    // 协议
    #deal {
      width: 100%;
      margin-bottom: 15px;
    }

    // 登录按钮
    #btn_login {
      width: 100%;
    }
  }
}
</style>