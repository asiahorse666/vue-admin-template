import request from '@/utils/request'

export default {
    // 查询courseId下所有的章节以及下面的小节
    getChapterSectionByCourseId(courseId) {
        return request({
            url: `/edu/chapter/getChapterSectionByCourseId/${courseId}`,
            method: "get"
        })
    },

    // 根据id查询
    getChapterById(id) {
        return request({
            url: `/edu/chapter/${id}`,
            method: "get"
        })
    },

    // 添加
    saveChapter(eduChapter) {
        return request({
            url: `/edu/chapter`,
            method: "post",
            params: eduChapter
        })
    },

    // 修改
    updateChapter(eduChapter) {
        return request({
            url: `/edu/chapter`,
            method: "put",
            params: eduChapter
        })
    },

    // 删除
    deleteChapterById(id) {
        return request({
            url: `/edu/chapter/${id}`,
            method: "delete"
        })
    }
}
