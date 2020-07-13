import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constant'

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
    default:
      return prevState
  }
}
