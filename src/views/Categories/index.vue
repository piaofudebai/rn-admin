<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片面板视图区域 -->
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <!-- 表格区域 -->
      <el-table
        :data="catList"
        style="width: 100%"
        border
        row-key="cat_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column width="50" label="#" prop="parentIndex" type="">
          <template v-slot="scope">
              <span v-if="scope.row.isIndex">{{scope.row.parentIndex}}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="cat_name"> </el-table-column>
        <el-table-column label="是否有效" prop="cat_id">
          <template> </template>
        </el-table-column>
        <el-table-column label="排序" prop="cat_level">
          <template v-slot="scope">
            <el-tag :type="tagList[scope.row.cat_level].type">{{
              tagList[scope.row.cat_level].label
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="">
          <template v-slot="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editor(scope.row)"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { categorList } from '@/api/categories'
export default {
  created () {
    this.categorList()
  },
  data () {
    return {
      catList: [],
      pagenum: 1,
      pagesize: 20,
      tagList: [
        { type: '', label: '一级' },
        { type: 'success', label: '二级' },
        { type: 'warning', label: '三级' }
      ]
    }
  },
  methods: {
    async categorList () {
      try {
        const res = await categorList({
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        this.catList = res.data.data.result
        console.log(this.catList)
        this.catList.forEach((item, index) => {
          item.isIndex = true
          item.parentIndex = index + 1
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box-card {
  margin-top: 15px;
  .el-button {
    margin-bottom: 15px;
  }
}
</style>
