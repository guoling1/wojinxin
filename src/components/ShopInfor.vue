<template>
  <div class="main">
    <div class="shopMessage">
      <div class="subject">商品信息</div>
      <ul>
        <li>
          <span class="attr">所在区域：</span>
          <span class="value">{{productMsg.addressName}}</span>
        </li>
        <li>
          <span class="attr">所选商品：</span>
          <span class="value">{{productMsg.productName}}</span>
        </li>
        <li>
          <span class="attr">所选套餐：</span>
          <span class="value">{{productMsg.setMealName}}</span>
        </li>
        <li>
          <span class="attr">冻结金额：</span>
          <span class="value">{{productMsg.price}}</span>
        </li>
        <li>
          <span class="attr">托管周期：</span>
          <span class="value"></span>
        </li>
      </ul>
    </div>
    <div class="userMessage">
      <ul>
        <li>
          <span>开户银行</span>
          <input type="text" v-model="formData.bank">
        </li>
        <li>
          <span>客户姓名</span>
          <input type="text" placeholder="这里输入客户姓名" v-model="formData.customerName">
        </li>
        <li>
          <span>姓拼音</span>
          <input type="text" placeholder="这里输入姓拼音" v-model="formData.xingPinyin">
        </li>
        <li>
          <span>名拼音</span>
          <input type="text" placeholder="这里输入名拼音" v-model="formData.mingPinyin">
        </li>
        <li>
          <span>手机号</span>
          <input type="text" placeholder="这里输入手机号" v-model="formData.mobile">
        </li>
        <li>
          <span>证件类型</span>
          <input type="text" placeholder="身份证" v-model="formData.idcardType" style="background: #fff" disabled>
        </li>
        <li>
          <span>证件号码</span>
          <input type="text" placeholder="这里输入证件号码" v-model="formData.idcard">
        </li>
        <!--<li>
          <span>收货地址</span>
          <input type="text" placeholder="选择省市区">
        </li>-->
        <li>
          <span>详细地址</span>
          <input type="text" placeholder="这里输入详细地址" v-model="formData.address">
        </li>
        <li>
          <span>备注</span>
          <input type="text" placeholder="这里输入详细地址" v-model="formData.remarks">
        </li>
      </ul>
    </div>
    <div class="button" @click="submit()">提交订单</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      productMsg:{},
      formData:{
        productName:'',//产品名称
        productPrice:'',//产品价格
        productMobile:'',//产品手机号
        circle:'',//套餐周期
        deposit:'',//托管金额
        areaId:'',//区域id
        bank:'',//银行
        endDay:'',//截止日期
        region:'',//所属区域
        customerName:'',//客户名称
        xingPinyin:'',//姓拼音
        mingPinyin:'',//名拼音
        country:'',//国家
        agreetmentNo:'',//合同号
        mobile:'',//客户手机号
        price:'',//价格
        busiType:'',//业务类型
        idcardType:'',//证件类型
        idcard:'',//身份证号
        address:'',
        remarks:'',
        memory:'',
        color:''
      },
      showPrompt:false,
      promptMsg:''
    }
  },
  created(){
    this.productMsg = this.$route.query
    console.log(this.productMsg)
    this.formData={
      productName:this.$route.query.productName,//产品名称
        productPrice:this.$route.query.price,//产品价格
        productMobile:'1231546546',//产品手机号
        circle:this.$route.query.circle,//套餐周期
        deposit:'122',//托管金额
        areaId:this.$route.query.addressId,//区域id
        bank:'平安',//银行
        endDay:'2019-01-01',//截止日期
        region:this.$route.query.addressName,//所属区域
        customerName:'',//客户名称
        xingPinyin:'',//姓拼音
        mingPinyin:'',//名拼音
        country:'中国',//国家
        agreetmentNo:'111111',//合同号
        mobile:'',//客户手机号
        price:this.$route.query.setMealPrice,//价格
        busiType:this.$route.query.busiType,//业务类型
        idcardType:'身份证',//证件类型
        idcard:'',//身份证号
        address:'',
        remarks:'',
        color:this.$route.query.color,
        memory:this.$route.query.memory
    }
  },
  methods:{
    submit(){
      let params = new FormData;
      for(var i in this.formData){
        params.append(i,this.formData[i])
      }
      this.$axios.post("/open/api/order/save",params)
        .then(res=>{
          this.$router.push("/orderSubmit?id="+res.data.id)
        })
        .catch(err=>{
          this.errMsg=err
          this.warnText = true
        })
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
