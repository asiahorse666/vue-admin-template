<template>
    <div class="app-container">
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="queryCourse.title" placeholder="课程名称"/>
            </el-form-item>

            <el-form-item>
                <el-select v-model="queryCourse.status" clearable placeholder="课程状态">
                    <el-option value="Normal" label="已发布"/>
                    <el-option value="Draft" label="未发布"/>
                </el-select>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getCoursePageCondition()">查询</el-button>
            <el-button type="default" @click="queryCourse = {}">清空</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table
            :data="courseList"
            border
            fit
            highlight-current-row>

            <el-table-column
                label="序号"
                width="70"
                align="center">
                <template slot-scope="scope">
                    {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="title" label="课程名称" width="80" />

            <el-table-column label="课程状态" width="80">
                <template slot-scope="scope">
                    {{ scope.row.status==='Normal'?'已发布':'未发布' }}
                </template>
            </el-table-column>

            <el-table-column prop="lessonNum" label="课时数" />
            <el-table-column prop="price" label="价格" />

            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/course/form/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
                    </router-link>
                    <router-link :to="'/course/chapter/'+scope.row.id">
                        <el-button type="success" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteCourse(scope.row.id)">删除课程信息</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            :current-page="pageNum"
            :page-size="pageSize"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getCoursePageChange"
        />
    </div>
</template>


<script>

import course from '@/api/course/course'

export default {
    data() {
        return{
            queryCourse:{},
            courseList: [],
            pageNum: 1,
            pageSize: 5,
            total:0
        }
    },
    methods: {
        // 查询
        getCoursePageCondition() {
            course.queryCoursePageByCondition(this.pageNum, this.pageSize, this.queryCourse).then(response => {
                this.courseList = response.data.courseList
                this.total =  response.data.total
            })
        },
        // 翻页
        getCoursePageChange(pageNum) {
            this.pageNum = pageNum
            this.getCoursePageCondition()
        },
        // 删除课程
        deleteCourse(id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                course.deleteCourseById(id).then(response => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: 1000,
                            onClose() {
                                this.getCoursePageCondition()
                            }
                        })

                    } else {
                        this.$message({
                            type: 'success',
                            duration: 1000,
                            message: '删除失败!',
                        })
                    }

                })

            }).catch(() => {})
        }
    },
    created() {
        this.getCoursePageCondition()
    }
}

</script>

<style scoped>

</style>
