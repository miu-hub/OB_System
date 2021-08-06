<template>
  <div id="consts">
    <!-- 面包屑功能 -->
    <div id="crumbs">
      <!-- 面包屑模块导航栏 -->
      <div id="nav">
        <!-- 可以实现跳转的导航栏 -->
        <ul>
          <li><router-link to="/">首页</router-link></li>
        </ul>
      </div>

      <!-- 表单区域 -->
      <div id="select">
        <!-- 单选筛选审核状态区域 -->
        <div id="radio">
          <p>状态：</p>
          <input
            type="radio"
            id="all"
            name="from"
            checked
            :value="null"
            v-model="from_status"
          /><label for="all">全部</label>
          <input
            type="radio"
            id="draft "
            name="from"
            :value="0"
            v-model="from_status"
          /><label for="draft ">草稿</label>
          <input
            type="radio"
            id="to_audit"
            name="from"
            :value="1"
            v-model="from_status"
          /><label for="to_audit">待审核</label>

          <input
            type="radio"
            id="pass"
            name="from"
            :value="2"
            v-model="from_status"
          /><label for="pass">审核通过</label>
          <input
            type="radio"
            id="err"
            name="from"
            :value="3"
            v-model="from_status"
          /><label for="err">审核失败</label>

          <input
            type="radio"
            id="del"
            name="from"
            :value="4"
            v-model="from_status"
          /><label for="del">已删除</label>
        </div>

        <!-- 筛选时间模块 -->
        <div id="date">
          <!-- 频道下拉菜单 -->
          <div id="channel">
            <!-- 频道设置 -->
            <p>频道：</p>
            <form>
              <!-- 绑定频道id -->
              <select
                v-model="channl_status"
                name="bottom_munes"
                id="bottom_munes"
              >
                <option
                  v-for="item in channel_info"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </form>
          </div>

          <!-- 日期设置 -->
          <div id="set_date">
            <p style="margin-left: 0px">日期：</p>

            <!-- 引入eleui时间选择模块 -->
            <!-- value-format="yyyy-MM-dd"eleui中更改绑定数据格式
             format="yyyy-MM-dd"eleui中更改输入格式 -->
            <el-date-picker
              v-model="value1"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            >
            </el-date-picker>
          </div>
        </div>

        <!-- 查询按钮 -->
        <button id="sumit" @click="commit_btn">查询</button>
      </div>
    </div>

    <!-- 目录部分 -->
    <div id="mulu">
      <!-- 加载响应模块 -->
      <div id="loading" v-show="is_load">
        <p>loader..........</p>
      </div>
      <div id="show">
        <!-- 筛选结果总数 -->
        <p>已经过滤筛选出{{ total_count }}件符合条件的文章</p>

        <!-- 表格展示部分 -->
        <table>
          <!-- 头部 -->
          <thead>
            <tr>
              <td>图片</td>
              <td>标题</td>
              <td>状态</td>
              <td>时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <!-- 体 -->
          <tbody>
            <!-- 利用从接口获得的数据进行遍历 -->
            <tr v-for="(item, i) in articles" :key="i" v-show="is_no_data">
              <td>
                <img
                  :src="item.cover.images[0]"
                  alt=""
                  id="img_r"
                  v-if="item.cover.images[0]"
                />

                <!-- 图片文件----默认图片 -->
                <img v-else src="./780.jpg" alt="" id="img_r" />
              </td>

              <!-- 文章标题 -->
              <td class="wen_title">{{ item.title }}</td>

              <!-- 处理文章审核状态的展示 -->
              <td class="status">
                <!-- 利用从接口处获得的文件状态码status来确定文章状态 -->
                <div v-if="item.status == 0" class="caogao">草稿</div>
                <div v-else-if="item.status == 3" class="sh_loging">审核中</div>
                <div v-else-if="item.status == 1" class="sh_to">待审核</div>
                <div v-else-if="item.status == 2" class="pass">通过审核</div>
                <div v-else-if="item.status == 4" class="del">已删除</div>
              </td>

              <!-- 文章发布时间 -->
              <td>{{ item.pubdate }}</td>

              <!-- 文章的编辑删除模块 -->
              <td>
                <button id="edit_btn" @click="edit_btn(item.id)">编辑</button>
                <button id="del_btn" @click="del_btn(item.id)">删除</button>
              </td>
            </tr>

            <tr v-show="!is_no_data">
              <td>暂无数据</td>
              <td>暂无数据</td>
              <td>暂无数据</td>
              <td>暂无数据</td>
              <td>暂无数据</td>
            </tr>
          </tbody>
        </table>
        <!-- 模块底部跳转页功能----eleui -->
        <!-- @current-change----当前页码发生改变时触发 -->
        <!-- total_count文章总数 -->
        <!-- :disabled="is_load"请求期间禁止导航按钮 -->
        <div id="yema">
          <el-pagination
            background
            :disabled="is_load"
            layout="prev, pager, next"
            :total="pages_updata"
            :current-page.sync="time_li"
            @current-change="yema"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articles, channel, del_channel } from "../../apis/article";
// 引入专门处理文章相关的请求方法
export default {
  name: "const",
  data() {
    return {
      // 文章信息------从接口方法中获得
      articles: [],

      // 文章频道信息
      channel_info: [],
      // 文章筛选id状态
      channl_status: undefined,
      // 时间参数
      value1: [],

      // 当前页码
      time_li: 1,

      // 文章总页码
      pages_updata: 0,

      // 文章总数
      total_count: 0,

      // 控制有无文章是的展示
      is_no_data: "",

      // 表单提交的筛选数据状态要求
      from_status: null,

      // loading模块控制
      is_load: false,
    };
  },

  created() {
    // 初始化加载table数据时会加载loading
    this.is_load = true;
    // 在组件加载完成时触发请求方法
    this.articles_updata();
    // 调用筛选频道信息
    this.channel_data();
  },

  methods: {
    // 请求文章信息方法
    articles_updata() {
      // 从本地获取用户令牌
      let tokens = localStorage.getItem("token");

      // 调用请求方法---将用户令牌传递-----将接口参数传递
      articles(tokens, {
        // 筛选的文章状态选项
        status: this.from_status,

        // 筛选文章的频道内容
        channel_id: this.channl_status,

        // 文章时间筛选状态
        // 开始----若是用户传递了任意的空时间,依然将其作为参数请求
        begin_pubdate: this.value1 ? this.value1[0] : undefined,
        // 结束
        end_pubdate: this.value1 ? this.value1[1] : undefined,
        
        
        //处理在第几页
        page: this.time_li,
        //处理一页包含多少数据
        per_page: 20,
      })
        .then((data) => {
          let datas = data.data.data;
          // 获取成功请求返回的数据并赋值给data中的数据
          this.articles = datas.results;

          // 调用展示文章总数方法
          this.sum(datas);

          // 调用控制页码总数的方法
          this.page_sum(datas);

          // 每当加载完成后取消loading
          this.is_load = false;
        })
        .catch((err) => {
          console.log("出错" + err);
          // 出错2s后停止加载
          setTimeout(() => {
            this.is_load = false;
          }, 2000);
        });
    },

    // 获取文章频道
    channel_data() {
      // 从本地获取用户令牌
      let tokens = localStorage.getItem("token");
      // 调用文章获取方法
      channel(tokens).then((data) => {
        let arr = data.data.data.channels;
        // 向数据中添加一个一个自定义全部数据及id
        // id为空时筛选全部频道数据
        arr.push({ name: "全部", id: undefined });
        // 交给vue来渲染
        this.channel_info = arr;
      });
    },

    // 文章总数
    sum(data) {
      // console.log(data.total_count);

      // 当文章数量为0时展示另一个数据;
      if (data.total_count == 0) {
        this.is_no_data = false;
      } else {
        this.is_no_data = true;
      }

      //将获取的文章总数赋值total_count
      this.total_count = data.total_count;
    },

    // 页码改变
    yema() {
      // 触发页码导航时加载loading
      this.is_load = true;
      // 重新请求
      this.articles_updata();
    },

    // 页码总数
    page_sum(data) {
      // 满20的页码数----不满取整
      let yema = Math.ceil(data.total_count / 20);

      //  pages_updata为显示的页数
      this.pages_updata = yema * 10;
    },

    // 提交筛选要求
    commit_btn() {
      // 调用请求方法刷新数据-----当页面筛选信息更改时点击按钮触发刷新请求
      // 当更改信息重新请求时加载loading
      this.is_load = true;
      //包括id更改,时间更改,状态更改
      this.articles_updata();
    },

    // 编辑
    edit_btn() {
      console.log("编辑");
    },

    // 删除
    del_btn(value) {
      // 将第三方包处理的数据id作为参数传递-----.toString()第三方包要求
      del_channel(value.toString())
        .then((data) => {
          // 查看删除成功返回数据
          console.log(data.message);
        })
        .catch((err) => {
          console.log("出错了" + err);
        });

      this.articles_updata();
    },
  },
};
</script>

<style lang='less' scoped>
// 主体
#consts {
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  padding-top: 20px;
  background-color: #ccc;
  // 面包屑模块
  #crumbs {
    width: 90%;
    height: 320px;
    background-color: #fff;

    #nav {
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #666;

      ul {
        padding-left: 20px;
        display: flex;
        justify-content: left;
        li {
          width: 10%;
          height: 80px;
          line-height: 80px;
          a {
            color: #000;
          }
        }
      }
    }

    // 下拉模块
    #select {
      width: 100%;
      height: 240px;
      background-color: #fff;
      padding-left: 40px;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      border-bottom: 1px solid #666;

      // 单选文章筛选状态
      #radio {
        width: 60%;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;

        input {
          margin-left: 10px;
          margin-right: 5px;
        }
      }
      // 时间筛选模块
      #date {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 120px;

        #channel {
          display: flex;
          align-items: center;

          #bottom_munes {
            width: 120px;
            height: 30px;
            text-indent: 1em;
            margin-left: 10px;
          }
        }

        // 时间筛选
        #set_date {
          display: flex;
          justify-content: left;
          align-items: center;
          p {
            margin: 0 10px;
          }
        }
      }

      // 查询按钮
      #sumit {
        width: 80px;
        height: 40px;
        margin-left: 60px;
        border-radius: 5px;
        background-color: skyblue;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        font-weight: 700;
      }
    }
  }

  // mulu------展示区
  #mulu {
    position: relative;
    width: 90%;
    background-color: #fff;

    // loading
    #loading {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);

      p {
        width: 500px;
        height: 100px;
        color: #fff;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 700;
        text-align: center;
        line-height: 100px;
        font-size: 50px;
      }
    }

    // show展示区
    #show {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      height: 480px;

      p {
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        font-weight: 700;
        font-family: "KaiTi";
        margin-left: 20px;
      }
      // 展示表格
      table {
        width: 96%;
        border: 1px solid #ccc;
        border-collapse: collapse;
        // 头
        thead {
          height: 40px;
          background-color: #fff;
          td {
            // width: 100px;
            text-align: center;
          }
        }
        // 体
        tbody {
          width: 100%;
          border-top: 1px solid #ccc;
          // 状态栏样式
          .status {
            width: 120px;
          }
          // 标题样式
          .wen_title {
            width: 500px;
            padding: 0px 20px;
          }

          td {
            height: 180px;
            text-align: center;
            border: 1px solid #ccc;

            // 文章审核状态样式
            .caogao,
            .sh_loging,
            .pass,
            .del,
            .sh_to {
              width: 100px;
              height: 40px;
              color: #fff;
              line-height: 40px;
              margin-left: 10px;
              font-weight: 700;
            }

            .caogao {
              background-color: yellow;
            }

            .pass {
              background-color: rgb(126, 241, 116);
            }

            .sh_loging {
              background-color: rgb(207, 178, 46);
            }

            .del {
              background-color: red;
            }
            .sh_to {
              background-color: rgb(74, 35, 216);
            }

            // 编辑-删除按钮样式
            #edit_btn,
            #del_btn {
              width: 50px;
              height: 50px;
              outline: 0;
              border: 0px;
              color: #fff;
              font-weight: 700;
              border-radius: 50%;
              cursor: pointer;
            }

            #edit_btn {
              background-color: rgba(119, 204, 238, 0.3);
            }

            #edit_btn:hover {
              background-color: blue;
            }

            #del_btn {
              margin-left: 10px;
              background-color: rgba(219, 49, 49, 0.3);
            }

            #del_btn:hover {
              margin-left: 10px;
              background-color: red;
            }
          }
        }
      }

      // 跳转页码
      #yema {
        margin: 20px 0px;
      }
    }
  }

  // 文章配图样式
  #img_r {
    width: 100px;
    height: 100px;
  }
}
</style>