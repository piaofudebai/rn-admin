<template>
  <!-- 标题 -->
  <el-container class="container">
    <!-- 头部导航 -->
    <el-header>
      <template>
        <img src="@/assets/tx.jpeg" alt="" />
      </template>
      绍兴容娜贸易有限公司
      <el-button @click="$router.back()">退出</el-button>
    </el-header>
    <!-- /头部 -->
    <el-container>
      <el-aside width="200px" class="dh" :class="{ asidebtn: isCollapse }">
        <!-- 折叠面板 -->
        <div
          class="toggleMenu"
          @click="asideBtn"
          :class="{ asidebtn: isCollapse }"
        >
          |||
        </div>
        <el-menu
          unique-opened
          background-color="#4a5864"
          text-color="#fff"
          router
          :collapse="isCollapse"
        >
          <!-- 第一行 -->
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-user-solid"></i>
              <span slot="title">客户管理</span>
            </template>
            <el-menu-item index="users"
              ><i class="el-icon-menu"></i>客户列表</el-menu-item
            >
          </el-submenu>
          <!-- 第二行 -->
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="roles"
              ><i class="el-icon-menu"></i>角色列表</el-menu-item
            >
            <el-menu-item index="rights"
              ><i class="el-icon-menu"></i>权限列表</el-menu-item
            >
          </el-submenu>
          <!-- 第三行 -->
          <el-submenu index="3">
            <template #title>
              <i class="el-icon-s-shop"></i>
              <span slot="title">商品管理 </span>
            </template>
            <el-menu-item index="goods"
              ><i class="el-icon-menu"></i>商品列表</el-menu-item
            >
            <el-menu-item index="params"
              ><i class="el-icon-menu"></i>分类列表</el-menu-item
            >
            <el-menu-item index="categories"
              ><i class="el-icon-menu"></i>商品列表</el-menu-item
            >
          </el-submenu>
          <!-- 第四行 -->
          <el-submenu index="4">
            <template #title>
              <i class="el-icon-s-claim"></i>
              <span slot="title">订单管理 </span>
            </template>
            <el-menu-item index="orders"
              ><i class="el-icon-menu"></i>订单列表</el-menu-item
            >
          </el-submenu>
          <!-- 第五行 -->
          <el-submenu index="5">
            <template #title>
              <i class="el-icon-s-marketing"></i>
              <span slot="title">数据统计 </span>
            </template>
            <el-menu-item index="reports"
              ><i class="el-icon-menu"></i>数据列表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    asideBtn () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #3a4650;
    color: #fff;
    font-weight: 500;
    font-size: 22px;
    line-height: 60px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .el-button {
      position: absolute;
      right: 0;
      margin-top: 10px;
      margin-right: 20px;
    }
  }
  .el-aside {
    background-color: #4a5864;
    .toggleMenu {
      width: 100%;
      height: 40px;
      background-color: #62b9aa;
      text-align: center;
      line-height: 40px;
       transition: all 1s;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      letter-spacing: 5px;
      color: #fff;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
/deep/.el-menu {
  border-right: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.asidebtn {
  width: 65px !important;
}
.dh {
  transition: all 1s;
}

</style>
