<template>
  <div class="main">
    <ul>
      <li v-for="index in 4">
        <div class="top">
          <div class="time">2018-06-01</div>
          <div class="price">￥6000.00</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="../assets/phone.png" alt="">
          </div>
          <div class="right">
            <p class="color">机身颜色：灰色</p>
            <p class="memory">内存：16G</p>
            <p class="address">归属地：北京</p>
            <p class="bank">开户行：平安银行</p>
            <p class="package">合约套餐：36个月</p>
          </div>
        </div>
        <div class="bottom">
          <div class="state">订单状态：待审核</div>
          <div class="button">查看详情</div>
        </div>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main{
  margin: 50px 0;
  width: 100%;

  ul{

    li{
      padding: 0 10px;
      border-top: 10px solid #f4f4f4;
      width: 100%;
      .top{
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #d7d7d7;

        .time{
          float: left;
          font-size: 11px;
        }
        .price{
          float: right;
          font-size: 14px;
          color: #fd255a;
        }
      }
      .content{
        margin:15px 0;
        font-size: 14px;
        border-bottom: 1px solid #d7d7d7;
        .left{
          float: left;
          img{
            width: 114px;
            height: 114px;
            border: 1px solid #d7d7d7;
            border-radius: 3px;
          }
        }
        .right{
          p{
            margin-bottom: 11px;
            margin-left: 130px;
            text-align: left;
          }
        }

      }
      .bottom{
        text-align:left;

        .state{
          display: inline-block;
          text-align: left;
          font-size: 13px;
        }
        .button{
          font-size: 12px;
          float: right;
        }
      }
    }
  }
}
</style>
