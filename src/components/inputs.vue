<template>
  <div class="input-width">
    <Row :gutter="20">
      <div  v-for="(uitem, uindex) in setInput" :key="uindex">
        <i-col :span="uitem.spans"  v-if="uitem.types === 'input'">
          <i-input size="large" v-model="uitem.models" placeholder="" @on-focus="changeColor(uitem.lables)" @on-blur="$emit('resetColor')">
            <span slot="prepend" :class="{blueColor: paramsData.myColor == uitem.lables}">{{uitem.lables}}</span>
          </i-input>
        </i-col>
        <i-col :span="uitem.spans"  v-if="uitem.types === 'select'" class="set-dis">
          <span :class="{blueColor: paramsData.myColor == uitem.lables}" class="left-labels">{{uitem.lables}}</span>
          <Select v-model="uitem.models" class="selevt-set" @on-open-change="changeColor(uitem.lables)">
              <Option v-for="items in selectInfo" :value="items.value" :key="items.value">{{ items.label }}</Option>
          </Select>
        </i-col>
        <i-col :span="uitem.spans"  v-if="uitem.types === 'date'" class="set-dis dates">
          <span :class="{blueColor: paramsData.myColor == uitem.lables}" class="left-labels centers">{{uitem.lables}}</span>
          <DatePicker type="date" placeholder="" v-model="uitem.models" @on-open-change="changeColor(uitem.lables)"></DatePicker>
        </i-col>
        <i-col :span="uitem.spans" v-else-if="uitem.types === 'button'">
          <Button type="primary" :loading="paramsData.loadingSearch" icon="search" @click="$emit('searchTable')">
            <span v-if="!paramsData.loadingSearch">查询</span>
            <span v-else>Loading...</span>
          </Button>
        </i-col>
      </div>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'inputs',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    changeColor (labels) {
      this.$emit('changeColor', labels);
    }
  },
  props: ['setInput', 'paramsData', 'selectInfo']
};

</script>
<style lang='less' scoped>
.input-width {
  width: 100%;
  .blueColor {
    color: #108CEE;
  }
  .set-dis {
    display: table;
    .ivu-select {
      width: 72%;
    }
    .left-labels {
      display: table-cell;
      vertical-align: middle;
      height: 30px;
      font-size: 14px;
    }
    .selevt-set {
      display: table-cell;
      height: 30px;
    }
  }
  .dates {
    &:nth-child(2) {
      .centers {
        margin-left: -50px;
      }
    }
  }
}
</style>
