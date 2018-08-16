<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <con-inputs :setInput="inputSet" :paramsData="paramsData" @changeColor="colorChange" @resetColor="resetColor" @searchTable="searchTable"></con-inputs>
        </div>
        <Row>
          <i-col span="5">
            <div class="fonts-explain">费用类别结构</div>
            <div class="tree-construction">
              <Tree :data="treeDatas" @on-select-change="selectDot"></Tree>
            </div>
          </i-col>
          <i-col span="19">
              <div class="input-search row-set">
                <Row :gutter="20">
                  <i-col span="24">
                    <Button type="primary" icon="android-exit" @click="toLoadings">
                      <a class="expors">导出</a>
                    </Button>
                    <Button v-for="(bitems, bindex) in getDatas" :key="bindex" @click="newCreate(bitems.menuId, bitems.name)">{{bitems.name}}</Button>
                  </i-col>
                </Row>
              </div>
              <div class="table-show">
                <table class="set-table" border="1" cellspacing="0">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>产品类型</th>
                      <th>卸货网点</th>
                      <th>起步价</th>
                      <th>中转免卸货费</th>
                      <th>操作</th>
                      <th>计价类型</th>
                      <th>计价规则</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(tItem, tIndex) in tableData" :key="tIndex" @click="rowsOperation(tItem.tariffId, tItem)" :class="{'active-tr': activeTr === tItem.tariffId}">
                      <td width="70">{{tIndex + 1}}</td>
                      <td width="80">{{tItem.productTypeId}}</td>
                      <td width="120">{{tItem.unloadSiteidName}}</td>
                      <td width="80">{{tItem.startingFare}}</td>
                      <!-- <td width="80">{{tItem.freeUnloadcharge}}</td> -->
                      <td width="100"><div class="active-r"><span v-if="showFonts && tItem.tariffId === editId" @click="submitDatas(tItem)">{{editSave}}</span><span v-else @click="editCon(tItem.tariffId, tItem.tariffRulecfg, tIndex)">{{editNames}}</span><span @click="deleteCon(tItem)">删除</span></div></td>
                      <td width="90">{{tItem.tariffRuleId}}</td>
                      <td class="table-center">
                        <div class="float-s" v-for="(pItem, pIndex) in tItem.tariffRulecfg" :key="pIndex"  v-show="editChanges || tItem.tariffId !== editId">
                          <p v-if="pIndex < tItem.tariffRulecfg.length - 1 && tItem.tariffRuleId !== '件数(件)'">{{pItem.c}} ~ {{tItem.tariffRulecfg[pIndex + 1].c}}</p>
                          <p v-else-if="pIndex === tItem.tariffRulecfg.length - 1 && tItem.tariffRuleId !== '件数(件)'">{{pItem.c}}+</p>
                          <p v-else-if="tItem.tariffRuleId === '件数(件)'">{{pItem.c}}</p>
                          <p>{{pItem.p}}</p>
                        </div>
                        <div class="float-h" v-show="editInputs && tItem.tariffId === editId">
                          <Form ref="formDynamic" :model="formDynamic">
                          <FormItem
                            v-for="(item, index) in formDynamic.items"
                            v-if="item.status"
                            :key="index"
                            :prop="'items.' + index + '.value'">
                          <Row>
                            <div class="float-row">
                              <i-col span="20">
                                <i-input v-model="item.valuec" placeholder=""></i-input>
                                <i-input v-model="item.valuep" placeholder=""></i-input>
                              </i-col>
                              <i-col span="2">
                                <Icon type="md-close" @click="removeInputs(index, tItem.tariffRulecfg)" />
                              </i-col>
                            </div>
                          </Row>
                          </FormItem>
                          <div class="float-explain">
                              <i-col span="20">
                                <i-input v-model="price" placeholder="" disabled></i-input>
                                <i-input v-model="units" placeholder="" disabled></i-input>
                              </i-col>
                              <i-col span="2">
                                <Icon type="md-add" @click="addInputs(tItem.tariffRulecfg)" />
                              </i-col>
                          </div>
                         </Form>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                      <div v-show="hiddenRemember" class="rememberData">暂无数据</div>
                  </tbody>
                </table>
                <Page :total="100" show-elevator @on-change="pageChange"></Page>
              </div>
          </i-col>
        </Row>
      </div>
    </div>
    <!-- 账号管理新增 -->
    <Modal :title="popTitle" v-model="popShow" class-name="vertical-center-modal" @on-visible-change="nowStatus" :mask-closable="false">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <con-checkform :formList="formData" :setClass="classSet" :stateName="stateName" @checkBlur="checkBlur" :selectCon="selectData" :autoData="autoSet"  @blurSign="blurDatas" @blurEvent="blurData" @changeStatus="changeStatus" @setValue="priceValue"></con-checkform>
        <FormItem class="lay-btn">
          <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 40px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 账号管理修改 -->
    <Modal :title="popTitle" v-model="editShow" class-name="vertical-center-modal" :mask-closable="false">
      <Form ref="editform" :model="editform" :label-width="80">
        <con-checkform :formList="editDatas" :setClass="classSet" :stateName="stateName" :selectCon="selectData" :autoData="autoSet"  @blurSign="blurDatas" @changeStatus="changeStatus" @setValue="editValue"></con-checkform>
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
  name: 'priceSet',
  data () {
    return {
      receptInfo: null,
      stateChange: null,
      index: 1,
      price: '价格',
      units: '单位',
      popShow: false,
      editShow: false,
      editStatus: null,
      editChanges: true,
      showFonts: false,
      editId: null,
      editInputs: false,
      stateName: '启用',
      productTypeId: '',
      TypeNames: '',
      classSet: 'single-forms',
      percentSet: 'percent-forms',
      getDatas: this.$store.getters.getTabs,
      popTitle: '',
      editNames: '编辑',
      editSave: '保存',
      weights: null,
      numbers: null,
      productType: null,
      firstTree: null,
      paramsData: {myColor: '', loadingSearch: false},
      inputSet: [
        {lables: '产品类型', models: '', spans: 4, types: 'input'},
        {lables: '卸货网点', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 5, types: 'button'}
      ],
      formDynamic: {
        items: [
        ]
      },
      dataLists: [],
      editList: [],
      sex: null,
      activeTr: null,
      treeDatas: [],
      treeList: [],
      formBackups: null,
      formValidate: {},
      selectData: [
        {
          value: '专线',
          label: '专线'
        },
        {
          value: '快线',
          label: '快线'
        },
        {
          value: '特线',
          label: '特线'
        }
      ],
      formData: [
        {formType: 'select', lables: '产品类型', props: 'productTypeId', modelData: '', types: 'text'},
        {formType: 'autoComplete', lables: '到站', props: 'regionId', modelData: '', signData: 'regionId', valueShow: false},
        {formType: 'input', lables: '起步价', props: 'startingFare', modelData: '', types: 'text'},
        {formType: 'autoComplete', lables: '发货公司', props: 'companyAName', modelData: '', signData: 'companyAName', valueShow: false},
        {formType: 'autoComplete', lables: '承运公司', props: 'sourceCid', modelData: '', signData: 'sourceCid', valueShow: false},
        {formType: 'switch', lables: '重量  按商品重量计费', props: 'tariffRuleId', modelData: true, stateName: '启用'},
        {formType: 'switch', lables: '体积', props: 'freeUnloadcharge', modelData: true, stateName: '启用'},
        {formType: 'switch', lables: '件数 按商品 + 件数计费', props: 'tariffRuleMount', modelData: true, stateName: '启用'}
      ],
      editDatas: [],
      editform: {},
      receptDatas: null,
      numberRole: null,
      getRoleid: null,
      roleId: [],
      autoSet: [],
      ruleValidate: {
        productTypeId: [
          {required: true, message: '请输入产品类型', trigger: 'blur'}
        ],
        regionId: [
          {required: true, message: '请输入到站', trigger: 'blur'}
        ],
        startingFare: [
          { required: true, message: '请输入起步价', trigger: 'blur' }
        ],
        sourceCid: [
          { required: true, message: '请输入承运公司', trigger: 'blur' }
        ]
      },
      tableData: [],
      pages: 1,
      hiddenRemember: false,
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
          if (y.lables === '产品类型') {
            this.productTypeId = y.models;
            if (this.productTypeId === '专线') {
              this.productTypeId = 1;
            } else if (this.productTypeId === '快线') {
              this.productTypeId = 2;
            } else if (this.productTypeId === '特线') {
              this.productTypeId = 3;
            }
          } else {
            this.TypeNames = y.models;
          }
        }
      }
      this.getList(this.productTypeId, this.TypeNames);
    },
    nowStatus () {},
    // 修改中switch状态
    changeStatus (status, lables) {
      for (let z of this.formData) {
        if (z.lables === lables) {
          z.modelData = status;
          if (status === false) {
            z.stateName = '不启用';
          } else {
            z.stateName = '启用';
          }
        }
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
      let htmls =
        `<html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            ${document.getElementsByTagName('table')[0].outerHTML}
          </body>
        </html>`;
      let blob = new Blob([htmls], { type: 'application/vnd.ms-excel' });
      let buttonEvent = document.getElementsByClassName('expors')[0];
      buttonEvent.href = URL.createObjectURL(blob);
      buttonEvent.download = '表格数据.xls';
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
        this.formBackups = JSON.parse(JSON.stringify(this.formData));
        this.popShow = !this.popShow;
      } else if (names === '修改') {
        this.editDatas = this.formData;
        if (this.editform.tariffId) {
          if (this.editform.tariffRuleId === '重量(kg)') {
            this.editform.tariffRuleId = 1;
            this.editList.push(this.editform.tariffRuleId);
            this.editform.tariffRuleId = true;
          } else {
            this.editform.tariffRuleId = false;
          }
          if (this.editform.tariffRuleId === '体积(m³)') {
            this.editform.tariffRuleId = 2;
            this.editList.push(this.editform.tariffRuleId);
            this.editform.freeUnloadcharge = true;
          } else {
            this.editform.freeUnloadcharge = false;
          }
          if (this.editform.tariffRuleId === '件数(件)') {
            this.editform.tariffRuleId = 3;
            this.editList.push(this.editform.tariffRuleId);
            this.editform.tariffRuleMount = true;
          } else {
            this.editform.tariffRuleMount = false;
          }
          for (let s of this.editDatas) {
            s.modelData = this.editform[s.props];
          }
          this.editShow = !this.editShow;
        } else {
          this.$Message.error('请选中要修改的行');
        }
      } else if (names === '删除') {
        if (this.editform.tariffId) {
          this.delInfo();
          this.editform.tariffId = null;
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
    // input失去焦点时 校验
    checkBlur (check, labels) {
      if (check === false) {
        for (let v of this.formData) {
          if (v.lables === labels) {
            v.modelData = '';
          }
        }
        this.blurData(this.formData);
      }
    },
    // 输入框输入内容 进行模糊搜索
    blurDatas (res, sign) {
      if (sign === 'companyAName' || sign === 'sourceCid') {
        for (let r of this.formData) {
          if (r.props === sign) {
            this.searchMatch(res, sign);
          }
        }
      } else if (sign === 'regionId') {
        for (let s of this.formData) {
          if (s.props === sign) {
            this.searchRegion(res, sign);
          }
        }
      }
      for (let y of this.formData) {
        this.formValidate[y.props] = res;
      }
    },
    // 编辑进行模糊搜索
    // blurEdit () {},
    // 模糊搜索公司
    searchMatch (searchs, signs) {
      let paramsData = {
        filters: JSON.stringify({companyName: searchs || this.searchName})
      };
      this.$service.http.post('winpie/api/companyList', paramsData, 'post')
        .then(res => {
          if (res.result) {
            this.autoSet = JSON.parse(res.result);
            if (this.autoSet.length === 0) {
              for (let u of this.formData) {
                if (u.signData === signs) {
                  u.valueShow = false;
                }
              }
            } else {
              for (let r of this.formData) {
                if (r.signData === signs) {
                  r.valueShow = true;
                }
              }
            }
          }
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 模糊搜索区域
    searchRegion (searchs, signs) {
      for (let u of this.formData) {
        this.formValidate[u.props] = u.modelData;
      }
      let paramsData = {
        regionName: this.formValidate.regionId
      };
      this.$service.http.post('winpie/regions/regionAll', paramsData, 'post')
        .then(res => {
          if (res.result) {
            this.autoSet = res.result;
            if (this.autoSet.length === 0) {
              for (let u of this.formData) {
                if (u.signData === signs) {
                  u.valueShow = false;
                }
              }
            } else {
              for (let r of this.formData) {
                if (r.signData === signs) {
                  r.valueShow = true;
                }
              }
            }
          }
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 点击新增中模糊出现的提示搜索内容
    priceValue (values, names, id) {
      if (names === 'companyAName') {
        this.formValidate.companyAName = values;
        this.formValidate.companyAId = id;
      } else if (names === 'sourceCid') {
        this.formValidate.sourcesCid = id;
      } else if (names === 'regionId') {
        this.formValidate.regionsId = id;
      }
      for (let r of this.formData) {
        if (r.props === names) {
          r.modelData = values;
          r.valueShow = false;
        }
      }
    },
    // 点击编辑中模糊出现的提示搜索内容
    editValue (values, names, id) {
      if (names === 'companyAName') {
        this.editform.companyAName = values;
        this.editform.companyAId = id;
      }
      for (let r of this.editDatas) {
        if (r.props === names) {
          r.modelData = values;
          r.valueShow = false;
        }
      }
    },
    // 新增提交
    handleSubmit (name) {
      for (let y of this.formData) {
        this.formValidate[y.props] = y.modelData;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.tariffRuleId === true) {
            this.formValidate.tariffRuleId = 1;
            this.dataLists.push(this.formValidate.tariffRuleId);
          }
          if (this.formValidate.freeUnloadcharge === true) {
            this.formValidate.freeUnloadcharge = 2;
            this.dataLists.push(this.formValidate.freeUnloadcharge);
          }
          if (this.formValidate.tariffRuleMount === true) {
            this.formValidate.tariffRuleMount = 3;
            this.dataLists.push(this.formValidate.tariffRuleMount);
          }
          let lists = new Set(this.dataLists);
          this.dataLists = Array.from(lists);
          this.dataLists = this.dataLists.join(',');
          if (this.formValidate.productTypeId === '专线') {
            this.productType = 1;
          } else if (this.formValidate.productTypeId === '快线') {
            this.productType = 2;
          } else if (this.formValidate.productTypeId === '特线') {
            this.productType = 3;
          }
          let params = {
            productTypeId: this.productType,
            siteId: this.$store.getters.getInfo.companyId,
            unloadSiteidName: this.formValidate.companyAName,
            unloadSiteid: this.formValidate.companyAId,
            tariffTypeId: this.firstTree,
            sourceCid: this.formValidate.sourcesCid,
            regionId: this.formValidate.regionsId,
            startingFare: this.formValidate.startingFare,
            tariffRuleIdList: this.dataLists
          };
          this.$service.http.post('winpie/siteTariff/addUpdateSiteTariff', params, 'post')
            .then(res => {
              this.$Message.success('新增成功');
              this.$refs[name].resetFields();
              this.formData = [];
              this.formData = this.formBackups;
              this.getList();
              this.popShow = false;
              this.dataLists = [];
            }).catch(err => {
              console.log(err);
              this.$Message.error(err.msg);
            });
        } else {
          this.$Message.error('请将信息填全!');
        }
      });
    },
    // 修改提交
    editSubmit (name) {
      for (let c of this.editDatas) {
        this.editform[c.props] = c.modelData;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          let lists = new Set(this.editList);
          this.editList = Array.from(lists);
          this.editList = this.editList.join(',');
          if (this.editform.productTypeId === '专线') {
            this.productType = 1;
          } else if (this.editform.productTypeId === '快线') {
            this.productType = 2;
          } else if (this.editform.productTypeId === '特线') {
            this.productType = 3;
          }
          let params = {
            tariffId: this.editform.tariffId,
            productTypeId: this.productType,
            siteId: this.$store.getters.getInfo.companyId,
            unloadSiteidName: this.formValidate.companyAName,
            unloadSiteid: this.formValidate.companyAId,
            tariffTypeId: this.firstTree,
            sourceCid: this.formValidate.sourcesCid,
            regionId: this.formValidate.regionsId,
            startingFare: this.formValidate.startingFare,
            tariffRuleIdList: this.dataLists
          };
          this.$service.http.post('winpie/siteTariff/addUpdateSiteTariff', params, 'post')
            .then(res => {
              this.$Message.success('修改成功');
              this.$refs[name].resetFields();
              this.formData = [];
              this.formData = this.formBackups;
              this.getList();
              this.editShow = false;
              this.editList = [];
            }).catch(err => {
              console.log(err);
              this.$Message.error(err.msg);
            });
        } else {
          this.$Message.error('请将信息填全!');
        }
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
    getList (products = '', names = '') {
      let paramsData;
      if (products === '' && names === '') {
        paramsData = {
          page: this.pages,
          rows: this.sizes,
          tariffTags: 1
        };
      } else {
        paramsData = {
          page: this.pages,
          rows: this.sizes,
          tariffTags: 1,
          filters: JSON.stringify({productTypeId: products, unloadSiteidName: names})
        };
      }
      this.$service.http.post('winpie/siteTariff/listSiteTariff', paramsData, 'post')
        .then(res => {
          this.tableData = null;
          this.tableData = res.result;
          for (let u of this.tableData) {
            if (u.productTypeId === 1) {
              u.productTypeId = '专线';
            } else if (u.productTypeId === 2) {
              u.productTypeId = '快线';
            } else if (u.productTypeId === 3) {
              u.productTypeId = '特线';
            }
            if (u.tariffRuleId === 1) {
              u.tariffRuleId = '重量(kg)';
            } else if (u.tariffRuleId === 2) {
              u.tariffRuleId = '体积(m³)';
            } else if (u.tariffRuleId === 3) {
              u.tariffRuleId = '件数(件)';
            } else if (u.tariffRuleId === 4) {
              u.tariffRuleId = '距离(米)';
            }
            u.tariffRulecfg = JSON.parse(u.tariffRulecfg);
          }
          if (this.tableData.length === 0) {
            this.hiddenRemember = true;
          } else {
            this.hiddenRemember = false;
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
    // 获取权限树
    getTree () {
      this.$service.http.post('winpie/siteTariff/listTariff', '', 'post')
        .then(res => {
          this.treeList = JSON.parse(res.result);
          this.firstTree = this.treeList[0].nodes[0].TypeId;
          this.recursion(this.treeList);
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 权限树模板方法
    recursion (tree) {
      let result = [];
      let that = this;
      for (let r of tree) {
        let {TypeName: title, nodes: children, TypeId: onlyId} = r;
        if (children) {
          let childResult = that.recursion(children);
          children = childResult;
        }
        result.push({
          title,
          expand: true,
          children,
          onlyId
        });
      }
      this.treeDatas = result;
      return this.treeDatas;
    },
    // 选中节点的操作
    selectDot (dot) {
      this.getList(dot[0].onlyId);
    },
    // 选中行
    rowsOperation (index, contents) {
      this.activeTr = index;
      if (contents) {
        this.editform = Object.assign({}, contents);
      }
    },
    // 表格中编辑
    editCon (indexs, datas) {
      this.formDynamic.items = [];
      for (let y of datas) {
        this.formDynamic.items.push({valuec: y.c, valuep: y.p, index: indexs, status: 1});
      }
      this.editId = indexs;
      this.showFonts = true;
      if (this.showFonts) {
        this.editChanges = false;
        this.editInputs = true;
      } else {
        this.editChanges = !this.editChanges;
        this.editInputs = !this.editInputs;
      }
    },
    // 表格中删除
    deleteCon (items) {
      let paramsData = {
        tariffId: items.tariffId
      };
      this.$service.http.post('winpie/siteTariff/deleteSiteTariff', paramsData, 'post')
        .then(res => {
          if (res.status === '200') {
            this.$Message.success(res.msg);
            this.getList();
          }
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 关掉表格中的input
    removeInputs (index, removes) {
      this.formDynamic.items[index].status = 0;
      this.formDynamic.items.splice(index, 1);
      removes.splice(index, 1);
    },
    // 表格中添加
    addInputs (datas) {
      this.index++;
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      });
      datas.push({
        c: '',
        p: ''
      });
    },
    // table表格中保存
    submitDatas (items) {
      for (let u in this.formDynamic.items) {
        items.tariffRulecfg[u].c = this.formDynamic.items[u].valuec;
        items.tariffRulecfg[u].p = this.formDynamic.items[u].valuep;
        if (items.tariffRulecfg[u].c && items.tariffRulecfg[u].p) {
        } else {
          this.$Message.error('请输入完整计价规则');
          return items;
        }
      }
      let paramsData = {
        tariffId: items.tariffId,
        tariffRulecfg: JSON.stringify(items.tariffRulecfg)
      };
      this.$service.http.post('winpie/siteTariff/updateSiteTariffRule', paramsData, 'post')
        .then(res => {
          if (res.status === '200') {
            this.showFonts = false;
            this.editChanges = true;
            this.editInputs = false;
            this.$Message.success(res.msg);
          }
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
        .ivu-col {
          .ivu-btn {
            .expors {
              color: #fff;
            }
          }
        }
      }
    }
    .table-show {
      width: 100%;
      .set-table {
        width: 100%;
        height: calc(~"84vh - 156px");
        overflow-y: scroll;
        border: 1px solid #e8eaec;
        tbody {
          tr {
            height: 2.6vh;
            line-height: 2.6vh;
            text-align: center;
            .active-r {
              span {
                padding: 5px;
                color: #108CEE;
              }
            }
            td {
              overflow: hidden;
              border: 1px solid #e8eaec;
            }
            .table-center {
              display: flex;
              height: 100%;
              justify-content: center;
              align-items: center;
              .float-s {
                float: left;
                margin: 1vh;
              }
              .float-h {
                width: 100%;
                  .ivu-form{
                    display: flex;
                    justify-content: center;
                    .float-explain {
                      float: left;
                      width: 15%;
                    }
                    .ivu-form-item {
                        float: left;
                        width: 15%;
                    }
                  }
              }
            }
          }
          .rememberData {
            width: 100%;
            text-align: center;
          }
          .active-tr {
            background: #AED7F7;
            td {
              background: #AED7F7;
              // E9EAEC
            }
          }
        }
        th {
          background-color: #f8f8f9;
          height: 4vh;
          border: 1px solid #e8eaec;

        }
      }
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
