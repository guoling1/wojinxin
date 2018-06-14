<template>
  <div class="main">
    <swiper :list="swiperList" height="333px" dots-position="center" :show-desc-mask="isMask"></swiper>
    <div class="productMessage">
      <p class="name">iPhoneX</p>
      <p class="price">预存金额<span>￥6000</span></p>
      <p class="oldPrice">市场价：$8000</p>
    </div>
    <div class="address">
      <span class="attr">归属地区</span>
      <span class="val">武汉</span>
    </div>
    <div class="bank">
      <div class="top">
        <span class="attr">存款银行</span>
        <span class="val" @click="selectBank()">请选择</span>
      </div>
      <div class="bottom">
        <span>总销量：388件</span>
        <span>库存：紧张</span>
      </div>
    </div>
    <div class="format">
      <span class="attr">可选规格</span>
      <span class="val" @click="showFormat=true">机身、颜色、合约套餐</span>
    </div>
    <div class="detail">
      <div class="subject">
        <i></i>
        <span>图文详情</span>
        <i></i>
      </div>
      <div class="detail">
        dddsv
      </div>
    </div>
    <div class="end">
      <input type="number" placeholder="推荐人手机号(选填)">
      <div class="button" @click="confirm()">确认</div>
    </div>

    <!--银行弹框-->
    <div v-transfer-dom class="showBank">
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
    <div v-transfer-dom class="showBank showTips">
      <x-dialog v-model="showTips" class="dialog-demo">
        <div class="top">
          <span>友情提示</span>
          <span @click="showTips=false" class="close"></span>
        </div>
        <div class="content">
          <p>1.联通黑名单用户不能办理</p>
          <p>2.在联通已经拥有超过5个号码（含5个）不能办理</p>
          <p>3.如不清楚账户状态可拨打10010资讯</p>
        </div>
        <div class="bottom">
          <div>取消</div>
          <div @click="confirmTips()">确认</div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom class="showBank showTips">
      <x-dialog v-model="showLogin" class="dialog-demo">
        <div class="top">
          <span>手机验证登录</span>
          <span @click="showLogin=false" class="close"></span>
        </div>
        <div class="content" style="padding-top: 4px">
          <ul>
            <li>
              <input type="number" placeholder="输入手机号">
            </li>
            <li>
              <input type="text" placeholder="输入验证码">
              <span>fdf</span>
            </li>
            <li>
              <input type="text" placeholder="输入短信验证码">
              <span>获取验证码</span>
            </li>
          </ul>
        </div>
          <div class="buy">立即购买</div>
      </x-dialog>
    </div>
    <!--选择规格-->
    <div v-transfer-dom class="showFormat">
      <popup v-model="showFormat" @on-hide="log('hide')" @on-show="log('show')">
        <div class="top">
          <img src="../assets/phone.png" alt="">
          <div class="right">
            <p class="price">￥1399-1599</p>
            <p>总销量：1001件</p>
            <p>已选：标准</p>
          </div>

        </div>
        <ul>
          <li>
            <div class="subject">机身颜色</div>
            <span class="active">深空灰</span>
            <span>深空灰</span>
            <span>深空灰</span>
          </li>
          <li>
            <div class="subject">内存</div>
            <span class="active">16G</span>
            <span>深空灰</span>
            <span>深空灰</span>
          </li>
          <li class="taocan">
            <div class="subject">合约套餐</div>
            <span class="active">36个月|596套餐</span>
            <span>深空灰</span>
            <span>深空灰</span>
          </li>
        </ul>
        <div class="button" @click="confirmFormat()">确认</div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {Swiper,XDialog,Popup  } from 'vux'
export default {
  name: 'Home',
  data () {
    return {
      isMask:false,
      swiperList:[
        {
          img:require('../assets/phone.png')
        },
        {
          img:require('../assets/home.png')
        }
      ],
      showBank:false,
      showTips:false,
      showLogin:false,
      showFormat:false
    }
  },
  methods:{
    selectBank(){
      this.showBank = true;
    },
    confirm(){
      this.showTips = true;
    },
    confirmTips(){
      this.showTips = false;
      this.showLogin = true;
    },
    confirmFormat(){
      this.showFormat = false;
    }
  },
  components:{
    Swiper,
    XDialog,
    Popup
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main{
  margin: 50px 0;
  width: 100%;
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
      margin: 13px auto;
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
          margin: 14px 0;
          font-size: 14px;
        }
        span{
          display: inline-block;
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

}
</style>
