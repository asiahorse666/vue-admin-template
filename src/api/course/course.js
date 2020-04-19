import request from "@/utils/request"

export default {
    // 添加课程
    saveCourse(courseInfo) {
        return request({
            url: "/edu/course",
            method: "post",
            params: courseInfo
        })
    },

    //获取讲师列表
    getEduTeacherAll() {
        return request({
            url: "/edu/teacher",
            method: "get",
        })
    },
    // 获取课程分类数据
    getAllSubject() {
        return request({
            url: "/edu/subject/getAllSubject",
            method: "get",
        })
    },
    // 根据条件分页查询
    queryCoursePageByCondition(pageNum, pageSize, courseParam) {
        return request({
            url: `/edu/course/queryCoursePageByCondition/${pageNum}/${pageSize}`,
            method: "get",
            params: courseParam
        })
    },
    // 根据id查询课程信息和描述信息
    getCourseById(id) {
        return request({
            url: `/edu/course/${id}`,
            method: "get"
        })
    },
    //更新课程信息和描述信息
    updateCourse(courseInfoVo) {
        return request({
            url: `/edu/course`,
            method: "put",
            params: courseInfoVo
        })
    },
    // 根据id删除课程信息和描述信息
    deleteCourseById(id){
        return request({
            url: `/edu/course/${id}`,
            method: "delete"
        })
    },
    // 获取课程确认信息
    getCourseConfirm(courseId){
        return request({
            url: `/edu/course/getCourseConfirm/${courseId}`,
            method: "get"
        })
    },
    // 发布课程: 修改课程的视频状态
    updateCourseStatus(courseId) {
        return request({
            url: `/edu/course/updateCourseStatus/${courseId}`,
            method: "put"
        })
    }
}

