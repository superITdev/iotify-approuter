<template>
  <div class="work-area">
    <b-row class="mt-2 work-header">
      <b-colxx xxs="12" class="text-right">
        <img src="/assets/img/user.png" alt="user" style="width: 45px"/>
        <b-button variant="secondary" class="deploy-btn">Deploy</b-button>
      </b-colxx>
    </b-row>
    <b-row class="work-content"></b-row>
    <b-row class="mt-2 work-footer">
      <b-colxx xxs="6" class="text-left">
        <b-card class="text-center">
          <img :src="fullScreen ? '/assets/img/work/full-screen.png' : '/assets/img/work/full-screen.png'" alt="full-screen" @click="toggleFullScreen"/>
        </b-card>
        <b-card class="text-center mt-2">
          <img src="/assets/img/work/puls.png" alt="plus" />
          <img src="/assets/img/work/minus.png" alt="minus" />
        </b-card>
      </b-colxx>
      <b-colxx xxs="6" class="right-icon">
        <b-row>
          <b-card class="text-center">
            <img src="/assets/img/work/logger.png" alt="logger" @click="goToPage('/app/logger-page')" />
            <img src="/assets/img/work/code-pen.png" alt="code-pen" @click="goToPage('/app/code-page')" />
            <img src="/assets/img/work/setting.png" alt="setting" v-b-modal.httpsetting />
            <b-modal id="httpsetting" size="lg" title="HTTP Settings" hide-footer>
              <b-row>
                <b-colxx xxs="6">
                  <b-form-group label="Server Type">
                    <b-form-checkbox-group>
                      <b-form-radio value="first">Simple</b-form-radio>
                      <b-form-radio value="second">Advanced</b-form-radio>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-colxx>
                <b-colxx xxs="6">
                  <b-row>
                    <b-colxx xxs="6">Load Balancing</b-colxx>
                    <b-colxx xxs="6"><b-form-radio value="third">Automatic</b-form-radio></b-colxx>
                  </b-row>
                  <b-row>
                    <vue-slider ref="slider" v-model="sliderDoubleValue" tooltip-dir="['bottom']" :piecewise="true" :data="sliderData" :direction=direction></vue-slider>
                  </b-row>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx xxs="6">
                  <b-form-group label="Endpoint URL">
                    <b-form-input type="text" />
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx xxs="12">
                  <b-form-group label="Route Handler">
                    <b-form-input type="text" />
                  </b-form-group>
                </b-colxx>
              </b-row>
            </b-modal>
          </b-card>
        </b-row>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import {
    getDirection
} from '../../utils'

export default {
  components: {
    'vue-slider': VueSlider,
  },
  data() {
    return {
      fullScreen: false,
      direction: getDirection().direction,
      sliderDoubleValue: [100, 400],
      sliderData: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    }
  },
  methods: {
    goToPage(path) {
      this.$router.push(path);
    },

    toggleFullScreen() {
      console.log('fullscreen')
      const isInFullScreen = this.isInFullScreen()

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
    }
  }
}

</script>
