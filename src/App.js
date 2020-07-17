import React, { useEffect, useState } from 'react'
import { Router } from 'react-router-dom'
import history from '@utils/history'

// 导入国际化包
import { IntlProvider } from 'react-intl'
//导入pussub
import PubSub from 'pubsub-js'

// 导入需要的语言包
// en 英文语言包
// zh 中文语言包
import { en, zh } from './locales'

import Layout from './layouts'
// 引入重置样式（antd已经重置了一部分了）
import './assets/css/reset.css'

function App() {
  const [locale, setLocale] = useState('zh')
  useEffect(() => {
    const token = PubSub.subscribe('LANGUAGE', (messge, data) => {
      console.log(data)

      setLocale(data)
      return () => {
        PubSub.unsubscribe(token)
      }
    })
  }, [])
  // 通过window.navigator获取当前浏览器的语言环境
  // const locale = window.navigator.language === 'zh-CN' ? 'zh' : 'en'
  // const locale = 'en'
  // 根据当前语言环境决定返回什么包
  const message = locale === 'en' ? en : zh
  return (
    <Router history={history}>
      {/* locale 表示当前语言环境 
          message 表示使用哪个语言包
      */}
      <IntlProvider locale={locale} messages={message}>
        <Layout />
      </IntlProvider>
    </Router>
  )
}

export default App
