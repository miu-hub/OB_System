<template>
  <div id="cover_one" @click="add_img">
    <img :src="show_img[0]" style="" />

    <el-dialog
      title="选择上传的文件"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="900px"
    >
      <div id="upload">
        <!-- tab栏 -->
        <div id="upload_t">
          <!-- 素材上传 -->
          <div id="sucai" ref="sucai" @click="tab(false)">
            <p>素材库</p>
          </div>
          <!-- 本地上传 -->
          <div id="bendi" ref="ben" @click="tab(true)">
            <p>本地文件</p>
          </div>
        </div>

        <!-- 视图区 -->
        <div id="view" v-if="is_ben">
          <input type="file" ref="fileload" id="flex" @change="onupload" />
          <label for="flex" @click="this.$refs.fileload.click()"
            >点 击 上 传 本 地 文 件</label
          >

          <img src="" ref="pre" />
        </div>

        <!-- 素材视图 -->
        <div id="view" v-else>
          <!-- 素材img功能区 -->
          <div id="crumbs_bottom">
            <!-- 筛选区--上传区 -->
            <div id="coll">
              <!-- 筛选 -->
              <div id="coll_l">
                <div id="all" ref="all" @click="all_matter">
                  <p>全部</p>
                </div>
                <div id="star" ref="star" @click="star_matter">
                  <p>收藏</p>
                </div>
              </div>
            </div>
            <!-- 图片展示区 -->
            <div id="desplay_img">
              <el-table
                v-loading="loading"
                style="position: absolute; width: 100%; height: 140%"
              >
              </el-table>
              <el-col :span="6" v-for="(item, i) in img_matter" :key="i"
                ><el-image
                  style="width: 120px; height: 120px; border: 1px solid #000"
                  :src="item.url"
                  fit="cover"
                  ref="img_list"
                  @click="is_ok = i"
                >
                </el-image>
                <div id="make" v-if="is_ok == i"></div>
              </el-col>
            </div>
            <!-- 分栏区 -->
            <div id="page_number">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page.sync="page"
                @current-change="changPage"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload_show">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { img_matter } from "../../../apis/user_matter";
import { get_matter } from "../../../apis/user_matter";
export default {
  name: "cover",
  data() {
    let user_token = localStorage.getItem("token");
    return {
      // 控制组件显示
      is_img: true,
      // 控制选择弹窗显示隐藏
      dialogVisible: false,
      // 控制本地存储是否显示
      is_ben: false,
      // 封面
      show_img: [],

      // 接收请求返回的响应数据（图片素材）
      img_matter: [],

      // 图片在页面刷新时的初始状态
      is_img_status: false,

      // 页面页码数
      total: 0,
      // loading加载项
      loading: true,
      // 当前页码
      page: 1,
      // 配置请求头
      onheader: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user_token}`,
      },

      is_ok: null, //控制素材框的某个图片序号
    };
  },
  methods: {
    // 弹出选择文件方法的方法
    add_img() {
      // 打开弹窗
      this.dialogVisible = true;
      // 加载获取素材图片方法
      this.getUserMatter();
    },
    // 用户封面展示
    upload_show() {
      let tokens = localStorage.getItem("token");
      if (this.is_ben) {
        // 判断文件是否为空---提示
        if (!this.$refs.fileload.files[0]) {
          this.$message({
            type: "info",
            message: "请选择图片",
          });
          return;
        }

        let od = new FormData();
        od.append("image", this.$refs.fileload.files[0]);
        // 上传图片
        img_matter(tokens, od).then((data) => {
          // console.log(data.data.data.url);
          // 触发总线事件
          this.$bus.$emit("getImg", data.data.data.url);
        });
        // 关闭弹窗
        this.dialogVisible = false;
      } else {
        // 获取点击素材图片的序号
        let indexs = this.is_ok;
        // 判断是否传入一个空白点击
        if (indexs === null) {
          this.$message({
            type: "info",
            message: "请选择图片",
          });
          return;
        }
        // 渲染展示页面
        this.show_img[0] = this.img_matter[indexs].url;
        // 触发总线事件
        this.$bus.$emit("getImg", this.img_matter[indexs].url);
        // 关闭弹窗
        this.dialogVisible = false;
      }
    },

    // 表单触发的事件
    onupload() {
      // 获取文件input的文件信息
      let file = this.$refs.fileload;
      // 节点中的files记录着文件信息
      // 使用Html5新增的方法获取图片路径
      const img_url1 = window.URL.createObjectURL(file.files[0]);
      // 将图片路径传递给预览渲染模块
      this.show_img[0] = img_url1;
      // 更改展示图
      this.$refs.pre.src = this.show_img[0];
    },

    // 切换提交方法
    tab(is) {
      if (is) {
        this.is_ben = true;
        this.$refs.ben.style.backgroundColor = "red";
        this.$refs.sucai.style.backgroundColor = "skyblue";
      } else {
        this.$refs.ben.style.backgroundColor = "skyblue";
        this.$refs.sucai.style.backgroundColor = "red";
        this.is_ben = false;
        this.getUserMatter();
      }
    },

    // 页面当前页码改变时
    changPage() {
      this.is_ok = null;
      // 刷新请求
      this.getUserMatter();
    },

    // 发送请求方法
    getUserMatter() {
      // 开启loading
      this.loading = true;
      let tokens = localStorage.getItem("token");
      get_matter(tokens, {
        // 控制显示全部或者收藏
        collect: this.is_img_status,
        // 请求返回的页数
        page: this.page,
        // 每页返回的图片数量
        per_page: 12,
      })
        .then((data) => {
          // 获取返回的数据
          let datas = data.data.data.results;

          // 将获取的数据传递给data
          this.img_matter = datas;

          // 获取总的返回用户素材图片数
          let total = data.data.data.total_count;

          // 获取用户页面展示数---向上取整
          let i = Math.ceil(total / 12);

          // 将获取的数据传递给data
          this.total = i * 10;
          // 结束loading
          this.loading = false;
          // console.log(datas, i);
        })
        .catch((err) => {
          // 结束loading
          this.loading = false;
          // console.log(err);
        });
    },
    // 点击全部按钮
    all_matter() {
      // 将点击后决定获取的图片类型的参数改变
      this.is_img_status = false;
      // 改变按钮样式
      this.$refs.all.style.backgroundColor = "skyblue";
      this.$refs.star.style.backgroundColor = "rgb(42, 38, 61)";
      // 调用发送请求的方法
      this.getUserMatter();
    },
    // 点击收藏按钮
    star_matter() {
      // 将点击后决定获取的图片类型的参数改变
      this.is_img_status = true;
      // 改变按钮样式
      this.$refs.star.style.backgroundColor = "skyblue";
      this.$refs.all.style.backgroundColor = "rgb(42, 38, 61)";
      // 调用发送请求的方法
      this.getUserMatter();
    },
  },

  beforeDestroy() {
    this.$bus.$off("getImg");
  },

  computed: {
    // 判断循环
    is_num: {
      get() {
        if (this.num < 0) {
          return 0;
        }
        return this.num;
      },
    },
  },
};
</script>

<style lang="less" scoped>
// 图片
#cover_one {
  width: 200px;
  height: 200px;
  cursor: pointer;
  margin-left: 20px;
  border: 1px solid #666;

  img {
    width: 200px;
    height: 200px;
  }
}

#upload {
  width: 700px;
  height: 500px;
  // 头---tap
  #upload_t {
    width: 700px;
    height: 60px;
    // tab选择框
    #sucai,
    #bendi {
      float: left;
      width: 100px;
      height: 60px;
      background-color: red;
      border-bottom: 0px;
      p {
        width: 100px;
        height: 60px;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        font-weight: 700;
        text-align: center;
        line-height: 60px;
      }
    }

    #bendi {
      margin-left: 20px;
      background-color: skyblue;
    }
  }
  // 视图区
  #view {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 860px;
    height: 440px;
    border: 1px solid skyblue;

    // 图片预览
    img {
      width: 200px;
      height: 200px;
      background-color: #fff;
    }

    label {
      text-align: center;
      cursor: pointer;
      width: 200px;
      height: 20px;
      color: #ccc;
      line-height: 20px;

      &:hover {
        color: red;
      }
    }

    // 素材功能区
    #crumbs_bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;

      // 收藏--上传
      #coll {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        height: 100px;

        // 筛选
        #coll_l {
          display: flex;
          align-items: center;
          width: 200px;
          height: 80px;

          // 全部
          #all {
            width: 50%;
            height: 40px;
            border: 1px solid #000;
            border-right: 0px;
            cursor: pointer;
            background-color: skyblue;
            p {
              text-align: center;
              line-height: 40px;
              color: #fff;
            }
          }
          // 收藏
          #star {
            width: 50%;
            height: 40px;
            border: 1px solid #000;
            cursor: pointer;
            background-color: rgb(42, 38, 61);
            p {
              text-align: center;
              line-height: 40px;
              color: #fff;
            }
          }
        }
      }

      // 图片展示区
      #desplay_img {
        position: relative;
        overflow: auto;
        padding: 10px 0px;
        width: 80%;
        height: 500px;
        border-top: 1px solid #666;
        #make {
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 120px;
          background-image: url("./selected.png");
          background-repeat: no-repeat;
          background-size: contain;
        }
        .el-col {
          position: relative;
          border-radius: 4px;
        }
      }

      // 分栏区
      #page_number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        height: 100px;
        border-top: 1px solid #666;
      }
    }
  }
}
</style>