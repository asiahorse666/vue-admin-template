import request from '@/utils/request'

export default {
    getTeacherPage(pageNum, pageSize) {
        return request({
            url: `/edu/teacher/getTeacherPage/${pageNum}/${pageSize}`,
            method: 'get'
        })
    },
    // 分页查询讲师信息带条件的查询
    getTeacherPageByCondition(pageNum, pageSize, teacherCondition) {
        return request({
            url: `/edu/teacher/getTeacherPageByCondition/${pageNum}/${pageSize}`,
            method: 'get',
            params: teacherCondition
        })
    },
    // 删除讲师功能
    deleteTeacherById(teacherId) {
        return request({
            url: `/edu/teacher/${teacherId}`,
            method: 'delete'
        })
    },
    // 添加讲师
    insertTeacher(teacher) {
        return request({
            url: `/edu/teacher`,
            method: 'post',
            params: teacher
        })
    },
    // 根据id查询讲师
    getTeacherById(teacherId) {
        return request({
            url: `/edu/teacher/${teacherId}`,
            method: 'get'
        })
    },
    // 修改讲
    UpdateTeacher(teacher) {
        return request({
            url: `/edu/teacher`,
            method: 'put',
            params: teacher
        })
    }
}
