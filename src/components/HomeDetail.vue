<template>
  <div class="main">
    <swiper :list="swiperList" height="333px" dots-position="center" show-desc-mask="false"></swiper>
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
        <span class="val">请选择</span>
      </div>
      <div class="bottom">
        <span>总销量：388件</span>
        <span>库存：紧张</span>
      </div>
    </div>
    <div class="format">
      <span class="attr">可选规格</span>
      <span class="val">机身、颜色、合约套餐</span>
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
      <div class="button">确认</div>
    </div>
  </div>
</template>

<script>
  import {Swiper} from 'vux'
export default {
  name: 'Home',
  data () {
    return {
      swiperList:[
        {
          img:require('../assets/phone.png')
        },
        {
          img:require('../assets/home.png')
        }
      ]
    }
  },
  components:{
    Swiper
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

}
</style>
