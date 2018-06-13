<template>
  <div class="main">
    <div class="order">
      <div class="orderTitle">订单信息</div>
      <div class="content">
        <p>订单状态：待审核</p>
        <p>订单编号：SJ356498579</p>
        <p>创建时间：2017-07-31 14：51</p>
      </div>
    </div>
    <div class="person">
      <div class="orderTitle">购买人信息</div>
      <div class="content">
        <div class="top">
          <span class="name">马良</span>
          <span class="phone">174654509</span>
        </div>
        <p class="address">疯狂可点击观看空对地攻击开发工具了的就看见放得开了就</p>
      </div>
    </div>
    <div class="shop">
      <div class="orderTitle">商品信息</div>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .main {
    margin: 50px 0;
    width: 100%;
    text-align: left;

  .orderTitle {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    background: #f4f4f4;
    font-size: 13px;
    font-weight: bold;
    text-align: left;
  }

  .order {

  .content {
    padding: 16px 10px;
    font-size: 13px;
    color: #999;

  p {
    height: 27px;
    line-height: 27px;
  }

  }
  }

  .person {

  .content {
    padding: 0 10px 15px;

  .top {
    height: 45px;
    line-height: 45px;
    font-weight: bold;

  .phone {
    float: right;
  }

  }
  .address {
    font-size: 14px;
    line-height: 20px;
  }

  }
  }
  .shop {

  .top {
    padding: 0 10px;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #d7d7d7;

  .time {
    float: left;
    font-size: 11px;
  }

  .price {
    float: right;
    font-size: 14px;
    color: #fd255a;
  }

  }
  .content {
    padding: 15px 10px;
    font-size: 14px;
    text-align: left;

  .left {
    display: inline-block;

  img {
    width: 114px;
    height: 114px;
    border: 1px solid #d7d7d7;
    margin-right: 15px;
    border-radius: 3px;
  }

  }
  .right {
    display: inline-block;

  p {
    margin-bottom: 11px;
  }

  }

  }
  }

  }
</style>
