<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>

        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="课程确认"/>
        </el-steps>

        <el-form label-width="120px" ref="form" :model="courseInfo">
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
            </el-form-item>

            <!-- 所属分类 级联下拉列表 TODO -->
            <!-- 一级分类 -->
            <el-form-item label="课程类别">
                <el-select placeholder="请选择" v-model="courseInfo.parentSubjectId" @change="subjectChange" autocomplete>
                    <el-option
                        v-for="subject in parentSubjectList"
                        :key="subject.id"
                        :label="subject.title"
                        :value="subject.id"
                    />
                </el-select>

                <!-- 二级分类 -->
                <el-select  placeholder="请选择" v-model="courseInfo.childSubjectId">
                    <el-option
                        v-for="subject in childSubjectList"
                        :key="subject.id"
                        :label="subject.title"
                        :value="subject.id"

                    />
                </el-select>
            </el-form-item>

            <!-- 课程讲师 TODO -->
            <el-form-item label="课程讲师">
                <el-select v-model="courseInfo.teacherId" placeholder="请选择">
                    <el-option
                        v-for="teacher in teacherList"
                        :key="teacher.id"
                        :label="teacher.name"
                        :value="teacher.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="总课时">
                <el-input-number
                    :min="0"
                    controls-position="right"
                    placeholder="请填写课程的总课时数"
                    v-model="courseInfo.lessonNum"
                />
            </el-form-item>

            <!-- 课程简介 TODO -->
            <el-form-item label="课程简介">
                <tinymce :height="300" v-model="courseInfo.description"/>
            </el-form-item>
            <!-- 课程封面 TODO -->
            <el-form-item label="课程封面">
                <el-upload
                    :show-file-list="false"
                    :on-success="afterUploadCover"
                    :before-upload="beforeUploadCover"
                    :action="BASE_API+'/oss/fileUpload'"
                    class="avatar-uploader">
                    <img :src="courseInfo.cover" :style="'width:'+ imgWidth + 'px' ">
                </el-upload>
            </el-form-item>
            <!-- 课程价格 TODO -->
            <el-form-item label="课程价格">
                <el-input-number
                    :min="0"
                    controls-position="right"
                    placeholder="免费课程请设置为0元"
                    v-model="courseInfo.price"
                />
                元
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdateCourse">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script src="../../api/course/form.js"></script>
<style scoped>
.tinymce-container {
    line-height: 29px;
}
</style>
