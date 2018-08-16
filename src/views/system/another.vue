<template>
  <div>
    <div class="manage-set">
      <div class="center-content">
        <div class="input-search">
          <Row :gutter="20">
            <i-col span="4" v-for="(uitem, uindex) in inputSet" :key="uindex">
              <i-input v-model="value1" size="large" placeholder="" @on-focus="colorChange(uitem.lables)" @on-blur="resetColor">
                <span slot="prepend" :class="{blueColor: myColor == uitem.lables}">{{uitem.lables}}</span>
              </i-input>
            </i-col>
            <i-col span="5">
              <Button type="primary" :loading="loadingSearch" icon="search" @click="search">
                <span v-if="!loadingSearch">查询</span>
                <span v-else>Loading...</span>
              </Button>
            </i-col>
          </Row>
        </div>
        <Row>
          <i-col span="5">
            <div class="fonts-explain">
              <span>公司组织</span>
              <Button type="primary" :loading="loadingSearch" icon="plus-round" @click="search">
                <span v-if="!loadingSearch">新增</span>
                <span v-else>Loading...</span>
              </Button>
              <Button type="primary" :loading="loadingSearch" icon="trash-a" @click="search">
                <span v-if="!loadingSearch">删除</span>
                <span v-else>Loading...</span>
              </Button>
            </div>
            <div class="tree-construction">
              <Tree :data="treeOrigation" show-checkbox multiple></Tree>
            </div>
          </i-col>
          <i-col span="19">
              <div class="input-search row-set">
                详细信息
              </div>
              <div class="detail-show">
                <div class="orgDiv">
                  <p class="orgTitle">公司名称<i></i></p>
                  <span class="padding-l">:</span>
                    <i-input v-model="logInfo.company" class="orgData" placeholder="" style="width: 300px"></i-input>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">组织代码<i></i></p>
                  <span class="padding-l">:</span>
                  <i-input v-model="logInfo.company" class="orgData" placeholder="" style="width: 300px"></i-input>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">公司状态<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">
                    <i-switch v-model="switchChoose" @on-change="switchChange"></i-switch>
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
                  <span class="orgData">李存孝</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">联系电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">021-60891588  15056252968</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">公司电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">021-60891588</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">所在地<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">上海市浦东新区盛荣路958号盛大天地源创谷1号楼802室</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">发货查询电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">021-60891591  15056252968</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">到货查询电话<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">021-60891588  15056252968</span>
                </div>
                <div class="orgDiv">
                  <p class="orgTitle">详细地址<i></i></p>
                  <span class="padding-l">:</span>
                  <span class="orgData">上海市浦东新区盛荣路958号盛大天地源创谷1号楼802室</span>
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
  name: 'logistics',
  data () {
    return {
      value1: '',
      myColor: '',
      switchChoose: true,
      loadingSearch: false,
      disabledGroup: '网点',
      inputSet: [{lables: '公司名称'}],
      logInfo: {company: '上海运派供应链管理股份有限公司'},
      treeOrigation: [
        {
          title: 'parent 1',
          expand: true,
          selected: true,
          render: (h, { root, node, data }) => {
            return h('span', [
              h('Icon', {
                props: {
                  type: 'ios-folder-outline'
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h('span', data.title)
            ]);
          },
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
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
  },

  methods: {
    search () {},
    // 按钮状态切换
    switchChange (status) {
      this.switchChoose = status;
    },
    // input框 focus状态时颜色改变设置
    colorChange (names) {
      this.myColor = names;
    },
    // input框blur时 颜色改变原有样式
    resetColor () {
      this.myColor0 = false;
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
      .ivu-btn {
        margin-left: 15px;
      }
    }
    .tree-construction {
      margin-left: 2vh;
    }
    .input-search {
      width: 100%;
      height: 6vh;
      padding-left: 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #F4F6F7;
      .ivu-row {
        .ivu-col {
          padding-left: 0!important;
        }
        .ivu-btn {
          padding: 5px 10px;
        }
      }
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
        width: 47%;
        float: left;
        padding: 16px 16px 0 16px;
        color: #60667F;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
        }
        .ivu-input {
          display: inline-block;
        }
        .orgTitle {
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: justify;
          overflow: hidden;
          display: inline-block;
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
            margin-top: -5px;
        }
      }
    }
  }
}
@media screen and (min-width: 1199px) and (max-width: 1399px){
  .manage-set {
    .center-content {
      height: calc(~"96vh - 71px");
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
