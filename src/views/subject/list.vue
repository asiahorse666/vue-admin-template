<template>
    <div class="app-container">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
        <el-button type="text" @click="append(false)" >添加一级分类</el-button>
        <el-tree
            ref="subjectTree"
            :data="subjectList"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all
            node-key="id"
        >
           <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <!-- 使用Chrome的Vue插件调试 -->
                  <el-button
                      v-if="node.level == 1"
                      type="text"
                      size="mini"
                      @click="() => append(data)">添加</el-button>
                  <el-button

                      type="text"
                      size="mini"
                      @click="() => remove(node, data)">删除</el-button>
                </span>
              </span>
        </el-tree>
<!--        添加分类弹框-->
        <el-dialog :visible.sync="dialogFormVisible" title="添加分类">
            <el-form :model="subjectUI" label-width="120px">
                <el-form-item label="分类标题">
                    <el-input v-model="subjectUI.title"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveParentOrChildSubject()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script src="../../api/subject/list.js"></script>

<style scoped>

</style>
