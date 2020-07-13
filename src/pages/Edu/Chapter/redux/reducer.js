import { GET_CHAPTER_LIST } from './constant'

const initChapterList = {
  total: 0,
  items: []
}

export default function chapterList(prevState = initChapterList, action) {
  switch (action.type) {
    case GET_CHAPTER_LIST:
      return action.data
    default:
      return prevState
  }
}
