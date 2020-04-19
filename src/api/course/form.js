
import course from "./course"
import Tinymce from '@/components/Tinymce'
export default {
    components: {Tinymce},
    data() {
        return{
            BASE_API: process.env.BASE_API,
            // 课程信息
            courseInfo: {
                id: this.$route.params.courseId || "",
                teacherId: "",
                childSubjectId: "",
                title: "",
                price: 0,
                lessonNum: 0,
                cover: "/static/img/11.jpg",
                parentSubjectId: "",
                description: "",
            },
            // 讲师列表
            teacherList: [],
            // 课程分类列表
            parentSubjectList:[],
            childSubjectList:[],
            saveBtnDisabled: false,
            imgWidth: 200
        }
    },
    methods: {
        // 添加课程
        saveCourse() {
            course.saveCourse(this.courseInfo).then(response => {
                if (response.success && response.data.courseId) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!',
                        duration: 1000,
                        onClose() {
                            this.$router.push({path:'/course/chapter/'+response.data.courseId})
                        }
                    })

                } else {
                    this.$message({
                        type: 'success',
                        duration: 1000,
                        message: '添加失败!',
                    })
                }
            })
        },
        //获取讲师列表
        getEduTeacherAll() {
            course.getEduTeacherAll().then(response => {
                this.teacherList = response.data.teacherList

            })
        },
        // 获取课程分类数据
        getAllSubject() {
            course.getAllSubject().then(response => {
                this.parentSubjectList = response.data.subjectList
                this.subjectChange(this.courseInfo.parentSubjectId,this.courseInfo.childSubjectId)
            })
        },
        // 课程分类二级联动
        subjectChange(id,value) {
            let data = this.parentSubjectList.filter(item => item.id == id)
            this.childSubjectList = data[0].children
            this.courseInfo.childSubjectId= value || ""
        },
        //上传封面之前
        beforeUploadCover() {},
        // 上传封面之后
        afterUploadCover(response) {
            this.courseInfo.cover = response.data.fileUrl
        },
        // 修改时查询数据
        getCourseById() {
            course.getCourseById(this.courseInfo.id).then(response => {
                this.courseInfo = response.data.courseInfo

            })
        },
        // 修改提交
        updateCourse() {
            course.updateCourse(this.courseInfo).then(response => {
                if(response.success){
                    this.$message({
                        type: 'success',
                        message: '修改成功!',
                        duration: 1000,
                        onClose: () => {
                            this.$router.push({path:'/course/chapter/'+this.courseInfo.id})
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
        //添加或修改提交
        saveOrUpdateCourse() {
            if(this.$route.params.courseId){
                this.updateCourse()
            }else {
                this.saveCourse()
            }
        }
    },
    created() {
        if(this.$route.params.courseId){
            this.getCourseById()
        }
        this.getEduTeacherAll();
        this.getAllSubject();
    }
}
