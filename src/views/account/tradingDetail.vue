<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <con-inputs :setInput="inputSet" :paramsData="paramsDatas" :selectInfo="selectInfo" @changeColor="colorChange" @resetColor="resetColor" @searchTable="searchInfo"></con-inputs>
        </div>
        <div class="input-search row-set">
          <Row :gutter="20">
            <i-col span="24">
              <Button type="primary" :loading="loadingSearch" icon="android-exit" @click="toLoadings">
                <span v-if="!loadingSearch">导出</span>
                <span v-else>Loading...</span>
              </Button>
              <Button v-for="(bitems, bindex) in getDatas" :key="bindex" @click="newCreate(bitems.menuId, bitems.name)">{{bitems.name}}</Button>
            </i-col>
          </Row>
        </div>
        <div class="table-show">
          <Table :columns="columnsTable" :data="tableData" highlight-row border ref="table" @on-current-change="editData"></Table>
          <Page :total="100" show-elevator @on-change="pageChange"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tradingDetail',
  data () {
    return {
      value1: '',
      myColor: '',
      receptInfo: null,
      stateChange: null,
      paramsDatas: {myColor: '', loadingSearch: false},
      popShow: false,
      editShow: false,
      resetShow: false,
      getDatas: this.$store.getters.getTabs,
      loadingSearch: false,
      popTitle: '',
      inputSet: [
        {lables: '结算日期:', models: '', spans: 4, types: 'date'},
        {lables: '~', models: '', spans: 4, types: 'date'},
        {lables: '结算公司:', models: '', spans: 4, types: 'input'},
        {lables: '费用类型:', models: '', spans: 4, types: 'select'},
        {lables: '运单号:', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 3, types: 'button'}
      ],
      formValidate: {
        loginName: '',
        pass: '',
        userStatus: '',
        userName: ''
      },
      resetPass: {
        password: '',
        newPass: '',
        surePass: ''
      },
      editform: {},
      columnsTable: [
        {type: 'index', width: 60, align: 'center'},
        {
          title: '操作',
          key: 'opration',
          align: 'center',
          width: 123,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '6px',
                  color: '#108CEE',
                  textDecoration: 'underline'
                },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              }, '冻结'),
              h('a', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '-5px',
                  color: '#108CEE',
                  textDecoration: 'underline'
                },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              }, '查看明细')
            ]);
          }
        },
        {title: '账户名称', key: ''},
        {title: '组织代码', key: ''},
        {title: '所属枢纽', key: ''},
        {title: '结算账户状态', key: ''},
        {title: '结算账户余额', key: ''},
        {title: '结算账户授信额度', key: ''},
        {title: '待收款', key: ''},
        {title: '冻结金额', key: ''},
        {title: '可用额度', key: ''},
        {title: '货款账户余额', key: ''}
      ],
      tableData: [],
      pages: 1,
      sizes: 10,
      selectInfo: [
        {
          value: '专线',
          label: '专线'
        }
      ]
    };
  },

  components: {},

  computed: {},
  watch: {
  },
  mounted () {
    this.getList();
    console.log(this.editform);
  },

  methods: {
    search () {},
    refresh () {},
    nowStatus () {},
    // 选中状态时修改数据
    editData () {},
    // 查询数据信息
    searchInfo () {},
    // input框 focus状态时颜色改变设置
    colorChange (names) {
      console.log(names);
      this.paramsDatas.myColor = names;
    },
    // input框blur时 颜色改变原有样式
    resetColor () {
      this.paramsDatas.myColor = '';
    },
    // 数据导出
    toLoadings () {
      this.$refs.table.exportCsv({
        filename: '账号管理'
      });
    },
    // 修改page
    pageChange (page) {
      this.pages = page;
      this.getList();
    },
    // v-for出的按钮调用事件判断
    newCreate (index, names) {
      this.popTitle = names;
      if (index === 11) {
        this.popShow = !this.popShow;
      } else if (index === 13) {
        if (this.editform.userId) {
          this.editShow = !this.editShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (index === 14) {
        this.delInfo();
      } else if (index === 15) {

      } else if (index === 16) {
        if (this.editform.userId) {
          this.resetShow = !this.resetShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (index === 17) {

      }
    },
    // 获取table列表数据
    getList () {
      // let paramsData = {
      //   page: this.pages,
      //   rows: this.sizes,
      //   filters: JSON.stringify({companyId: this.$store.getters.getInfo.companyId})
      // };
      // this.$service.http.post('winpie/admin/user/list', paramsData, 'post')
      //   .then(res => {
      //     this.tableData = null;
      //     this.tableData = res.result.rows;
      //   }).catch(err => {
      //     console.log(err);
      //   });
    }

  }
};
</script>
<style lang='less' scoped>
.manage-set {
  width: 100%;
  .center-content {
    height: calc(~"96vh - 100px");
    background-color: #fff;
    .input-search {
      &:nth-child(2) {
        border: 0;
      }
      width: 100%;
      height: 6vh;
      padding-left: 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #F4F6F7;
      .ivu-btn {
        padding: 5.4px 15px;
        margin-left: 10px;
        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }
    .row-set .ivu-row {
      width: 100%;
    }
    .table-show {
      width: 100%;
      .ivu-page {
        margin-top: 1vh;
        text-align: center;
        margin-right: 3vh;
      }
      .ivu-table-wrapper {
      height: calc(~"84vh - 172px");
      }
    }
  }
}
@media screen and (min-width: 1199px) and (max-width: 1399px){
  .manage-set {
    .center-content {
      height: calc(~"96vh - 71px");
      // .input-search {
      //   .ivu-btn {
      //     padding: 4px 15px;
      //   }
      // }
      .table-show {
        .ivu-table-wrapper {
          height: calc(~"87vh - 132px");
        }
      }
    }
  }
}
</style>
<style lang='less'>
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
      top: 0;
    }
  }
  .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td {
    background: #AED7F7;
  }
  .ivu-row {
    .ivu-input-wrapper {
      .ivu-input-group-append,
      .ivu-input-group-prepend {
        background: none;
        border: none;
        .blueColor {
          color: #108CEE;
        }
      }
    }
  }
  .ivu-input-group-append, .ivu-input-group>.ivu-input:last-child {
    border-radius: 3px!important;
  }
  @media screen and (min-width: 1199px) and (max-width: 1399px){
    .ivu-input-group-large .ivu-input,
    .ivu-input-group-large>.ivu-input-group-append,
    .ivu-input-group-large>.ivu-input-group-prepend {
      height: 28px!important;
    }
    .ivu-page-item-jump-next,
    .ivu-page-item-jump-prev,
    .ivu-page-next, .ivu-page-prev,
    .ivu-page-item,
    .ivu-page-options-elevator input {
      height: 24px;
      line-height: 24px;
    }
  }
</style>
