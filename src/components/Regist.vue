<template>
  <div class="main">
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
    <div class="buy" @click="login()">注册</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  const TIME_COUNT = 60;
    export default {
        name: "Regist",
      data(){
          return {
            formData:{
              phone:'',
              validataCode:'',
              messageCode:''
            },
            count: '获取验证码',
            phoneReg:/^1[3|4|5|7|8][0-9]{9}$/,
            showPrompt:false,
            promptMsg:'',
            timer: null,
            imgSrc:'http://wojinxin.hdjincheng.cn/wofinance/servlet/validateCodeServlet',
            messCode:'',
            isMessCode:false
          }
      },
      methods:{
        //获取验证码
        getCode(){
          this.$axios.post("/open/api/customer/smscode",{mobile:this.formData.phone})
            .then(res=>{
              if(res.retCode=='0000'){
                this.messCode = res.data;
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
            })
        },
        login(){
          if(!this.phoneReg.test(this.formData.phone)){
            this.showPrompt = true;
            this.promptMsg = '请输入正确的手机号'
          }else if(this.formData.messageCode==''){
            this.showPrompt = true;
            this.promptMsg = '请输入验证码'
          } else {
            if(this.formData.messageCode!=this.messCode){
              this.showPrompt = true;
              this.promptMsg = '验证码不正确'
            }else {
              let params = {
                mobile:this.formData.phone,
                password:this.formData.password
              }
              this.$axios.post("/open/oauth/login",params)
                .then(res=>{
                  if(res.retCode=='0000'){
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("phone",this.formData.phone);
                    this.$router.go(-1)
                  }else {
                    this.showPrompt = true;
                    this.promptMsg = res.retMsg
                  }
                })
            }
          }
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
        }
      }
    }
</script>

<style scoped type="text/less" lang="less">
  .main{
    margin: 50px 0;
    width: 100%;
    padding-bottom: 50px;
    ul {
      padding: 0 15px;
      text-align: left;
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
    .buy {
      margin: 13px 15px;
      height: 43px;
      line-height: 43px;
      background: #fc3a79;
      border-radius: 5px;
      color: #fff;
    }
  }
</style>
