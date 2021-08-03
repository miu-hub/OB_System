<template>
  <div class="index_box">
    <div id="main">
      <p>欢迎使用头条管理系统</p>
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
  background-image: url("../index/index_bg.jpg");

  #main {
    width: 100%;
    height: 80%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 10px 10px 5px #666;
    p {
      font-size: 40px;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>