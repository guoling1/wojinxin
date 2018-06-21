<template>
  <div class="main">
    <swiper :list="swiperList" :aspect-ratio="aspectRatio" :auto="!isMask" :loop="!isMask" dots-position="center" :show-desc-mask="isMask"></swiper>
    <div class="productMessage">
      <p class="name">{{productData.name}}</p>
      <p class="price">预存金额<span>￥{{productData.price}}</span></p>
      <p class="oldPrice">市场价：￥{{productData.sourcePrice}}</p>
    </div>
    <div class="address">
      <span class="attr">归属地区</span>
      <span class="val">北京</span>
      <!--<span class="val" @click="openAddress()">{{address.name}}</span>-->
    </div>
    <div class="address">
      <span class="attr">手机号</span>
      <span class="val" @click="toSelectPhone()">{{$store.state.phone.phone}}</span>
    </div>
    <div class="bank">
      <!--<div class="top">-->
        <!--<span class="attr">存款银行</span>-->
        <!--<span class="val" @click="selectBank()">请选择</span>-->
      <!--</div>-->
      <div class="bottom">
        <span>总销量：{{productData.sellAmount}}件</span>
        <span>库存：{{stock}}件</span>
      </div>
    </div>
    <div class="format">
      <span class="attr">可选规格</span>
      <span class="val" @click="openFormat()">{{color}}、{{memory}}、{{setMeal.name}}</span>
    </div>
    <div class="detail">
      <div class="subject">
        <i></i>
        <span>图文详情</span>
        <i></i>
      </div>
      <div class="detail" id="content">
        dddsv
      </div>
      <div class="detail" id="content1">
        dddsv
      </div>
    </div>
    <div class="end">
      <input type="number" placeholder="推荐人手机号(选填)">
      <div class="button" @click="confirm()">确认</div>
    </div>

    <!--选择地区-->
    <div>
      <popup v-model="showAddress" position="right" style="overflow: auto">
        <div style="width:150px;">
          <p v-for="address in addressList" @click="selectAddress(address)" class="addressList">{{address.name}}</p>
        </div>
      </popup>
    </div>
    <!--银行弹框-->
    <div  class="showBank">
      <x-dialog v-model="showBank" class="dialog-demo">
        <div class="top">
          <span>选择银行</span>
          <span @click="showBank=false" class="close"></span>
        </div>
        <ul class="bankUl">
          <li class="active">平安银行</li>
          <li>平安银行</li>
          <li>平安银行</li>
          <li>平安银行</li>
        </ul>
      </x-dialog>
    </div>
    <!--友情提示-->
    <div  class="showBank showTips">
      <x-dialog v-model="showTips" class="dialog-demo">
        <div class="top">
          <span>友情提示</span>
          <span @click="showTips=false" class="close"></span>
        </div>
        <div class="content">
          <p>1.联通黑名单用户不能办理</p>
          <p>2.在联通已经拥有超过5个号码（含5个）不能办理</p>
          <p>3.如不清楚账户状态可拨打10010咨询</p>
        </div>
        <div class="bottom">
          <div @click="showTips = false">取消</div>
          <div @click="confirmTips()">确认</div>
        </div>
      </x-dialog>
    </div>
    <!--登录框-->
    <div  class="showBank showTips">
      <x-dialog v-model="showLogin" class="dialog-demo">
        <div class="top">
          <span>登录</span>
          <span @click="showLogin=false" class="close"></span>
        </div>
        <div class="content" style="padding-top: 4px">
          <ul>
            <li>
              <input v-model="formData.phone" type="number" placeholder="手机号">
            </li>
            <li>
              <input v-model="formData.password" type="password" placeholder="密码(首次登录密码为注册短信验证码)">
            </li>
          </ul>
        </div>
        <router-link to="/regist" style="font-size: 14px;float: right;margin-right: 15px;color: #666;">注册</router-link>
          <div class="buy" @click="toBuy()">立即购买</div>
      </x-dialog>
    </div>
    <!--选择规格-->
    <div class="showFormat">
      <popup :hide-on-blur="hideBlur" v-model="showFormat" style="height: 60%;overflow: auto">
        <div class="top">
          <img src="../assets/phone.png" alt="" style="margin-top: 10px">
          <div class="right">
            <p class="price">￥{{productData.price}}</p>
            <p>库存：{{stock}}件</p>
          </div>

        </div>
        <ul>
          <li >
            <div class="subject">机身颜色</div>
            <span :class="color==item?'active':''" v-for="item in colorList" @click="selectColor(item)">{{item}}</span>
          </li>
          <li>
            <div class="subject">内存</div>
            <span :class="memory==item?'active':''" v-for="item in memoryList" @click="selectMemory(item)">{{item}}</span>
          </li>
          <li class="taocan">
            <div class="subject">合约套餐</div>
            <span :class="setMeal==item?'active':''" v-for="item in setMealList" @click="selectSetMeal(item)">{{item.name}}</span>
          </li>
        </ul>
        <div class="button" @click="confirmFormat()">确认</div>
      </popup>
    </div>

    <toast v-model="warnText" type="warn" :text=errMsg></toast>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import {Swiper,Popup,TransferDom} from 'vux'
  const TIME_COUNT = 60;
export default {
  name: 'Home',
  data () {
    return {
      hideBlur:false,
      formData:{
        phone:'',
        password:''
      },
      imgSrc:'http://wojinxin.hdjincheng.cn/wofinance/servlet/validateCodeServlet',
      id:this.$route.query.id,
      productData:{},
      isMask:false,
      aspectRatio:0.9,
      swiperList:[],
      showAddress:false,
      showBank:false,
      showTips:false,
      showLogin:false,
      showFormat:false,
      addressList:[],
      address:{name:'请选择'},
      colorList:["深空灰","金色","玫瑰金"],
      color:'颜色',
      memoryList:["16G","32G","64G","128G"],
      memory:'内存',
      setMealList:["3个月|59套餐","12个月|596套餐","36个月|596套餐"],
      setMeal:'套餐',
      warnText:false,
      errMsg:'',
      showPrompt:false,
      promptMsg:'',
      count: '获取验证码',
      timer: null,
      stock:"",
      selectPhone:'请选择',
      phoneReg:/^1[3|4|5|7|8][0-9]{9}$/,
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      this.getData();
      this.formatData();
      this.getSwiper();
    },
    toSelectPhone(){
      this.$router.push('/selectPhone?id='+this.$route.query.id)
    },
    //处理规格
    formatData(){
      this.$axios.post("/open/api/productSpec/list",{prodectId:this.id})
        .then(res=>{
          let resData = res.data;
          let colorList = [];
          let memoryList = [];
          for(let i=0;i<resData.length;i++){
            colorList.push(resData[i].color);
            memoryList.push(resData[i].memory);
          }
          for(let i=0;i<colorList.length;i++){
            for (let j=i+1;j<colorList.length;j++ ){
              if(colorList[i]==colorList[j]){
                colorList.splice(j,1);
                colorList.length--;
                j--;
              }
            }
          }
          for(let i=0;i<memoryList.length;i++){
            for (let j=i+1;j<memoryList.length;j++ ){
              if(memoryList[i]==memoryList[j]){
                memoryList.splice(j,1);
                memoryList.length--;
                j--;
              }
            }
          }
          this.colorList = colorList;
          this.memoryList = memoryList;
          this.productData.price = resData[0].price;
          this.productData.sourcePrice = resData[0].sourcePrice;
          this.savePrice = resData[0].savePrice;
          this.setMeal  = this.setMealList[0];
          this.stock = res.data[0].amount;
            //  默认规格
            this.color  = resData[0].color;
            this.memory  = resData[0].memory;
        })
    },
    //获取产品轮播图
    getSwiper(){
      this.$axios.post("/open/api/product/swiper/list",{id:this.id})
        .then(res=>{
          var arr=[]
          for(let i=0;i<res.data.length;i++){
            arr.push({img:res.data[i]})
          }
          this.swiperList = arr
        })
        .catch(err=>{
          this.errMsg=err
          this.warnText = true
        })
    },
    //获取产品信息
    getData(){
      this.$axios.post("/open/api/product/get",{id:this.id})
        .then(res=>{
          this.productData = res.data;
          this.setMealList = res.data.packageList;
          this.setMeal  = this.setMealList[0];
          this.stock = res.data.amount;
          document.getElementById("content").innerHTML = this.productData.content
          document.getElementById("content1").innerHTML = this.productData.configDetail
        })
        .catch(err=>{
          this.errMsg=err
          this.warnText = true
        })
    },
    //获取地区
    openAddress(){
      var params = {pid:1}
      this.$axios.post("/open/api/area/list",params)
        .then(res=>{
          this.addressList = res.data;
          this.showAddress = true;
        })
        .catch(err=>{
          this.errMsg=err
          this.warnText = true
        })
    },
    //选择规格
    openFormat(){
      this.showFormat = true;
      // this.$axios.post("/open/api/code/packages/list",{areaId:this.address.id})
      //   .then(res=>{
      //     this.setMealList = res.data.list;
      //   })
    },
    selectAddress(address){
      this.address = address;
      this.showAddress = false;
    },
    selectColor(color){
      this.color = color;
    },
    selectMemory(memory){
      this.memory = memory
    },
    selectSetMeal(setMeal){
      this.setMeal = setMeal
    },
    selectBank(){
      //选择银行前先选择区域
      if(this.address.name=="请选择"){
        this.$axios.post("/open/api/area/list",{areaId:this.address.id})
          .then(res=>{
            this.showBank = true;
            this.bankList = res.data;
          })
          .catch(err=>{
            this.errMsg=err
            this.warnText = true
          })
      }else {
        this.showPrompt = true;
        this.promptMsg = '请先选择区域'
      }

    },
    confirm(){
      let formData = {
        addressName:this.address.name,
        // addressId:this.address.id,
        addressId:2,
        productName:this.productData.name,
        setMealPrice:this.setMeal.price,
        setMealName:this.setMeal.name,
        price:this.productData.price,
        busiType:this.productData.busiType,
        color:this.color,
        memory:this.memory,
        setMeal:this.setMeal
      }
      if(!formData.addressId||this.$store.state.phone.phone=="请选择"){
        this.showPrompt = true;
        this.promptMsg = "请补全信息"
      }else{
        this.showTips = true;
      }
    },
    confirmTips(){
      if(localStorage.getItem("phone")){
        let formData = {
          addressName:"北京",
          // addressId:this.address.id,
          addressId:2,
          productName:this.productData.name,
          setMealPrice:this.setMeal.price,
          setMealName:this.setMeal.name,
          circle:this.setMeal.circle,
          price:this.productData.price,
          busiType:this.productData.busiType,
          color:this.color,
          memory:this.memory,
          savePrice:this.savePrice,
          phone:this.$store.state.phone.phone
        }
        this.showTips = false
        this.$router.push({path:"/shopInfor",query:formData})
      }else {
        this.showTips = false;
        this.showLogin = true;
      }
    },
    confirmFormat(){
      this.$axios.post('/open/api/productSpec/list',{prodectId:this.id,color:this.color,memory:this.memory})
        .then(res=>{
          if(res.data){
            this.savePrice = res.data[0].savePrice;
            this.productData.price = res.data[0].price;
            this.productData.sourcePrice = res.data[0].sourcePrice;
            this.showFormat = false;
          }else {
            this.showPrompt = true;
            this.promptMsg = "暂无库存，请选择其他颜色或内存"
          }
        })

    },
    toBuy(){
      if(!this.phoneReg.test(this.formData.phone)){
        this.showPrompt = true;
        this.promptMsg = '请输入正确的手机号'
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
              this.$axios.post("/open/api/customer/save",{mobile:this.formData.phone})
                .then(res=>{
                  localStorage.setItem("phone",this.formData.phone)
                  this.phone = this.formData.phone;
                  this.showLogin = false;
                  let formData = {
                    addressName:"北京",
                    // addressId:this.address.id,
                    addressId:2,
                    productName:this.productData.name,
                    setMealPrice:this.setMeal.price,
                    setMealName:this.setMeal.name,
                    circle:this.setMeal.circle,
                    price:this.productData.price,
                    busiType:this.productData.busiType,
                    color:this.color,
                    memory:this.memory,
                    savePrice:this.savePrice,
                    phone:this.$store.state.phone.phone
                  }
                  this.showTips = false
                  this.$router.push({path:"/shopInfor",query:formData})
                })
            }else {
              this.showPrompt = true;
              this.promptMsg = res.retMsg
            }
          })
      }
    }
  },
  components:{
    Swiper,
    Popup
  },
  watch:{
    color(cur,old){
      this.$axios.post('/open/api/productSpec/list',{prodectId:this.id,color:this.color,memory:this.memory})
        .then(res=>{
          if(Array.isArray(res.data)){
            this.savePrice = res.data[0].savePrice;
            this.productData.price = res.data[0].price;
            this.productData.sourcePrice = res.data[0].sourcePrice;
            // this.showFormat = false;
          }else {
            this.showPrompt = true;
            this.promptMsg = "暂无库存，请选择其他颜色或内存"
          }
        })
    },
    memory(cur,old){
      this.$axios.post('/open/api/productSpec/list',{prodectId:this.id,color:this.color,memory:this.memory})
        .then(res=>{
          if(Array.isArray(res.data)){
            this.savePrice = res.data[0].savePrice;
            this.productData.price = res.data[0].price;
            this.productData.sourcePrice = res.data[0].sourcePrice;
            // this.showFormat = false;
          }else {
            this.showPrompt = true;
            this.promptMsg = "暂无库存，请选择其他颜色或内存"
          }
        })
    },
    '$route.query.reload':function (v) {
      if(v && !this._inactive) this.init()
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
  .productMessage{
    margin-bottom: 20px;
    .name{
      margin: 13px 0;
      font-weight: bold;
    }
    .price{
      font-size: 13px;
      font-weight: bold;
      span{
        font-size: 19px;
        font-weight: bold;
        color: #fc3a79;
      }
    }
    .oldPrice{
      margin: 11px 0;
      font-size: 13px;
      text-decoration: line-through;
    }
  }
  .attr{
    font-size: 12px;

  }
  .val{
    float: right;
    font-size: 12px;
    color: #fc3a79;
  }
  .address{
    margin: 0 15px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    border-bottom: 1px dashed #d7d7d7;
  }
  .bank{
    margin: 0 15px;
    text-align: left;
    border-bottom: 1px dashed #d7d7d7;
    .top{
      height: 40px;
      line-height: 40px;
    }
    .bottom{
      margin: 23px 0 14px;
      display: flex;
      justify-content: space-around;
      font-size: 12px;
    }
  }
  .format{
    margin:14px 0 37px;
    .val{
      font-size: 13px;
      color: #999999;
      float: none;
    }
  }

  .detail{
    .subject{
      i{
        display: inline-block;
        width: 40px;
        height: 3px;
        vertical-align: super;
      }
      i:nth-child(1){
        background-image: url("../assets/left.png");
        background-size: 40px 3px;
      }
      i:nth-child(3){
        background-image: url("../assets/right.png");
        background-size: 40px 3px;
      }
    }
  }

  .end{
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    input{
      width: 70%;
      height: 100%;
      text-align: center;
    }
    .button{
      display: inline-block;
      float: right;
      background: #fc3a79;
      color: #fff;
      width: 30%;
    }
  }

  .showBank{
    color: #444c59;

    .top{
      height: 41px;
      line-height: 41px;
      border-bottom: 1px solid #444c59;
      font-size:18px;
      .close{
        position: absolute;
        top: 14px;
        right: 10px;
        display: inline-block;
        background-image: url("../assets/closeBlack.png");
        background-size: 13px 13px;
        width: 13px;
        height: 13px;
      }
    }
    .bankUl{
      padding: 32px 22px 37px;

      li{
        margin-bottom: 5px;
        height: 29px;
        line-height: 29px;
        font-size: 14px;
        color: #999;
        border: 1px solid #999;
        border-radius: 4px;
      }
      li.active{
        color: #fff;
        background: #444c59;
      }
    }

  }
  .showTips{
    .top{
      background: #444c59;
      color:#fff;
      .close{
        background-image: url("../assets/closeWrite.png");
      }
    }
    .content{
      padding: 15px;
      text-align: left;

      p{
        line-height: 30px;
        font-size: 14px;
      }

      ul{
        li{
          height: 55px;
          border-bottom: 1px solid #e5e5e5;
          font-size: 14px;
          color: #666666;
          input{
            margin-top: 23px;
            height: 30px;
            width: 100%;
          }
          img{
            float: right;
            margin-top: 28px;
            display: inline-block;
            height: 20px;
            width: 70px;
            border-radius: 4px;
          }
          span{
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
    .buy{
      margin: 30px auto 13px;
      width: 203px;
      height: 43px;
      line-height: 43px;
      background: #fc3a79;
      border-radius: 5px;
      color: #fff;
    }
    .bottom{
      display: flex;
      justify-content: space-around;


      div{
        display: inline-block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #999999;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 20px;
      }
      div:nth-child(2){
        background: #fc3a79;
      }
    }
  }
  .vux-popup-dialog{
    overflow: inherit;
    background: #fff;
  }
  .showFormat{
    .top{
      border-bottom: 1px solid #d7d7d7;
      text-align:left;
      img{
        display: inline-block;
        margin: -20px 15px 0 10px;
        width: 119px;
        height: 119px;
        border: 1px solid #999999;
        border-radius: 4px;
      }
      .right{
        display: inline-block;
        font-size: 12px;
        p:nth-child(2){
          margin: 18px 0 14px;
        }
        .price{
          font-size: 19px;
          color: #fc3a79;
        }
      }
    }
    ul{
      padding:0 10px;
      text-align: left;
      li{
        .subject{
          margin: 14px 0 0;
          font-size: 14px;
        }
        span{
          display: inline-block;
          margin-top: 14px;
          text-align: center;
          width: 82px;
          height: 25px;
          line-height: 25px;
          background: #f6f6f6;
          font-size: 12px;
          margin-right: 15px;
          border-radius: 4px;
        }
        span.active{
          background: #fc3a79;
          color: #fff;
        }
      }
      .taocan span{
        width: auto;
        padding: 0 10px;
      }
    }
    .button{
      width: 100%;
      margin-top: 46px;
      height: 44px;
      line-height: 44px;
      background: #fc3a79;
      color: #fff;
    }
  }
  .addressList{
    height: 30px;
    line-height: 30px;
    font-size: 14px
  }

}
</style>
