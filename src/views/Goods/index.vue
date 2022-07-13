<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="searchgoodstext"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchgoods"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            class="colorbtn"
            @click="$router.push('/home/add')"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 商品列表区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column width="50" label="#" prop="goods_id"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          width="150"
          label="商品价格(元)"
          prop="goods_price"
        ></el-table-column>
        <el-table-column
          width="150"
          label="商品重量"
          prop="goods_weight"
        ></el-table-column>
        <el-table-column width="150" label="创建时间" prop="upd_time">
        </el-table-column>
        <el-table-column width="250" label="操作">
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
    <!-- 实现分页效果 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 5, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoods } from '@/api/goods'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      pagenum: 1, // 页数
      pagesize: 20, // 条数
      total: null, // 总条数
      goodsList: [], // 商品列表数据
      searchgoodstext: '' // 搜索框文字
    }
  },
  methods: {
    //* 商品列表√
    async getGoodsList () {
      try {
        const res = await getGoods({
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        // console.log(res)
        this.goodsList = res.data.data.goods
        this.$store.commit('setgoodsList', res.data.data.goods)
        // console.log(this.goodsList)
      } catch (err) {
        console.log(err)
      }
    },
    //* 带值搜索√
    async searchgoods () {
      try {
        const res = await getGoods({
          query: this.searchgoodstext,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        // console.log(res)
        this.goodsList = res.data.data.goods
      } catch (err) {
        console.log(err)
      }
    },
    //* 分页效果√
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getGoodsList()
    },
    //* 获取当前页√
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getGoodsList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
