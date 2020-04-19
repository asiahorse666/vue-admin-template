<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacherParam.name"/>
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input v-model="teacherParam.sort" controls-position="right" min="0"/>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacherParam.level" clearable placeholder="请选择">
                    <!--
                      数据类型一定要和取出的json中的一致，否则没法回填
                      因此，这里value使用动态绑定的值，保证其数据类型是number
                    -->
                    <el-option :value="1" label="高级讲师"/>
                    <el-option :value="2" label="首席讲师"/>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacherParam.career"/>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacherParam.intro" :rows="10" type="textarea"/>
            </el-form-item>

            <!-- 讲师头像：TODO -->
            <el-form-item label="讲师头像">
                <!-- 头衔缩略图 -->
                <pan-thumb :image="teacherParam.avatar+ '?time=' + Math.random()"/>
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>

                <!--
                v-show：是否显示上传组件
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                :url：后台上传的url地址
                @close：关闭上传组件
                @crop-upload-success：上传成功后的回调-->
                <image-cropper
                    v-show="imagecropperShow"
                    :width="300"
                    :height="300"
                    :key="imagecropperKey"
                    :url="fileApi"
                    field="file"
                    @close="close"
                    @crop-upload-success="cropSuccess"
                />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="insertOrUpdateHandler">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import teacher from '@/api/teacher'
import imageCropper from '@/components/ImageCropper'
import panThumb from '@/components/PanThumb'
export default {
    data() {
        return {
            teacherParam: {
                id: this.$route.params.teacherId,
                name: "",
                sort: 0,
                level: "",
                career: "",
                intro: "",
                avatar: ""
            },
            imagecropperKey: 0,
            imagecropperShow: false,
            BASE_API: ''//"http://localhost:8010",

        }
    },
    computed: {
        fileName() {
            let {avatar} = this.teacherParam
            let strArr = avatar.split("/")
            //console.log(strArr[strArr.length-1])
            return strArr[strArr.length-1];
        },
        fileApi() {
            //console.log(this.teacherParam.avatar)
            if(this.teacherParam.avatar){
                return this.BASE_API+'/oss/fileUpdate/' + this.fileName
            }else {
                return this.BASE_API+'/oss/fileUpload'
            }
        }
    },
    methods: {
        // 添加讲师
        insertTeacher() {
            teacher.insertTeacher(this.teacherParam).then(response => {
                if(response.success){
                    this.$message({
                        type: 'success',
                        message: '添加成功!',
                        duration: 1000,
                        onClose: () => {
                            this.$router.push('/teacher/table')
                        },
                    })
                }else {
                    this.$message({
                        type: 'success',
                        duration: 1000,
                        message: '添加失败!',
                    })
                }
            })
        },
        // 根据id查询讲师
        getTeacherById() {
            teacher.getTeacherById(this.teacherParam.id).then(response => {
                this.teacherParam = response.data.teacher
            })
        },
        // 修改讲师
        UpdateTeacher() {
            teacher.UpdateTeacher(this.teacherParam).then(response => {
                if(response.success){
                    this.$message({
                        type: 'success',
                        message: '修改成功!',
                        duration: 1000,
                        onClose: () => {
                            this.$router.push('/teacher/table')
                        },
                    })
                }else {
                    this.$message({
                        type: 'success',
                        duration: 1000,
                        message: '修改失败!',
                    })
                }
            })
        },
        // 判断讲师添加或修改
        insertOrUpdateHandler() {
            if (!this.$route.params.teacherId) {
                this.insertTeacher()
            }else {
                this.UpdateTeacher()
            }
        },
        // 关闭上传头像
        close() {
            this.imagecropperShow= false
            this.imagecropperKey++
        },
        // 上传成功后的回调
        cropSuccess(response) {
            this.teacherParam.avatar = response.fileUrl
            this.imagecropperShow= false
            this.imagecropperKey++
        }
    },
    created() {
        if (this.$route.params.teacherId) {
            this.getTeacherById()
        }
    },
    components: {imageCropper,panThumb}

}
</script>

<style scoped>

</style>
