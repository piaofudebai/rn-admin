<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-alert title="消息提示的文案" type="info" center show-icon> </el-alert>
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form>
        <el-tabs :tab-position="tabPosition" style="height: 2000px">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="ruleForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input
                  type="number"
                  autocomplete="off"
                  v-model="ruleForm.goods_price"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input
                  type="number"
                  autocomplete="off"
                  v-model="ruleForm.goods_weight"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input
                  type="number"
                  autocomplete="off"
                  v-model="ruleForm.goods_number"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader
                  :options="options"
                  v-model="value"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'cat_name',
                  }"
                >
                </el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 商品参数 -->
          <el-tab-pane label="商品参数">
            <el-form>
              <el-form-item
                v-for="item in AttributesList"
                :key="item.attr_id"
                :label="item.attr_name"
              >
                <el-checkbox label="大" border></el-checkbox>
                <el-checkbox label="小" border></el-checkbox>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 商品属性 -->
          <el-tab-pane label="商品属性">
            <el-form>
              <el-form-item
                v-for="item in AttrdataList"
                :key="item.attr_id"
                :label="item.attr_name"
              >
                <el-input></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 商品图片 -->
          <el-tab-pane label="商品图片">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <!-- 商品内容 -->
          <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 商品分类弹框 -->
  </div>
</template>

<script>
import { categoriesGoods, getAttributes } from '@/api/goods'
import { mapState } from 'vuex'
export default {
  created () {
    this.categoriesGoods()
    this.getAttributes()
    this.getAttrdata()
  },
  data () {
    return {
      // isactiveShow: false, // 弹框
      value: '',
      active: 0,
      tabPosition: 'left', // 侧边左侧显示
      ruleForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''

      },
      rules: {
        goods_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      options: [], // 分类食物
      AttributesList: [], // 商品参数
      AttrdataList: [] // 商品属性
    }
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    // 分类数据
    async categoriesGoods () {
      const res = await categoriesGoods({
        cat_pid: this.goodsList.cat_pid,
        cat_name: this.goodsList.cat_name,
        cat_level: this.goodsList.cat_levels
      })
      this.options = res.data.data
      this.$store.commit('setoptions', res.data.data)
      // console.log(this.options)
    },
    // 商品参数
    async getAttributes () {
      try {
        const res = await getAttributes({
          id: 6,
          sel: ['many']
        })
        // console.log(res)
        this.AttributesList = res.data.data
        // console.log(this.AttributesList)
      } catch (err) {
        console.log(err)
      }
    },
    // 商品属性
    async getAttrdata () {
      try {
        const res = await getAttributes({
          id: 6,
          sel: ['only']
        })
        // console.log(res)
        this.AttrdataList = res.data.data
        console.log(this.AttrdataList)
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {
    ...mapState(['goodsList'])
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
</style>
