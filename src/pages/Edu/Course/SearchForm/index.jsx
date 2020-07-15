import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Cascader, Button } from 'antd'

// 导入获取所有讲师的方法
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqALLSubjectList } from '@api/edu/subject'

import './index.less'

const { Option } = Select

function SearchForm() {
  const [form] = Form.useForm()
  // 定义存储讲师列表的状态
  const [teacherList, setTeacherList] = useState([])
  // 定义存储所有一级课程分类的状态
  const [subjectList, setSubjectList] = useState([])

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
      setTeacherList(teachers)
      setSubjectList(subjectList)
    }

    fetchData()
  }, [])

  // const [options, setOptions] = useState([
  //   {
  //     value: 'zhejiang',
  //     label: 'Zhejiang',
  //     isLeaf: false
  //   },
  //   {
  //     value: 'jiangsu',
  //     label: 'Jiangsu',
  //     isLeaf: false
  //   }
  // ])

  // 由于使用了cascader组件,我们需要将subjectList中的数据结构,改成cascader组件要求的数据结构

  const options = subjectList.map(subject => {
    return {
      value: subject._id,
      label: subject.title,
      isLeaf: false // false表示有子数据, true表示没有子数据
    }
  })

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  const loadData = selectedOptions => {
    // const targetOption = selectedOptions[selectedOptions.length - 1]
    // targetOption.loading = true
    // // load options lazily
    // setTimeout(() => {
    //   targetOption.loading = false
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: 'dynamic1'
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: 'dynamic2'
    //     }
    //   ]
    //   setOptions([...options])
    // }, 1000)
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
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
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
