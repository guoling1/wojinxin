<template>
  <div class="main">
    <ul class="list">
      <li v-for="(item,index) in this.orderList">
        <div class="top">
          <div class="time">{{item.createTime | formatDate}}</div>
          <div class="price">￥{{item.productPrice}}</div>
        </div>
        <div class="content">
          <div class="left">
            <img src="../assets/phone.png" alt="">
          </div>
          <div class="right">
            <p class="color">机身颜色：{{item.productColor}}</p>
            <p class="memory">内存：{{item.productMemory}}</p>
            <p class="address">归属地：{{item.region}}</p>
            <p class="bank">开户行：{{item.bank}}</p>
            <p class="package">合约套餐：{{item.packageName}}</p>
          </div>
        </div>
        <div class="bottom">
          <div class="state">订单状态：{{item.payStatus}}</div>
          <div class="button" @click="toDetail(item.id)">查看详情</div>
        </div>
      </li>
    </ul>
    <div v-if="showLogin" class="prompt">
      <p>您还未登录</p>
      <p>前往<router-link to="/my">个人中心</router-link>登录！</p>
    </div>
    <!--<login-mask v-if="isLogin" v-on:child-close="listenClose"></login-mask>-->
  </div>
</template>

<script>
  import LoginMask from './loginMask'
export default {
  name: 'Order',
  data () {
    return {
      formData:{
        phone:'',
        validataCode:'',
        messageCode:''
      },
      showLogin: false,
      count: '获取验证码',
      timer: null,
      imgSrc:'http://wojinxin.hdjincheng.cn/wofinance/servlet/validateCodeServlet',
      orderList:[]
    }
  },
  created(){
    //若未登陆弹出登陆框
    if(localStorage.getItem("phone")){
      this.getData()
    }else {
      this.showLogin = true
    }
  },
  methods: {
    login(){
      // this.validateCode()
      this.$axios.post("/open/api/customer/save",{mobile:this.formData.phone})
        .then(res=>{
          localStorage.setItem("phone",this.formData.phone)
          this.phone = this.formData.phone;
          this.showLogin = false;
          this.getData()
        })
    },
    //点击图片重新获取验证码
    imgClick(){
      this.imgSrc = "http://wojinxin.hdjincheng.cn/wofinance/servlet/validateCodeServlet?"+Math.random();
    },
    //验证图形验证码
    validateCode(){
      this.$axios.get("/servlet/validateCodeServlet",{params:{validateCode:this.formData.validataCode}})
        .then(res=>{
          console.log(res.data)
        })
    },
    //获取验证码
    getCode() {
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.count = "获取验证码";
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    //获取订单列表
    getData(){
      this.$axios.post("/open/api/order/list",{mobile:localStorage.getItem("phone")})
        .then(res=>{
          this.orderList = res.data.list;
        })
        .catch(error => {

        })
    },
    toDetail(id){
      this.$router.push({path:'/orderDetail',query:{id:id}})
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.main{
  margin: 50px 0;
  width: 100%;
  padding-bottom: 50px;

  .list{

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
        padding:15px 0 0;
        font-size: 14px;
        border-bottom: 1px solid #d7d7d7;
        text-align: left;
        display: flex;
        .left{
          display:inline-block;
          margin-right: 10px;
          /*float: left;*/

          img{
            width: 114px;
            height: 114px;
            border: 1px solid #d7d7d7;
            border-radius: 3px;
          }
        }
        .right{
          display:inline-block;
          p{
            margin-bottom: 11px;
            /*margin-left: 130px;*/
          }
        }

      }
      .bottom{
        text-align:left;
        font-size: 13px;
        color: #666666;
        height:44px;
        line-height:44px;

        .state{
          display: inline-block;
          text-align: left;
        }
        .button{
          margin-top: 10px;
          width: 82px;
          height: 25px;
          font-size: 12px;
          color: #333;
          line-height: 25px;
          text-align: center;
          border: 1px solid #333;
          border-radius: 3px;
          float: right;
        }
      }
    }
  }
  .prompt{
    margin-top: 20%;
    font-size: 14px;
    p{
      line-height: 20px;
      margin-top: 15px;
      a{
        display: inline-block;
        margin: 0 3px;
        color: #fe8d23;
        text-decoration: underline;
      }
    }
  }
  .showLogin {

    .top {
      height: 41px;
      line-height: 41px;
      font-size: 18px;
      background: #444c59;
      color: #fff;

      .close {
        position: absolute;
        top: 14px;
        right: 10px;
        display: inline-block;
        background-image: url("../assets/closeWrite.png");
        background-size: 13px 13px;
        width: 13px;
        height: 13px;
      }

    }
    .content {
      padding: 15px;
      text-align: left;

      ul {

        li {
          height: 55px;
          border-bottom: 1px solid #e5e5e5;
          font-size: 14px;
          color: #666666;

          input {
            margin-top: 23px;
            height: 30px;
            width: 60%;
          }
          img{
            float: right;
            margin-top: 28px;
            display: inline-block;
            height: 20px;
            width: 70px;
            border-radius: 4px;
          }
          span {
            float: right;
            margin-top: 28px;
            display: inline-block;
            padding: 0 5px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #fff;
            background: #4e4e4e;
            border-radius: 4px;
          }

        }
      }
    }
    .buy {
      margin: 13px auto;
      width: 203px;
      height: 43px;
      line-height: 43px;
      background: #fe8d23;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>
