import request from "@utils/request";

const BASE_URL = "/admin/edu/teacher";

// 获取讲师
export function reqGetTeacher(id) {
  return request({
    url: `${BASE_URL}/get/${id}`,
    method: "GET",
  });
}

// 获取所有讲师列表
export function reqGetAllTeacherList() {
  return request({
    url: `${BASE_URL}/list`,
    method: "GET",
  });
}

// 获取讲师分页列表
export function reqGetTeacherList({
  page,
  limit,
  name,
  level,
  gmtCreateBegin,
  gmtCreateEnd,
}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      name,
      level,
      gmtCreateBegin,
      gmtCreateEnd,
    },
  });
}

// 根据讲师姓名关键字查询讲师姓名列表
export function reqSearchTeacherList(key) {
  return request({
    url: `${BASE_URL}/name/${key}`,
    method: "GET",
  });
}

// 新增讲师
export function reqAddTeacher({ avatar, sort, name, level, intro, career }) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: { avatar, sort, name, level, intro, career },
  });
}

// 修改讲师
export function reqUpdateTeacher({
  id,
  avatar,
  sort,
  name,
  level,
  intro,
  career,
}) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: { id, avatar, sort, name, level, intro, career },
  });
}

// 删除讲师
export function reqRemoveTeacher(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}

// 批量删除讲师
export function reqBatchRemoveTeacher(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: { idList },
  });
}
