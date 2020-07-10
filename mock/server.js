// 利用node的express框架,快速搭建一个服务器
// 1. 引入express
const express = require('express')

// 引入mockjs
const Mock = require('mockjs')

// 从Mock身上拿到Random
const Random = Mock.Random

//返回中文标题
Random.ctitle()

//2 . 调用express得到一个app对象
const app = express()

// 解决跨域
// use是express中的一个中间件
app.use((req, res, next) => {
  //设置响应头
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'content-type,token')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  //调用下一个中间件
  next()
})

// 如果请求方式是get请求 app.get
// 第一个参数: 就是接口的路径
// 第二个参数: 回调函数. 当接收到对应的请求会触发
// 这个回调函数中接收两个参数: req,请求对象  res, 响应对象
// 通过req获取上传的参数, 通过res响应数据

app.get('/admin/edu/subject/:page/:limit', (req, res) => {
  // req 请求对象
  let { page, limit } = req.params // 获取浏览器上传的路由参数

  //定义data数据
  //   const data = {
  //     total: 20,
  //     items: [{},{}]
  //   }

  // 利用 mock,创建虚拟数据
  const data = Mock.mock({
    // total表示分类列表总共有多少条数据
    // 需求: 返回的total的值是一个在指定返回内的随机整数
    // 注意: limit从浏览器中获取的,是一个字符串
    total: Random.integer(+limit + 2, limit * 2),
    // ['items|'+limit]: [
    [`items|${limit}`]: [
      {
        '_id|+1': 1,
        // 返回2-5个中文
        title: '@ctitle(2,5)',
        parentId: 0
      }
    ]
  })
  // res是响应对象
  // 后台返回给浏览器的应该是json格式的字符串
  // 下面代码的作用: 把对象转成json格式的字符串,返回给浏览器
  res.json({
    code: 20000,
    success: true,
    data,
    message: ''
  })
})

//开启这个服务
// 第一个参数: 服务器的端口号
// 第二个参数: 开启成功/失败的回调函数
app.listen(8888, err => {
  if (err) {
    return console.log('服务启动失败')
  }

  console.log('服务器启动成功,请求地址http://localhost:8888')
})
