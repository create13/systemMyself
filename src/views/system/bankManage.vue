<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <con-inputs :setInput="inputSet" :paramsData="paramsData" :selectInfo="selectInfo" @changeColor="colorChange" @resetColor="resetColor" @searchTable="searchTable"></con-inputs>
        </div>
        <Row>
          <!-- <i-col span="5">
            <div class="fonts-explain">组织结构</div>
            <div class="tree-construction">
              <Tree :data="treeDatas" @on-select-change="selectDot"></Tree>
            </div>
          </i-col> -->
          <i-col span="24">
              <div class="input-search row-set">
                <Row :gutter="20">
                  <i-col span="24">
                    <Button type="primary" icon="android-exit" @click="toLoadings">
                      <span>导出</span>
                    </Button>
                    <Button v-for="(bitems, bindex) in getDatas" :key="bindex" @click="newCreate(bitems.menuId, bitems.name)">{{bitems.name}}</Button>
                  </i-col>
                </Row>
              </div>
              <div class="table-show">
                <Table :columns="columnsTable" :data="tableData" highlight-row border ref="table" @on-current-change="editData"></Table>
                <Page :total="100" show-elevator @on-change="pageChange"></Page>
              </div>
          </i-col>
        </Row>
      </div>
    </div>
    <!-- 账号管理新增 -->
    <Modal :title="popTitle" v-model="popShow" class-name="vertical-center-modal" @on-visible-change="nowStatus" :mask-closable="false">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <con-checkform :formList="formData" :setClass="classSet" :selectCon="selectCon" :stateName="stateName" @blurEvent="blurData" @changeStatus="changeStatus"></con-checkform>
        <FormItem class="lay-btn">
          <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 40px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 账号管理修改 -->
    <Modal :title="popTitle" v-model="editShow" class-name="vertical-center-modal" :mask-closable="false">
      <Form ref="editform" :model="editform" :label-width="80">
        <con-checkform :formList="editDatas" :setClass="classSet" @changeStatus="changeStatus"></con-checkform>
        <FormItem class="lay-btn">
          <Button type="primary" @click="editSubmit('editform')">确定</Button>
          <Button @click="cancleForm" style="margin-left: 4px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'bankManage',
  data () {
    return {
      receptInfo: null,
      stateChange: null,
      popShow: false,
      editShow: false,
      stateName: '启用',
      loginAcount: '',
      loginName: '',
      classSet: 'single-forms',
      percentSet: 'percent-forms',
      getDatas: this.$store.getters.getTabs,
      popTitle: '',
      paramsData: {myColor: '', loadingSearch: false},
      inputSet: [
        {lables: '账户账号', models: '', spans: 4, types: 'input'},
        {lables: '账户类型', models: '', spans: 4, types: 'select'},
        {lables: '账户名称', models: '', spans: 4, types: 'input'},
        {lables: '所属公司', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 5, types: 'button'}
      ],
      selectInfo: [
        {
          value: 'New York',
          label: 'New York'
        }
      ],
      selectCon: [
        {
          value: 'New York',
          label: 'New York'
        }
      ],
      sex: null,
      treeList: [],
      formBackups: null,
      formValidate: {},
      formData: [
        {formType: 'input', lables: '所属公司', props: 'loginName', modelData: '', types: 'text'},
        {formType: 'select', lables: '账户类型', props: 'userName', modelData: ''},
        {formType: 'input', lables: '账户名称', props: 'userSex', modelData: '', types: 'text'},
        {formType: 'input', lables: '开户支行', props: 'userPosition', modelData: '', types: 'text'},
        {formType: 'input', lables: '账户账号', props: 'userMobile', modelData: '', types: 'text'},
        {formType: 'textarea', lables: '备注', props: 'userIdnumber', modelData: '', types: 'textarea'}
      ],
      editDatas: [],
      editform: {},
      numberRole: null,
      getRoleid: null,
      roleId: [],
      ruleValidate: {
        loginName: [
          {required: true, message: '请输入登录账号', trigger: 'blur'}
        ],
        userName: [
          {required: true, message: '请输入员工姓名', trigger: 'blur'}
        ],
        userSex: [
          { required: true, message: '请选择用户性别', trigger: 'change' }
        ],
        userMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      },

      // table表格操作
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
              }, '编辑'),
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
              }, '删除')
            ]);
          }
        },
        {title: '所属公司', key: 'loginName'},
        {title: '账户类型', key: 'userName'},
        {title: '开户支行', key: 'userSex'},
        {title: '账户名称', key: 'userPosition'},
        {title: '账户账号', key: 'departureDate'},
        {title: '开户时间', key: 'hiredate'},
        {title: '备注', key: 'userMobile'}
      ],
      tableData: [],
      selectRole: [],
      pages: 1,
      sizes: 10,
      rolePage: 1,
      roleSize: 10
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
    show () {},
    // 查询表单信息
    searchTable () {
      for (let y of this.inputSet) {
        if (y.types === 'input') {
          if (y.lables === '登录账户') {
            this.loginAcount = y.models;
          } else {
            this.loginName = y.models;
          }
        }
      }
      let paramsData = {
        filters: JSON.stringify({loginName: this.loginAcount, userName: this.loginName})
      };
      this.$service.http.post('winpie/admin/user/list', paramsData, 'post')
        .then(res => {
          this.tableData = res.result.rows;
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    nowStatus () {},
    changeStatus (status) {
      if (status === true) {
        this.stateName = '启用';
        this.formValidate.status = true;
      } else {
        this.stateName = '不启用';
        this.formValidate.status = false;
      }
    },
    // 选中状态时修改数据
    editData (current, prevs) {
      if (current.userStatus === 1) {
        current.userStatus = true;
      } else {
        current.userStatus = false;
      }
      if (current) {
        this.editform = Object.assign({}, current);
      }
    },
    // input框 focus状态时颜色改变设置
    colorChange (names) {
      this.paramsData.myColor = names;
    },
    // input框blur时 颜色改变原有样式
    resetColor () {
      this.paramsData.myColor = '';
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
      console.log(index);
      console.log(names);
      if (names === '新增') {
        for (let k of this.formData) {
          k.modelData = '';
        }
        this.formBackups = JSON.parse(JSON.stringify(this.formData));
        this.popShow = !this.popShow;
      } else if (names === '修改') {
        this.editDatas = this.formData;
        if (this.editform.userId) {
          for (let v of this.editDatas) {
            if (v.props === 'loginPwd') {
              v.modelData = '';
            } else {
              v.modelData = this.editform[v.props];
            }
          }
          this.editShow = !this.editShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (names === '删除') {
        if (this.editform.userId) {
          this.delInfo();
          this.editform.userId = null;
        } else {
          this.$Message.error('请选中要删除的行');
        }
      }
    },
    // form表单必填字段校验
    blurData (datas) {
      for (let y of this.formData) {
        this.formValidate[y.props] = datas;
      }
    },
    // 新增提交
    handleSubmit (name) {
      for (let y of this.formData) {
        this.formValidate[y.props] = y.modelData;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.userStatus === true) {
            this.stateChange = 1;
          } else {
            this.stateChange = 0;
          };
          if (this.formValidate.userSex === '男') {
            this.sex = 1;
          } else {
            this.sex = 0;
          };
          let params = {
            companyCode: this.$store.getters.getInfo.companyCode,
            companyId: this.$store.getters.getInfo.companyId,
            loginName: this.formValidate.loginName,
            userName: this.formValidate.userName,
            userSex: this.sex,
            userStatus: this.stateChange,
            loginPwd: this.formValidate.loginPwd,
            userPosition: this.formValidate.userPosition,
            departureDate: this.formValidate.departureDate,
            hiredate: this.formValidate.hiredate,
            userMobile: this.formValidate.userMobile,
            userIdnumber: this.formValidate.userIdnumber,
            userAddress: this.formValidate.userAddress,
            ctypeId: this.$store.getters.getInfo.ctypeId
          };
          this.$service.http.post('winpie/admin/user/addupdateuser', params, 'post')
            .then(res => {
              this.$Message.success('新增成功');
              this.$refs[name].resetFields();
              this.formData = [];
              this.formData = this.formBackups;
              this.getList();
              this.popShow = false;
            }).catch(err => {
              console.log(err);
              this.$Message.error(err.msg);
            });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    // 修改提交
    editSubmit (name) {
      for (let c of this.editDatas) {
        this.editform[c.props] = c.modelData;
      }
      if (this.editform.userStatus === true) {
        this.stateChange = 1;
      } else {
        this.stateChange = 0;
      };
      if (this.editform.userSex === '男') {
        this.sex = 1;
      } else {
        this.sex = 0;
      };
      let params = {
        loginName: this.editform.loginName,
        userName: this.editform.userName,
        userSex: this.sex,
        userStatus: this.stateChange,
        userPosition: this.editform.userPosition,
        departureDate: this.editform.departureDate,
        hiredate: this.editform.hiredate,
        userMobile: this.editform.userMobile,
        userIdnumber: this.editform.userIdnumber,
        userAddress: this.editform.userAddress,
        userId: this.editform.userId
      };
      this.$service.http.post('winpie/admin/user/addupdateuser', params, 'post')
        .then(res => {
          this.$Message.success('修改成功');
          this.getList();
          this.editform.userId = null;
          this.editShow = false;
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 内容重置
    handleReset (name) {
      this.$refs[name].resetFields();
      this.popShow = false;
    },
    // 修改取消
    cancleForm () {
      this.editShow = false;
    },
    // 获取table列表数据
    getList () {
      let paramsData = {
        page: this.pages,
        rows: this.sizes,
        filters: JSON.stringify({companyId: this.$store.getters.getInfo.companyId})
      };
      this.$service.http.post('winpie/admin/user/list', paramsData, 'post')
        .then(res => {
          this.tableData = null;
          this.tableData = res.result.rows;
          for (let u of this.tableData) {
            if (u.userSex === 1) {
              u.userSex = '男';
            } else {
              u.userSex = '女';
            }
          }
        }).catch(err => {
          console.log(err);
        });
    },
    // 删除账户信息
    delInfo () {
      let paramsData = {
        userId: this.editform.userId
      };
      this.$service.http.post('winpie/admin/user/deleteUser', paramsData, 'post')
        .then(res => {
          this.$Message.success('删除成功');
          this.getList();
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    }
    // // 选中状态
    // roleCheck () {
    //   let paramsData = {
    //     userId: this.editform.userId
    //   };
    //   this.$service.http.post('winpie/admin/user/selectUserById', paramsData, 'post')
    //     .then(res => {
    //       this.selectRole = res.roleList;
    //     }).catch(err => {
    //       console.log(err);
    //       this.$Message.error(err.msg);
    //     });
    // },
    // 获取权限树
    // getTree () {
    //   this.$service.http.post('winpie/api/companyManageTree', '', 'post')
    //     .then(res => {
    //       this.treeList = [JSON.parse(res.result)];
    //       this.recursion(this.treeList);
    //     }).catch(err => {
    //       console.log(err);
    //       this.$Message.error(err.msg);
    //     });
    // },
    // // 权限树模板方法
    // recursion (tree) {
    //   let result = [];
    //   let that = this;
    //   for (let r of tree) {
    //     let {companyName: title, nodes: children, companyId: onlyId} = r;
    //     if (children) {
    //       let childResult = that.recursion(children);
    //       children = childResult;
    //     }
    //     result.push({
    //       title,
    //       expand: true,
    //       children,
    //       onlyId
    //     });
    //   }
    //   this.treeDatas = result;
    //   return this.treeDatas;
    // },
    // 选中节点的操作
    // selectDot (dot) {
    //   this.getList(dot[0].onlyId);
    // }
  }
};
</script>
<style lang='less' scoped>
.manage-set {
  width: 100%;
  background-color: #fff;
  .center-content {
    height: calc(~"96vh - 100px");
    background-color: #fff;
    .fonts-explain {
      font-size: 14px;
      color: #60667F;
      height: 6vh;
      line-height: 6vh;
      margin-left: 2vh;
      border-bottom: 1px solid #F4F6F7;
    }
    .tree-construction {
      margin-left: 2vh;
      overflow-y: scroll;
      height: calc(~"86vh - 124px");
    }
    .input-search {
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
    .row-set {
      border-left: 1px solid #E8ECF0;
      .ivu-row {
        width: 100%;
      }
    }
    .table-show {
      width: 100%;
      .ivu-page {
        padding-top: 1vh;
        padding-bottom: 1vh;
        box-sizing: border-box;
        text-align: center;
        margin-right: 3vh;
        border-left: 1px solid #DDDEE1;
      }
      .ivu-table-wrapper {
      height: calc(~"84vh - 156px");
      }
    }
  }
}
@media screen and (min-width: 1199px) and (max-width: 1399px){
  .manage-set {
    .center-content {
      height: calc(~"96vh - 71px");
      .ivu-col-span-5 {
        .tree-construction {
          height: calc(~"86vh - 96px");
        }
      }
      .table-show {
        .ivu-table-wrapper {
          height: calc(~"87vh - 148px");
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
      .ivu-modal-body {
        .ivu-form {
          // .ivu-form-item {
          //   width: 49%;
          //   display: inline-block;
          //   margin-bottom: 12px;
          // }
          .ivu-table-wrapper {
            margin-bottom: 20px;
            margin-left: 15px;
          }
          // .lay-btn {
          //   width: 100%;
          //   display: block;
          // }
        }
        // .left-align {
        //   .ivu-form-item-content {
        //     justify-content: flex-start;
        //     overflow: hidden;
        //     display: inline-block;
        //     align-items: center;
        //   }
        // }
      }
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
