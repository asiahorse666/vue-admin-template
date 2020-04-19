<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="信息描述">
                <el-tag type="info">excel模版说明</el-tag>
                <el-tag>
                    <i class="el-icon-download"/>
                    <a href="javascript:;" @click="download">点击下载模版</a>
                </el-tag>

            </el-form-item>

            <el-form-item label="选择Excel">
                <el-upload
                    ref="upload"
                    :auto-upload="false"
                    :on-success="fileUploadSuccess"
                    :on-error="fileUploadError"
                    :disabled="importBtnDisabled"
                    :limit="1"
                    :action="BASE_API+'/edu/subject/upload'"
                    name="file"
                    accept="application/vnd.ms-excel">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button
                        :loading="loading"
                        style="margin-left: 10px;"
                        size="small"
                        type="success"
                        @click="submitUpload">{{ fileUploadBtnText }}</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import subject from '../../api/subject/subject'
export default {
    data() {
        return {
            fileUploadBtnText: "上传到服务器",
            BASE_API: process.env.BASE_API, // 接口API地址
            importBtnDisabled: false,
            loading: false
        }
    },
    methods: {
        // 上传excel成功后回调
        fileUploadSuccess(response) {
            if(response.success){
                this.importBtnDisabled = true
                this.loading = false;
                this.fileUploadBtnText = "上传成功"
            }else {
                this.importBtnDisabled = false
                this.loading = false;
                this.fileUploadBtnText = "上传失败"
            }

        },
        // 上传excel失败后回调
        fileUploadError() {
            this.importBtnDisabled = false
            this.fileUploadBtnText = "上传失败"
            this.loading = false;
        },
        // 提交上传excel
        submitUpload() {
            this.$refs.upload.submit()
            this.fileUploadBtnText = "正在上传"
            this.loading = true;
        },
        download() {
            subject.download().then(response => {
                if(response.success){
                    this.$message({
                        type: 'success',
                        message: '下载模板成功!',
                        duration: 1000,
                    })
                }else {
                    this.$message({
                        type: 'success',
                        duration: 1000,
                        message: '下载模板失败!',
                    })
                }
            })
        }
    },
    created() {
        //console.log(process.env.BASE_API)
    }
}
</script>

<style scoped>

</style>
