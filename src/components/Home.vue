<template>
  <div class="main">
    <div class="banner">
      <img src="../assets/banner.png" alt="" style="width: 100%;height: 100%">
    </div>
    <ul>
      <li v-for="index in 4">
        <img src="../assets/phone.png" alt="">
        <div class="title">iphone X</div>
        <div class="price">存款金额：<span>￥6400</span></div>
        <div class="button" @click="toDetail()">立即办理</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods:{
    toDetail(){
      this.$router.push("/homeDetail")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main{
  margin: 50px 0;
  width: 100%;
  background:#f5f5f5;
  .banner{
    width: 100%;
    height: 430px;
  }
  ul{
    margin: 0 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      margin-top: 15px;
      padding-bottom: 15px;
      width: 48.5%;
      /*height: 272px;*/
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 0 #f5f5f5;
      img{
        display: inline-block;
        width: 100%;
        margin: 10px auto 0;
      }
      .title{
        height: 42px;
        /*line-height: 42px;*/
      }
      .price{
        span{
          font-weight: bold;
          color: #cb5762;
        }
      }
      .button{
        margin: 14px auto 0;
        width: 106px;
        height: 23px;
        line-height: 23px;
        border: 1px solid #444c59;
        border-radius: 10px;
        font-size: 12px;
        color: #444c59;
      }
    }
  }
}
</style>
