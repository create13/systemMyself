<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="header-tops">
          <span class="dark-span">账户名称:</span>
          <span class="lignt-span">周凤玲</span>
          <span class="dark-span">账户状态:</span>
          <span class="lignt-span">正常</span>
          <span class="dark-span">开通时间:</span>
          <span class="lignt-span">2017-08-01 08:00:00</span>
          <Button type="primary" icon="refresh">Search</Button>
        </div>
        <div class="firstSquare">
          <div class="title-first">
            <span class="blue-square"></span>
            结算账户
          </div>
          <div class="content-title">
            <p class="title-fonts">公司类型<i></i></p>
            <span>:</span>
            <span class="title-data">20000</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="content-title">
            <p class="title-fonts">待收款<i></i></p>
            <span>:</span>
            <span class="title-data">200000000</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="content-title">
            <p class="title-fonts">冻结款<i></i></p>
            <span>:</span>
            <span class="title-data">0</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="content-title">
            <p class="title-fonts">可用额<i></i></p>
            <span>:</span>
            <span class="title-data">20000</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="line-blue"></div>
        </div>
        <div class="firstSquare">
          <div class="title-first">
            <span class="blue-square"></span>
            代收货款
          </div>
          <div class="content-title">
            <p class="title-fonts">账户余额<i></i></p>
            <span>:</span>
            <span class="title-data">20000</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="content-title">
            <p class="title-fonts">待收货款<i></i></p>
            <span>:</span>
            <span class="title-data">200000000</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="content-title">
            <p class="title-fonts">冻结货款<i></i></p>
            <span>:</span>
            <span class="title-data">0</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="content-title">
            <p class="title-fonts">可用额<i></i></p>
            <span>:</span>
            <span class="title-data">20000</span>
            <router-link to="">查看明细></router-link>
          </div>
          <div class="line-blue"></div>
        </div>
        <div class="firstSquare">
        <div class="content-title">
          <p class="title-fonts">充值总金额<i></i></p>
          <span>:</span>
          <span class="title-data">20000</span>
          <router-link to="">查看明细></router-link>
        </div>
        <div class="content-title">
          <p class="title-fonts">提现总金额<i></i></p>
          <span>:</span>
          <span class="title-data">20000</span>
          <router-link to="">查看明细></router-link>
        </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trading',
  data () {
    return {
    };
  },

  components: {},

  computed: {},
  watch: {
  },
  mounted () {
  },

  methods: {
  }
};
</script>
<style lang='less' scoped>
.manage-set {
  width: 100%;
  .center-content {
    height: calc(~"96vh - 100px");
    background-color: #fff;
    .header-tops {
      width: 100%;
      height: 6vh;
      line-height: 6vh;
      font-size: 14px;
      border-bottom: 1px solid #F4F4F4;
      color: #60667F;
      .dark-span {
        margin-left: 30px;
        font-weight: 700;
      }
      .lignt-span {
        margin-right: 46px;
      }
    }
    .firstSquare {
      width: 100%;
      height: 20vh;
      font-size: 14px;
      margin-bottom: 1.5vh;
      div {
        width: 100%;
        height: 4vh;
        line-height: 4vh;
        border-bottom: 1px solid #F4F4F4;
      }
      .title-first {
        color: rgb(126, 148, 236);
        display: flex;
        font-weight: 700;
        padding-left: 30px;
        .blue-square {
          display: inline-block;
          width: 2px;
          height: 2.4vh;
          margin-top: 0.8vh;
          margin-right: 10px;
          background: #108CEE;
        }
      }
      .content-title {
        display: flex;
        align-items: center;
        .title-fonts {
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: justify;
          overflow: hidden;
          display: inline-block;
          padding-left: 5px;
          margin-left: 37px;
          padding-right: 5px;
          margin-right: 5px;
          i {
            display: inline-block;
            padding-left: 100%;
          }
        }
        .title-data {
          margin-left: 30px;
          font-weight: 700;
          width: 88px;
        }
      }
      .line-blue {
        width: 100%;
        height: 1.5vh;
        background: #E8ECF0;
      }
    }
  }
}
@media screen and (min-width: 1199px) and (max-width: 1399px){
  .manage-set {
    .center-content {
      height: calc(~"96vh - 71px");
    }
  }
}
</style>
<style lang='less'>
</style>
