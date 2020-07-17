import { combineReducers } from 'redux'

import loading from './loading'
import token from './login'

import { user } from '@comps/Authorized/redux'
import { userList } from '@pages/Acl/User/redux'
import { roleList } from '@pages/Acl/Role/redux'
import { menuList } from '@pages/Acl/Permission/redux'
// ray 增加subjectlist的reducer和chapterList的reducer
import { subjectList } from '@pages/Edu/Subject/redux'
import { chapterList } from '@pages/Edu/Chapter/redux'
import { courseList } from '@pages/Edu/Course/redux'

export default combineReducers({
  loading,
  user,
  token,
  userList,
  roleList,
  menuList,
  subjectList,
  chapterList,
  courseList
})
