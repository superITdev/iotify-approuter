<template>
  <div class="work-area">
    <div class="mt-4 work-header">
      <div class="text-right">
        <img src="/assets/img/user.png" alt="user" style="width: 40px; margin-right: 10px;"/>
        <el-button type="primary" plain>Deploy</el-button>
      </div>
    </div>
    <div class="work-footer">
      <div class="work-footer-left">
        <b-card class="text-center">
          <img :src="fullScreen ? '/assets/img/work/full-screen.png' : '/assets/img/work/full-screen.png'" alt="full-screen" @click="toggleFullScreen"/>
        </b-card>
        <b-card class="text-center mt-2">
          <img src="/assets/img/work/puls.png" alt="plus" @click="nudgeZoom(true)"/>
          <img src="/assets/img/work/minus.png" alt="minus" @click="nudgeZoom(false)"/>
        </b-card>
      </div>
      <div class="work-footer-right">
        <img src="/assets/img/work/logger.png" alt="logger" @click="loadGraph()" />
        <img src="/assets/img/work/code-pen.png" alt="code-pen" @click="goToPage('/app/code-page')" />
        <img src="/assets/img/work/setting.png" alt="..." @click="saveGraph()" />
      </div>
    </div>
  </div>
</template>

<script>
import { jsPlumbToolkitVue2 } from "jsplumbtoolkit-vue2";
import {loadGraph, saveGraph} from '@/utils/common.js';

const surfaceId = "surface";
let surface;
let toolkit;

export default {
  data() {
    return {
      fullScreen: false,
    }
  },
  methods: {
    loadGraph() {
      loadGraph(toolkit);
    },
    saveGraph() {
      saveGraph(toolkit);
    },

    goToPage(path) {
      this.$router.push(path);
    },

    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen();

      var docElm = document.documentElement
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
      }
      this.fullScreen = !isInFullScreen
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
            document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
            document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      )
    },

    nudgeZoom(plus) {
      let nudge = 0.05;
      if (!plus) nudge *= -1;
      surface.nudgeZoom(nudge);
    }
  },

  mounted() {
    jsPlumbToolkitVue2.getSurface(surfaceId, (s) => {
      surface = s;
      toolkit = surface.getToolkit();
    });
  }
}
</script>