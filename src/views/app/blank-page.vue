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
        <img src="/assets/img/work/logger.png" alt="logger" @click="goToPage('/app/logger-page')" />
        <img src="/assets/img/work/code-pen.png" alt="code-pen" @click="goToPage('/app/code-page')" />
        <img src="/assets/img/work/setting.png" alt="setting" v-b-modal.httpsetting />
      </div>
    </div>
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
              <el-slider
                v-model="value"
                range
                :marks="marks"
                :min="1"
                :max="6">
              </el-slider>
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
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {
    getDirection
} from '../../utils'

import { jsPlumbToolkitVue2 } from "jsplumbtoolkit-vue2";

const surfaceId = "surface";
let surface;

export default {
  components: {
    'v-select': vSelect,
  },
  
  data() {
    return {
      fullScreen: false,
      direction: getDirection().direction,
      value: [2, 5],
      marks: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6'
      },
      httpMethodForm: {
        select: 'GET',
      },
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
    });
  }
}
</script>