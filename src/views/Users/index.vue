<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片面板视图区域 -->
    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="searchtext"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchbtn"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="success" class="colorbtn" @click="isAddShow = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="#" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#62b9aa"
              @change="switchStatus($event, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editor(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delUser(scope.row)"
            ></el-button>
            <!-- 修改按钮 -->
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="mini"
              @click="RoleShowid(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加弹层 -->
    <el-dialog title="编辑用户" :visible.sync="isAddShow" width="30%">
      <el-form :model="loginForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="loginForm.username">123</el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="loginForm.password">123</el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="loginForm.email">123</el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.trim="loginForm.mobile">123</el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddShow = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹层 -->
    <el-dialog title="编辑用户" :visible.sync="dialogVisible" width="30%">
      <el-form :model="userForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="userForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.trim="userForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!--删除弹层  -->
    <el-dialog title="提示" :visible.sync="isdelShow" width="30%">
      <i class="el-icon-warning"></i>
      <span>此操作将永久删除该用户, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isdelShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="isRoleShow" width="30%">
      <p>当前的用户: admin</p>
      <p>当前的角色: 超级管理员</p>
      <div>
        分配新角色：<el-select v-model="value">
          <el-option
            v-for="item in rolename"
            :key="item.id"
            :value="item.id"
            :label="item.roleName"
          ></el-option
        ></el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRoleShow = false">取 消</el-button>
        <el-button type="primary" @click="RoleShow()">确 定</el-button>
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
import { mapState } from 'vuex'
import { getUserList, addUser, putUser, searchUser, bianjiUser, DelUser, rolesUser } from '@/api/user.js'
export default {
  name: 'UserIndex',
  created () {
    this.getUserList()
    // console.log(this.rolename.id)
    // this.getroleList()
  },
  data () {
    return {
      value: '', // 存的角色id
      searchtext: '',
      queryInfo: '',
      pagenum: 1, // 当前页码
      pagesize: 5, // 每页显示条数
      total: null, // 总条数
      userList: [], // 用户数据列表
      dialogVisible: false, // 编辑弹层
      isdelShow: false, // 删除弹层
      isRoleShow: false, // 分配角色弹层
      isAddShow: false, // 添加用户
      loginForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      id: null, // 得到当前删除按钮点击的id,
      Roleid: null,
      jueseid: null,
      // 点击id出现弹框
      userForm: {
        mobile: '',
        email: '',
        id: '',
        username: '',
        rid: ''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, min: 2, max: 7, message: '用户名不能为空且长度必须在3到7位之间', trigger: 'blur' }
        ],
        password: [
          { min: 4, max: 6, required: true, message: '密码不能为空且长度必须在4到6之间', trigger: 'blur' }
        ],
        mobile: [
          { required: true, pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机格式不对', trigger: 'blur' }
        ],
        email: [
          { required: true, pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不对', trigger: 'blur' }
        ]
      },
      currentPage1: 5, // 分页
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    //* 用户数据列表√
    async getUserList () {
      try {
        const res = await getUserList({
          query: this.queryInfo,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        // console.log(res)
        this.userList = res.data.data.users
        this.total = res.data.data.total
        console.log(this.userList)
      } catch (err) {
        console.log(err)
      }
    },
    //* 状态切换√
    async switchStatus (val, row) {
      await putUser({
        uId: row.id,
        type: row.mg_state
      })
      // console.log(res)
      // console.log(this.mg_state)
      if (this.mg_state === true) {
        this.$message.success('修改用户状态成功')
        this.mg_state = false
      } else {
        this.$message.success('修改用户状态成功')
        this.mg_state = true
      }
    },
    //* 添加√
    async addUser () {
      try {
        await addUser(
          { ...this.loginForm }
        )
        // console.log('211行', res)
        this.isAddShow = false // 关闭弹层
        this.getUserList() // 调用接口重新发起请求刷新数据
      } catch (err) {
        console.log(err)
      }
    },
    //* query输入框带值搜索√
    async searchbtn () {
      try {
        const res = await getUserList(
          {
            query: this.searchtext,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          })
        this.userList = res.data.data.users
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    //* 编辑√
    async editor (row) {
      // console.log(row)
      this.dialogVisible = true
      try {
        const res = await searchUser({ id: row.id })
        console.log(res)
        this.userForm = res.data.data
        console.log(this.userForm)
      } catch (err) {
        console.log(err)
      }
    },
    //* 编辑完成提交√
    async dialogUser () {
      try {
        // console.log(this.userForm.id)
        const res = await bianjiUser({
          id: this.userForm.id,
          mobile: this.userForm.mobile,
          email: this.userForm.email
        })
        // this.userList.push(res.data.data)
        console.log(res)
        this.getUserList()
        this.dialogVisible = false
      } catch (err) {
        console.log(err)
      }
    },
    //* 删除√
    delUser (row) {
      this.isdelShow = true
      this.id = row.id
    },
    //* 实现删除功能√
    async deleteUser () {
      try {
        await DelUser({ id: this.id })
        // console.log(res)
        this.getUserList()
        this.isdelShow = false
      } catch (err) {
        console.log(err)
      }
    },
    //* 分页效果√
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    //* 获取当前页√
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 当前点击需要修改的id
    RoleShowid (row) {
      this.isRoleShow = true
      this.Roleid = row.id
    },
    // 分配角色
    async RoleShow () {
      // this.isRoleShow = true
      try {
        const res = await rolesUser({
          id: this.Roleid,
          rid: this.value
        })
        this.isRoleShow = false
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {
    ...mapState(['rolename'])
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
.el-card {
  box-shadow: rgb(0, 0, 0, 0.15);
  .colorbtn {
    background-color: #62b9aa;
    border: none;
  }
  .el-row {
    margin-bottom: 15px;
  }
}
</style>
