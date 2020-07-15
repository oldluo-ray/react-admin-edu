import {
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  BATCH_DEL_CHAPTER,
  BATCH_DEL_LESSON
} from './constant'
import Chapter from '..'

const initChapterList = {
  total: 0,
  items: []
}

export default function chapterList(prevState = initChapterList, action) {
  switch (action.type) {
    case GET_CHAPTER_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data
    case GET_LESSON_LIST:
      //将课时添加到对应的章节的children中

      //1. 从返回的数据中,获取chapterId
      if (action.data.length > 0) {
        const chapterId = action.data[0].chapterId

        prevState.items.forEach(chapter => {
          if (chapter._id === chapterId) {
            chapter.children = action.data
          }
        })
      }
      return {
        ...prevState
      }

    case BATCH_DEL_CHAPTER:
      // 删除指定的章节数据
      // 1. 需要知道删除哪些 action.data 就是要删除的章节的ids(数组)
      const chapterIds = action.data
      // 2. 遍历章节数据,删除在ids中的数据
      const newChapters = prevState.items.filter(chapter => {
        // 如果当前的chapter的id 在 chapterIds中,表示这条数据要删除.就应该返回false
        if (chapterIds.indexOf(chapter._id) > -1) {
          // 要删除的数中,包含这一条数据
          return false
        }

        return true
      })

      return {
        ...prevState,
        items: newChapters
      }
    default:
      return prevState
  }
}
