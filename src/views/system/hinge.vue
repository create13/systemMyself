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
        <con-checkform :formList="formData" :setClass="classSet" :stateName="stateName" @blurEvent="blurData" @changeStatus="changeStatus"></con-checkform>
        <FormItem class="lay-btn">
          <Button type="primary" @click="companySubmit('formValidate')">保存</Button>
          <Button @click="companyReset('formValidate')" style="margin-left: 40px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 区域公司修改 -->
    <Modal :title="popTitle" v-model="editShow" class-name="vertical-center-modal" :mask-closable="false">
      <Form ref="editform" :model="editform" :label-width="80">
        <con-checkform :formList="editDatas" @changeStatus="changeStatus" :setClass="classSet"></con-checkform>
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
  name: 'hinge',
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
      stateName: '启用',
      companySets: [
        {lables: '分拨名称', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 5, types: 'button'}
      ],
      formValidate: {
        companyName: '',
        companyStatus: true,
        companyCode: '',
        contacts: '',
        contactsTel: '',
        officeAddress: ''
      },
      editDatas: [],
      classSet: 'single-forms',
      formData: [
        {formType: 'input', lables: '区域物流公司名称', props: 'companyName', modelData: '', types: 'text'},
        {formType: 'switch', lables: '区域物流公司状态', props: 'companyStatus', modelData: true},
        {formType: 'input', lables: '组织代码', props: 'companyCode', modelData: '', types: 'text'},
        {formType: 'input', lables: '联系人', props: 'contacts', modelData: '', types: 'text'},
        {formType: 'input', lables: '联系电话', props: 'contactsTel', modelData: '', types: 'text'},
        {formType: 'input', lables: '详细地址', props: 'officeAddress', modelData: '', types: 'text'}
      ],
      ruleValidate: {
        companyName: [
          {required: true, message: '请输入区域物流公司名称', trigger: 'blur'}
        ],
        companyCode: [
          {required: true, message: '请输入组织代码', trigger: 'blur'}
        ],
        contacts: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        contactsTel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ]
      },
      resetPass: {
        password: '',
        newPass: '',
        surePass: ''
      },
      allocateName: '',
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
        {title: '区域物流公司名称', key: 'companyName'},
        {title: '区域物流公司状态', key: 'companyStatus'},
        {title: '组织代码', key: 'companyCode'},
        {title: '联系人', key: 'contacts'},
        {title: '联系电话', key: 'contactsTel'},
        {title: '详细地址', key: 'officeAddress'}
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
    this.getList();
  },

  methods: {
    search () {},
    refresh () {},
    nowStatus () {},
    // 选中状态时修改数据
    editData (current) {
      if (current) {
        this.editform = Object.assign({}, current);
        if (this.editform.companyStatus === '启用') {
          this.editform.companyStatus = true;
        } else {
          this.editform.companyStatus = false;
        }
      }
    },
    // form表单必填字段校验
    blurData (datas) {
      for (let y of this.formData) {
        this.formValidate[y.props] = datas;
      }
    },
    // 改变状态
    changeStatus (status) {
      if (status === true) {
        this.stateName = '启用';
        this.formValidate.status = true;
      } else {
        this.stateName = '不启用';
        this.formValidate.status = false;
      }
    },
    // 查询数据信息
    searchInfo () {
      for (let y of this.companySet) {
        if (y.types === 'input') {
          if (y.lables === '分拨名称') {
            this.allocateName = y.models;
          }
        }
      }
      let paramsData = {
        companyId: this.$store.getters.getInfo.companyId,
        filters: JSON.stringify({companyName: this.allocateName})
      };
      this.$service.http.post('winpie/api/companyByPid', paramsData, 'post')
        .then(res => {
          this.tableData = JSON.parse(res.result);
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
      this.getList();
    },
    // v-for出的按钮调用事件判断
    newCreate (index, names) {
      this.popTitle = names;
      if (names === '新增') {
        for (let k of this.formData) {
          if (k.formType === 'switch') {
            k.modelData = true;
          } else {
            k.modelData = '';
          }
        }
        this.popShow = !this.popShow;
        this.formBackups = JSON.parse(JSON.stringify(this.formData));
      } else if (names === '修改') {
        this.editDatas = this.formData;
        if (this.editform.companyId) {
          for (let v of this.editDatas) {
            v.modelData = this.editform[v.props];
          }
          this.editShow = !this.editShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (names === '删除') {
        if (this.editform.companyId) {
          this.delCompany();
          this.editform.companyId = null;
        } else {
          this.$Message.error('请选中要删除的行');
        }
      }
    },
    // 获取table列表数据
    getList () {
      let paramsData = {
        page: this.pages,
        rows: this.sizes,
        companyId: this.$store.getters.getInfo.companyId,
        filters: JSON.stringify({companyName: null, companyTags: 3})
      };
      this.$service.http.post('winpie/api/companyByPid', paramsData, 'post')
        .then(res => {
          this.tableData = null;
          this.tableData = JSON.parse(res.result);
          for (let d of this.tableData) {
            if (d.companyStatus === 1) {
              d.companyStatus = '启用';
            } else {
              d.companyStatus = '不启用';
            }
          }
        }).catch(err => {
          console.log(err);
        });
    },
    companySubmit (name) {
      for (let y of this.formData) {
        this.formValidate[y.props] = y.modelData;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.companyStatus === true) {
            this.stateChange = 1;
          } else {
            this.stateChange = 0;
          };
          let paramsData = {
            companyPId: this.$store.getters.getInfo.companyId,
            companyTags: 3,
            companyName: this.formValidate.companyName,
            companyStatus: this.stateChange,
            companyCode: this.formValidate.companyCode,
            contacts: this.formValidate.contacts,
            contactsTel: this.formValidate.contactsTel,
            officeAddress: this.formValidate.officeAddress
          };
          this.$service.http.post('winpie/api/addCompany', paramsData, 'post')
            .then(res => {
              this.popShow = false;
              this.$Message.success('新增成功');
              this.$refs[name].resetFields();
              this.formData = [];
              this.formData = this.formBackups;
              this.getList();
            }).catch(err => {
              console.log(err);
              this.$Message.error(err.msg);
            });
        }
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
      if (this.editform.companyStatus === true) {
        this.stateChange = 1;
      } else {
        this.stateChange = 0;
      };
      let params = {
        companyId: this.editform.companyId,
        companyName: this.editform.companyName,
        companyStatus: this.stateChange,
        companyCode: this.editform.companyCode,
        contacts: this.editform.contacts,
        contactsTel: this.editform.contactsTel,
        officeAddress: this.editform.officeAddress
      };
      this.$service.http.post('winpie/api/UpdateCompany', params, 'post')
        .then(res => {
          this.editShow = false;
          this.$Message.success('修改成功');
          this.getList();
          this.editform.companyId = null;
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
        companyId: this.editform.companyId
      };
      this.$service.http.post('winpie/api/delCompany', paramsData, 'post')
        .then(res => {
          this.$Message.success('删除成功');
          this.getList();
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
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
