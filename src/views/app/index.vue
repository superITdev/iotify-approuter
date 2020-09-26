<template>
<div id="app-container" :class="getMenuType">
  <sidebar />
  <main id="work-container">
    <chart-node
      v-for="(item, idx) in chartData.nodes"
      v-bind="item"
      :key="idx"
      @edit="editNode(item,idx)"
    ></chart-node>
    <div class="container-fluid">
      <router-view />
    </div>
  </main>
</div>
</template>

<script>
import Sidebar from '../../containers/Sidebar'
import ChartNode from "@/components/Common/ChartNode";
import {
    mapGetters
} from 'vuex'

export default {
  components: {
    'sidebar': Sidebar,
    'chart-node': ChartNode,
  },
  data() {
    return {
      show: true,
      chartData: {
        nodes: [],
        connections: [],
        props: {}
      },
      jsp: null,
    }
  },
  methods: {
    initNode(el) {
      let _self = this;
      this.jsp.draggable(el, {
        containment: true,
        start(params) {},
        drag(params) {},
        stop(params) {
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
  computed: {
    ...mapGetters(['getMenuType'])
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
        Container: "work-container"
      });
      this.jsp = instance;
      var canvas = document.getElementById("work-container");

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
      $("#work-container").droppable({
        scope: "plant",
        drop: function(ev, ui) {
          let helper = ui.helper;
          let id = jsPlumbUtil.uuid();
          let item = {
            id,
            icon: helper.attr("data-icon"),
            busiType: helper.attr("data-busitype"),
            text: helper.attr("data-text"),
            nodeStyle: {
              top: ui.offset.top + "px",
              left: ui.offset.left - ev.toElement.offsetLeft + "px"
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
