/*
  将所有组件引入模块
*/
import { lazy } from 'react'

// 之前加载组件的方式
// import Test from './Test'

const Admin = () => lazy(() => import('@pages/Admin'))
const User = () => lazy(() => import('@pages/Acl/User'))
const AddOrUpdateUser = () =>
  lazy(() => import('@pages/Acl/User/components/AddOrUpdateUser'))
const AssignUser = () =>
  lazy(() => import('@pages/Acl/User/components/AssignUser'))
const Role = () => lazy(() => import('@pages/Acl/Role'))
const Permission = () => lazy(() => import('@pages/Acl/Permission'))
const AssignRole = () =>
  lazy(() => import('@pages/Acl/Role/components/AssignRole'))
const AddOrUpdateRole = () =>
  lazy(() => import('@pages/Acl/Role/components/AddOrUpdateRole'))
const Chapter = () => lazy(() => import('@pages/Edu/Chapter'))
const Comment = () => lazy(() => import('@pages/Edu/Comment'))
const Course = () => lazy(() => import('@pages/Edu/Course'))
const Teacher = () => lazy(() => import('@pages/Edu/Teacher'))
const Subject = () => lazy(() => import('@pages/Edu/Subject'))
const AddSubject = () =>
  lazy(() => import('@pages/Edu/Subject/components/AddSubject'))
const Test = () => lazy(() => import('@pages/Edu/Test')) //这个test是测试用的
const Settings = () => lazy(() => import('@pages/User/Settings'))
const Center = () => lazy(() => import('@pages/User/Center'))

export default {
  Admin,
  User,
  AddOrUpdateUser,
  AssignUser,
  Role,
  Permission,
  AssignRole,
  AddOrUpdateRole,
  Chapter,
  Comment,
  Course,
  Teacher,
  Settings,
  Center,
  Test,
  Subject,
  AddSubject
}
