<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <con-inputs :setInput="inputSet" :paramsData="paramsData" @changeColor="colorChange" @resetColor="resetColor" @searchTable="search"></con-inputs>
        </div>
        <Row>
          <i-col span="5">
            <div class="fonts-explain">组织结构</div>
            <div class="tree-construction">
              <Tree :data="treeOrigation" @on-select-change="getCheckedNodes"></Tree>
            </div>
          </i-col>
          <i-col span="19">
              <div class="input-search row-set">
                详细信息
              </div>
              <div class="detail-show" v-for="(orgItem, orgIndex) in orgInfo" :key="orgIndex">
                <div class="orgDiv">
                    <p class="orgTitle">公司名称<i></i></p>
                    <span class="padding-l">:</span>
                    <span class="orgData">{{orgItem.companyName}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">组织代码<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.regionId}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">公司状态<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">
                    <i-switch v-model="switchChoose"></i-switch>
                    <span class="padding-l">启用</span>
                  </span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">公司类型<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">
                    <RadioGroup v-model="disabledGroup">
                      <Radio label="网点"></Radio>
                      <Radio label="专线"></Radio>
                    </RadioGroup>
                  </span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">联系人<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.contacts}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">联系电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.contactsTel}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">公司电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.companyTel}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">所在地<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.regionId}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">发货查询电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.sendTel}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">到货查询电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.arrivalTel}}</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">详细地址<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">{{orgItem.officeAddress}}</span>
                </div>
              </div>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'organization',
  data () {
    return {
      value1: '',
      myColor: '',
      orgaName: '',
      orgInfo: null,
      companyAbout: null,
      stateCompany: '',
      paramsData: {myColor: '', loadingSearch: false},
      switchChoose: null,
      loadingSearch: false,
      disabledGroup: '',
      inputSet: [
        {lables: '组织名称', models: '', spans: 4, types: 'input'},
        {lables: '查询', spans: 5, types: 'button'}
      ],
      treeOrigation: [],
      tableData: [],
      redraw: [],
      pages: 1,
      sizes: 10
    };
  },

  components: {},

  computed: {},
  watch: {
  },
  mounted () {
    this.getOrganization();
    this.treeData();
  },

  methods: {
    // 搜索功能
    search () {
      for (let y of this.inputSet) {
        if (y.types === 'input') {
          if (y.lables === '组织名称') {
            this.orgaName = y.models;
          }
        }
      }
      let paramsData = {
        companyName: this.orgaName
      };
      this.$service.http.post('winpie/api/searchCompany', paramsData, 'post')
        .then(res => {
          console.log(res.result);
          this.redraw = res.result;
          for (let k of this.redraw) {
            this.companyAbout = k.companyId;
          }
          this.recursion(this.redraw);
          this.getOrganization(this.companyAbout);
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 选中的节点
    getCheckedNodes (values) {
      console.log(values);
      this.getOrganization(values[0].onlyId);
    },
    // 获取权限树
    treeData () {
      this.$service.http.post('winpie/api/companyManageTree', '', 'post')
        .then(res => {
          console.log(res);
          this.treeOrigation = [JSON.parse(res.result)];
          console.log(this.treeOrigation);
          this.recursion(this.treeOrigation);
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
        let {companyName: title, nodes: children, companyId: onlyId} = r;
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
      this.treeOrigation = result;
      return this.treeOrigation;
    },
    // 获取组织详细信息
    getOrganization (company) {
      let paramsData = {
        companyId: company || this.$store.getters.getInfo.companyId
      };
      this.$service.http.post('winpie/api/getCompanyInfo', paramsData, 'post')
        .then(res => {
          this.orgInfo = res.result;
          for (let n of this.orgInfo) {
            if (n.companyStatus === 1) {
              this.switchChoose = true;
              this.stateCompany = '启用';
            } else {
              this.switchChoose = false;
              this.stateCompany = '不启用';
            }
            if (n.ctypeId === 1) {
              this.disabledGroup = '网点';
            } else {
              this.disabledGroup = '专线';
            }
          }
        }).catch(err => {
          console.log(err);
          this.$Message.error(err.msg);
        });
    },
    // 按钮状态切换
    // switchChange (status) {
    //   this.switchChoose = status;
    // },
    // input框 focus状态时颜色改变设置
    colorChange (names) {
      this.paramsData.myColor = names;
    },
    // input框blur时 颜色改变原有样式
    resetColor () {
      this.paramsData.myColor = '';
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
    }
    .row-set {
      border-left: 1px solid #E8ECF0;
      font-size: 14px;
      color: #60667F;
      .ivu-row {
        width: 100%;
      }
    }
    .detail-show {
      width: 100%;
      height: calc(~"86vh - 124px");
      border-left: 1px solid #DDDEE1;
      .orgDiv {
        width: 45%;
        float: left;
        padding: 16px 16px 0 16px;
        color: #60667F;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
        }
        .orgTitle {
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: justify;
          overflow: hidden;
          display: inline-block;
          border: 1px solid #E7EAEC;
          padding-left: 5px;
          padding-right: 5px;
          i {
            display: inline-block;
            padding-left: 100%;
          }
        }
        .padding-l {
          padding-left: 5px;
        }
        .orgData {
          margin-left: 16px;
        }
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
      .detail-show {
        height: calc(~"96vh - 100px");
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
  }
  .ivu-btn {
    line-height: 1.4;
    padding: 5px 15px;
  }
</style>
