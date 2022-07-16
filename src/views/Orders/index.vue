<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="ordersText"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 商品列表区域 -->
      <el-table :data="ordersList" border stripe>
        <el-table-column width="50" label="#" prop="order_id"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column
          width="150"
          label="订单价格"
          prop="order_price"
        ></el-table-column>
        <el-table-column width="150" label="是否付款" prop="pay_status">
          <template v-slot="scope">
            <el-tag
              effect="dark"
              v-if="scope.row.pay_status === '0'"
              :type="tagList[1].type"
              >{{ tagList[1].label }}</el-tag
            >
            <el-tag effect="dark" v-else :type="tagList[1].type">{{
              tagList[1].label
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="150" label="是否发货" prop="is_send">
        </el-table-column>
        <el-table-column width="150" label="下单时间" prop="create_time">
        </el-table-column>
        <el-table-column width="250" label="操作">
          <template>
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="isordersShow = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--编辑弹层  -->
    <el-dialog title="修改收获地址" :visible.sync="isordersShow" width="30%">
      <div class="block">
        <span class="demonstration"></span>
        <el-cascader :options="cityOptions" :value="city" change-on-select>
        </el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isdelShow = false">取 消</el-button>
        <el-button type="primary" @click="isordersShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 实现分页效果 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import cityOptions from '@/components/city_data2017_element.js'
import { getOrders } from '@/api/orders'
export default {
  created () {
    this.getOrders()
  },
  data () {
    return {
      value: [],
      total: null, // 总条数
      cityOptions: cityOptions,
      city: '',
      ordersText: '',
      pagenum: 1,
      pagesize: 5,
      ordersList: [],
      isordersShow: false,
      tagList: [
        { type: 'success', label: '已支付' },
        { type: 'danger', label: '未支付' }
      ]

    }
  },
  methods: {
    async getOrders () {
      try {
        const res = await getOrders({
          query: '',
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        this.ordersList = res.data.data.goods
        this.total = res.data.data.total
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    //* 分页效果√
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getOrders()
    },
    //* 获取当前页√
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getOrders()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-card {
  margin-top: 15px;
  .el-row {
    margin-bottom: 15px;
  }
}
</style>
