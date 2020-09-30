<template>
  <div class="workplace-chart" :id="id" :style="nodeStyle">
    <!-- <i :style="{'backgroundImage': 'url('+icon+')'}"></i> -->
    <img :src="icon" alt="node-chart" style="width: 135px" v-if="icon"/>
    <div class="drag-area" v-if="!icon">
      <div class="header">
        <img src="/assets/img/working.png" />
        <span>Edge Deployment (192.168.10.2)</span>
      </div>
      <div class="body"></div>
    </div>
    <div class="ep"></div>
    <div>
      <ul>
        <li v-for="(v, k) in props" :key="k">{{k}}: {{v}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChartNode",
  // props 验证
  props: {
    id: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    nodeStyle: {
      type: Object
    },
    props: {
      type: Object,
      default () {
        return {}
      }
    },
    busiTypePropsMap: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.workplace-chart {
  position: absolute;
  text-align: center;
  margin: 0;
  cursor: pointer;
  padding: 10px;
  i {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 20px;
    color: #409eff;
    cursor: pointer;
    margin-bottom: 5px;
    touch-action: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;

    width: 60px;
    height: 60px;
    line-height: 60px;
    background-size: 85%;
    display: inline-block;
    margin-right: 0 !important;
  }
  span {
    display: block;
  }
  .ep {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: 10px;
    background: #409eff;
    border-radius: 5px;
  }
  ul {
    display: none;
  }
  &:hover {
    .ep {
      opacity: 1;
    }
  }
  &.dragHover {
    .ep {
      opacity: 0;
    }
  }
}

.drag-area {
  height: 580px;
  width: 380px;
  border: 1px solid #3C198C;
  border-radius: 5px;
  .header {
    height: 48px;
    background: linear-gradient(90deg, #3D63F4 0%,#6331D5 100%);
    color: white;
    padding: 15px;
    display: flex;
  }
  .body {
    background: white;
    height: 528px;
  }

  .workplace {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
