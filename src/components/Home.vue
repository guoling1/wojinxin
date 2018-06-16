<template>
  <div class="main">

    <!--<div class="banner">
      &lt;!&ndash;<img src="../assets/banner.png" alt="" style="width: 100%;height: 100%">&ndash;&gt;

    </div>-->
    <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
              lock-x ref="scrollerBottom" height="-48" style="margin-top: 50px">
      <div>
        <swiper :list="swiperList" aspect-ratio=1.146 :auto="!descMask" :loop="!descMask" :show-dots="showDots"
                :show-desc-mask="descMask"></swiper>
        <ul>
          <li v-for="(item,index) in list">
            <img src="../assets/phone.png" alt="">
            <div class="subject">{{item.name}}</div>
            <div class="price">存款金额：<span>￥{{item.price}}</span></div>
            <div class="button" @click="toDetail(item.id)">立即办理</div>
          </li>
        </ul>
      </div>

    </scroller>
    <!--<ul>-->
      <!--<li v-for="index in 5">-->
        <!--<img src="../assets/phone.png" alt="">-->
        <!--<div class="subject">iphone X</div>-->
        <!--<div class="price">存款金额：<span>￥6400</span></div>-->
        <!--<div class="button" @click="toDetail()">立即办理</div>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  import {Swiper, Scroller} from 'vux'

  const pullupDefaultConfig = {
    content: '上拉加载更多',
    pullUpHeight: 60,
    height: 40,
    autoRefresh: false,
    downContent: '释放后加载',
    upContent: '上拉加载更多',
    loadingContent: '加载中...',
    clsPrefix: 'xs-plugin-pullup-'
  }
  export default {
    name: 'Home',
    data() {
      return {
        list: [],
        pullupDefaultConfig: pullupDefaultConfig,
        swiperList: [{img: require('../assets/banner.png')}],
        showDots: false,
        descMask: false,
        pageNo:1
      }
    },
    created() {

      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
      this.loadMore()
    },
    methods: {
      toDetail(id) {
        this.$router.push({path:"/homeDetail",query:{id:id}})
      },
      fetchData(cb) {
        this.$axios.post('/open/api/product/list',{areaId: 2,pageNo:this.pageNo,pageSize:10}).then(response => {
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
            this.pageNo+=1
          })
          cb(response.data.retObject.list)
        })
      },
      refresh() {
        this.fetchData(data => {
          this.list = data
          this.$refs.scrollerBottom.enablePullup()
        })
      },
      loadMore() {
        this.fetchData(data => {
          this.list = this.list.concat(data)
          this.$refs.scrollerBottom.donePullup()
        })
      }
    },
    components: {
      Swiper,
      Scroller
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  type="text/less">
.main{
  margin: 50px 0;
  width: 100%;
  background:#f5f5f5;
  .banner{
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
    height: 42px;
    /*line-height: 42px;*/
  }

  .price {

  span {
    font-weight: bold;
    color: #cb5762;
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
