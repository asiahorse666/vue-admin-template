import request from "@/utils/request"

export default {

    // 删除视频
    deleteVideoByIds(videoIds) {
        return request({
            url: `/video/${videoIds}`,
            method: "delete"
        })
    }
}
