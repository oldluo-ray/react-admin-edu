//在index中要将外界需要用的异步action和reducer导出去
import {
  getChapterList,
  getLessonList,
  batchDelLesson,
  batchDelChapter
} from './actions'
import chapterList from './reducer'

export {
  getChapterList,
  getLessonList,
  batchDelLesson,
  batchDelChapter,
  chapterList
}
