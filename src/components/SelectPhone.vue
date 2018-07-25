<template>
  <div class="main">
    <ul>
      <li :class="selectNum==item.number?'active':''" @click="selectNum=item.number" v-for="item in phoneList">{{item.number}}</li>
    </ul>
    <p @click="getData()">换一批</p>
    <div class="button" @click="submit()">确认</div>
  </div>
</template>

<script>
export default {
  name: 'SelectPhone',
  data () {
    return {
      phoneList:[],
      selectNum:'',
      pageNo:1
    }
  },
  created(){
    this.getData()
  },
  // beforeRouteLeave(to, from, next) {
  //   // 设置下一个路由的 meta
  //   to.meta.keepAlive = true;
  //   next();
  // },
  methods:{

    getData(){
      this.$axios.post("/open/api/numberpool/list",{pageNo:this.pageNo})
        .then(res=>{
          this.phoneList = res.data.list;

          if((res.data.count-res.data.firstResult)<20){
            this.pageNo=1
          }else {
            this.pageNo++;
          }
          for(let i=0;i<this.phoneList.length;i++){
            this.phoneList[i].number = parseFloat(this.phoneList[i].number).toString()
          }
        })
    },
    submit(){
      // localStorage.setItem("selectPhone",this.selectNum)
      this.$store.commit("PHONE",this.selectNum)
      this.$router.push("/homeDetail?id="+this.$route.query.id)
    }
  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.main{
  margin: 50px 0 0;
  background: #fff;
  font-size: 14px;
  height: 100%;
  width: 100%;
  ul{
    padding: 15px 15px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li{

      width: 45%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #999;
      border: 1px solid #999;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .active{
      background: #444c59;
      color: #fff;
    }
  }
  p{
    margin: 10px 15px 15px;
    color: #fe8d23;
  }
  .button{
    margin: 0 15px;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-weight: bold;
    background: #fe8d23;
    border-radius: 5px;
  }
}
</style>
