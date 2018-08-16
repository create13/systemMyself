<template>
  <div>
    <div class="out-main">
      <div class="outer-header">
        <div class="square-line" v-for="(datum, dindex) in squares" :key="dindex">
          <div class="color-circle" :style="{backgroundColor: datum.backgrounds}">
            <p>{{datum.description}}</p>
            <p>{{datum.prize}}</p>
          </div>
          <div class="font-des">
            <p>{{datum.condition}}<img :src=datum.srcPic class="arrows" alt=""></p>
            <h1>{{datum.numbers}}</h1>
          </div>
        </div>
      </div>
      <div class="outer-middle">
          <Row>
            <i-Col span="12">
              <div class="bg-white">
                <div class="selects">
                  <Select v-model="valueDay" size="small" style="width:80px">
                    <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
                <div id="lineCharts"></div>
              </div>
            </i-Col>
            <i-Col span="12">
              <div class="margins">
                <Table stripe :columns="columns" :data="tableData" class="tables-width"></Table>
              </div>

            </i-Col>
          </Row>
        <!-- </div> -->
      </div>
      <div class="outer-footer">
        <div class="footer-label" v-for="(colbg,cindex) in colors" :key="cindex"  :style="{backgroundColor: colbg.backColors}">
          <div class="list-header"><span>仓库预警</span><img src="@/assets/image/circle-show.png" alt=""></div>
          <ul class="list-dots">
            <li v-for="(list,lindex) in dataList" :key="lindex">
              <span>{{list.dataLabel}}</span>
              <span class="right-location">{{list.database}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'mains',
  data () {
    return {
      squares: [
        {description: '毛利', prize: 75, condition: '销售情况', numbers: '1,8711', srcPic: require('../assets/image/arrow-green.png'), backgrounds: '#3AB18D'},
        {description: '数量', prize: 352, condition: '采购概况', numbers: '3,8001', srcPic: require('../assets/image/arrow-red.png'), backgrounds: '#FB6C66'},
        {description: '总量', prize: 7045, condition: '库存概况', numbers: '1,9771', srcPic: require('../assets/image/arrow-blue.png'), backgrounds: '#429ED3'},
        {description: '现金', prize: 33452, condition: '现金银行', numbers: '9,8711', srcPic: '', backgrounds: '#E69A67'},
        {description: '应收', prize: 4545, condition: '应收应付', numbers: '9,8711', srcPic: '', backgrounds: '#2BCC71'}

      ],
      valueDay: '最近7天',
      dayList: [
        {label: '最近7天', value: '最近7天'},
        {label: '最近14天', value: '最近14天'}
      ],
      columns: [
        {type: 'index', width: 60, align: 'center'},
        {title: '商品编号', key: 'code', minWidth: 40},
        {title: '商品全名', key: 'names', minWidth: 40},
        {title: '销售数量', key: 'amounts', minWidth: 40},
        {title: '销售金额', key: 'prizes', minWidth: 40},
        {title: '金额占比', key: 'keys', minWidth: 40}
      ],
      tableData: [
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'},
        {id: '01', code: 'sx1028', names: '物流产品', amounts: '200', prizes: '300', keys: '20%'}
      ],
      dataList: [
        {dataLabel: '仓库上线报警', database: 5},
        {dataLabel: '仓库下线报警', database: 10},
        {dataLabel: '进效期商品报警', database: 0},
        {dataLabel: '仓库失效期商品报警预警', database: 0}
      ],
      colors: [
        {backColors: '#7DC8F7'},
        {backColors: '#40C3B0'},
        {backColors: '#FE6A6C'},
        {backColors: '#FFBA8B'}
      ]
    };
  },

  components: {
    Headers
  },

  computed: {},

  mounted () {
    this.drawsCharts();
  },

  methods: {
    drawsCharts () {
      let Linecharts = echarts.init(document.getElementById('lineCharts'));
      let symbolSize = 10;
      let data = [30, 60, 130, 180, 240, 140, 100, 20];
      let option = {
        tooltip: {
          formatter: function (params) {
            var data = params.data || [0, 0];
            return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
          }
        },
        legend: {
          data: ['销售毛利'],
          left: 80,
          top: 8
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          name: '天',
          data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
          nameGap: 10,
          nameTextStyle: {
            padding: [20, -10, -24, -24]
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          offset: 8
        },
        yAxis: {
          name: '销售金额',
          type: 'value',
          min: 0,
          max: 250,
          interval: 50,
          nameTextStyle: {
            color: '#00ADA9',
            padding: [20, 0]
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EFF2F4',
              width: 20
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            id: 'a',
            type: 'line',
            name: '销售毛利',
            symbolSize: symbolSize,
            data: data,
            lineStyle: {
              color: '#32B38C'
            },
            itemStyle: {
              color: '#32B38C'
            },
            markPoint: {
              symbol: 'pin',
              data: [
                {name: '最大值', value: 240, xAxis: '05', yAxis: 240}
              ],
              symbolOffset: [0, '-30%']
            }

          }
        ]
      };
      Linecharts.setOption(option);
      setTimeout(() => {
        window.onresize = function () {
          Linecharts.resize();
        };
      }, 100);
    }
  }
};
</script>
<style lang="less" scoped>
  .out-main {
    .outer-header {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      height: 16vh;
      .square-line {
        height: 16vh;
        margin-left: 1%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        flex: 1;
        background-color: #fff;
        &:nth-child(1) {
          margin-left: 0;
        }
        .color-circle {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
          width: 8vh;
          height: 8vh;
          margin: 20px 8% 20px 15%;
          border-radius: 100%;
          color: #fff;
          p {
          font-size:12px;
          font-family:SimHei;
            &:nth-last-child(1) {
              font-weight: 700;
              font-size: 14px;
            }
          }
        }
        .font-des {
          p {
            color: #000;
            font-size: 14px;
            .arrows {
              width: 6px;
              height: 6px;
              margin-left: 20px;
              vertical-align: text-top;
            }
          }
          h1 {
            font-size: 24px;
            text-align: justify;
            ::after {
              width: 100%;
              display: inline-block;
            }
          }
        }
      }
    }
    .outer-middle {
      width: 100%;
      height: 44vh;
      margin: 2vh 0;
      .selects {
        height: 3vh;
        position: absolute;
        right:4%;
        padding-top: 15px;
        z-index:9999;
      }
      #lineCharts {
        height: 39vh;
      }
      .margins {
        width: 99%;
        margin-left: 1%;
      }
      .bg-white {
        background-color: #fff;
        width: 99%;
        position: relative;
        margin-right: 1%;
        height: 44vh;
      }
    }
    .outer-footer {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      padding: 20px;
      height: calc(~"34vh - 84px");;
      background: #fff;
      .footer-label {
        margin-left: 1%;
        flex: 1;
        height: calc(~"34vh - 124px");
        border-radius: 4px;
        color: #fff;
        &:nth-child(1) {
          margin-left: 0;
        }
        .list-header {
          font-size: 14px;
          padding-left: 24px;
          margin-top: 10px;
          line-height: 3.6vh;
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            width: 92%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {

            width: 20px;
            height: 20px;
          }
        }
        .list-dots {
          list-style-type: none;
          li {
            font-size: 14px;
            padding-left: 10%;
            line-height: 3.6vh;
            display: flex;
            flex-flow: row nowrap;
            span {
              &:nth-child(1) {
                flex-grow: 2;
              }
              &:nth-last-child(1) {
                margin-right: 10%;
                flex-grow: 1;
              }
            }
            .right-location {
              display: inline-block;
              text-align: right;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 1199px) and (max-width: 1399px){
    .out-main {
      .outer-middle {
        height: 42vh;
        #lineCharts {
          height: 40vh;
        }
        .bg-white {
          height: 42vh;
        }
      }
      .outer-footer {
        padding: 15px;
        height: calc(~"36vh - 64px");
        .footer-label {
          height: calc(~"36vh - 94px");
          .list-header {
            line-height: 3vh;
            font-size: 10px;
            padding-left: 16px;
          }
          .list-dots {
            li {
              line-height: 3vh;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .ivu-table-wrapper {
    width: 100%;
  }
  .ivu-row {
    width: 100%;
  }
  .tables-width {
    width: 100%!important;
    height: 44vh;
    .ivu-table-body {
    height: 42vh;
    overflow-y: scroll;
  }
  }
  @media screen and (min-width: 1199px) and (max-width: 1399px){
    .tables-width {
      height: 42vh;
      .ivu-table-body {
      height: 40vh;
    }
    }
  }
</style>
