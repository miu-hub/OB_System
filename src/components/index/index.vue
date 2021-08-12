<template>
  <div class="index_box">
    <!-- <div id="main">
      <p>欢迎使用头条管理系统</p>
    </div> -->
    <div class="block">
      <el-carousel height="700px">
        <el-carousel-item v-for="(item, i) in 4" :key="i">
          <h3 class="small">
            <img src="./sildeshow/04.jpg" v-if="i == 0" width="100%" />
            <img src="./sildeshow/03.jpg" v-if="i == 1" width="100%" />
            <img src="./sildeshow/02.jpg" v-if="i == 2" width="100%" />
            <img src="./sildeshow/01.jpg" v-if="i == 3" width="100%" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style lang="less" scope>
.index_box {
  padding: 5% 5%;
  height: 100%;
  background-color: #000;
  background-image: url("./index_bg.jpg");
  background-size: contain;

  .block {
    width: 100%;
    height: 710px;
    background-color: #fff;

    .small {
      height: 700px;
      border: 10px solid #fff;

      img {
        border-radius: 10px;
      }
    }

    p {
      font-size: 40px;
      font-weight: 700;
      text-align: center;
    }

    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>