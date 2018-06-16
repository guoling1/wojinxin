<template>
  <div class="main">
    <div class="shopMessage">
      <div class="subject">商品信息</div>
      <ul>
        <li>
          <span class="attr">订单编号：</span>
          <span class="value">84758465784759834</span>
        </li>
        <li>
          <span class="attr">所在区域：</span>
          <span class="value">84758465784759834</span>
        </li>
        <li>
          <span class="attr">所选商品：</span>
          <span class="value">84758465784759834</span>
        </li>
        <li>
          <span class="attr">所选套餐：</span>
          <span class="value">84758465784759834</span>
        </li>
        <li>
          <span class="attr">冻结金额：</span>
          <span class="value">84758465784759834</span>
        </li>
        <li>
          <span class="attr">托管周期：</span>
          <span class="value">84758465784759834</span>
        </li>
      </ul>
    </div>
    <div class="userMessage">
      <ul>
        <li>
          <span>开户银行</span>
          <input type="text">
        </li>
        <li>
          <span>客户姓名</span>
          <input type="text" placeholder="这里输入客户姓名">
        </li>
        <li>
          <span>手机号</span>
          <input type="text" placeholder="这里输入手机号">
        </li>
        <li>
          <span>Email</span>
          <input type="text" placeholder="这里输入Email">
        </li>
        <li>
          <span>联系人手机号</span>
          <input type="text" placeholder="这里输入客户姓名">
        </li>
        <li>
          <span>证件类型</span>
          <input type="text" placeholder="身份证">
        </li>
        <li>
          <span>证件号码</span>
          <input type="text" placeholder="这里输入证件号码">
        </li>
        <li>
          <span>收货地址</span>
          <input type="text" placeholder="选择省市区">
        </li>
        <li>
          <span>详细地址</span>
          <input type="text" placeholder="这里输入详细地址">
        </li>
      </ul>
    </div>
    <div class="button" @click="submit()">提交订单</div>
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
    submit(){
      this.$router.push("/orderSubmit")
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.main{
  margin: 50px 0 0;
  width: 100%;
  .shopMessage{
    padding: 0 15px;
    text-align: left;
    border-top: 10px solid #eaeaea;
    .subject{
      height: 52px;
      line-height: 52px;
    }
    ul{
      margin-bottom:15px;
      li{
        height: 34px;
        line-height: 34px;
        margin-top: -1px;
        border: 1px solid #e7e7e7;
        .attr{
          text-align: center;
          display: inline-block;
          margin-right: 60px;
          height: 100%;
          width: 72px;
          font-size: 12px;
          color: #fff;
          background: #444c59;
        }
        .value{
          font-size: 14px;
        }
      }
    }
  }
  .userMessage{
    padding: 0 15px;
    text-align: left;
    border-top: 10px solid #eaeaea;
    ul{
      padding-top:18px;
      li{
        font-size: 14px;
        height: 37px;
        line-height: 37px;
        border-bottom: 1px solid #e5e5e5;
        span{
          display: inline-block;
          width: 106px;
        }
      }
    }
  }
  .button{
    margin-top: 37px;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-weight: bold;
    background: #fc3a79;
  }
}
</style>
