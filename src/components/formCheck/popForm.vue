<template>
  <div class="flex-componets">
    <div v-for="(formItem, formIndex) in formList" :key="formIndex" :class="setClass">
      <FormItem :label="formItem.lables" :prop="formItem.props" v-if="formItem.formType === 'input'">
        <i-input v-model="formItem.modelData" placeholder="" @on-change="changeBlur(formItem.modelData)" :type="formItem.types"></i-input>
      </FormItem>
      <div v-else-if="formItem.formType === 'autoComplete'" class="rela-set">
        <FormItem :label="formItem.lables" :prop="formItem.props">
          <i-input v-model="formItem.modelData" @on-change="blurParams(formItem.modelData, formItem.signData)" @on-blur="checkData(formItem.valueShow, formItem.lables)"></i-input>
        </FormItem>
        <div class="set-width" v-show="formItem.valueShow">
          <div v-for="(searchItem, searchIndex) in autoData" :key="searchIndex" @click="checkValue(searchItem.companyName || searchItem.regionName, formItem.signData, searchItem.companyId || searchItem.regionId)">{{searchItem.companyName || searchItem.regionName}}</div>
        </div>
      </div>
      <FormItem :label="formItem.lables" :prop="formItem.props" class="left-align" v-else-if="formItem.formType === 'radio'">
        <RadioGroup v-model="formItem.modelData">
          <Radio label="男"></Radio>
          <Radio label="女"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="formItem.lables" :prop="formItem.props" v-else-if="formItem.formType === 'select'">
        <Select v-model="formItem.modelData">
            <Option v-for="items in selectCon" :value="items.value" :key="items.value">{{ items.label }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="formItem.lables" :prop="formItem.props" v-else-if="formItem.formType === 'textarea'">
        <i-input v-model="formItem.modelData" placeholder="" @on-change="changeBlur(formItem.modelData)" :type="formItem.types" class="percent-forms"></i-input>
      </FormItem>
      <FormItem :label="formItem.lables" :prop="formItem.props" class="left-align" v-else-if="formItem.formType === 'switch'">
      <i-switch v-model="formItem.modelData" @on-change="statusData(formItem.modelData, formItem.lables)"></i-switch>
      <span class="statusNames">{{formItem.stateName}}</span>
      </FormItem>
      <FormItem :label="formItem.lables" :prop="formItem.props" v-else-if="formItem.formType === 'date'">
        <DatePicker type="date" placeholder=""  v-model="formItem.modelData"></DatePicker>
      </FormItem>
      <FormItem :label="formItem.lables" :prop="formItem.props" v-else-if="formItem.formType === 'time'">
        <TimePicker confirm placeholder="" v-model="formItem.modelData" @on-change="blurParams(formItem.modelData)"></TimePicker>
      </FormItem>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popForm',
  data () {
    return {

    };
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    changeBlur (datas) {
      this.$emit('blurEvent', datas);
    },
    blurParams (res, sign) {
      this.$emit('blurSign', res, sign);
    },
    statusData (status, lables) {
      this.$emit('changeStatus', status, lables);
    },
    searchInput (values) {
      this.$emit('autoSearch', values);
    },
    checkValue (res, signs, id) {
      this.$emit('setValue', res, signs, id);
    },
    checkData (check, lables) {
      this.$emit('checkBlur', check, lables);
      console.log(check);
      console.log(lables);
    }
  },
  props: ['formList', 'setClass', 'autoData', 'selectCon']
};

</script>
<style lang='less'>
.flex-componets {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  .single-forms {
    width: 49%;
    .rela-set {
      position: relative;
      .set-width {
        width: 64%;
        position: absolute;
        height: 15vh;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 6px;
        margin-top: -15px;
        overflow-y: scroll;
        z-index: 9999;
        left: 80px;
        text-align: left;
        div {
          padding: 3px;
          cursor: pointer;
          &:hover {
            background: #108CEE;
            color: #fff;
          }
        }
      }
    }

    .left-align {
      display: flex;
      justify-content: flex-start;
      flex-flow: row nowrap;
      .ivu-form-item-content {
        display: inline-block;
      }
    }
  }
  .percent-forms {
    width: 100%;
    .ivu-form-item-content {
      justify-content: flex-start;
      .statusNames {
        display: inline-block;
        vertical-align: top;
        line-height: 27px;
        margin-left: 5px;
      }
    }
  }
  .lay-btn {
      width: 100%;
      display: block;
  }
  }
</style>
