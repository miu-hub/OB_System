<template>
  <!-- 封面图区 -->
  <div id="img" v-if="is_img">
    <div id="cover_one" v-for="(item, i) in is_num" :key="i" @click="add_img">
      <img :src="show_img[i]" />
    </div>

    <el-dialog
      title="选择上传的文件"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="900px"
    >
      <Upload :num="is_num" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload_show">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import upload from "./upload/upload.vue";
export default {
  name: "cover",
  props: ["num"],
  components: {
    Upload: upload,
  },
  data() {
    return {
      // 控制组件显示
      is_img: true,
      // 控制选择弹窗显示隐藏
      dialogVisible: false,

      // 展示区图片路径
      show_img: "./img_demo.jpg",
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
    },
  },

  mounted() {
    // 获取上传组件的图片路径
    this.$bus.$on("getImg", (url) => {
      console.log(url);
      this.show_img = url;
    });
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
// 上传图片
#img {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 80%;
  margin-left: 90px;
  height: 300px;
  // 图片
  #cover_one {
    width: 200px;
    height: 200px;
    margin-left: 20px;
    border: 1px solid #ccc;
    cursor: pointer;

    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>