import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Cascader, Button } from 'antd'

// 导入获取所有讲师的方法
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqALLSubjectList, reqGetSecSubjectList } from '@api/edu/subject'

import './index.less'

const { Option } = Select

function SearchForm() {
  const [form] = Form.useForm()
  // 定义存储讲师列表的状态
  const [teacherList, setTeacherList] = useState([])
  // 定义存储所有一级课程分类的状态
  const [subjectList, setSubjectList] = useState([])

  // const [options, setOptions] = useState([])

  // 利用useEffect,实现组件挂载获取数据
  useEffect(() => {
    async function fetchData() {
      // 注意: 这样的写法,会导致获取完讲师数据,再请求课程分类.会比较耗时
      // 所以要使用Promise.all来实现
      // const teachers = await reqGetAllTeacherList()
      // const subjectList = await reqALLSubjectList()

      // 等所有请求的数据响应了之后,会拿到对应的数据
      const [teachers, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqALLSubjectList()
      ])
      // console.log(res)

      const options = subjectList.map(subject => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false // false表示有子数据, true表示没有子数据
        }
      })

      setSubjectList(options)
      setTeacherList(teachers)
      // setSubjectList(subjectList)
    }

    fetchData()
  }, [])

  // 由于使用了cascader组件,我们需要将subjectList中的数据结构,改成cascader组件要求的数据结构

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }
  //#region
  // 分类loadData
  // const loadData = selectedOptions => {
  //   // console.log('多级下拉', selectedOptions)
  //   // loadData 是点击一级或其他子级的时候会触发
  //   // selectedOptions 是一个数组
  //   // 如果点击一级菜单 selectedOptions存储的是一个值, 就是对应的一级菜单数据
  //   // 如果点击二级菜单 selectedOptions存储的是两个值,第一个值是一级菜单,第二个值是二级菜单
  //   // 如果点击二级菜单,意味着要获取的是三级菜单数据,就需要拿到二级菜单数据,根据二级获取三级
  //   // 所以.每次都获取selectedOptions中最后一条数据
  //   const targetOption = selectedOptions[selectedOptions.length - 1]
  //   // cascader组件底层实现了正在加载. 只要给对应级数的数据添加loading,并赋值为true,就会展示正在加载
  //   targetOption.loading = true

  //   // load options lazily
  //   //未来要真正发送异步请求获取数据
  //   setTimeout(() => {
  //     // 表示请求成功
  //     //让小圆圈隐藏
  //     targetOption.loading = false
  //     // 给当前级数的菜单添加子级数据
  //     targetOption.children = [
  //       {
  //         label: `${targetOption.label} Dynamic 1`,
  //         value: 'dynamic1',
  //         // 如果子级数据后面还有子级数据,就加上这个isLeaf,如果没有就不用写
  //         // 比如,当前项目,课程分类只有一级和二级,所以二级不需要添加了
  //         isLeaf: false
  //       },
  //       {
  //         label: `${targetOption.label} Dynamic 2`,
  //         value: 'dynamic2',
  //         isLeaf: false
  //       }
  //     ]
  //     // setOptions([...options])
  //     // 修改targetOption实际就是修改了subjectList里面的数据,所以直接调用setSubjectList让数据更新,视图重新渲染
  //     setSubjectList([...subjectList])
  //   }, 1000)
  // }
  //#endregion

  const loadData = async selectedOptions => {
    // 获取一级课程分类数据
    const targetOption = selectedOptions[selectedOptions.length - 1]
    // cascader组件底层实现了正在加载. 只要给对应级数的数据添加loading,并赋值为true,就会展示正在加载
    targetOption.loading = true

    //发送异步请求
    // 调用之前定义好的方法,获取二级课程分类
    let secSubject = await reqGetSecSubjectList(targetOption.value)
    // console.log(secSubject)

    // 由于cascader组件,对渲染的数据,有格式要求,所以必须将二级分类数据,也进行数据重构
    secSubject = secSubject.items.map(item => {
      return {
        value: item._id,
        label: item.title
      }
    })
    // 让小圆圈隐藏
    targetOption.loading = false
    // 将二级数据添加给一级的children属性
    targetOption.children = secSubject
    // 更新subject
    setSubjectList([...subjectList])
  }

  const resetForm = () => {
    form.resetFields()
  }

  return (
    <Form layout='inline' form={form}>
      <Form.Item name='title' label='标题'>
        <Input placeholder='课程标题' style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name='teacherId' label='讲师'>
        <Select
          allowClear
          placeholder='课程讲师'
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(item => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
          {/* <Option value='lucy1'>Lucy1</Option>
          <Option value='lucy2'>Lucy2</Option>
          <Option value='lucy3'>Lucy3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item name='subject' label='分类'>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList} // 多级拉下菜单的数据
          loadData={loadData} // 点击课程分类的时候,loadData会触发,在这里去加载二级数据
          onChange={onChange} // 选中课程分类之后触发
          // changeOnSelect
          placeholder='课程分类'
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default SearchForm
