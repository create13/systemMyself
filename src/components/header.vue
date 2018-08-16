<template>
  <div class="outers">
    <Header class="height-set">
      <div class="left-icon">
        <img src="../assets/image/left-logo.png" alt="" class="logo-pic">
        运派智慧物流操作管理系统
      </div>
      <Menu mode="horizontal">
        <div class="layout-nav">
          <menu-item v-for="(navs, nindex) in navList" :key="nindex" :name="navs.type">
            <Icon :type="navs.type" color="#fff"></Icon>
          </menu-item>
          <div class="peoples" @click="moreClick">
            <img src="../assets/image/img-person.png" alt="" class="img-person">
            <img src="../assets/image/arrow-down.png" alt="" class="img-arrow">
          </div>
        </div>
      </Menu>
    </Header>
    <div class="pop-in" v-show="showIt">
      aaaa
    </div>
    <Sider>
      <Menu :active-name=activeNames @on-select="changesname" theme="dark" width="auto">
        <MenuGroup>
          <menu-item  name="main">
            <Icon type="document-text"></Icon>
            我的桌面
          </menu-item>
          <menu-item  v-for="(item, index) in menuList" :key="index" :name="item.newUrl + item.menuId">
            <Icon type="document-text"></Icon>
            {{item.name}}
          </menu-item>
        </MenuGroup>
      </Menu>
    </Sider>
    <Content :style="styles">
      <div class="title-shows" v-show="titleShow">
        <div class="title-close" v-for="(gitems,gindex) in $store.state.headerList.dataList"  @click="getBorder(gitems.urlName, gitems.newurl)" :class="[activeTitle == gitems.urlName ? 'newborder' : '']" :key="gindex">
          {{ gitems.urlName}}
          <span class="icon-close" @click="jumpSeconds(gitems)"></span>
        </div>
      </div>
      <div class="padding-set">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
      </div>
      <div class="footer-wz">
        登录日期：2018-06-06  期间：2017-2018  账套：测试账套  操作员：管理员  版本号：beta0.01
      </div>
    </Content>
  </div>
</template>
<script>
export default {
  name: 'headers',
  data () {
    return {
      showIt: false,
      parentsId: -1,
      pages: 1,
      sizes: 2,
      navList: [
        {name: 'search', type: 'ios-search'},
        {name: 'message', type: 'ios-text-outline'},
        {name: 'warns', type: 'ios-notifications-outline'},
        {name: 'doubt', type: 'ios-help-circle-outline'}
      ],
      activeNames: 'main',
      menuList: null,
      styles: {
        position: 'absolute',
        left: '200px',
        top: '60px',
        bottom: '0',
        right: '0',
        background: '#E8ECF0',
        overFlow: 'hidden'
      },
      secondName: null,
      mainName: '',
      secondsData: null,
      // 开始
      titleGroup: null,
      activeTitle: '',
      titleShow: false
    };
  },
  components: {},

  computed: {},

  mounted () {
    this.getList();
    if (!this.menuList) {
      this.menuList = this.$store.getters.getMenus;
    }
  },
  watch: {
    '$route' (to, from) {
      this.$store.state.headerList.dataList = this.$store.state.headerList.dataList;
      this.titleGroup = this.$store.state.headerList.dataList;
      if (this.$store.state.headerList.dataList.length === 0) {
        this.titleShow = false;
      } else {
        this.titleShow = true;
      }
      if (to.name === 'allBasic') {
        this.activeTitle = '';
      } else if (to.name === 'main') {
        this.titleShow = false;
        return this.titleShow;
      }
    }
  },
  methods: {
    moreClick () {
      let params = '';
      this.$service.http.post('winpie/auth/logout', params, 'post')
        .then(res => {
          console.log(res);
          sessionStorage.removeItem('userInfo');
          sessionStorage.removeItem('infoTabs');
          sessionStorage.removeItem('infoMenu');
        }).catch(err => {
          console.log(err);
        });
    },
    changesname (name) {
      // debugger;
      this.secondName = name.replace(/[^0-9]/ig, '');
      this.mainName = name.replace(/[^a-z]+/ig, '');
      if (name === 'main') {
        this.$router.push({path: '/main'});
      } else {
        this.getSeconds();
      }
    },
    getList () {
      let params = {
        parentId: this.parentsId
      };
      // let heads = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // };
      this.$service.http.post('winpie/admin/menu/loadCheckMenuInfo', params, 'post')
        .then(res => {
          console.log(res);
          this.menuList = null;
          this.menuList = JSON.parse(res.result);
          if (this.menuList) {
            this.$store.dispatch('saveMenu', this.menuList);
          }
        }).catch(err => {
          console.log(err);
        });
    },
    getSeconds () {
      let params = {
        parentId: this.secondName
      };
      this.$service.http.post('winpie/admin/menu/loadCheckMenuInfo', params, 'post')
        .then(res => {
          this.secondsData = null;
          this.secondsData = JSON.parse(res.result);
          let parmasData = this.secondsData;
          this.$router.push({name: 'allBasic', params: {secondName: this.secondName, secondData: {parmasData}}});
        }).catch(err => {
          console.log(err);
        });
    },
    // begin
    getBorder (gitems, url) {
      this.titleGroup = null;
      this.activeTitle = '';
      this.activeTitle = gitems;
      this.$router.push(`/${url}`);
    },
    jumpSeconds (gitems) {
      this.$store.state.headerList.dataList.splice(this.$store.state.headerList.dataList.indexOf(gitems), 1);
      console.log(this.$store.state.headerList.dataList);
      if (this.$store.state.headerList.dataList.length === 0) {
        this.titleShow = false;
        this.$router.push('allBasic');
      } else {
        this.titleShow = true;
      }
    }
    // showList () {
    //   if (this.$store.state.headerList.dataList.length >= 1) {
    //     this.titleShow = true;
    //   } else {
    //     this.titleShow = false;
    //   }
    // }
  }
};

</script>
<style lang='less' scoped>
  .outers {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .ivu-layout-sider {
      background: #19233C;
      position: absolute;
      top: 0px;
      bottom: 0px;
      padding-top: 60px;
    }
    .ivu-layout-header {
      background: #19233C;
    }
    .footer-wz {
      position: fixed;
      bottom:0;
      width: 100%;
      height: 24px;
      background-color: #fff;
      line-height: 24px;
      color: #1C1C1C;
      padding-left: 20px;
      border-top: 1px solid #DDDEE1;
    }
    .padding-set {
      padding: 2vh;
    }
    .title-shows {
      position: relative;
      width: 100%;
      height: 40px;
      top:0px;
      display: flex;
      flex-flow: row nowrap;
      background-color: rgba(25, 35, 60, 0.85);
      .newborder {
        border: 1px solid yellow!important;
      }
      .title-close {
        z-index: 100;
        width:118px;
        height:40px;
        line-height: 40px;
        box-shadow: 2px 2px 2px #0B74CC inset, -2px -2px 2px #0B74CC inset;
        font-size: 14px;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.3);
        text-align: center;
        .icon-close {
          width: 16px;
          height: 16px;
          margin-left: 6px;
          margin-top: 12px;
          vertical-align: top;
          display: inline-block;
          background: url(../assets/image/img-close.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    @media screen and (min-width: 1199px) and (max-width: 1399px){
      .title-shows {
        height: 32px;
        .title-close {
          height: 32px;
          line-height: 32px;
          .icon-close{
            width: 14px;
            height: 14px;
            margin-left: 6px;
            margin-top: 9px;
          }
        }
      }
    }
    .height-set {
      width: 100%;
      height: 60px;
      overflow: hidden;
      .ivu-menu-light {
        background: #19233C;
      }
      .ivu-menu-horizontal {
        height: 0px;
      }
      .left-icon {
        position: absolute;
        z-index: 920;
        width: 250px;
        left: 20px;
        color: #fff;
        font-size: 16px;
        .logo-pic {
          width: 40px;
          height: 40px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .layout-nav {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .ivu-menu-item {
        font-size: 19px;
        height: 60px;
        line-height: 60px;
        }
        .peoples {
          width: 36px;
          height: 32px;
          padding: 0 20px;
          display: flex;
          .img-person {
            width: 24px;
            height: 24px;
            margin-top: 2px;
          }
          .img-arrow {
            width: 12px;
            height: 12px;
            align-self: center;
          }
        }
      }
    }
  @media screen and (min-width: 1099px) and (max-width: 1399px) {
  .height-set {
    height: 40px;
    .left-icon {
      height: 26px;
      line-height: 26px;
      top: 7px;
      font-size: 14px;
      .logo-pic {
        width: 26px;
        height: 26px;
      }
    }
    .peoples {
      width: 30px;
      height: 28px;
      .img-person {
        width: 18px;
        height: 18px;
      }
    }
    .layout-nav {
      .ivu-menu-item {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  }
  }
  .pop-in {
  position: absolute;
  right: 20px;
  top: 61px;
  width: 100px;
  height: 100px;
  border: 1px solid #eeeeee;
  background-color: burlywood;
  }
</style>
<style lang="less">
  .ivu-input-group-large .ivu-input, .ivu-input-group-large>.ivu-input-group-append, .ivu-input-group-large>.ivu-input-group-prepend {
    height: 30px;
  }
  .ivu-modal-content {
    border-radius: 0px;
    background: none;
    .ivu-modal-header {
      padding: 10px 16px;
      background: #108CEE;
      border-radius: 4px 4px 0 0;
      .ivu-modal-header p,
      .ivu-modal-header-inner {
        color: #fff;
        text-align: center;
      }
    }
    .ivu-modal-body {
      background: #fff;
      padding: 21px 50px 8px 20px;
      .ivu-form-item-content {
        margin-left: 0px!important;
        display: flex;
        justify-content: center;
        .ivu-btn {
          padding: 6px 30px;
        }
        .ivu-btn-ghost {
          margin-left: 40px;
        }
      }
    }
    .ivu-modal-close {
      top: 5px;
      .ivu-icon-ios-close {
      color: #fff;
      }
    }
  }
  .ivu-table td, .ivu-table th {
    height: 32px;
  }
  .ivu-message {
    top: 46%!important;
  }
  .ivu-modal-footer {
    display: none;
  }
  .ivu-menu-vertical .ivu-menu-submenu-title-icon {
    display: none;
  }
  .ivu-layout-sider {
    position: absolute;
    top: 0px;
    bottom: 0px;
    padding-top: 60px;
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    color: #FEFEFE;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
    background: #121A2C;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #108CEE;
  }
  .ivu-menu-dark {
    background: #19233C;
    .ivu-menu-item-group {
      .ivu-menu-item-group-title {
        height: 0;
      }
    }
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 10.5px 36px;
    i {
      margin-right: 21px;
    }
  }
}
  @media screen and (min-width: 1199px) and (max-width: 1399px) {
    .ivu-menu-horizontal {
      height: 40px;
      line-height: 40px;
    }
      .ivu-layout-sider {
      padding-top: 40px!important;
      .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
        padding: 7px 36px;
      }
    }
    .ivu-layout-content {
      top: 40px!important;
    }
  }
</style>
