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
            <div id="all"><p>全部</p></div>
            <div id="star"><p>收藏</p></div>
          </div>

          <!-- 上传 -->
          <div id="coll_r">
            <button id="uploading">上传图片</button>
          </div>
        </div>
        <!-- 图片展示区 -->
        <div id="desplay_img"></div>
        <!-- 分栏区 -->
        <div id="page_number">
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "matter",
  data() {
    return {};
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
            background-color: rgb(42, 38, 61);
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
          // 上传按钮
          #uploading {
            width: 100%;
            height: 100%;
            border: 0;
            cursor: pointer;
            font-size: 20px;
            font-weight: 700;
            color: #fff;
            background-color: skyblue;
          }
        }
      }

      // 图片展示区
      #desplay_img {
        width: 80%;
        height: 500px;
        border-top: 1px solid #666;
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