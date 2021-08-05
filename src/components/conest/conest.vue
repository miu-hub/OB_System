<template>
  <div id="consts">
    <div id="crumbs">
      <div id="nav">
        <ul>
          <li>首页</li>
          <li>内容筛选</li>
        </ul>
      </div>
      <div id="select"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "const",
};
</script>

<style lang='less' scoped>
#consts {
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  padding-top: 20px;
  background-color: #ccc;

  #crumbs {
    width: 90%;
    height: 300px;
    background-color: #666;

    #nav {
      width: 100%;
      height: 80px;
    }

    #select {
      width: 100%;
      height: 220px;
      background-color: blue;
    }
  }
}
</style>