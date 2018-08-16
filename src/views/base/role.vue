<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <con-inputs :setInput="inputRole" :paramsData="paramsDatas" @changeColor="colorChange" @resetColor="resetColor" @searchTable="searchRole"></con-inputs>
        </div>
        <Row>
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
                <Table :columns="columnsTable" :data="tableRole" highlight-row border ref="table" @on-current-change="editData"></Table>
                <Page :total="100" show-elevator @on-change="pageChange"></Page>
              </div>
          </i-col>
          <i-col span="5">
            <div class="fonts-explain">
              <span>权限树</span>
              <span class="specials">平台系统管理员</span>
              <Button type="primary" icon="document-text" @click="saveImpover">保存授权</Button>
            </div>
            <div class="tree-construction">
              <Tree :data="treeRoles" show-checkbox multiple></Tree>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
    <Modal :title="popTitle" v-model="popShow" class-name="vertical-center-modal setModal" draggable  @on-visible-change="nowStatus">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <con-checkform :formList="roleData" :setClass="classRole" :stateName="stateNames" @blurEvent="blurRole" @changeStatus="changeStatus"></con-checkform>
        <FormItem>
          <Button type="primary" @click="roleSubmit('formValidate')">确定</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 40px">取消</Button>
        </FormItem>
      </Form>
    </Modal>

    <Modal :title="popTitle" v-model="editShow" draggable class-name="vertical-center-modal">
      <Form ref="editform" :model="editform" :label-width="80">
        <con-checkform :formList="editRoles" :stateName="stateNames" :setClass="classRole" @changeStatus="changeStatus"></con-checkform>
        <FormItem>
          <Button type="primary" @click="editSubmit('editform')">确定</Button>
          <Button @click="editReset('editform')" style="margin-left: 4px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'baseAcount',
  data () {
    return {
      value1: '',
      swtichState: true,
      receptInfo: null,
      stateChange: null,
      editChange: null,
      popShow: false,
      editShow: false,
      resetShow: false,
      stateNames: '启用',
      treeParams: -1,
      editRoles: [],
      getMenuId: null,
      getDatas: this.$store.getters.getTabs,
      paramsDatas: {myColor: '', loadingSearch: false},
      popTitle: '',
      roleName: '',
      classRole: 'percent-forms',
      roleData: [
        {formType: 'input', lables: '角色名称', props: 'roleMemo', modelData: '', types: 'text'},
        {formType: 'input', lables: '角色描述', props: 'roleDesc', modelData: '', types: 'text'},
        {formType: 'switch', lables: '角色状态', props: 'roleStatus', modelData: true}
      ],
      inputRole: [
        {lables: '角色查询', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 5, types: 'button'}
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
      ruleValidate: {
        roleMemo: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
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
        {title: '角色名称', key: 'roleMemo'},
        {title: '角色描述', key: 'roleDesc'},
        {title: '角色状态', key: 'roleStatus'},
        {title: '创建时间', key: 'createTime'}
      ],
      treeRoles: [],
      tableRole: [],
      pages: 1,
      sizes: 10
    };
  },

  components: {},

  computed: {},
  watch: {
  },
  mounted () {
    this.getRole();
    this.getTreeData();
    console.log(this.editform);
    console.log(this.treeRoles);
  },

  methods: {
    // 搜索查询
    searchRole () {
      for (let y of this.inputRole) {
        if (y.types === 'input') {
          if (y.lables === '角色查询') {
            this.roleName = y.models;
          }
        }
      }
      this.getRole({roleMemo: this.roleName});
    },
    // 必填字段校验
    blurRole (datas) {
      for (let y of this.roleData) {
        this.formValidate[y.props] = datas;
      }
    },
    changeStatus (status) {
      if (status === true) {
        this.stateNames = '启用';
        this.formValidate.status = true;
      } else {
        this.stateNames = '不启用';
        this.formValidate.status = false;
      }
    },
    nowStatus () {},
    stateStatus () {
    },
    // 选中状态时修改数据
    editData (current, prevs) {
      console.log(current);
      if (current.roleStatus === '启用') {
        current.roleStatus = true;
      } else {
        current.roleStatus = false;
      }
      this.editform = Object.assign({}, current);
      this.refreshPower();
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
      this.getRole();
    },
    // v-for出的按钮调用事件判断
    newCreate (index, names) {
      this.popTitle = names;
      if (names === '角色管理新建角色') {
        for (let k of this.roleData) {
          if (k.formType === 'switch') {
            k.modelData = true;
          } else {
            k.modelData = '';
          }
        }
        this.formSave = JSON.parse(JSON.stringify(this.roleData));
        this.popShow = !this.popShow;
      } else if (names === '角色管理修改角色') {
        this.editRoles = this.roleData;
        if (this.editform.createCid) {
          console.log(this.editform.createCid);
          for (let v of this.editRoles) {
            v.modelData = this.editform[v.props];
          }
          console.log(this.editform);
          this.editShow = !this.editShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (names === '角色管理删除角色') {
        if (this.editform.createCid) {
          this.delInfo();
          this.editform.createCid = null;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      }
    },
    // 新增提交
    roleSubmit (name) {
      for (let y of this.roleData) {
        this.formValidate[y.props] = y.modelData;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.roleStatus === true) {
            this.stateChange = 1;
          } else {
            this.stateChange = 0;
          };
          let params = {
            createCid: this.$store.getters.getInfo.companyId,
            createUid: this.$store.getters.getInfo.userId,
            roleMemo: this.formValidate.roleMemo,
            roleDesc: this.formValidate.roleDesc,
            roleStatus: this.stateChange
          };
          this.$service.http.post('winpie/admin/role/addUpdateRole', params, 'post')
            .then(res => {
              this.$Message.success('新增成功');
              this.$refs[name].resetFields();
              this.roleData = [];
              this.roleData = this.formSave;
              this.getRole();
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
      for (let y of this.editRoles) {
        this.editform[y.props] = y.modelData;
      }
      if (this.editform.roleStatus === true) {
        this.editChange = 1;
      } else {
        this.editChange = 0;
      };
      let params = {
        roleMemo: this.editform.roleMemo,
        roleDesc: this.editform.roleDesc,
        roleStatus: this.editChange,
        roleId: this.editform.roleId
      };
      this.$service.http.post('winpie/admin/role/addUpdateRole', params, 'post')
        .then(res => {
          this.$Message.success('修改成功');
          this.getRole();
          this.editform.createCid = null;
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
    // 编辑取消
    editReset () {
      this.editShow = false;
    },
    // 获取table列表数据
    getRole (roleSearch) {
      let paramsData = {
        page: this.pages,
        rows: this.sizes,
        filters: JSON.stringify(roleSearch || {companyId: this.$store.getters.getInfo.companyId})
      };
      this.$service.http.post('winpie/admin/role/list', paramsData, 'post')
        .then(res => {
          this.tableRole = null;
          this.tableRole = res.result.rows;
          for (let tabs of this.tableRole) {
            if (tabs.roleStatus === 1) {
              tabs.roleStatus = '启用';
            } else {
              tabs.roleStatus = '不启用';
            }
          }
        }).catch(err => {
          console.log(err);
        });
    },
    // 删除角色
    delInfo () {
      let paramsData = {
        roleId: this.editform.roleId
      };
      this.$service.http.post('winpie/admin/role/deleteRole', paramsData, 'post')
        .then(res => {
          console.log(res);
          this.$Message.success('删除成功');
          this.getRole();
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 获取权限树
    getTreeData () {
      let paramsData = {
        parentId: this.treeParams
      };
      this.$service.http.post('winpie/admin/menu/loadCheckMenuInfo', paramsData, 'post')
        .then(res => {
          this.treeRoles = JSON.parse(res.result);
          this.recursionRole(this.treeRoles);
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 权限树模板方法
    recursionRole (tree) {
      let result = [];
      let that = this;
      for (let r of tree) {
        let {name: title, nodes: children, menuId: onlyId} = r;
        if (children) {
          let childResult = that.recursionRole(children);
          children = childResult;
        }
        result.push({
          title,
          expand: true,
          children,
          onlyId
        });
      }
      this.treeRoles = result;
      return this.treeRoles;
    },
    // 选中左侧列表 刷新对应权限
    refreshPower () {
      if (this.editform.roleId) {
        let paramsData = {
          roleId: this.editform.roleId
        };
        this.$service.http.post('winpie/admin/role/authorityRoleAccess', paramsData, 'post')
          .then(res => {
            this.getMenuId = res.result;
            this.compareTree(this.treeRoles, this.getMenuId);
          }).catch(err => {
            console.log(err);
            this.$Message.error(err.msg);
          });
      }
    },
    // 比对权限树
    compareTree (tree, menuId) {
      let results = [];
      let that = this;
      for (let r of tree) {
        if (r.children) {
          let childResult = that.compareTree(r.children, menuId);
          r.children = childResult;
        }
      }
      this.treeRoles = results;
      return this.treeRoles;
    },
    // 保存授权
    saveImpover () {}
  }
};
</script>
<style lang='less' scoped>
.setModal {
    .ivu-switch {
      margin-left: -204px;
    }
    .margin-l {
      margin-left: 12px;
      vertical-align: middle;
    }
}
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
      padding-left: 2vh;
      border-left: 1px solid #DDDEE1;
      border-bottom: 1px solid #F4F6F7;
      .specials {
        margin-left: 15px;
        margin-right: 15px;
        color: #FF0000;
      }
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
        padding-right: 3vh;
        border-left: 1px solid #DDDEE1;
        border-right: 1px solid #DDDEE1;
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
      .ivu-col-span-19 {
        width: 74.166667%;
      }
      .ivu-col-span-5 {
        width: 25.833333%;
        .fonts-explain {
          .ivu-btn {
            padding: 4px 11px;
            margin-top: -3.6px;
          }
        }
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
