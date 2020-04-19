
import subject from '@/api/subject/subject'

export default {
    data() {
        return {
            subjectList: [],
            defaultProps: {
                label: 'title',
                children: 'children'
            },
            filterText: '',
            dialogFormVisible: false,
            subjectUI: {
                title: "",
                parentId: ""
            }
        }
    },
    methods: {
        // 查询分类信息
        getAllSubject() {
            subject.getAllSubject().then(response => {
                this.subjectList = response.data.subjectList
            })
        },
        // 过滤节点方法
        filterNode(value, data) {
            if (!value) return true
            return data.title.toUpperCase().indexOf(value.toUpperCase()) !== -1
        },
        //添加分类显示弹框
        append(data) {
            this.dialogFormVisible = true
            this.subjectUI.title = ""
            if(data) {
                this.subjectUI.parentId = data.id
            }else {
                this.subjectUI.parentId = ""
            }

        },
        // 删除分类
        remove(node, data) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                subject.deleteSubjectById(data.id).then(response => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: 1000
                        })
                        // 成功之后删除子节点
                        this.$refs.subjectTree.remove(node)
                    } else {
                        this.$message({
                            type: 'success',
                            duration: 1000,
                            message: '删除失败!',
                        })
                    }

                })

            }).catch(() => {})

        },
        // 添加一级
        saveParentSubject() {
            subject.saveParentSubject(this.subjectUI).then(response => {
                if (response.success) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!',
                        duration: 1000,
                        onClose: () => {
                            this.getAllSubject()
                        },
                    })

                } else {
                    this.$message({
                        type: 'success',
                        duration: 1000,
                        message: '删除失败!',
                    })
                }
                this.dialogFormVisible = false
            })
        },
        // 添加二级
        saveChildSubject() {
            subject.saveChildSubject(this.subjectUI).then(response => {
                if (response.success) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!',
                        duration: 1000,
                        onClose: () => {
                            this.getAllSubject()
                        },
                    })

                } else {
                    this.$message({
                        type: 'success',
                        duration: 1000,
                        message: '删除失败!',
                    })
                }
                this.dialogFormVisible = false
            })
        },
        // 添加一级，二级分类
        saveParentOrChildSubject() {
            if(this.subjectUI.parentId) {
                this.saveChildSubject()
            }else {
                this.saveParentSubject()
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.subjectTree.filter(val)
        }
    },
    created() {
        this.getAllSubject()
    }
}
