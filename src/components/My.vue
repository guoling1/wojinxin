<template>
  <div class="main">
    <div class="myTop">
      <img src="../assets/tx.png" alt="">
      <div class="right">
        <p class="welcome">欢迎您，</p>
        <p class="phone">手机号：{{phone}}</p>
      </div>
    </div>
    <ul class="list">
      <li @click="toOrder()">
        <!--<img src="../assets/orderIcon.png" alt="">-->
        <span>我的订单</span>
      </li>
      <li @click="toChangePwd()" v-if="isLogin">
        <!--<img src="../assets/orderIcon.png" alt="">-->
        <span>修改密码</span>
      </li>
      <li @click="signOut()" v-if="isLogin">
        <!--<img src="../assets/orderIcon.png" alt="">-->
        <span>退出登录</span>
      </li>
      <li v-if="!isLogin" @click="toLogin()">
        <!--<img src="../assets/orderIcon.png" alt="">-->
        <span >登录</span>
      </li>
      <li v-if="!isLogin" @click="toRegist()">
        <!--<img src="../assets/orderIcon.png" alt="">-->
        <span >注册</span>
      </li>
    </ul>

    <!--登录框-->
    <div class="showLogin">
      <x-dialog v-model="showLogin" class="dialog-demo">
        <div class="top">
          <span>手机验证登录</span>
          <span @click="showLogin=false" class="close"></span>
        </div>
        <div class="content" style="padding-top: 4px">
          <ul>
            <li>
              <input v-model="formData.phone" type="number" placeholder="输入手机号">
            </li>
            <li>
              <input v-model="formData.validataCode" @blur="validateCode()" type="text" placeholder="输入验证码">
              <img :src="imgSrc" @click="imgClick()" alt="">
            </li>
            <li>
              <input v-model="formData.messageCode" type="text" placeholder="输入短信验证码">
              <span @click="getCode()">{{count}}</span>
            </li>
          </ul>
        </div>
        <div class="buy" @click="login()">登录</div>
        <!--<p>若无账号则自动注册</p>-->
      </x-dialog>

    </div>
  </div>
</template>

<script>
  const TIME_COUNT = 60;
  export default {
    name: 'My',
    data() {
      return {
        formData:{
          phone:'',
          validataCode:'',
          messageCode:''
        },
        phone:'',
        showLogin: false,
        count: '获取验证码',
        timer: null,
        imgSrc:'http://wojinxin.hdjincheng.cn/wofinance/servlet/validateCodeServlet',
        isLogin:false
      }
    },
    created(){
      if(localStorage.getItem("phone")){
        this.phone = localStorage.getItem("phone")
        this.isLogin =true
      }
    },
    methods: {
      toLogin(){
        this.$router.push("/login")
      },
      toRegist(){
        this.$router.push("./regist")
      },
      toOrder() {
        this.$router.push("/order")
      },
      toChangePwd(){
        this.$router.push("/changePwd")
      },
      signOut(){
        this.phone = ""
        localStorage.clear();
        this.isLogin = false

      },
      login(){
        // this.validateCode()
        this.$axios.post("/open/api/customer/save",{mobile:this.formData.phone})
          .then(res=>{
            localStorage.setItem("phone",this.formData.phone)
            this.phone = this.formData.phone;
            this.isLogin = true;
            this.showLogin = false;
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
            console.log(res)
          })
      },
      //获取验证码
      getCode(){
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    margin: 50px 0;
    width: 100%;
    padding-bottom: 50px;

    .myTop {
      margin: 19px 15px 30px;
      height: 92px;
      background: #f4f4f4;
      border-radius: 5px;
      text-align: left;
      box-shadow: 0 3px 12px #f4f4f4;

      img {
        margin-top: 14px;
        margin-left: 28px;
        display: inline-block;
        width: 63px;
        height: 63px;
        border: 1px solid #fff;
        border-radius: 50%;
      }

      .right {
        display: inline-block;
        margin-left: 30px;
        vertical-align: top;
        font-size: 14px;

        .welcome {
          margin: 28px 0 16px;
          font-size: 12px;
          color: #666;
        }

      }
    }
    .list {
      border-top: 10px solid #e7e7e7;
      padding: 10px 15px;
      text-align: left;

      li {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #e5e5e5;

        img {
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle;
          width: 15px;
          height: 19px;
        }

        span {
          display: inline-block;
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
