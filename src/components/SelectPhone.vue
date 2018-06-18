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
  name: 'Home',
  data () {
    return {
      phoneList:[],
      selectNum:''
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$axios.post("/open/api/numberpool/list")
        .then(res=>{
          this.phoneList = res.data.list;
          for(let i=0;i<this.phoneList.length;i++){
            this.phoneList[i].number = parseFloat(this.phoneList[i].number).toString()
          }
        })
    },
    submit(){
      // localStorage.setItem("selectPhone",this.selectNum)
      this.$store.commit("PHONE",this.selectNum)
      this.$router.go(-1)
    }
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
    color: #fc3a79;
  }
  .button{
    margin: 0 15px;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-weight: bold;
    background: #fc3a79;
    border-radius: 5px;
  }
}
</style>
