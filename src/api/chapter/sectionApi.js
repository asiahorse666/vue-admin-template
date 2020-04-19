import request from '@/utils/request'

export default {

    // 根据id查询
    getSectionById(id) {
        return request({
            url: `/edu/section/${id}`,
            method: "get"
        })
    },

    // 添加
    saveSection(eduChapter) {
        return request({
            url: `/edu/section`,
            method: "post",
            params: eduChapter
        })
    },

    // 修改
    updateSection(eduChapter) {
        return request({
            url: `/edu/section`,
            method: "put",
            params: eduChapter
        })
    },

    // 删除
    deleteSectionById(id) {
        return request({
            url: `/edu/section/${id}`,
            method: "delete"
        })
    }
}
