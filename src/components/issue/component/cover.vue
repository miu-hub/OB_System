<template>
  <div id="cover_one" @click="add_img">
    <img :src="show_img[0]" />

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
          <div id="sucai">
            <p>素材库</p>
          </div>
          <!-- 本地上传 -->
          <div id="bendi">
            <p>本地文件</p>
          </div>
        </div>

        <!-- 视图区 -->
        <div id="view" v-if="is_ben">
          <input
            type="file"
            ref="fileload"
            id="flex"
            @change="onupload"
            multiple
          />
          <label for="flex" @click="this.$refs.fileload.click()"
            >点 击 上 传 本 地 文 件</label
          >

          <img src="" ref="pre" />
        </div>

        <div id="view" v-else></div>
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
export default {
  name: "cover",
  props: ["num"],
  components: {
    // Upload: upload,
  },
  data() {
    return {
      // 控制组件显示
      is_img: true,
      // 控制选择弹窗显示隐藏
      dialogVisible: false,
      // 控制本地存储是否显示
      is_ben: true,

      show_img: [],
    };
  },
  methods: {
    // 弹出选择文件方法的方法
    add_img() {
      this.dialogVisible = true;
    },
    // 用户封面展示
    upload_show() {
      this.dialogVisible = false;
      let tokens = localStorage.getItem("token");
      let od = new FormData();
      od.append("image", this.$refs.fileload.files[0]);
      img_matter(tokens, od).then((data) => {
        console.log(data.data.data.url);
        // 触发总线事件
        this.$bus.$emit("getImg", data.data.data.url);
      });
    },

    onupload() {
      // 获取文件input的文件信息
      let file = this.$refs.fileload;
      // 节点中的files记录着文件信息
      // 使用Html5新增的方法获取图片路径
      const img_url1 = window.URL.createObjectURL(file.files[0]);
      // 将图片路径传递给预览渲染模块
      this.show_img[0] = img_url1;
      this.$refs.pre.src = this.show_img[0];

      const img_url2 = window.URL.createObjectURL(file.files[1]);
      const img_url3 = window.URL.createObjectURL(file.files[2]);

      this.show_img[1] = img_url2;
      this.show_img[2] = img_url3;
      console.log(this.show_img);
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
  margin-left: 20px;
  border: 1px solid #fff;
  cursor: pointer;
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
  }
}
</style>