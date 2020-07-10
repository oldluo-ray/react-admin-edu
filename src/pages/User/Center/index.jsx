import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Avatar, Divider, Tag, Card } from "antd";

import Article from "./Article";

import icons from "@conf/icons";

import "./index.less";

const courseList = [
  {
    _id: 5,
    price: 0,
    cover:
      "http://www.gulixueyuan.com/files/default/2018/06-14/1709299c26a5335333.jpg",
    buyCount: 962,
    viewCount: 264544,
    version: 2,
    url: "http://www.gulixueyuan.com/course/46",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 53,
    description:
      "Spring4.0是 Spring 推出的一个重大版本升级，进一步加强了 Spring 作为 Java 领域第一开源平台的地位。Spring4.0 引入了众多 Java 开发者期盼的新特性，如泛型依赖注入、SpEL、校验及格式化框架、Rest风格的 WEB 编程模型等。这些新功能实用性强、易用性高，可大幅降低 JavaEE 开发的难度，同时有效提升应用开发的优雅性。",
    title: "Spring4.0",
  },
  {
    _id: 6,
    price: 118,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/03-04/112501d2a32d264610.jpg",
    buyCount: 703,
    viewCount: 220367,
    version: 16,
    url: "http://www.gulixueyuan.com/course/201",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "数据库",
    lessonNum: 44,
    description:
      "Mysql是常用的关系型数据库管理系统，在WEB应用方面MySQL是很好的RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。",
    title: "MySQL核心技术",
  },
  {
    _id: 7,
    price: 138,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/03-04/1125233ba14b844851.jpg",
    buyCount: 846,
    viewCount: 107687,
    version: 19,
    url: "http://www.gulixueyuan.com/course/64",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "数据库",
    lessonNum: 93,
    description:
      "MySQL是目前常用的关系型数据库管理系统，在WEB应用方面 MySQL 也是目前很好的 RDBMS 应用软件之一。随着淘宝去IOE(去除IBM小型机、Oracle数据库及EMC存储设备)化的推进，MySQL 数据库在当前的互联网应用中变得越来越重要，本教程主要讲授针对 Java 开发所需的 MySQL 高级知识，课程中会让大家快速掌握索引，如何避免索引失效，索引的优化策略，了解innodb和myisam存储引擎，熟悉MySQL锁机制，能熟练配置MySQL主从复制，熟练掌握explain、show profile、慢查询日志等日常SQL诊断和性能分析策略。",
    title: "MySQL高级",
  },
  {
    _id: 8,
    price: 118,
    cover:
      "http://www.gulixueyuan.com/files/default/2018/06-14/170750668bd9443093.jpg",
    buyCount: 945,
    viewCount: 104709,
    version: 20,
    url: "http://www.gulixueyuan.com/course/50",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 63,
    description:
      "本视频基于Maven+SpringMVC+Spring+MyBatis+Bootstrap的组合，快速开发一个完整的CRUD功能，视频除过对框架组合的基本使用外，还涉及到许多的开发细节：Bootstrap搭建页面，MyBatis逆向工程使用，Rest风格的URI，@ResponseBody注解完成AJAX，AJAX发送PUT请求的问题，jQuery前端校验，JSR303后端校验等。",
    title: "SSM高级整合",
  },
  {
    _id: 9,
    price: 118,
    cover:
      "http://www.gulixueyuan.com/files/default/2018/06-14/171003b8f760257462.jpg",
    buyCount: 876,
    viewCount: 151118,
    version: 10,
    url: "http://www.gulixueyuan.com/course/43",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 88,
    description:
      "MyBatis是目前非常流行的一个轻巧、便利的持久化层框架。\n本视频除对MyBatis日常基本使用示范外，还涉及诸多细节。以及较深入源码的讲解MyBatis运行原理、插件机制和一些企业实用场景。\n视频包含：MyBatis配置文件编写，MyBatis动态SQL，MyBatis缓存机制，MyBatis-Spring整合，MyBatis逆向工程，MyBatis高级内容（MyBatis源码解析，MyBatis单/多插件运行机制，MyBatis四大对象工作原理，自定义TypeHandler、MyBatis存储过程&游标处理等）。\n视频中会在重要的地方对比MyBatis操作MySQL以及Oracle之间的差异性。如果没有Oracle相关知识或者资料的同学，可以先在尚硅谷官网下载学习宋红康老师对于Oracle的讲授。",
    title: "MyBatis",
  },
  {
    _id: 10,
    price: 118,
    cover:
      "http://www.gulixueyuan.com/files/default/2018/06-14/170951fa51dd680133.jpg",
    buyCount: 841,
    viewCount: 118355,
    version: 14,
    url: "http://www.gulixueyuan.com/course/44",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 27,
    description:
      "Redis（REmote DIctionary Server）是一个key-value存储系统，是当下互联网公司常用的NoSQL数据库之一，是进入互联网行业的Java开发工程师必备技术。",
    title: "Redis",
  },
  {
    _id: 11,
    price: 2999.5,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/03-23/1802113cd0f1919527.jpg",
    buyCount: 685,
    viewCount: 3056,
    version: 2,
    url: "http://www.gulixueyuan.com/course/365",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 91,
    description:
      "系统后端接口部分，使用目前流行的SpringBoot+SpringCloud进行微服务架构，使用Feign、Gateway、Hystrix，以及阿里巴巴的Nacos等组件搭建了项目的基础环境。项目中还使用MyBatisPlus进行持久层的操作，使用了OAuth2+JWT实现了分布式的访问，项目中整合了SpringSecurity进行了权限控制。除此之外，项目中使用了阿里巴巴的EasyExcel实现对Excel的读写操作，使用了Redis进行首页数据的缓存，使用Git进行代码的版本控制，还整合了Swagger生成接口文档 。",
    title: "谷粒学院--在线教育实战项目",
  },
  {
    _id: 12,
    price: 172,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/03-09/212843b7b6e7009237.jpg",
    buyCount: 976,
    viewCount: 1182,
    version: 18,
    url: "http://www.gulixueyuan.com/course/363",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "尚硅谷2020最新版尚筹网Java项目实战开发教程(下部)",
    lessonNum: 42,
    description:
      "尚筹网是一个在线众筹平台，通过向普通大众募集资金来支持创业项目，支持者可以获得与支持金额相当的回报。该项目视频在学习路线中的定位是：从单一架构到分布式架构的过渡阶段，适合学完SSM框架后，需要通过一个项目巩固所学知识技能，并平滑过渡到分布式开发的小伙伴。",
    title: "尚硅谷2020最新版尚筹网Java项目实战开发教程(下部)",
  },
  {
    _id: 13,
    price: 204,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/03-09/21312809a3f2609814.jpg",
    buyCount: 1068,
    viewCount: 3488,
    version: 9,
    url: "http://www.gulixueyuan.com/course/362",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "尚硅谷2020最新版尚筹网Java项目实战开发教程(上部)",
    lessonNum: 49,
    description:
      "尚筹网是一个在线众筹平台，通过向普通大众募集资金来支持创业项目，支持者可以获得与支持金额相当的回报。该项目视频在学习路线中的定位是：从单一架构到分布式架构的过渡阶段，适合学完SSM框架后，需要通过一个项目巩固所学知识技能，并平滑过渡到分布式开发的小伙伴。",
    title: "尚硅谷2020最新版尚筹网Java项目实战开发教程(上部)",
  },
  {
    _id: 14,
    price: 196,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/03-04/1952342d7f99948959.jpg",
    buyCount: 629,
    viewCount: 5714,
    version: 14,
    url: "http://www.gulixueyuan.com/course/361",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "尚硅谷SpringCloud教程2020最新版",
    lessonNum: 80,
    description: "本教程只有视频，没有资料",
    title: "尚硅谷SpringCloud教程2020最新版",
  },
  {
    _id: 15,
    price: 125.6,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/02-26/18010840acd3145497.jpg",
    buyCount: 234,
    viewCount: 1986,
    version: 12,
    url: "http://www.gulixueyuan.com/course/360",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 41,
    description:
      "本视频涵盖JavaWeb核心技术点主要有：\n     Servlet程序、Filter过滤器、Listener监听器、jsp页面、EL表达式、JSTL标签库、jQuery框架、Cookie技术、Session会话、JSON使用、Ajax请求，并在讲解知识点过程中会带领大家完成一个书城项目。相对于旧版，本版本使用idea进行开发，同时对多项技术做了升级！",
    title: "尚硅谷JavaWeb教程下部(2020新版)",
  },
  {
    _id: 16,
    price: 174.6,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/02-26/1753084d100e763792.jpg",
    buyCount: 279,
    viewCount: 5105,
    version: 11,
    url: "http://www.gulixueyuan.com/course/359",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 103,
    description:
      "本视频涵盖JavaWeb核心技术点主要有：\n      Servlet程序、Filter过滤器、Listener监听器、jsp页面、EL表达式、JSTL标签库、jQuery框架、Cookie技术、Session会话、JSON使用、Ajax请求，并在讲解知识点过程中会带领大家完成一个书城项目。相对于旧版，本版本使用idea进行开发，同时对多项技术做了升级！",
    title: "尚硅谷JavaWeb教程上部(2020新版)",
  },
  {
    _id: 17,
    price: 115.6,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/02-19/184934e02ec5993956.jpg",
    buyCount: 665,
    viewCount: 1162,
    version: 17,
    url: "http://www.gulixueyuan.com/course/358",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "H5前端",
    lessonNum: 88,
    description:
      "一、课程简介\n       webpack作为现代前端开发中最火的模块打包工具，广泛应用于前端工程领域，是前端工程师必备的技能之一。全球知名公司（如：谷歌、阿里、腾讯等）都在使用webpack作为首选模块打包工具。\n       随着webpack5也研发近一年，即将要隆重推出。我们在学完webpack4配置，将会无缝切换到webpack5，全面讲解webpack5新特性。",
    title: "尚硅谷Webpack教程(webpack从入门到精通)",
  },
  {
    _id: 18,
    price: 159.6,
    cover:
      "http://www.gulixueyuan.com/files/course/2020/01-15/1643048bab80485984.jpg",
    buyCount: 473,
    viewCount: 9516,
    version: 6,
    url: "http://www.gulixueyuan.com/course/356",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 36,
    description: "本教程只有视频，如需笔记请截图自制。",
    title: "尚硅谷_JVM从入门到精通（持续更新中）",
  },
  {
    _id: 19,
    price: 0,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/12-31/083727788336956334.jpg",
    buyCount: 640,
    viewCount: 1937,
    version: 19,
    url: "http://www.gulixueyuan.com/course/354",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "尚硅谷_心态修炼七堂课",
    lessonNum: 30,
    description:
      "“越哭越伤心”是一种心态，这就是著名的墨非定律，如果你认为一件事会变糟，就一定会变糟，总说自己很惨的人，就会越来越惨。“一起比惨，痛苦减半”也是一种心态，自己混得不好，不是最难受的，认识的人比自己混得好，我活不下去了。所以，世界上最好的安慰，并不是告诉对方，一切都会好起来的，而是愁眉苦脸说，哭个屁，你看，我比你还惨。",
    title: "尚硅谷_心态修炼七堂课",
  },
  {
    _id: 20,
    price: 127.8,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/12-23/173334e14545490333.jpg",
    buyCount: 656,
    viewCount: 3948,
    version: 10,
    url: "http://www.gulixueyuan.com/course/352",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 98,
    description:
      "本视频涵盖Mycat核心技术主要知识点，常用功能均有实战练习。主要包含Mycat介绍原理、安装、一主一从读写分离、双主双从读写分离、分库分表、全局序列、高可用架构、安全设置、监控平台等章节。",
    title: "尚硅谷_Mycat视频教程",
  },
  {
    _id: 21,
    price: 131.6,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/12-09/1729393cbd09888392.jpg",
    buyCount: 443,
    viewCount: 4462,
    version: 5,
    url: "http://www.gulixueyuan.com/course/351",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "大数据",
    lessonNum: 49,
    description:
      "本套课程由阿里云大学和尚硅谷联合打造，以国内电商巨头实际业务应用场景为依托，以阿里云框架为技术支持，紧跟大数据主流场景，对接企业实际需求，对电商实时数仓的搭建进行了详细讲解。\n    课程内容结合国内多家企业实际项目经验，从框架版本选型、系统架构设计、业务流程设计，手把手带你从零开始完成基于阿里云的实时数仓项目。（版本框架：RDS、DataHub、DTS、实时计算、DataWorks、DataV等）",
    title: "尚硅谷_基于阿里云搭建数据仓库（实时）",
  },
  {
    _id: 22,
    price: 0,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/11-21/112647726987222240.jpg",
    buyCount: 559,
    viewCount: 2553,
    version: 2,
    url: "http://www.gulixueyuan.com/course/350",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "尚硅谷明哥沟通技巧八堂课",
    lessonNum: 29,
    description:
      "人是复杂的综合体，每个人的成长环境不同，造成了三观的迥异，人与人之间的沟通成为了一个大问题。你会在求职的时候发现，招聘要求中赫然有一条是：沟通表达能力佳。",
    title: "尚硅谷明哥沟通技巧八堂课",
  },
  {
    _id: 23,
    price: 536,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/11-18/183334e5f764929089.jpg",
    buyCount: 503,
    viewCount: 10272,
    version: 12,
    url: "http://www.gulixueyuan.com/course/345",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "Java",
    lessonNum: 35,
    description:
      "Netty是当前非常流行的网络通讯框架，当程序对网络数据处理时，需要保证高并发和高可靠，底层就可以用Netty支撑。",
    title: "尚硅谷Netty视频教程",
  },
  {
    _id: 24,
    price: 596,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/11-13/2326466d765e238451.jpg",
    buyCount: 471,
    viewCount: 2717,
    version: 13,
    url: "http://www.gulixueyuan.com/course/349",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "区块链",
    lessonNum: 96,
    description:
      "本课程主要是基于以太坊开发拍卖系统DApp，拍卖的原理类似于eBay，所以又可以叫做“去中心化eBay”项目。课程对项目的整体架构、后台合约逻辑、前台页面设计和实现一一做了详细讲解。",
    title: "尚硅谷_区块链项目：硅谷拍卖系统",
  },
  {
    _id: 25,
    price: 536,
    cover:
      "http://www.gulixueyuan.com/files/course/2019/11-13/232514a6b4e7659689.jpg",
    buyCount: 943,
    viewCount: 1537,
    version: 17,
    url: "http://www.gulixueyuan.com/course/348",
    status: "Normal",
    gmtCreate: "2019-04-02 18:34:32",
    gmtModified: "2019-11-19 11:05:53",
    teacherId: "李大飞",
    subjectParentId: "区块链",
    lessonNum: 53,
    description:
      "本课程主要是基于以太坊开发投票系统DApp，在基础投票功能的基础上，增加了基于自定义token进行投票的功能；另外还涉及到了以太坊开发框架truffle的使用。",
    title: "尚硅谷_区块链项目：硅谷投票系统",
  },
].map((item) => {
  let content = "";
  let description = "";

  if (item.description.length > 20) {
    const arr = item.description.split(",");
    description = arr[0];
    content = arr[1];
  } else {
    content = item.description;
    description = item.description;
  }

  return {
    id: item._id,
    href: item.url,
    title: item.title,
    avatar: item.cover,
    description,
    content,
  };
});

const contentList = {
  course: <Article courseList={courseList} />,
};

@connect((state) => ({ user: state.user }))
class Center extends Component {
  state = {
    tabKey: "course",
  };

  onTabChange = (key) => {
    this.setState({ tabKey: key });
  };

  render() {
    const { user } = this.props;

    const detail = [
      {
        icon: "contacts",
        text: "交互专家",
      },
      {
        icon: "cluster",
        text: "尚硅谷-前端讲师部-xxx",
      },
      {
        icon: "home",
        text: "广东省深圳市宝安区",
      },
    ];

    const tags = [
      "超棒的",
      "一个字: 猛",
      "BUG收割机",
      "一个字: 猛",
      "棒",
      "BUG收割机",
    ];

    const teams = [
      {
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        text: "科学搬砖组",
      },
      {
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
        text: "全组都是吴彦祖",
      },
      {
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
        text: "中二少女团",
      },
      {
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
        text: "程序员日常",
      },
      {
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
        text: "高逼格设计天团",
      },
      {
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
        text: "骗你来学计算机",
      },
    ];

    const tabList = [
      {
        key: "course",
        tab: `课程 (${courseList.length})`,
      },
    ];

    return (
      <div className="center">
        <Row gutter={20}>
          <Col span={7}>
            <div className="center-center">
              <div className="center-avator">
                <Avatar size={100} src={user.avatar} />
                <span className="center-name">{user.name}</span>
                <span>海纳百川，有容乃大</span>
              </div>
              <ul className="center-user-list">
                {detail.map((item, index) => {
                  const Icon = icons[item.icon];
                  return (
                    <li key={index}>
                      <span className="center-user-list-icon">
                        <Icon />
                      </span>
                      <span>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
              <Divider />
              <div>
                <p className="center-icon-title">标签</p>
                {tags.map((tag, index) => {
                  return (
                    <Tag className="center-icon" key={index}>
                      {tag}
                    </Tag>
                  );
                })}
                <Tag>
                  <icons.plus />
                </Tag>
              </div>
              <Divider />
              <div className="center-teams">
                <p className="center-icon-title">团队</p>
                {teams.map((team, index) => {
                  return (
                    <div key={index} className="center-teams-item">
                      <span className="center-teams-item-avatar">
                        <Avatar size={22} src={team.icon} />
                      </span>
                      <span>{team.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col span={17}>
            <Card
              style={{ width: "100%" }}
              tabList={tabList}
              activeTabKey={this.state.tabKey}
              onTabChange={this.onTabChange}
            >
              {contentList[this.state.tabKey]}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Center;
