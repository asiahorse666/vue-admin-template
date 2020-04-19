
import chapterApi from './chapterApi'
import sectionApi from './sectionApi'

export default {
    data() {
        return {
            chapterSectionList: [],
            chapterParam: {
                courseId: this.$route.params.courseId,
                title: "",
                sort: 0
            },
            sectionParam: {
                courseId: this.$route.params.courseId,
                chapterId: "",
                title: "",
                sort: 0,
                isFree: false
            },
            // chapter弹框状态
            chapterFormVisible: false,
            // section弹框状态
            sectionFormVisible: false,
            saveChapterBtnDisabled: false,
            saveSectionBtnDisabled: false
        }

    },
    methods: {
        // 查询courseId下所有的章节以及下面的小节
        getChapterSection() {
            chapterApi.getChapterSectionByCourseId(this.chapterParam.courseId).then(response => {
                this.chapterSectionList = response.data.chapterSections;
            })
        },
        // chapter弹框的显示
        showChapterModal(chapterId) {
            this.chapterFormVisible = true
            // 有值表示修改
            if(chapterId){
                this.getChapterById(chapterId)
            }else {
                this.chapterParam =  {
                    courseId: this.$route.params.courseId,
                    title: "",
                    sort: 0
                }
            }
        },

        // 根据id查询chapter
        getChapterById(chapterId) {
            chapterApi.getChapterById(chapterId).then(response => {
                this.chapterParam = response.data.chapter;
            })
        },

        // 添加chapter提交
        saveChapter() {
            chapterApi.saveChapter(this.chapterParam).then(response => {
                if (response.success) {
                    this.$message.success('添加成功!')
                    this.getChapterSection()
                    this.chapterFormVisible = false
                } else {
                    this.$message.error('添加成功!')
                }
            })
        },

        // 修改chapter提交
        updateChapter() {
            chapterApi.updateChapter(this.chapterParam).then(response => {
                if (response.success) {
                    this.$message.success("修改成功")
                    this.getChapterSection()
                    this.chapterFormVisible = false
                } else {
                    this.$message.error('修改失败')
                }
            })
        },

        // 添加或修改chapter提交
        saveOrUpdateChapter() {
            if(this.chapterParam.id) {
                this.updateChapter()
            }else {
                this.saveChapter()
            }
        },

        //删除chapter
        deleteChapte(chapterId) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                chapterApi.deleteChapterById(chapterId).then(response => {
                    if (response.success) {
                        this.$message.success("删除成功")
                        this.getChapterSection()
                    } else {
                        this.$message.error('删除失败')
                    }
                })
            }).catch(() => {})
        },

        /****************************** section ***********************************/
        // section弹框的显示
        showSectionModal(chapterId, sectionId) {
            this.sectionFormVisible = true
            // 有值表示修改
            if(sectionId){
                this.getSectionById(sectionId)
            }else {
                this.sectionParam =  {
                    courseId: this.$route.params.courseId,
                    chapterId: "",
                    title: "",
                    sort: 0,
                    isFree: false
                }
            }
            this.sectionParam.chapterId = chapterId
        },
        // 根据id查询section
        getSectionById(sectionId) {
            sectionApi.getSectionById(sectionId).then(response => {
                this.sectionParam = response.data.section;
            })
        },
        // 添加
        saveSection() {
            sectionApi.saveSection(this.sectionParam).then(response => {
                if (response.success) {
                    this.$message.success('添加成功!')
                    this.getChapterSection()
                    this.sectionFormVisible = false
                } else {
                    this.$message.error('添加成功!')
                }
            })
        },
        // 修改chapter提交
        updateSection() {
            this.sectionParam.gmtCreate = ''
            this.sectionParam.gmtModified = ''
            sectionApi.updateSection(this.sectionParam).then(response => {
                if (response.success) {
                    this.$message.success("修改成功")
                    this.getChapterSection()
                    this.sectionFormVisible = false
                } else {
                    this.$message.error('修改失败')
                }
            })
        },

        // 添加或修改chapter提交
        saveOrUpdateSection() {
            if(this.sectionParam.id) {
                this.updateSection()
                console.log(111)
            }else {
                this.saveSection()
                console.log(222)
            }
        },

        //删除chapter
        deleteSection(setionId) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                sectionApi.deleteSectionById(setionId).then(response => {
                    if (response.success) {
                        this.$message.success("删除成功")
                        this.getChapterSection()
                    } else {
                        this.$message.error('删除失败')
                    }
                })
            }).catch(() => {})
        },
    },
    created() {
        this.getChapterSection();
    }
}
