<template>
  <div class="login-page">
    <div class="login-main">
      <div class="warnsIn">{{msg}}</div>
      <i-input v-model="checked" placeholder="组织代码" clearable>
        <Icon type="podium" slot="prepend"></Icon>
      </i-input>
      <i-input v-model="username" placeholder="登录账号" clearable>
        <Icon type="android-person" slot="prepend"></Icon>
      </i-input>
      <i-input v-model="pass" placeholder="登录密码" type="password" clearable>
        <Icon type="locked" slot="prepend"></Icon>
      </i-input>
       <Button @click="loginIn">登录</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: 'admin',
      pass: '123456',
      checked: '200',
      msg: ''
    };
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    loginIn () {
      let params = {
        loginName: this.username,
        passWord: this.pass,
        companyCode: this.checked
      };
      this.$service.http.post('winpie/auth/login', params, 'post')
        .then(res => {
          console.log(res);
          this.$store.dispatch('saveInfo', res.result);
          this.$router.push('/main');
        }).catch(err => {
          console.log(err);
          if (err.success === false) {
            this.msg = err.msg;
          }
        });
    },
    setCookie (saveToken) {
      window.document.cookie = `JSESSIONID = ${saveToken}; path = /;`;
    }
    // setCookie (saveToken) {
    //   window.document.cookie = `saveToken = ${saveToken}; path = /;`;
    // },
    // getCookie (getToken) {
    //   let v = window.document.cookie.match('(^|;) ?' + getToken + '=([^;]*)(;|$)');
    //   return v ? v[2] : null;
    // },
    // clearCookie () {
    //   this.setCookie('', -1);
    // }
  }
};

</script>
<style lang='less' scoped>
  .login-page {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url(../assets/image/bg-login.png) no-repeat;
    background-size: 100% 100%;
    .login-main {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: -200px;
      margin-left: -200px;
      width: 21vw;
      height: 400px;
      background-color: #fff;
      .warnsIn {
        width: 80%;
        height: 20px;
        color: red;
      }
    }
  }
</style>
<style lang="less">
  .login-main {
    .ivu-input-wrapper {
      width:80%;
      margin-bottom: 20px;
      border: 1px solid #E6E6E6;
      border-radius: 4px;
      font-size: 20px;
      .ivu-input-group-append, .ivu-input-group-prepend {
        background-color: #F4F4F4;
        border: none;
        padding: 4px 11px;
      }
      .ivu-input-icon {
        height: 42px;
        line-height: 42px;
      }
      .ivu-input {
        background-color: #F4F4F4;
        height: 40px;
        color: #999999;
        border: none;
      }
    }
    .ivu-btn {
      padding: 10px;
      width: 80%;
    }
  }

</style>
