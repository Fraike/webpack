## 2020-3-4
### 默认载入babel-polyfill（增加兼容性）

## 2020-3-2
### 精简一下，去掉pace（pace进度条有兼容性的问题，vivo-android低版本有问题）
### 删掉react-simple-animate动画库，真的还不如直接用css动画（原理和各方面都就是css动画）

## 2020-1-21
### 新增全局参数rem
### 整理文档

## 2020-1-19
### swiper增加init参数（表示一开始进入是从第几个开始）

## 2020-1-17
### swiper增加noTouch参数
### 增加全局参数fetchLoading

## 2020-1-6
### scroll组件新增可以选择横或者竖

## 2019-12-31
### 前端时间style-loader有问题，然后用旧版的，看现在更新到最新版了，都没问题了
### mask天生垂直居中开始是用flex，对于某些安卓机兼容性有问题，改为tiansfrom加绝对定位垂直居中

## 2019-12-23
### 更新文档

## 2019-12-17
### 引出userHook的工具包
### 归纳userHook

## 2019-12-12
### 引入image-webpack-loader压缩图片

## 2019-12-11
### 又发现swiper的一些问题

## 2019-12-5
### swiper方法的问题。还是不能固定给window宽度，默认用父元素宽度

## 2019-12-3
### 补充常用工具类js
### 少量优化，swiper方法补充

## 2019-12-2
### 自制的简单swiper-hook已经可以用，功能也比较齐全

## 2019-11-26
### 解决mask的bug
### 优化swiper功能

## 2019-11-19
### 自制一个非常简单且小型的swiper组件(因为原来的swiper很久没更新了，而且比较大型，很多功能用不上)

## 2019-11-18
### 新增公共组件pace(加载进度条)
### 布局更为合理
### 引入whatwg-fetch,解决兼容性问题
### 引入react-simple-animate动画库

## 2019-11-5
### 完善简单的toast

## 2019-10-23
### 例如webpack引入css同样的方式，致可以直接在页面内引入图片

## 2019-10-11
### 新增dll简化构建大小和优化构建速度

## 2019-8-13
### 新增bscroll

## 2019-7-9
### 抛弃fetch用axios

## 2019-7-4
### css-loader3.0的打包方式有点变化

## 2019-7-1
### 打包方式引入js方式变更

## 2019-6-26
### 新增简单的例子

## 2019-6-24
### 由单页面改为更为实用的多页面的方式

## 2019-6-21
### 创建react-hook的项目

----
#### 注意目前共有三个全局参数：rem、fetchLoading、setToast

### 完整demo
```
    const [mask, setMask] = useState('')
    <React.Fragment>
      <ScrollView>
        <div>1</div>
        <div>2</div>
        ...
      </ScrollView>
      <Mask mask={mask} setMask={setMask}>
        <div className={style.test}>1</div>
      </Mask>
      <Toast />
    </React.Fragment>
```

### 组件

## ScrollView组件
内部封装better-scroll优化原生滚动，如有问题查看better-scroll文档。
```
    <ScrollView>
        <div>1</div>
        <div>2</div>
        ...
    </ScrollView>
```
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| direction | string | 'y' | 状态 | 否 |
----
## mask组件
封装了简单的弹出样式，以及弹出的方法。
----
```
    const [mask, setMask] = useState('')    // 设定
    <Mask mask={mask} setMask={setMask}>
        <div>弹窗</div>
    </Mask>
    setMask(0)  //调用
```
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| mask | string |  '' | 状态 | 是 |
| setMask | string | func | 控制状态 | 是 |
----
## swiper组件
利用react-hook外加简单的css控制，制作一个简易的swiper组件。
```
    <Swiper 
        autoplay={1000} 
        loop={false} 
        min={20} 
        changeIndex={(e) => { console.log(e) }}
    >
        <div>1</div>
        <div>2</div>
    </Swiper>
```
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| autoplay | number | 86400000 | 自动切换时间 | 否 |
| loop | bool | true | 让Swiper看起来是循环 | 否 |
| min | number | 10 | 最小滑动距离(滑动大于此值时切换) | 否 |
| changeIndex | func | null | 返回当前的index | 否 |
| noTouch | bool | false | 禁止触碰 | 否 |
| init | number | 1 | 禁止触碰 | 否 |
----
## Toast组件
就是一个toast，简易的只显示文字的toast。
```
    <Toast/>
    setToast('toast')  // 调用
```