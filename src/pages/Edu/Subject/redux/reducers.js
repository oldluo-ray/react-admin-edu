import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  UPDATE_SUBJECT
} from './constants'

const initSubjectList = {
  total: 0, // 总数
  items: [] // 详细user数据
}

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      // action.data ==> {total: 0, items: []}
      // console.log('reducer中', action.data)
      // 为了实现展示二级课程分类,需要给items中每一个数据添加children属性.
      // 有了children属性,每一条数据就会有可展开按钮
      action.data.items.forEach(item => {
        item.children = []
      })
      // //覆盖action.data.items的值
      // action.data.items = items
      // console.log(action.data.items)

      return action.data

    case GET_SECSUBJECT_LIST:
      // 把二级分类数据,添加到对应的一级分类数据的children属性上面
      /**
       *  {
        "total": 1,
        "items": [
            {
                "gmtCreate": "2020-06-10T16:00:00.000Z",
                "gmtModified": "2020-06-10T16:00:00.000Z",
                "_id": "5ee17310c311f5151c523334",
                "title": "JAVA",
                "parentId": "5ee171adc311f5151c52332a"
            }
        ]
        }
       */

      // 1. 获取一级分类的id(需要先知道要把这个数据添加到哪个一级里面)
      // 如果没有二级分类数据,不执行后面代码
      if (action.data.items.length > 0) {
        const parentId = action.data.items[0].parentId

        // 2. 找到对应的一级分类数据
        // 遍历一级分类
        prevState.items.forEach(item => {
          // 找到了对应的一级分类
          if (item._id === parentId) {
            // 给一级分类的children赋值
            item.children = action.data.items
          }
        })
      }
      // 刚才的代码一直在修改原来的数据,redux也是浅层对比
      // 所以要创建一个新的对象
      return {
        ...prevState
      }

    case UPDATE_SUBJECT:
      // 通过prevstate, 利用传过来的id.找到要修改的那条数据,然后修改title
      // 1. 遍历prevState 是个对象 items中存储了所有的数据
      // 注意: 修改的课程分类有可能是一级的,也有可能是二级的

      prevState.items.forEach(subject => {
        //传过来的id是不是一级课程分类
        if (subject._id === action.data.id) {
          // 修改title,然后return 掉
          subject.title = action.data.title
          return
        }

        // 还要遍历这个一级课程分类下面的二级课程分类
        subject.children.forEach(secSubject => {
          if (secSubject._id === action.data.id) {
            secSubject.title = action.data.title
          }
        })
      })

      return {
        ...prevState
      }
    default:
      return prevState
  }
}
