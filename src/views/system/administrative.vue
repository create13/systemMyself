<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <con-inputs :setInput="inputSet" :paramsData="paramsData" @changeColor="colorChange" @resetColor="resetColor" @searchTable="searchTable"></con-inputs>
        </div>
        <Row>
          <i-col span="5">
            <div class="fonts-explain">组织结构</div>
            <div class="tree-construction">
              <Tree :data="treeDatas" @on-select-change="selectDot"></Tree>
            </div>
          </i-col>
          <i-col span="19">
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
        <con-checkform :formList="formData" :setClass="classSet" :stateName="stateName" @blurEvent="blurData" @changeStatus="changeStatus"></con-checkform>
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
          <Button  @click="cancleForm" style="margin-left: 4px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 密码重置 -->
    <Modal :title="popTitle" v-model="resetShow" class-name="vertical-center-modal" :mask-closable="false">
      <Form ref="resetPass" :model="resetPass" :label-width="80" :rules="rulePass">
        <con-checkform :formList="passData" :setClass="percentSet" @blurEvent="blurPass"></con-checkform>
        <FormItem  class="lay-btn">
          <Button type="primary" @click="passSubmit('resetPass')">确定</Button>
          <Button @click="cancleReset('resetPass')" style="margin-left: 40px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 分配权限 -->
    <Modal :title="popTitle" v-model="authority" class-name="vertical-center-modal" :mask-closable="false">
      <Form ref="authorityInfo" :model="authorityInfo" :label-width="80">
        <Table border ref="selection" :columns="roleColumn" :data="roleData" @on-selection-change="selecTable"></Table>
        <FormItem  class="lay-btn">
          <Button type="primary" @click="roleSubmit('authorityInfo')">确定</Button>
          <Button @click="cancleRole()" style="margin-left: 40px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'administrative',
  data () {
    return {
      receptInfo: null,
      stateChange: null,
      popShow: false,
      editShow: false,
      resetShow: false,
      stateName: '启用',
      loginAcount: '',
      loginName: '',
      classSet: 'single-forms',
      percentSet: 'percent-forms',
      authority: false,
      getDatas: this.$store.getters.getTabs,
      popTitle: '',
      paramsData: {myColor: '', loadingSearch: false},
      inputSet: [
        {lables: '区域名称', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 5, types: 'button'}
      ],
      sex: null,
      treeDatas: [],
      treeList: [],
      formBackups: null,
      formValidate: {},
      resetPass: {
        password: '',
        newPass: '',
        surePass: ''
      },
      formData: [
        {formType: 'input', lables: '登录账号', props: 'loginName', modelData: '', types: 'text'},
        {formType: 'input', lables: '员工姓名', props: 'userName', modelData: '', types: 'text'},
        {formType: 'radio', lables: '用户性别', props: 'userSex', modelData: '男'},
        {formType: 'switch', lables: '登录状态', props: 'userStatus', modelData: true},
        {formType: 'input', lables: '密码', props: 'loginPwd', modelData: '', types: 'password'},
        {formType: 'input', lables: '职务', props: 'userPosition', modelData: '', types: 'text'},
        {formType: 'date', lables: '入职时间', props: 'departureDate', modelData: ''},
        {formType: 'date', lables: '离职时间', props: 'hiredate', modelData: ''},
        {formType: 'input', lables: '手机号码', props: 'userMobile', modelData: '', types: 'text'},
        {formType: 'input', lables: '证件号码', props: 'userIdnumber', modelData: '', types: 'text'},
        {formType: 'input', lables: '地址', props: 'userAddress', modelData: '', types: 'text'}
      ],
      passData: [
        {formType: 'input', lables: '原密码', props: 'password', modelData: '', types: 'password'},
        {formType: 'input', lables: '新密码', props: 'newPass', modelData: '', types: 'password'},
        {formType: 'input', lables: '确认新密码', props: 'surePass', modelData: '', types: 'password'}
      ],
      editDatas: [],
      editform: {},
      numberRole: null,
      getRoleid: null,
      roleId: [],
      authorityInfo: {},
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
      // 密码校验规则
      rulePass: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        surePass: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
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
        {title: '登录账号', key: 'loginName'},
        {title: '员工姓名', key: 'userName'},
        {title: '性别', key: 'userSex'},
        {title: '职务', key: 'userPosition'},
        {title: '入职时间', key: 'departureDate'},
        {title: '离职时间', key: 'hiredate'},
        {title: '手机号码', key: 'userMobile'},
        {title: '证件号码', key: 'userIdnumber'},
        {title: '地址', key: 'userAddress'}
      ],
      tableData: [],
      // 角色权限
      roleColumn: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '角色名称',
          key: 'roleMemo'
        },
        {
          title: '角色描述',
          key: 'roleDesc'
        }
      ],
      roleData: [],
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
    this.getTree();
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
      if (names === '账号管理新增') {
        for (let k of this.formData) {
          if (k.formType === 'switch') {
            k.modelData = true;
          } else {
            k.modelData = '';
          }
        }
        this.formBackups = JSON.parse(JSON.stringify(this.formData));
        this.popShow = !this.popShow;
      } else if (names === '账号管理修改') {
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
      } else if (names === '账号管理删除') {
        if (this.editform.userId) {
          this.delInfo();
          this.editform.userId = null;
        } else {
          this.$Message.error('请选中要删除的行');
        }
      } else if (names === '账号管理停用') {
        this.$Message.error('该功能尚未开通，请耐心等候');
      } else if (names === '账号管理密码重置') {
        if (this.editform.userId) {
          this.resetShow = !this.resetShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (names === '账号管理角色分配') {
        if (this.editform.userId) {
          this.authority = !this.authority;
          this.getRole();
          this.roleCheck();
        } else {
          this.$Message.error('请选中要修改的行');
        }
      }
    },
    // form表单必填字段校验
    blurData (datas) {
      for (let y of this.formData) {
        this.formValidate[y.props] = datas;
      }
    },
    blurPass (field) {
      for (let y of this.passData) {
        this.resetPass[y.props] = field;
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
    getList (nodew) {
      let paramsData = {
        page: this.pages,
        rows: this.sizes,
        filters: JSON.stringify({companyId: nodew || this.$store.getters.getInfo.companyId})
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
    },
    // 账号密码重置提交
    passSubmit (name) {
      for (let y of this.passData) {
        this.resetPass[y.props] = y.modelData;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.resetPass.newPass === this.resetPass.surePass) {
            let paramsData = {
              userId: this.editform.userId,
              loginName: this.editform.loginName,
              loginPwd: this.resetPass.newPass,
              oldPassword: this.resetPass.password
            };
            this.$service.http.post('winpie/admin/user/updatePassword', paramsData, 'post')
              .then(res => {
                this.$Message.success('密码重置成功');
                this.resetShow = false;
                this.$refs[name].resetFields();
                this.resetPass.newPass = '';
                this.resetPass.surePass = '';
              }).catch(err => {
                console.log(err);
                this.$Message.error(err.msg);
              });
          } else {
            this.$Message.error('新密码与确认密码不一致，请重新输入');
          }
        }
      });
    },
    // 账号密码重置取消
    cancleReset (name) {
      this.$refs[name].resetFields();
      this.resetShow = false;
    },
    // role角色分配
    getRole () {
      let paramsData = {
        page: this.rolePage,
        rows: this.roleSize,
        filters: JSON.stringify({createCid: this.$store.getters.getInfo.companyId})
      };
      this.$service.http.post('winpie/admin/role/list', paramsData, 'post')
        .then(res => {
          this.roleData = res.result.rows;
          if (this.selectRole.length) {
            for (let v of this.roleData) {
              for (let r of this.selectRole) {
                if (v.roleId === r.roleId) {
                  v._checked = true;
                }
              }
            }
          }
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 账号管理角色分配权限提交
    roleSubmit (role) {
      for (let u of this.getRoleid) {
        this.roleId.push(u.roleId);
      }
      this.numberRole = this.roleId.join(',');
      let paramsData = {
        role: this.numberRole,
        userId: this.editform.userId
      };
      this.$service.http.post('winpie/admin/user/saveRoleSet', paramsData, 'post')
        .then(res => {
          this.$Message.success('账号管理权限分配成功');
          this.authority = false;
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 选中当前项table
    selecTable (row) {
      this.getRoleid = row;
    },
    // 选中状态
    roleCheck () {
      let paramsData = {
        userId: this.editform.userId
      };
      this.$service.http.post('winpie/admin/user/selectUserById', paramsData, 'post')
        .then(res => {
          this.selectRole = res.roleList;
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 账号管理角色分配权限取消
    cancleRole () {
      this.authority = false;
    },
    // 获取权限树
    getTree () {
      this.$service.http.post('winpie/regions/regionTree', '', 'post')
        .then(res => {
          this.treeList = res.result;
          console.log(this.treeList);
          this.recursion(this.treeList);
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 权限树模板方法
    recursion (tree) {
      // let results = [];
      for (let g of tree) {
        if (g.regionId === g.regionPId) {
        }
      }
    },
    // 选中节点的操作
    selectDot (dot) {
      this.getList(dot[0].onlyId);
    }
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
          .ivu-table-wrapper {
            margin-bottom: 20px;
            margin-left: 15px;
          }
        }
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
