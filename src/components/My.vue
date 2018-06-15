<template>
  <div class="main">
    <div class="top">
      <img src="" alt="">
      <div class="right">
        <p class="welcome">欢迎您，</p>
        <p class="phone">手机号：176543789</p>
      </div>
    </div>
    <ul>
      <li @click="toOrder()">
        <img src="../assets/orderIcon.png" alt="">
        <span>我的订单</span>
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
    toOrder(){
      this.$router.push("/order")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main{
  margin: 50px 0;
  width: 100%;

  .top{
    margin: 19px 15px 30px;
    height: 92px;
    background: #f4f4f4;
    border-radius: 5px;
    text-align: left;
    box-shadow: 0 3px 12px #f4f4f4;

    img{
      margin-top: 14px;
      margin-left: 28px;
      display: inline-block;
      width: 63px;
      height: 63px;
      border: 1px solid #fff;
      border-radius: 50%;
    }
    .right{
      display: inline-block;
      margin-left: 30px;
      vertical-align: top;
      font-size: 14px;
      .welcome{
        margin: 28px 0 16px;
        font-size: 12px;
        color: #666;
      }
    }
  }
  ul{
    border-top: 10px solid #e7e7e7;
    padding: 10px 15px;
    text-align: left;

    li{
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #e5e5e5;

      img{
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle;
        width: 15px;
        height: 19px;
      }
      span{
        display: inline-block;
      }
    }
  }
}
</style>
