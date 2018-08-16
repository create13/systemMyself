<template>
  <div class="all-set">
    <div class="btn-line">
          <Button type="primary" :loading="loadings" @click="release">
            <span v-if="!loadings">发布</span>
            <span v-else>Loading...</span>
          </Button>
    </div>
    <div class="input-power">
      <div class="row-line">
        <div class="labelName">标题<i></i></div>
        <span class="margin-r">:</span>
        <i-input v-model="titles" class="width-set" placeholder="Enter something..." style="width: 500px"></i-input>
      </div>
      <div class="row-line">
        <div class="labelName">上传附件<i></i></div>
        <span class="margin-r">:</span>
        <!-- <Upload multiple action="">
          <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload> -->
      </div>
      <div class="row-line">
        <div class="labelName">送达范围<i></i></div>
        <span class="margin-r">:</span>
        <Select v-model="modelSelect" style="width:500px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="row-line">
        <div class="labelName">公告内容<i></i></div>
        <span class="margin-r">:</span>
        <i-input v-model="textareas" type="textarea" :autosize="{minRows: 6,maxRows: 12}" style="width: 500px" placeholder="Enter something..."></i-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'systemNotice',
  data () {
    return {
      loadings: false,
      titles: '',
      modelSelect: '',
      textareas: '',
      cityList: [
        {
          value: '北京',
          label: '北京'
        },
        {
          value: '上海',
          label: '上海'
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    release () {
    }
  }
};

</script>
<style lang='less' scoped>
.all-set {
  width: 100%;
  background-color: #fff;
  height: calc(~"96vh - 124px");
  .btn-line {
    width: 100%;
    height: 6vh;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F0F3F5;
    padding-left: 20px;
    .ivu-btn-primary {
      width: 70px;
    }
  }
  .input-power {
    margin: 30px 26px;
    .row-line {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .labelName {
        width: 66px;
        height: 30px;
        line-height: 30px;
        text-align: justify;
        display: inline-block;
        overflow: hidden;
        i {
          display: inline-block;
          width: 100%;
        }
        span {
          margin-right: 15px;
        }
      }
      .margin-r {
        margin-left: 5px;
        margin-right: 15px;
      }
      .width-set {
        width: 50vh;
      }
    }
  }
}
@media screen and (min-width: 1199px) and (max-width: 1399px){
  .all-set {
    height: calc(~"96vh - 96px");
    .btn-line {
      .ivu-btn {
        line-height: 1;
        padding: 5px 15px;
      }
    }
  }
}
</style>
