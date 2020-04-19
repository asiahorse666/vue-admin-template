<template>
    <div class="app-container">

        <h2 style="text-align: center;">发布新课程</h2>

        <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="课程确认"/>
        </el-steps>

        <div class="ccInfo">
            <img :src="courseConfirm.cover">
            <div class="main">
                <h2>{{courseConfirm.courseTitle}}</h2>
                <p class="gray"><span>共{{courseConfirm.lessonNum}}课时</span></p>
                <p><span>所属分类：{{courseConfirm.parentSubject}}-{{courseConfirm.childSubject}}</span></p>
                <p>课程讲师：{{courseConfirm.teacherName}}</p>
                <h3 class="red">￥{{courseConfirm.price}}</h3>
            </div>
        </div>
        <div>
            <el-button @click="previous">返回修改</el-button>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
        </div>
    </div>
</template>

<script>
import course from '@/api/course/course'
export default {
    data() {
        return {
            courseConfirm: {},
            saveBtnDisabled: false
        }
    },
    methods: {
        // 根据courseId 查询课程信息，讲师信息，所有分类信息
        getCourseConfirm() {
            course.getCourseConfirm(this.$route.params.courseId).then(response => {
                this.courseConfirm = response.data.courseConfirm
            })
        },
        //返回修改
        previous() {
            this.$router.push({path:"/course/chapter/"+ this.$route.params.courseId})
        },
        //发布课程 提交请求
        publish() {

            this.$confirm('确定要发布该课程吗？？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                course.updateCourseStatus(this.$route.params.courseId).then(response => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '发布课程成功!',
                            duration: 1000,
                            onClose: () => {
                                this.$router.push({path: "/course/list"})
                            }
                        })

                    } else {
                        this.$message({
                            type: 'success',
                            duration: 1000,
                            message: '发布课程失败!',
                        })
                    }

                })

            }).catch(() => {})
        }
    },
    created() {
        this.getCourseConfirm()
    }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>
