<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-card>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column width="50" label="#" prop="id"> </el-table-column>
        <el-table-column label="权限名称" prop="authName"> </el-table-column>
        <el-table-column label="路径" prop="path"> </el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template v-slot="scope">
            <el-tag :type="tagList[scope.row.level].type">{{
              tagList[scope.row.level].label
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getrightsList } from '@/api/roles'
export default {
  async created () {
    try {
      const res = await getrightsList('list')
      // console.log(res)
      this.list = res.data.data
      console.log(this.list)
      this.$store.commit('setrights', res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      list: [],
      tagList: [
        { type: '', label: '等级一' },
        { type: 'success', label: '等级二' },
        { type: 'warning', label: '等级三' }
      ]
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-card {
  margin-top: 20px;
}
</style>
