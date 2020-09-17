<template>
  <div class="work-area">
    <b-row class="mt-2 work-header">
      <b-colxx xxs="12" class="text-right">
        <img src="/assets/img/user.png" alt="user" style="width: 40px; margin-right: 10px;"/>
        <el-button type="primary" plain>Deploy</el-button>
      </b-colxx>
    </b-row>
    <b-row class="work-content" id="workplace" @dragover.prevent>
      <!-- <b-colxx xxs="12">
        <b-row>
          <b-colxx xxs="4">
            <div class="drag-area hidden" id="drag-area-a"  @dragover.prevent @drop.prevent="drop">
              <div class="header">
                <img src="/assets/img/working.png" />
                <span>Edge Deployment (192.168.10.2)</span>
              </div>
              <div class="body"></div>
            </div>
          </b-colxx>
          <b-colxx xxs="4">
            <div class="drag-area hidden" id="drag-area-b"  @dragover.prevent @drop.prevent="drop">
              <div class="header">
                <img src="/assets/img/working.png" />
                <span>Edge Deployment (192.168.10.2)</span>
              </div>
              <div class="body"></div>
            </div>
          </b-colxx>
          <b-colxx xxs="4">
            <div class="drag-area hidden" id="drag-area-c"  @dragover.prevent @drop.prevent="drop">
              <div class="header">
                <img src="/assets/img/working.png" />
                <span>Edge Deployment (192.168.10.2)</span>
              </div>
              <div class="body"></div>
            </div>
          </b-colxx>
        </b-row>
      </b-colxx> -->
      <chart-node
        v-for="(item, idx) in chartData.nodes"
        v-bind="item"
        :key="idx"
        @edit="editNode(item,idx)"
      ></chart-node>
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
          </b-card>
        </b-row>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {
    getDirection
} from '../../utils'
import ChartNode from "@/components/Common/ChartNode";

export default {
  components: {
    'v-select': vSelect,
    'chart-node': ChartNode,
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
      chartData: {
        nodes: [],
        connections: [],
        props: {}
      },
      jsp: null,
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

    initNode(el) {
      let _self = this;
      this.jsp.draggable(el, {
        containment: true,
        start(params) {
          // console.log(params);
        },
        drag(params) {
          // console.log(params);
        },
        stop(params) {
          // console.log(params);
          let id = params.el.id;
          _self.chartData.nodes.forEach(item => {
            if (item.id === id) {
              item.nodeStyle.left = params.pos[0] + "px";
              item.nodeStyle.top = params.pos[1] + "px";
            }
          });
        }
      });

      this.jsp.makeSource(el, {
        filter: ".ep",
        anchor: "Continuous",
        // anchor: ["Perimeter", { shape: "Rectangle" }],
        connectorStyle: {
          stroke: "#5c96bc",
          strokeWidth: 2,
          outlineStroke: "transparent",
          outlineWidth: 4
        },
        extract: {
          action: "the-action"
        },
        maxConnections: -1,
        onMaxConnections: function(info, e) {
          alert("Maximum connections (" + info.maxConnections + ") reached");
        }
      });

      this.jsp.makeTarget(el, {
        dropOptions: { hoverClass: "dragHover" },
        anchor: ["Perimeter", { shape: "Rectangle" }],
        allowLoopback: false
      });
    },

    editNode(item, idx) {
      console.log('edit');
    },

  },

  mounted() {
    const _self = this;
    jsPlumb.ready(() => {
      var instance = jsPlumb.getInstance({
        Endpoint: [
          "Blank",
          { cssClass: "chart-dot", hoverClass: "chart-dot-hover", radius: 5 }
        ],
        Connector: "Straight",
        HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
        ConnectionOverlays: [
          [
            "Arrow",
            {
              location: 1,
              visible: true,
              width: 11,
              height: 11,
              id: "Arrow"
            }
          ]
          // ["Label", { label: "-", id: "label", cssClass: "aLabel" }]
        ],
        Container: "workplace"
      });
      this.jsp = instance;
      var canvas = document.getElementById("workplace");

      // instance.bind("click", function(c) {
      //   instance.deleteConnection(c);
      // });

      instance.bind("connection", function(info) {
        // info.connection.getOverlay("label").setLabel(info.connection.id);
      });

      instance.bind("beforeDrop", function(info) {
        // info.connection.getOverlay("label").setLabel(info.connection.id);
        // console.log(info);
        let isSame = true;
        _self.chartData.connections.forEach(item => {
          if ((item.targetId === info.targetId && item.sourceId === info.sourceId) ||
            (item.targetId === info.sourceId && item.sourceId === info.targetId)
          ) {
            isSame = false;
          }
        });
        if (isSame) {
          _self.chartData.connections.push({
            targetId: info.targetId,
            sourceId: info.sourceId
          });
        } else {
          _self.$message.error("Repeated connections are not allowed!");
        }
        return isSame;
      });

      // bind a double click listener to "canvas"; add new node when this occurs.
      // jsPlumb.on(canvas, "dblclick", function(e) {
      //   newNode(e.offsetX, e.offsetY);
      // });

      $(".draggable-item").draggable({
        scope: "plant",
        helper: "clone",
        containment: $("#work-container")
      });
      $("#workplace").droppable({
        scope: "plant",
        drop: function(ev, ui) {
          let helper = ui.helper;
          let id = jsPlumbUtil.uuid();
          console.log('ev', helper.attr("data-icon"));
          let item = {
            id,
            icon: helper.attr("data-icon"),
            busiType: helper.attr("data-busitype"),
            text: helper.attr("data-text"),
            nodeStyle: {
              top: ui.offset.top + "px",
              left: ui.offset.left + "px"
            },
            props: {}
          };

          _self.chartData.nodes.push(item);
          _self.$nextTick(() => {
            _self.initNode(id);
          });
        }
      });

      instance.batch(() => {
        jsPlumb.getSelector(".workplace-chart").forEach(item => {
          _self.initNode(item);
        });
      });
    });
  },
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

  .drag-area {
    height: 580px;
    margin: 10px;
    border: 1px solid #3C198C;
    border-radius: 5px;
    .header {
      height: 48px;
      background: linear-gradient(90deg, #3D63F4 0%,#6331D5 100%);
      color: white;
      padding: 15px;
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

  .hidden {
    .header, .body {
      display: none;
    }
    border: 1px dashed !important;
  }
</style> 
