<template>
<div>
  <div class="second-page">
    <div class="colors-square">
      <div class="colors-second" v-for="(sitem, sindex) in secondsData" :key="sindex" @click="routeGo(sitem.name, sitem.newUrl, sitem.nodes)" :style="{backgroundColor: sitem.resBackground}">
        <img :src="sitem.menuIcon" alt="" class="img-size">
        <div class="fonts-desc">{{sitem.name}}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'opManage',
  data () {
    return {
      secondsData: this.$route.params.secondData.parmasData,
      numberId: this.$route.params.secondName
    };
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'allBasic') {
        this.secondsData = this.$route.params.secondData.parmasData;
        this.numberId = this.$route.params.secondName;
      } else {
      }
    }
  },
  components: {},

  computed: {},

  mounted () {
  },
  methods: {
    routeGo (urlName, newurl, nodess) {
      this.$store.state.headerList.dataList.push({urlName, newurl});
      if (nodess) {
        this.$store.commit('saveTabs', nodess);
      }
      this.$router.push(`/${newurl}`);
      let reduceRepeat = this.$store.state.headerList.dataList;
      let maps = {};
      let newObj = [];
      reduceRepeat.map((val, index) => {
        maps[val.urlName] = val;
      });
      for (let key in maps) {
        newObj.push(maps[key]);
      }
      this.$store.state.headerList.dataList = newObj;
    }
  }
};

</script>
<style lang='less' scoped>
.second-page {
  width: 100%;
  background-color: #fff;
  padding: 10vh 0 8vh 0;
  height: calc(~"96vh - 84px");
  .colors-square {
    width: 880px;
    margin: 0 auto;
    height: calc(~"80vh - 84px");
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    .colors-second {
      background-color: #55ABFB;
      display: flex;
      flex-flow: column nowrap;
      width:100px;
      height:112px;
      border-radius:4px;
      box-shadow:1px 0px 1px rgba(26,88,146,1);
      margin-left: 80px;
      margin-bottom: 7vh;
      &:nth-child(1),
      &:nth-child(5n+1) {
        margin-left: 0;
      }
      .img-size {
        width: 52px;
        height: 55px;
        margin: 12px auto;
      }
      .fonts-desc {
        font-size: 14px;
        color: #fff;
        text-align: center;
      }
    }
    @media screen and (min-width: 1660px) {
      .colors-second {
          width:130px;
          height: 142px;
          margin-left: 88px;
          .img-size {
            margin: 24px auto 16px auto;
          }
      }
    }
  }
}
@media screen and (min-width: 1660px) {
  .second-page {
    .colors-square {
      width: 1020px;
    }
  }
}

</style>
