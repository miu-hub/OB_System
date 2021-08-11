<template>
  <!-- 上传主页 -->
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
        ref="files_upload"
        id="flex"
        @change="onupload"
        multiple
        hidden
      />
      <label for="flex" @click="this.$refs.files_upload.click()"
        >点 击 上 传 本 地 文 件</label
      >
      <div>
        <!-- v-for="(item, i) in is_num" :key="i"  -->
        <img :src="img" />
      </div>
    </div>

    <div id="view" v-else></div>
  </div>
</template>

<script>
export default {
  name: "upload",
  props: ["is_num"],
  data() {
    return {
      // 控制本地存储是否显示
      is_ben: true,

      img: "",
    };
  },

  methods: {
    onupload() {
      // 获取文件input的文件信息
      let file = this.$refs.files_upload;
      // 节点中的files记录着文件信息
      let img_dom = file.files;
      console.log(img_dom);
      // 使用Html5新增的方法获取图片路径
      const img_url = window.URL.createObjectURL(img_dom);
      // 将图片路径传递给预览渲染模块
      this.img = img_url;
      console.log(is_num);
      // 触发总线事件
      this.$bus.$emit("getImg", this.img);
    },
  },
};
</script>

<style lang="less" scoped>
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

    div {
      display: flex;
      width: 600px;
      height: 200px;
      background-color: #000;
      // 图片预览
      img {
        width: 200px;
        height: 200px;
        background-color: #fff;
      }
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