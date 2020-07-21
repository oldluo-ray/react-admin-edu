// 原来的导入方式: 当前组件不需要执行,这个文件也会提前被加载
// import Login from '@pages/Login'
// import NotFound from '@pages/404'
// import Oauth from '@pages/Login/components/Oauth'

import { lazy } from 'react'

// 使用代码分割和懒加载的方式去写
// 现在的方式: 实现了懒加载. 组件在使用的时候才会加载
// lazy实现了懒加载 调用传入一个函数,函数需要返回一个promise
// import实现了代码分割 返回一个promise
// 注意: 如果使用了lazy,必须在使用懒加载的组件的时候,使用suspense包裹懒加载的组件
// suspense必须要写一个fallback属性, 当正在加载组件的时候,会展示fallback里面的内容
const Login = lazy(() => import('@pages/Login'))
const NotFound = lazy(() => import('@pages/404'))
const Oauth = lazy(() => import('@pages/Login/components/Oauth'))

//#region
/* export const asyncRoutes = [
	{
		path: "/acl",
		component: "",
		name: "权限管理",
		icon: "lock",
		redirect: "/acl/user/list",
		hidden: false,
		children: [
			{
				path: "/user",
				fullpath: "/user/list",
				component: "User",
				name: "用户管理",
				icon: "",
				redirect: "noredirect",
				children: [
					{
						path: "/add",
						component: "AddOrUpdateUser",
						name: "添加",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/update/:id",
						component: "AddOrUpdateUser",
						name: "修改",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "",
						component: "",
						name: "删除",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/assign/:id",
						component: "AssignUser",
						name: "分配角色",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
				],
			},
			{
				path: "/role",
				fullpath: "/role/list",
				component: "Role",
				name: "角色管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
				children: [
					{
						path: "/assign/:id",
						component: "AssignRole",
						name: "分配角色",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/add",
						component: "AddOrUpdateRole",
						name: "添加",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "",
						component: "",
						name: "删除",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/update/:id",
						component: "AddOrUpdateRole",
						name: "修改",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
				],
			},
			{
				path: "/menu/list",
				component: "Permission",
				name: "菜单管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
		],
	},
	{
		path: "/edu",
		component: "",
		name: "教育管理",
		icon: "read",
		redirect: "/edu/chapter/list",
		hidden: false,
		children: [
			{
				path: "/chapter",
				fullpath: "/chapter/list",
				component: "Chapter",
				name: "章节管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/comment",
				fullpath: "/comment/list",
				component: "Comment",
				name: "评论管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/course",
				fullpath: "/course/list",
				component: "Course",
				name: "课程管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/subject",
				fullpath: "/subject/list",
				component: "Subject",
				name: "课程分类管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/teacher",
				fullpath: "/teacher/list",
				component: "Teacher",
				name: "讲师管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
		],
	},
	{
		path: "/account",
		component: "",
		name: "个人管理",
		icon: "user",
		redirect: "/account/settings",
		hidden: false,
		children: [
			{
				path: "/settings",
				component: "Settings",
				name: "个人设置",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/list",
				component: "Center",
				name: "个人中心",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
		],
	},
]; */
//#endregion

// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    title: '登录'
  },
  {
    path: '/oauth',
    component: Oauth,
    title: 'git授权登录'
  },

  { path: '*', component: NotFound }
]

/**
 * 登录后 默认路由
 */
export const defaultRoutes = [
  // 首页
  {
    path: '/',
    component: 'Admin',
    icon: 'home',
    name: '后台管理系统',
    hidden: false
  }
  // { path: "*", redirect: "/404", component: NotFound, hidden: true }
]
