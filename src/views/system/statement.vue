<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <con-inputs :setInput="companySets" :paramsData="paramsDatas" @changeColor="colorChange" @resetColor="resetColor" @searchTable="searchInfo"></con-inputs>
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
    <!-- 区域公司新增 -->
    <Modal :title="popTitle" v-model="popShow" class-name="vertical-center-modal" @on-visible-change="nowStatus" :mask-closable="false">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <con-checkform :formList="monthData" :setClass="classSet" @blurSign="blurData" @setValue="setValue" :autoData="autoSet"></con-checkform>
        <FormItem class="lay-btn">
          <Button type="primary" @click="monthSubmit('formValidate')">保存</Button>
          <Button @click="companyReset('formValidate')" style="margin-left: 40px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 区域公司修改 -->
    <Modal :title="popTitle" v-model="editShow" class-name="vertical-center-modal" :mask-closable="false">
      <Form ref="editform" :model="editform" :label-width="80">
        <con-checkform :formList="editDatas" :setClass="classSet" @blurSign="blurData" @setValue="setValue" :autoData="autoSet"></con-checkform>

        <FormItem class="lay-btn">
          <Button type="primary" @click="editSubmit('editform')">确定</Button>
          <Button @click="cancleEdit" style="margin-left: 4px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'statement',
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
      companySets: [
        {lables: '公司名称', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 5, types: 'button'}
      ],
      formValidate: {
        companyAName: '',
        companyBName: '',
        companyAId: '',
        companyBId: '',
        msDay: '',
        dsTime: ''
      },
      autoSet: [],
      typeChange: null,
      editDatas: [],
      classSet: 'single-forms',
      monthData: [
        {formType: 'autoComplete', lables: '甲方公司', props: 'companyAName', modelData: '', signData: 'companyAName', valueShow: false},
        {formType: 'autoComplete', lables: '乙方公司', props: 'companyBName', modelData: '', signData: 'companyBName', valueShow: false},
        {formType: 'time', lables: '签约时间', props: 'dsTime', modelData: ''}
      ],
      ruleValidate: {
        companyAName: [
          {required: true, message: '请输入甲方公司', trigger: 'blur'}
        ],
        companyBName: [
          {required: true, message: '请输入乙方公司', trigger: 'blur'}
        ],
        dsTime: [
          {required: true, type: 'string', message: '请输入签约时间', trigger: 'change'}
        ]
      },
      resetPass: {
        password: '',
        newPass: '',
        surePass: ''
      },
      allocateName: '',
      searchName: '',
      receiveDatas: [],
      saveDatas: [],
      editform: {},
      formBackups: null,
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
        {title: '甲方公司', key: 'companyAName'},
        {title: '乙方公司', key: 'companyBName'},
        {title: '签约日期', key: 'msDay'},
        {title: '签约时间', key: 'dsTime'}
      ],
      tableData: [],
      pages: 1,
      sizes: 10
    };
  },

  components: {},

  computed: {},
  watch: {
  },
  mounted () {
    this.getMonth();
  },

  methods: {
    search () {},
    refresh () {},
    nowStatus () {},
    // 值设置
    setValue (values, names, id) {
      if (names === 'companyAName') {
        this.formValidate.companyAName = values;
        this.formValidate.companyAId = id;
      } else {
        this.formValidate.companyBName = values;
        this.formValidate.companyBId = id;
      }
      for (let r of this.monthData) {
        if (r.props === names) {
          r.modelData = values;
          r.valueShow = false;
        }
      }
    },
    // 选中状态时修改数据
    editData (current) {
      if (current) {
        this.editform = Object.assign({}, current);
      }
      console.log(this.editform);
    },
    // 输入框输入内容 进行模糊搜索
    blurData (res, sign) {
      if (sign === 'companyAName') {
        for (let r of this.monthData) {
          if (r.props === sign) {
            r.valueShow = true;
          }
        }
        this.searchMatch(res);
      } else {
        this.searchMatch(res);
        for (let r of this.monthData) {
          if (r.props === sign) {
            r.valueShow = true;
          }
        }
      }
      for (let y of this.monthData) {
        this.formValidate[y.props] = y.modelData;
      }
      console.log(this.formValidate);
    },
    // 查询数据信息
    searchInfo () {
      for (let u of this.companySets) {
        console.log(u);
        if (u.types === 'input') {
          if (u.lables === '公司名称') {
            this.allocateName = u.models;
          }
        }
        console.log(this.allocateName);
      }
      let paramsData = {
        companyId: this.$store.getters.getInfo.companyId,
        companyName: this.allocateName
      };
      this.$service.http.post('winpie/msconfig/List', paramsData, 'post')
        .then(res => {
          this.tableData = res.result;
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // input框 focus状态时颜色改变设置
    colorChange (names) {
      this.paramsDatas.myColor = names;
    },
    // input框blur时 颜色改变原有样式
    resetColor () {
      this.paramsDatas.myColor = '';
    },
    // 数据导出
    toLoadings () {
      this.$refs.table.exportCsv({
        filename: '表格数据'
      });
    },
    // 修改page
    pageChange (page) {
      this.pages = page;
      this.getMonth();
    },
    // v-for出的按钮调用事件判断
    newCreate (index, names) {
      this.popTitle = names;
      if (names === '新增') {
        for (let k of this.monthData) {
          k.modelData = '';
        }
        this.popShow = !this.popShow;
        this.formBackups = JSON.parse(JSON.stringify(this.monthData));
      } else if (names === '修改') {
        this.editDatas = this.monthData;
        if (this.editform.companyAId && this.editform.companyBId) {
          for (let v of this.editDatas) {
            v.modelData = this.editform[v.props];
          }
          this.editShow = !this.editShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (names === '删除') {
        if (this.editform.companyAId && this.editform.companyBId) {
          this.delCompany();
          this.editform.companyAId = null;
          this.editform.companyBId = null;
        } else {
          this.$Message.error('请选中要删除的行');
        }
      }
    },
    // 获取table列表数据
    getMonth () {
      let paramsData = {
        page: this.pages,
        rows: this.sizes,
        companyId: this.$store.getters.getInfo.companyId
        // filters: JSON.stringify({companyName: null})
      };
      this.$service.http.post('winpie/msconfig/List', paramsData, 'post')
        .then(res => {
          this.tableData = null;
          this.tableData = res.result;
        }).catch(err => {
          console.log(err);
        });
    },
    // 增加
    monthSubmit (name) {
      for (let y of this.monthData) {
        this.formValidate[y.props] = y.modelData;
      }
      console.log(this.formValidate);
      this.$refs[name].validate((valid) => {
        if (valid) {
          let paramsData = {
            companyAName: this.formValidate.companyAName,
            companyBName: this.formValidate.companyBName,
            companyAId: this.formValidate.companyAId,
            companyBId: this.formValidate.companyBId,
            dsTime: this.formValidate.dsTime,
            hubCid: this.$store.getters.getInfo.companyId
          };
          this.$service.http.post('winpie/msconfig/addupdate', paramsData, 'post')
            .then(res => {
              console.log(res);
              this.popShow = false;
              this.$Message.success('新增成功');
              this.$refs[name].resetFields();
              this.monthData = [];
              this.monthData = this.formBackups;
              this.getMonth();
            }).catch(err => {
              console.log(err);
              this.$Message.error(err.msg);
            });
        }
      });
    },
    // 模糊搜索
    searchMatch (searchs) {
      let paramsData = {
        companyId: this.$store.getters.getInfo.companyId,
        filters: JSON.stringify({companyName: searchs || this.searchName})
      };
      this.$service.http.post('winpie/api/companyByPid', paramsData, 'post')
        .then(res => {
          this.autoSet = JSON.parse(res.result);
          console.log(this.autoSet);
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 取消新增
    companyReset () {
      this.popShow = false;
    },
    // 修改提交
    editSubmit () {
      for (let c of this.editDatas) {
        this.editform[c.props] = c.modelData;
      }
      let params = {
        msconfigId: this.editform.msconfigId,
        companyAName: this.editform.companyAName,
        companyBName: this.editform.companyBName,
        companyAId: this.editform.companyAId,
        companyBId: this.editform.companyBId,
        dsTime: this.editform.dsTime,
        hubCid: this.$store.getters.getInfo.companyId
      };
      this.$service.http.post('winpie/msconfig/addupdate', params, 'post')
        .then(res => {
          this.editShow = false;
          this.$Message.success('修改成功');
          this.getMonth();
          this.editform.companyAId = null;
          this.editform.companyBId = null;
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 取消修改
    cancleEdit () {
      this.editShow = false;
    },
    // 删除区域公司
    delCompany () {
      let paramsData = {
        msconfigId: this.editform.msconfigId
      };
      this.$service.http.post('winpie/msconfig/delete', paramsData, 'post')
        .then(res => {
          this.$Message.success('删除成功');
          this.getMonth();
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    }
    // 自动匹配搜索
    // autoSearch (value) {
    //   this.searchMatch(value);
    //   this.autoData = !value ? [] : this.receiveDatas;
    //   console.log(this.receiveDatas);
    // }
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
  // .set-width {
  //   width: calc(~"49% - 80px");
  //   height: 24px;
  //   position: relative;
  //   z-index: 9999;
  //   left: 80px;
  //   text-align: left;
  // }
  // .single-forms {
  //   width: 49%;
  //   .left-align {
  //     display: flex;
  //     justify-content: flex-start;
  //     flex-flow: row nowrap;
  //     .ivu-form-item-content {
  //       display: inline-block;
  //     }
  //   }
  // }
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
