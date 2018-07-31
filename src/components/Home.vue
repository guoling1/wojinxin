<template>
  <div class="main">

    <!--<div class="banner">
      &lt;!&ndash;<img src="../assets/banner.png" alt="" style="width: 100%;height: 100%">&ndash;&gt;

    </div>-->
      <div>
        <swiper :list="swiperList" :aspect-ratio="aspectRatio" :auto="!descMask" :loop="!descMask" :show-dots="showDots"
                :show-desc-mask="descMask"></swiper>
        <ul>
          <li v-for="(item,index) in list">
            <img :src="item.swiperList[0].url" alt="" style="width: 140px;height: 140px">
            <div class="">{{item.name}}</div>
            <!--<div class="subject" style="font-size: 14px;margin-top: 5px">{{item.packageName}}</div>-->
            <div class="subject">套餐：{{item.packageList[0].price}}<span>X{{item.packageList[0].circle}}期</span></div>
            <div class="price">存款金额：<span>￥{{item.price}}</span></div>
            <div class="button" @click="toDetail(item.id)">立即办理</div>
          </li>
        </ul>
        <div style="margin: 17px;" @click="loadMore()" v-if="more">点击加载更多</div>
      </div>
    <!--<login-mask v-if="isLogin" v-on:child-close="listenClose"></login-mask>-->
  </div>
</template>

<script>
  import {Swiper} from 'vux'
  import LoginMask from './loginMask'
  export default {
    name: 'Home',
    data() {
      return {
        aspectRatio:1.146,
        list: [],
        swiperList: [{img: require('../assets/banner.png')}],
        showDots: false,
        descMask: false,
        pageNo:1,
        pageSize:10,
        more:true,
        isLogin:false
      }
    },
    created() {
      this.getData()
      if(this.$route.query.key){
        localStorage.setItem('key',this.$route.query.key)
      }else{
        localStorage.removeItem('key')
      }
      if(this.$route.query.bk==1){
        localStorage.setItem('bk',1)
      }else{
        localStorage.removeItem('bk')
      }
      if(this.$route.query.cid){
        localStorage.setItem('bankMsg',JSON.stringify(this.$route.query))
      }else {
        localStorage.removeItem('bankMsg')
      }
    },
    methods: {
      listenClose(val){
        this.isLogin = val
      },
      toDetail(id) {
        this.$store.commit("PHONE",'请选择')
        this.$router.push({path:"/homeDetail",query:{id:id,reload:new Date().getTime()}})
      },
      getData(){
        this.$axios.post("/open/api/product/list",{sellFlag:1,areaId: 2,pageNo:this.pageNo,pageSize:this.pageSize})
          .then(res=>{
            for(let i=0;i<res.data.list.length;i++){

              if(!res.data.list[i].swiperList){
                console.log(i)
                res.data.list[i].swiperList=[{url:''}]
              }
              if(!res.data.list[i].packageList){
                console.log(i)
                res.data.list[i].packageList=[{price:'',circle:''}]
              }
              console.log(res.data.list[i].swiperList)

            }
            this.list = res.data.list;
            if(res.data.list.length<this.pageSize){
              this.more = false
            }else {
              this.pageNo+=1;
            }
          })
      },
      loadMore(){
        this.$axios.post("/open/api/product/list",{sellFlag:1,areaId: 2,pageNo:this.pageNo,pageSize:this.pageSize})
          .then(res=>{
            this.list = this.list.concat(res.data.list)
            this.pageNo+=1;
          })
      }
    },
    components: {
      Swiper,
      LoginMask
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    margin: 50px 0 0;
    padding-bottom: 50px;
    width: 100%;
    background: #f5f5f5;

  .banner {
    width: 100%;
    height: 430px;
  }

  ul {
    margin: 0 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

  li {
    margin-top: 15px;
    font-size: 14px;
    padding-bottom: 15px;
    width: 48.5%;
    /*height: 272px;*/
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 #f5f5f5;

  img {
    display: inline-block;
    width: 100%;
    margin: 10px auto 0;
  }

  .subject {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    /*height: 42px;*/
    /*line-height: 42px;*/
    span{
      font-size: 12px;
      padding: 0 5px;
      background: #fe8d23;
      border-radius: 12px;
      color: #fff;
      margin-left: 5px;
    }
  }

  .price {

  span {
    font-weight: bold;
    /*color: #cb5762;*/
  }

  }
  .button {
    margin: 14px auto 0;
    width: 106px;
    height: 23px;
    line-height: 23px;
    border: 1px solid #444c59;
    border-radius: 10px;
    font-size: 12px;
    color: #444c59;
  }

  }
  }
  }
</style>
