<template>
  <div class="index">
    <div class="container">
      <h2 class="page-header">基本使用</h2>
      <el-button type="primary" @click="req_get">发送GET请求</el-button>
      <el-button type="primary" @click="req_post">发送POST请求</el-button>
    </div>
    <div class="container">    <el-card class="box-card">
      {{res_data}}
    </el-card>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { init_get, init_post } from "@/api/index";

export default {
  name: "Index",
  components: {},
  data() {
    return {
      res_data:'请发送请求'
    };
  },
  methods: {
    req_get() {
      console.log("req_get")
      init_get(1).then(res=>{
        console.log(res)
        this.res_data = res.data
      });
    },
    req_post() {
      console.log("req_post")
      init_post().then(res=>{
        console.log(res)
        this.res_data = res.data
      });
    },
  },
};
</script>
<style scoped>
.container{
  margin:50px 50px;
  text-align:left
}
</style>