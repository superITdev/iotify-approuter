<template>
  <div class="work-area">
    <b-row class="mt-2 work-header">
      <b-colxx xxs="12" class="text-right">
        <img src="/assets/img/user.png" alt="user" style="width: 45px"/>
        <b-button variant="secondary" class="deploy-btn">Deploy</b-button>
      </b-colxx>
    </b-row>
    <b-row class="work-content">
      <b-colxx xxs="12">
        <b-row class="mt-4 text-right">
          <b-colxx xxs="10"></b-colxx>
          <b-colxx xxs="2">
            <b-row class="external-app">
              <b-colxx xxs="6" class="left">
                <img src="/assets/img/work/ext-app.png" alt="ext-app" />
              </b-colxx>
              <b-colxx xxs="6" class="right">
                <div>External</div>
                <div>Web App</div>
              </b-colxx>
            </b-row>
          </b-colxx>
        </b-row>
      </b-colxx>
      <draggable-view />
    </b-row>
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
          <b-card class="text-center mt-5">
            <img src="/assets/img/work/logger.png" alt="logger" @click="goToPage('/app/logger-page')" />
            <img src="/assets/img/work/code-pen.png" alt="code-pen" @click="goToPage('/app/code-page')" />
            <img src="/assets/img/work/setting.png" alt="setting" v-b-modal.httpsetting />
            <b-modal id="httpsetting" size="lg" title="HTTP Settings" hide-footer>
              <b-row class="mb-3 mt-2">
                <b-colxx xxs="6">
                  <b-form-group label="Server Type">
                    <b-form-checkbox-group>
                      <b-row>
                        <b-colxx xxs="4">
                          <b-form-radio value="first">Simple</b-form-radio>
                        </b-colxx>
                        <b-colxx xxs="4">
                          <b-form-radio value="second">Advanced</b-form-radio>
                        </b-colxx>
                      </b-row>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-colxx>
                <b-colxx xxs="6">
                  <b-row>
                    <b-colxx xxs="6">Load Balancing</b-colxx>
                    <b-colxx xxs="6"><b-form-radio value="third">Automatic</b-form-radio></b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12">
                      <vue-slider ref="slider" v-model="sliderDoubleValue" tooltip-dir="['bottom']" :piecewise="true" :data="sliderData" :direction=direction></vue-slider>
                    </b-colxx>
                  </b-row>
                </b-colxx>
              </b-row>
              <b-row class="mb-3">
                <b-colxx xxs="6">
                  <b-form-group label="Endpoint URL">
                    <b-form-input type="text" />
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx xxs="12">
                  <b-form-group label="Route Handler">
                    <b-colxx xxs="12" class="mb-3 p-0">
                      <b-card class="mb-2" no-body>
                        <b-tabs card no-fade>
                          <b-tab title="default" active title-item-class="w-20 text-center">
                            <b-row>
                              <b-colxx xxs="4">
                                <v-select v-model="httpMethodForm.select" :options="selectData" :dir="direction" />
                              </b-colxx>
                              <b-colxx xxs="7">
                                <b-form-input></b-form-input>
                              </b-colxx>
                            </b-row>
                            <b-row class="mt-4">
                              <b-colxx xxs="12">Derive Channel ID from</b-colxx>
                            </b-row>
                            <b-row class="mt-4">
                              <b-colxx xxs="12">Response Logic</b-colxx>
                              <b-colxx xxs="12" class="mt-2">
                                <b-form-radio value="Always HTTP 200">Always HTTP 200</b-form-radio>
                              </b-colxx>
                              <b-colxx xxs="12" class="mt-2">
                                <b-row>
                                  <b-colxx xxs="3">
                                    <b-form-radio value="Respond from  Channel">Respond from  Channel</b-form-radio>
                                  </b-colxx>
                                  <b-colxx xxs="5">
                                    <b-form-input></b-form-input>
                                  </b-colxx>
                                  <b-colxx xxs="4">
                                    <b-input-group prepend="Timeout">
                                      <b-form-input></b-form-input>
                                    </b-input-group>
                                  </b-colxx>
                                </b-row>
                              </b-colxx>
                            </b-row>
                          </b-tab>
                          <b-tab title="+ Add New" title-item-class="w-20 text-center"></b-tab>
                        </b-tabs>
                      </b-card>
                    </b-colxx>
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
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {
    getDirection
} from '../../utils'
import DraggableView from '../../components/Common/DraggableView'

export default {
  components: {
    'vue-slider': VueSlider,
    'v-select': vSelect,
    'draggable-view': DraggableView,
  },
  data() {
    return {
      fullScreen: false,
      direction: getDirection().direction,
      sliderDoubleValue: [2, 4],
      sliderData: [1, 2, 3, 4, 5, 6],
      httpMethodForm: {
        select: 'GET',
      },
      direction: getDirection().direction,
      selectData: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
      ],
    }
  },
  methods: {
    goToPage(path) {
      this.$router.push(path);
    },

    toggleFullScreen() {
      console.log('fullscreen');
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
    }
  }
}

</script>

<style lang="less" rel="stylesheet/less" scoped>
  .external-app {
    height: 65px;
    margin: 0;
    cursor: pointer;
    .left {
      background: #3D63F4;
      border: 1px solid #2D51DB;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      padding-top: 10px;
      text-align: center;
    }
    .right {
      background: white;
      border: 1px solid #2D51DB;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      text-align: center;
      padding-top: 10px;
    }
  }
</style> 
