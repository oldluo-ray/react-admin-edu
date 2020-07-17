import React, { useEffect, useState } from 'react'
import { Router } from 'react-router-dom'
import history from '@utils/history'

// 导入国际化包
import { IntlProvider } from 'react-intl'

// antd国际化
import { ConfigProvider } from 'antd'

//导入pussub
import PubSub from 'pubsub-js'

// 导入需要的语言包
// en 英文语言包
// zh 中文语言包
import { en, zh } from './locales'

// 2. 引入antd中提供的语言包
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'

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
  const antdLocale = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      <ConfigProvider locale={antdLocale}>
        {/* locale 表示当前语言环境 
          message 表示使用哪个语言包
      */}
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  )
}

export default App
