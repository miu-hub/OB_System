# ob_system

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



```vue
<!-- 提示框 -->
    <transition name="tip">
      <div id="tip" v-show="false">
        <p>是否要执行该操作 ？</p>
        <button id="on">确认</button>
        <button id="off">取消</button>
      </div>
    </transition>


      #tip {
    width: 400px;
    height: 200px;
    position: fixed;
    top: 50px;
    left: 45%;
    border-radius: 10px;
    background-color: #fff;
    // border: 1px solid #666;
    box-shadow: 0px 0px 10px 0px #666;

    p {
      width: 100%;
      height: 100px;
      text-align: center;
      font-size: 25px;
      font-family: "kaiti";
      font-weight: 700;
      line-height: 100px;
    }
    // 提示按钮的样式
    #on,
    #off {
      width: 100px;
      height: 50px;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      border: 0px;
      border-radius: 10px;
      cursor: pointer;
      background-color: skyblue;
    }

    #on {
      margin-left: 80px;
      margin-top: 10px;
      margin-right: 40px;
    }
  }
```

1423956112880697344
1423956112880697344