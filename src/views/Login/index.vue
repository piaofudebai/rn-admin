<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        // 字段名都是和接口文档保持一致
        username: 'admin',
        password: 123456
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      // 二次校验 手动校验
      try {
        await this.$refs.loginFormRef.validate()
        try {
          const { data } = await login(this.loginForm)
          console.log(data)
          // todo 把token存到vuex里面 并且持久化localStorage
          this.$router.push('/home')
          this.$store.commit('setUser', data.data)
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('登录表单校验失败')
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
// 最外层大盒子
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #4a5864;
  // background: url('@/assets/mv.jpg') no-repeat;
  // background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: rgb(172, 211, 230);
    border-radius: 10px;
    padding: 30px 15px;
    box-sizing: border-box;
  }
  .btn-item {
    text-align: right;
  }
}
</style>
