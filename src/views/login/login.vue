<template>
  <div id="login">
    <transition name="islogin">
      <div id="war_y" v-show="islogin_y"><p>登录成功</p></div>
    </transition>
    <transition name="islogin">
      <div id="war_n" v-show="islogin_n"><p>登录失败</p></div>
    </transition>
    <el-form ref="form" :model="user" id="login_box">
      <div id="log">
        <div id="logo"></div>
        <h1>头条管理系统</h1>
      </div>

      <el-form-item>
        <el-input
          ref="tels"
          v-model="user.mobile"
          placeholder="请输入联系电话"
          @focus="verify_tel_ent"
          @blur="verify_tel_leave"
        ></el-input>
        <p class="tooltip" ref="tel_p">
          {{ info.tel_p }}
        </p>
      </el-form-item>

      <el-form-item>
        <el-input
          ref="codes"
          type="text"
          v-model="user.code"
          placeholder="请输入验证码"
          @focus="verify_code_ent"
          @blur="verify_code_leave"
        ></el-input>
        <p class="tooltip" ref="code_p">{{ info.code_p }}</p>
      </el-form-item>

      <div id="deal">
        <input type="checkbox" id="isOk" v-model="isCheck_deal" />&nbsp;
        <label for="isOk">我已阅读并同意该协议和隐私条款</label>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          id="btn_login"
          :disabled="isbutton"
          >{{ button_status }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

  

<script>
// 使用解构
import { login } from "@/apis/user";
export default {
  name: "login",
  data() {
    return {
      user: {
        // 电话
        mobile: "13911111111",
        // 验证码
        code: "246810",
      },

      // 状态信息
      // 协议选中状态
      isCheck_deal: false,
      // 登录成功状态
      islogin_y: false,
      islogin_n: false,
      // 登录按钮信息
      button_status: "登录",
      // 按钮禁用状态
      isbutton: false,
      // 验证提示信息
      info: {
        tel_p: "",
        code_p: "",
      },
    };
  },

  methods: {
    // 登录的ajax请求方法
    onSubmit() {
      // 表单验证
      let test_tel = this.user.mobile;
      let test_code = this.user.code;
      if (test_tel != "" && test_code != "") {
        if (this.isCheck_deal) {
          // 点击登陆更改按钮状态
          this.isbutton = true;
          this.button_status = "登录中······";
          // 获取表单数据
          // const user = JSON.stringify(this.user);
          // 发送请求------使用apis中的文件
          login(this.user)
            // 成功回调
            .then((data) => {
              let data_user = data.data.data;

              // 通过全局事件总线获取用户token
              // this.$bus.$emit("token_user", data_user);

              // 使用Vuex来传递数据------commit直接联系mutations
              // 将data_user直接返回给Vuex中
              this.$store.commit("user_token", data_user);
              // 提示成功登录状态
              this.islogin_y = true;
              // 提示成功按钮状态
              this.isbutton = false;
              this.button_status = "登录";
              // 点击登录后会跳转到首页
              this.$router.push({
                name: "index",
              });
            })
            // 失败回调
            .catch((err) => {
              console.log("请求失败了" + err);
              // 提示失败登录状态
              this.islogin_n = true;
              // 提示失败按钮状态
              this.button_status = "登录";
              this.isbutton = false;
              alert("账号或验证码错误");
            });

          // 3s后解除登录信息提示
          setTimeout(() => {
            this.islogin_y = false;
            this.islogin_n = false;
          }, 3000);
        } else {
          //未勾选
          alert("请先勾选协议");
          return;
        }
      } else {
        alert("未输入完整信息");
        return;
      }
    },

    // 表单验证方法
    // tel
    // 选中
    verify_tel_ent() {
      if (this.user.mobile == "") {
        this.$refs.tels.$refs.input.style.borderColor = "yellow";
        this.$refs.tel_p.style.color = "yellow";
        this.info.tel_p = "输入电话";
      }
    },
    // 失去
    verify_tel_leave() {
      // 配置电话的正则规则
      let gz = /^1[34578]\d{9}$/;
      let tel = this.user.mobile.trim();
      if (gz.test(tel)) {
        this.$refs.tels.$refs.input.style.borderColor = "green";
        this.$refs.tel_p.style.color = "green";
        this.info.tel_p = "格式正确";
        this.isbutton = false;
      } else if (tel === "") {
        this.info.tel_p = "输入不能为空";
        this.$refs.tels.$refs.input.style.borderColor = "red";
        this.$refs.tel_p.style.color = "red";
        this.user.mobile = "";
      } else {
        this.$refs.tels.$refs.input.style.borderColor = "red";
        this.$refs.tel_p.style.color = "red";
        this.info.tel_p = "！！！输入正确格式的电话";
        this.isbutton = true;
      }
    },

    // code
    // 选中
    verify_code_ent() {
      if (this.user.mobile == "") {
        this.$refs.codes.$refs.input.style.borderColor = "yellow";
        this.$refs.code_p.style.color = "yellow";
        this.info.code_p = "输入验证码";
      }
    },
    // 失去
    verify_code_leave() {
      // 验证码正则规则
      let code_test = /^\d{6}$/;
      // 将用户输入的验证码去除空格
      let code = this.user.code.trim();
      if (code_test.test(code)) {
        this.$refs.codes.$refs.input.style.borderColor = "green";
        this.$refs.code_p.style.color = "green";
        this.info.code_p = "验证码格式正确";
        this.isbutton = false;
      } else if (code === "") {
        this.info.code_p = "输入不能为空";
        this.$refs.codes.$refs.input.style.borderColor = "red";
        this.$refs.code_p.style.color = "red";
        this.user.code = "";
      } else {
        this.$refs.codes.$refs.input.style.borderColor = "red";
        this.$refs.code_p.style.color = "red";
        this.info.code_p = "！！！输入正确格式的验证码";
        this.isbutton = true;
      }
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

  // 登录状态
  #war_y {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
    width: 15%;
    height: 40px;
    background-color: #79ed66;
    font-size: 25px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    border-radius: 5px;
  }

  #war_n {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
    width: 15%;
    height: 40px;
    font-size: 25px;
    background-color: red;
    text-align: center;
    line-height: 40px;
    color: #fff;
    border-radius: 5px;
  }

  @keyframes show {
    0% {
      opacity: 0.1;
      top: 6%;
    }
    100% {
      opacity: 1;
      top: 10%;
    }
  }

  @keyframes show_l {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .islogin-enter-active {
    animation: show 2s;
  }
  .islogin-leave-active {
    animation: show_l 2s;
  }
}
.tooltip {
  width: 100%;
  height: 15px;
  font-weight: 700;
}
</style>