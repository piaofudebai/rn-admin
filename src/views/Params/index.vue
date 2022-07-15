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
          v-model="cat_id"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id',
          }"
        >
        </el-cascader>
      </div>
      <el-tabs v-model="name" @tab-click="handleClick">
        <!-- d动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="success" @click="addCategories">添加属性</el-button>
          <el-table border :data="attributeList">
            <el-table-column width="50" label="" type="expand">
              <template v-slot="scope">
                <el-tag
                  closable
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  >{{ item }}</el-tag
                >
                <el-button class="button-new-tag" size="small"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              width="150"
              label="#"
              prop="attr_id"
            ></el-table-column>
            <el-table-column
              label="分类名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <!-- 编辑按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editorbtn(scope.row)"
                  >编辑</el-button
                >
                <!-- 删除按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="delBtn(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="success">添加属性</el-button>
          <el-table border :data="attributeList">
            <el-table-column width="50" label="" type="expand">
              <template v-slot="scope">
                <el-tag
                  closable
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  >{{ item }}</el-tag
                >
                <el-button class="button-new-tag" size="small"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              width="50"
              label="#"
              prop="attr_id"
            ></el-table-column>
            <el-table-column
              label="分类名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <!-- 编辑按钮 -->
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editorbtn(scope.row)"
                  >编辑</el-button
                >
                <!-- 删除按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="delBtn(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加弹层 -->
    <el-dialog title="提示" :visible.sync="isaddShow" width="30%">
      <el-form :model="autorForm" :rules="rules">
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model.trim="autorForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isaddShow = false">取 消</el-button>
        <el-button type="primary" @click="isaddBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹层 -->
    <el-dialog title="编辑用户" :visible.sync="dialogVisible" width="30%">
      <el-form :model="autorForm" :rules="rules">
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model.trim="autorForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="visibleBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!--删除弹层  -->
    <el-dialog title="提示" :visible.sync="isdelShow" width="30%">
      <i class="el-icon-warning"></i>
      <span>此操作将永久删除该用户, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isdelShow = false">取 消</el-button>
        <el-button type="primary" @click="isdelBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { putCategories, delCategories, addCategories } from '@/api/categories'
import { getAttributes } from '@/api/goods'
import { mapState } from 'vuex'
// import { getAttributes } from '@/api/goods'
export default {
  created () {
    // console.log(this.options)
  },
  data () {
    return {
      value: '',
      name: 'many',
      cat_id: [],
      attributeList: [],
      autorForm: {
        attr_name: '',
        id: null,
        attrId: null,
        attr_sel: '',
        attr_vals: ''
      },
      rules: {
        attr_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      isdelShow: false,
      isaddShow: false,
      attr_vals: '',
      sel: ''
    }
  },
  methods: {
    async handleClick (val) {
      // console.log(val.name
      this.sel = val.name
      try {
        const res = await getAttributes({
          id: this.cat_id[this.cat_id.length - 1],
          sel: val.name
        })
        this.attributeList = res.data.data
        // console.log(this.attributeList)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取编辑提交的参数
    editorbtn (row) {
      console.log(row)
      this.dialogVisible = true
      // console.log(row.cat_id, row.attr_id)
      this.autorForm.id = row.cat_id
      this.autorForm.attrId = row.attr_id
      this.autorForm.attr_sel = row.attr_sel
      this.autorForm.attr_vals = row.attr_vals
      console.log(this.autorForm)
    },
    // 编辑提交发起请求
    async visibleBtn () {
      try {
        const res = await putCategories({ ...this.autorForm })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    delBtn (row) {
      this.isdelShow = true
      this.autorForm.id = row.cat_id
      this.autorForm.attrId = row.attr_id
    },
    async isdelBtn () {
      try {
        const res = await delCategories({
          ...this.autorForm
        })
        console.log(res)
        this.isdelShow = false
      } catch (err) {
        console.log(err)
      }
    },
    // 获取添加信息
    addCategories () {
      this.isaddShow = true
    },
    // 点击发送添加请求
    async isaddBtn () {
      // console.log()
      try {
        const res = await addCategories({
          id: this.cat_id[this.cat_id.length - 1],
          attr_name: this.autorForm.attr_name,
          attr_sel: this.sel,
          attr_vals: this.attr_vals
        })
        console.log(res)
        this.isaddShow = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['options'])
  },
  watch: {},
  filters: {},
  components: {},
  autorFrom: {
    attr_name: ''
  },
  isaddShow: false // 添加弹层显示

}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
}
.goods {
  margin: 15px 0;
}
.el-table {
  margin: 15px 0;
}
:deep(.el-tag) {
  margin-left: 30px;
}
.el-button {
  margin-left: 30px;
}
</style>
