<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片面板 -->
    <el-card>
      <!-- 提示 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      >
      </el-alert>
      <!-- 选择 -->
      <div class="goods">
        选择商品分类：
        <el-cascader
          :options="options"
          v-model="value"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
          }"
        >
        </el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="success">添加属性</el-button>
          <el-table border>
            <el-table-column width="50" label=""></el-table-column>
             <el-table-column width="50" label="#"></el-table-column>
              <el-table-column label="分类名称"></el-table-column>
             <el-table-column label="操作"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    console.log(this.options)
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {},
  computed: {
    ...mapState(['options'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
}
.goods {
  margin: 15px 0;
}
.el-table{
  margin: 15px 0;
}
</style>
