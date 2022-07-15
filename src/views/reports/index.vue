<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div ref="mychartDom" id="mycharts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getReports } from '@/api/reports'
export default {
  name: 'sector',
  created () {
    // this.getReports()
  },
  data () {
    return {
      legend: {},
      series: [],
      xAxis: [],
      yAxis: []
    }
  },

  methods: {
    initChart () {
      const myChart = echarts.init(this.$refs.mychartDom)
      myChart.setOption({
        title: { text: '用户来源' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        series: this.series
      })
    }
  },
  async mounted () {
    try {
      const res = await getReports()
      console.log(res)
      this.legend = res.data.data.legend
      this.series = res.data.data.series
      this.xAxis = res.data.data.xAxis
      this.yAxis = res.data.data.yAxis
      this.$nextTick(() => {
        this.initChart()
      })
    } catch (err) {
      console.log(err)
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
#mycharts {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>
