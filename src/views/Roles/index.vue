<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片面板视图区域 -->
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <!-- 表格区域 -->
      <el-table :data="roleList" style="width: 100%" border>
        <el-table-column width="50" label="#" type="expand">
          <template v-slot="scope">
            <el-row
              :gutter="20"
              v-for="item in scope.row.children"
              :key="item.id"
            >
              <!-- 1 -->
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-tag>{{ item.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i></div
              ></el-col>
              <!-- 第二列 -->
              <el-col :span="14">
                <el-row v-for="item2 in item.children" :key="item2.id">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <el-tag type="success">{{ item2.authName }}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </div>
                  </el-col>
                  <!-- 第三行 -->
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <el-tag
                        closable
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        @close="handleClose(scope.row.id, item3.id)"
                        >{{ item3.authName }}</el-tag
                      >
                    </div></el-col
                  >
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column width="50" label="#" prop="id"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" prop="desc">
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
            <!-- 分配权限 -->
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="mini"
              @click="RoleShow(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限弹层 -->
    <el-dialog title="分配角色" :visible.sync="isRoleShow" width="30%">
      <el-tree
        :data="dataList"
        show-checkbox
        node-key="id"
        @check-change="nodeclick"
        default-expand-all
        :default-checked-keys="[5]"
        :props="defaultProps"
      >
      </el-tree>
      <div class="btn-footer">
        <span>
          <el-button>取消</el-button>
          <el-button type="primary" @click="autorbtn">确定</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 删除分类 -->
    <el-dialog title="提示" :visible.sync="istagShow" width="30%">
      <i class="el-icon-warning"></i>
      <span>此操作将永久删除该分类, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="istagShow = false">取 消</el-button>
        <el-button type="primary" @click="tagShow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, getrightsTree, delrights, autorrights } from '@/api/roles'
export default {
  created () {
    this.getRoles()
    this.getrightsTree()
  },
  data () {
    return {
      roleList: [], // 总数据
      isRoleShow: false,
      istagShow: false,
      rolesId: 0, // 角色id
      rightId: 0, // 权限id
      tag: '',
      dataList: [], // 树形控件数据
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      autorList: [],
      autorId: ''
    }
  },
  methods: {
    async getRoles () {
      try {
        const res = await getRoles()
        // console.log(res)
        this.roleList = res.data.data
        // console.log(this.roleList)
        this.$store.commit('setrolename', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    RoleShow (row) {
      this.isRoleShow = true
      this.rolesId = row.id
    },
    handleClose (roleId, rightId) {
      this.istagShow = true
      // this.tag = tag
      console.log(roleId, rightId)
      this.rolesId = roleId
      this.rightId = rightId
    },
    async tagShow () {
      try {
        const res = await delrights({
          roleId: this.rolesId,
          rightId: this.rightId
        })
        console.log(res)
        this.istagShow = false
        this.getRoles()
      } catch (err) {
        console.log(err)
      }
    },

    async getrightsTree () {
      try {
        const res = await getrightsTree('tree')
        // console.log(res)
        this.dataList = res.data.data
        console.log(this.dataList)
      } catch (err) {
        console.log(err)
      }
    },
    nodeclick (data) {
      // console.log(data)
      this.autorList.push(data)
      // console.log(this.autorList)
      const arr = []
      this.autorList.forEach(item =>
        arr.push(item.id)
      )
      // console.log(this.autorId)

      this.autorId = arr.join(',')
      console.log(this.autorId)
    },
    async autorbtn () {
      try {
        const res = await autorrights({
          roleId: this.rolesId,
          rids: this.autorId
        })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
  },
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-row {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
  }
  .el-tag {
    border-color: #d9ecff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    margin: 10px 0 10px 20px;
  }
  :deep(.btn-footer) {
    padding: 10px 20px 20px;
    text-align: right;
    box-sizing: border-box;
  }
}
</style>
