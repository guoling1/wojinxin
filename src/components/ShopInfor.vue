<template>
  <div class="main">
    <div class="shopMessage">
      <div class="subject">商品信息</div>
      <ul>
        <li>
          <span class="attr">所在区域：</span>
          <span class="value">{{productMsg.addressName}}</span>
        </li>
        <li>
          <span class="attr">所选商品：</span>
          <span class="value">{{productMsg.productName}}</span>
        </li>
        <li>
          <span class="attr">所选规格：</span>
          <span class="value">{{productMsg.memory}}{{productMsg.color}}</span>
        </li>
        <li>
          <span class="attr">所选套餐：</span>
          <span class="value">{{productMsg.setMealName}}</span>
        </li>
        <li>
          <span class="attr">所选号码：</span>
          <span class="value">{{formData.productMobile}}</span>
        </li>
        <li>
          <span class="attr">冻结金额：</span>
          <span class="value">{{productMsg.deposit}}</span>
        </li>
        <li>
          <span class="attr">托管周期：</span>
          <span class="value">{{productMsg.circle}}个月</span>
        </li>
      </ul>
    </div>
    <div class="userMessage">
      <ul>
        <li>
          <span>开户银行</span>
          <input type="text" v-model="formData.bank" disabled style="background: #fff">
        </li>
        <li>
          <span>客户姓名</span>
          <input type="text" placeholder="这里输入客户姓名" v-model="formData.customerName" @blur="changePY()">
        </li>
        <li>
          <span>姓拼音</span>
          <input type="text" placeholder="姓拼音" v-model="formData.xingPinyin" disabled style="background: #fff">
        </li>
        <li>
          <span>名拼音</span>
          <input type="text" placeholder="名拼音" v-model="formData.mingPinyin" disabled style="background: #fff">
        </li>
        <li>
          <span>性别</span>
          <input type="radio" value="男" name="sex" v-model="formData.sex">男
          <input type="radio" value="女" name="sex" v-model="formData.sex" style="margin-left: 25px">女
        </li>
        <li>
          <span>手机号</span>
          <input type="text" placeholder="这里输入手机号" v-model="formData.mobile" style="background: #fff" disabled>
        </li>
        <li>
          <span>证件类型</span>
          <input type="text" placeholder="身份证" v-model="formData.idcardType" style="background: #fff" disabled>
        </li>
        <li>
          <span>证件号码</span>
          <input type="text" placeholder="这里输入证件号码" v-model="formData.idcard">
        </li>
        <!--<li>
          <span>收货地址</span>
          <input type="text" placeholder="选择省市区">
        </li>-->
        <li>
          <span>详细地址</span>
          <input type="text" placeholder="这里输入详细地址" v-model="formData.address">
        </li>
        <li>
          <span>邮箱</span>
          <input type="email" placeholder="这里输入邮箱" v-model="formData.email">
        </li>
        <li>
          <span>备注</span>
          <input type="text" placeholder="这里输入备注" v-model="remarks">
        </li>
      </ul>
    </div>
    <div class="button" @click="submit()">提交订单</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import PINYIN from './pinyin'
  import {PopupRadio} from 'vux'

  export default {
    name: 'ShopInfo',
    data() {
      return {
        productMsg: {},
        formData: {
          productName: '',//产品名称
          productPrice: '',//产品价格
          productMobile: '',//产品手机号
          circle: '',//套餐周期
          deposit: '',//托管金额
          areaId: '',//区域id
          bank: '',//银行
          endDay: '',//截止日期
          region: '',//所属区域
          customerName: '',//客户名称
          xingPinyin: '',//姓拼音
          mingPinyin: '',//名拼音
          country: '',//国家
          agreetmentNo: '',//合同号
          mobile: '',//客户手机号
          price: '',//价格
          busiType: '',//业务类型
          idcardType: '',//证件类型
          idcard: '',//身份证号
          address: '', //详细地址
          productMemory: '',//内存
          productColor: '',//颜色
          setMeal: "",//所选号码
          sex: '男',
          email: ''
        },
        sex: '男',
        remarks: '',//备注
        showPrompt: false,
        promptMsg: '',
      }
    },
    created() {
      this.productMsg = this.$route.query;
      this.formData = {
        productName: this.$route.query.productName,//产品名称
        productPrice: this.$route.query.price,//产品价格
        productMobile: this.$route.query.phone,//产品手机号
        circle: this.$route.query.circle,//套餐周期
        deposit: this.$route.query.deposit,//托管金额
        areaId: this.$route.query.addressId,//区域id
        bank: '平安',//银行
        endDay: '2019-01-01',//截止日期
        region: this.$route.query.addressName,//所属区域
        customerName: '',//客户名称
        xingPinyin: '',//姓拼音
        mingPinyin: '',//名拼音
        country: '中国',//国家
        agreetmentNo: '111111',//合同号
        mobile: JSON.parse(localStorage.getItem("userMessage")).mobile,//客户手机号
        price: this.$route.query.setMealPrice,//价格
        busiType: this.$route.query.busiType,//业务类型
        idcardType: '身份证',//证件类型
        idcard: '',//身份证号
        address: '',
        productColor: this.$route.query.color,
        productMemory: this.$route.query.memory,
        packageName: this.$route.query.setMealName,
        sex: '男',
        email: ''
      }
    },
    methods: {
      changePY() {
        var pyList = this.CC2PY(this.formData.customerName)
        this.formData.xingPinyin = pyList[0].substring(0, 1).toUpperCase() + pyList[0].substring(1);
        this.formData.mingPinyin = pyList.slice(1).join('').substring(0, 1).toUpperCase() + pyList.slice(1).join('').substring(1);
      },
      submit() {
        let params = new FormData;
        let flag = true;
        for (var i in this.formData) {
          params.append(i, this.formData[i])
        }
        for (var i in this.formData) {
          if (this.formData[i] == "") {
            flag = false
            break;
          }
        }
        params.append("remarks", this.remarks)
        params.append("productId", this.$route.query.id)
        if (localStorage.getItem('key')) {
          params.append("qrcodeKey", localStorage.getItem('key'))
        }
        if (localStorage.getItem('bankMsg')) {
          params.append('cid', JSON.parse(localStorage.getItem('bankMsg')).cid);
          params.append('outerSource', JSON.parse(localStorage.getItem('bankMsg')).outerSource);
          params.append('outerid', JSON.parse(localStorage.getItem('bankMsg')).outerid);
          params.append('rec_no', JSON.parse(localStorage.getItem('bankMsg')).rec_no);
          params.append('source', JSON.parse(localStorage.getItem('bankMsg')).source)
        }
        if (flag) {
          this.$axios.post("/open/api/order/save", params)
            .then(res => {
              if (res.retCode == "0000") {
                this.$router.push("/orderSubmit?id=" + res.data.id)
                localStorage.setItem("productMessage", JSON.stringify(this.formData))
              } else {
                this.showPrompt = true;
                this.promptMsg = res.retMsg
              }
            })
            .catch(err => {
              this.errMsg = err
              this.warnText = true
            })
        } else {
          this.showPrompt = true;
          this.promptMsg = '请补全信息'
        }

      },
      CC2PY(l1) {

        var l2 = l1.length;

        var I1 = [];

        var reg = new RegExp('[a-zA-Z0-9\- ]');

        for (var i = 0; i < l2; i++) {

          var val = l1.substr(i, 1);

          var name = this.arraySearch(val, PINYIN.pinyin);

          if (reg.test(val)) {

            I1.push(val);

          } else if (name !== false) {

            I1.push(name);

          }

        }

        // I1 = I1.replace(/ /g, '-');
        //
        // while (I1.indexOf('--') > 0) {
        //
        //     I1 = I1.replace('--', '-');
        //
        // }

        return I1;

      },
      arraySearch(l1, l2) {

        for (var name in PINYIN.pinyin) {

          if (PINYIN.pinyin[name].indexOf(l1) != -1) {

            return this.ucfirst(name);

            break;

          }

        }

        return false;

      },
      ucfirst(l1) {

        if (l1.length > 0) {

          var first = l1.substr(0, 1);

          var spare = l1.substr(1, l1.length);

          return first + spare;

        }

      }
    },
    components: {
      PopupRadio
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .weui-cell {
    padding: 0;
  }

  .vux-cell-bd.vux-cell-primary, .vux-cell-bd.vux-cell-primary p {
    display: contents !important;
    background: red;
    flex: none !important;
    width: 53px;
  }

  .main {
    margin: 50px 0 0;
    width: 100%;
    .shopMessage {
      padding: 0 15px;
      text-align: left;
      border-top: 10px solid #eaeaea;
      .subject {
        height: 52px;
        line-height: 52px;
      }
      ul {
        margin-bottom: 15px;
        li {
          height: 34px;
          line-height: 34px;
          margin-top: -1px;
          border: 1px solid #e7e7e7;
          .attr {
            text-align: center;
            display: inline-block;
            margin-right: 10px;
            height: 100%;
            width: 72px;
            font-size: 12px;
            color: #fff;
            background: #444c59;
          }
          .value {
            font-size: 14px;
          }
        }
      }
    }
    .userMessage {
      padding: 0 15px;
      text-align: left;
      border-top: 10px solid #eaeaea;
      ul {
        padding-top: 18px;
        li {
          font-size: 14px;
          height: 37px;
          line-height: 37px;
          border-bottom: 1px solid #e5e5e5;
          span {
            display: inline-block;
            width: 106px;
          }
        }
      }
    }
    .button {
      margin-top: 37px;
      height: 48px;
      line-height: 48px;
      color: #fff;
      font-weight: bold;
      background: #fe8d23;
    }
  }
</style>
