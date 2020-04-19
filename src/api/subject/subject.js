import request from "@/utils/request"

export default {
    // 查询课程分类
    getAllSubject() {
        return request({
            url: "/edu/subject/getAllSubject",
            method: "get"
        })
    },
    // 下载课程分类模板
    download() {
        return request({
            url: "/edu/subject/download",
            method: "get"
        })
    },
    // 删除课程分类,如果有子课程则抛异常
    deleteSubjectById(id) {
        return request({
            url: "/edu/subject/"+id,
            method: "delete"
        })
    },
    // 添加课程一级分类
    saveParentSubject(eduSubject){
        return request({
            url: "/edu/subject/saveParentSubject",
            method: "post",
            params: eduSubject
        })
    },
    // 添加课程二级分类
    saveChildSubject(eduSubject){
        return request({
            url: "/edu/subject/saveChildSubject",
            method: "post",
            params: eduSubject
        })
    },
}
