<template>
  <div id="matter">
    <!-- 素材主体部分 -->
    <div id="matter_main">
      <!-- 面包屑模块 -->
      <div id="crumbs">
        <ul id="crumbs_nav">
          <li>首页</li>
          <span>></span>
          <li>素材管理</li>
        </ul>
      </div>
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

          <!-- 上传 -->
          <div id="coll_r">
            <el-upload
              class="upload-demo"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :headers="onheader"
              name="image"
              :on-success="success"
              :on-error="err"
              list-type="picture"
            >
              <el-button
                size="small"
                type="primary"
                style="width: 100px; hight: 50px"
                >点击上传</el-button
              >
            </el-upload>
          </div>
        </div>
        <!-- 图片展示区 -->
        <div id="desplay_img" style="position: relative">
          <el-table
            v-loading="loading"
            style="position: absolute; width: 100%; height: 140%"
          >
          </el-table>
          <el-col
            :lg="6"
            :md="8"
            :sm="12"
            :xs="24"
            v-for="(item, i) in img_matter"
            :key="i"
            ><el-image
              style="width: 240px; height: 200px"
              :src="item.url"
              fit="cover"
            >
            </el-image>
            <div id="icon">
              <!-- 收藏 -->
              <i
                :class="{
                  'el-icon-star-off': !item.is_collected,
                  'el-icon-star-on': item.is_collected,
                }"
                @click="star(item.id, item.is_collected, item.isLoading)"
              ></i>
              <!-- 删除 -->
              <i class="el-icon-delete" @click="del(item.id)"></i>
            </div>
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
</template>

<script>
import { get_matter, star_matter, del_matter } from "../../apis/user_matter";
export default {
  name: "matter",
  data() {
    let user_token = localStorage.getItem("token");
    return {
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
    };
  },
  created() {
    // 刷新调用请求方法
    this.getUserMatter();
  },
  methods: {
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
          console.log(err);
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
    // 页面当前页码改变时
    changPage() {
      // 刷新请求
      this.getUserMatter();
    },
    // 上传成功
    success() {
      this.$alert("上传文件成功", "提示", {
        confirmButtonText: "OK",
        callback: () => {
          this.$message({
            type: "info",
            message: `上传成功`,
          });
        },
      });
    },
    // 上传失败
    err() {
      this.$alert("上传图片失败", "不知名失败", {
        confirmButtonText: "OK",
        callback: () => {
          this.$message({
            type: "warning",
            message: `上传失败`,
          });
        },
      });
    },
    // 收藏与取消收藏
    star(id, isStar) {
      // 开启loading
      this.loading = true;
      let user_token = localStorage.getItem("token");
      star_matter(user_token, id, { collect: !isStar })
        .then((data) => {
          // console.log(data);
          // 关闭loading
          this.loading = false;
          // 收藏提示
          if (!isStar) {
            this.$message({
              type: "success",
              message: "收藏成功",
            });
          } else {
            this.$message({
              type: "success",
              message: "取消收藏成功",
            });
          }

          // 取消或收藏成功
          this.getUserMatter();
        })
        .catch((err) => {
          // 关闭loading
          this.loading = false;
          console.log(err);
        });
    },
    // 删除图片素材
    del(id) {
      let user_token = localStorage.getItem("teken");
      del_matter(user_token, id)
        .then((data) => {
          console.log(data);
          this.$message({
            type: "success",
            message: "删除成功",
          });
          // 删除后刷新页面
          this.getUserMatter();
        })
        .catch((err) => {
          this.$message({
            type: "warning",
            message: "删除失败",
          });
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
#matter {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  background-color: #ccc;

  // 素材主体
  #matter_main {
    width: 90%;
    height: 84%;
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

    // 素材功能区
    #crumbs_bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 710px;

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
        // 上传
        #coll_r {
          width: 100px;
          height: 50px;
          .upload-demo {
            margin-top: 10px;
          }
        }
      }

      // 图片展示区
      #desplay_img {
        overflow: auto;
        padding: 10px 0px;
        width: 80%;
        height: 500px;
        border-top: 1px solid #666;

        .el-col {
          position: relative;
          border-radius: 4px;
          // 收藏删除图标
          #icon {
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: absolute;
            bottom: 0px;
            width: 240px;
            height: 60px;
            background-color: rgba(0, 0, 0, 0.3);
            // 收藏和删除按钮
            .el-icon-delete,
            .el-icon-star-off,
            .el-icon-star-on {
              font-size: 24px;
              color: #fff;
              font-weight: 700;
            }
          }
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