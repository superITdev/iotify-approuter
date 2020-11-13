<template>
    <div style="width:100%; height:100%; position:relative;" class="argraph-v02">
        <jsplumb-toolkit
            ref="toolkitComponent"
            :renderParams="renderParams"
            :view="view"
            :surfaceId="surfaceId"
            :toolkitParams="toolkitParams">
        </jsplumb-toolkit>
        <NodeSetting :setting="nodeSetting" />
        <LoggerView :setting="loggerView" />
    </div>
</template>

<script>
import {jsPlumb, DrawingTools} from 'jsplumbtoolkit'
import {jsPlumbToolkitVue2} from 'jsplumbtoolkit-vue2'

import DeployNode from '/imports/ui/argraph/v02/DeployNode.vue'
import SubNode from '/imports/ui/argraph/v02/SubNode.vue'

import NodeMajorTypes from '/common/NodeMajorTypes.js'
import * as NodeUtil from '/common/NodeUtil.js'

import csStorage from '/common/CSStorage.js'

import NodeSetting from '/imports/ui/NodeSetting/NodeSetting.vue'
import cloneDeep from 'lodash.clonedeep'
import LoggerView from '/imports/ui/LoggerView/LoggerView.vue'

let $self;
let toolkit;
let surface;

let router;

function onNodeItemFactory(type, data, callback) {
    if (data.extra.saveStore) csStorage.registerRecentNodeItem(data, true);
    try {
        callback(data);
    } catch (error) {
        // continue further processing.
    }

}
function checkConnectivity(edges, source, target) {
    return edges.some(edge => {
        return (edge.source === source && edge.target === target);
    })
}

export default {
    name: 'jsp-toolkit',
    props:["surfaceId"],
    components: {
        NodeSetting,
        LoggerView,
    },
    data:() => {
        return {
            toolkitParams: {
                groupFactory: onNodeItemFactory,
                nodeFactory: onNodeItemFactory,

                beforeConnect: function(source, target) {
                    if (source === target) return false;
                    // // avoid the connection between group & in-nodes.
                    // if (source.objectType !== target.objectType) {
                    //     const node = source.objectType === "Node" ? source : target;
                    //     const group = source.objectType === "Group" ? source : target;
                    //     const nodes = group.getNodes();
                    //     if (nodes.includes(node)) return false;
                    // }

                    // avoid the connection between any node & group.
                    if (source.objectType !== target.objectType) return false;

                    {   // avoid the repeated connections between node & node.
                        const sedges = source.getAllSourceEdges();
                        const tedges = source.getAllTargetEdges();
                        if (checkConnectivity(sedges, source, target)) return false;
                        if (checkConnectivity(sedges, target, target)) return false;
                    }

                    return true;
                }
            },
            renderParams:{
              layout:{
                  type:"Spring",
                  absoluteBacked:true
              },
              jsPlumb:{
                  Connector:"StateMachine",
                  Endpoint:"Blank"
              },
              events:{
                  modeChanged:function (mode) {
                      $self.$emit("onGraphSetModeChanged", mode);
                  },
                  canvasClick:() => {
                      toolkit.clearSelection();
                      surface.stopEditing();
                  },
              },
              dragOptions: {
                  filter: ".jtk-draw-handle, .expand, .item-delete, .item-connector",
                  magnetize: false,
              },
              lassoFilter: ".controls, .controls *, .miniview, .miniview *",
              consumeRightClick: false,
              zoomToFit:true,
            },
            view:{
                nodes: {
                    "default": {
                        component:SubNode,
                        events: {
                            mousedown: (params) => {
                                // This was selected already and keeps the dragging.
                                if (params.el.classList.contains('jtk-surface-selected-element')) return;
                                // select only this one.
                                params.toolkit.clearSelection();
                                return; // by default, but it will keep in some node types.
                                params.toolkit.setSelection(params.node)
                            },
                            dblclick(params) {
                                params.e.stopPropagation(); // avoid the event to propagate into container group.
                                $self.onNodeSetting(params);
                            },
                        }
                    },
                },
                groups:{
                    "default":{
                        component:DeployNode,
                        endpoint:"Blank",
                        anchor:"Continuous",
                        revert:false,
                        orphan:true,
                        constrain:true,
                        layout:{
                            type:"Spring",
                            absoluteBacked:true
                        },
                        events:{
                            mousedown: (params) => {
                                // Any child was selected and keeps the dragging.
                                if (params.e.path.some(item => item != params.el && item.classList && item.classList.contains('jtk-surface-selected-element'))) return;
                                // This was selected already and keeps the dragging.
                                if (params.el.classList.contains('jtk-surface-selected-element')) return;
                                // select only this one.
                                params.toolkit.clearSelection();
                                params.toolkit.setSelection(params.group)
                            },
                            dblclick(params) {
                                $self.onNodeSetting(params);
                            },
                        }
                    },
                    [NodeMajorTypes.deployment]: {
                        parent: "default",
                    },
                },
                edges: {
                    "default": {
                        anchor:"AutoDefault",
                        endpoint:"Blank",
                        connector: ["EditableFlowchart", { cornerRadius: 5 } ],
                        paintStyle: { strokeWidth: 2, stroke: "rgb(132, 172, 179)", outlineWidth: 3, outlineStroke: "transparent" },	//	paint style for this edge type.
                        hoverPaintStyle: { strokeWidth: 2, stroke: "rgb(67,67,67)" }, // hover paint style for this edge type.
                        events: {
                            "click":(parm) => {
                                surface.startEditing(parm.edge, {
                                    deleteButton:true,
                                    onMaybeDelete:(edge, connection, doDelete) => {
                                        if (confirm('Delete Edge?')) doDelete();
                                    }
                                });
                            },
                            dblclick(params) {
                                surface.stopEditing();
                                $self.onLoggerView(params);
                            }
                        },
                        overlays: [
                            [ "Arrow", { location: 1, width: 10, length: 10 }]
                        ]
                    },
                },

                ports: {
                    "start": {
                        edgeType: "default"
                    },
                    "source": {
                        maxConnections: -1,
                        edgeType: "default"
                    },
                    "target": {
                        maxConnections: -1,
                        isTarget: true,
                        dropOptions: {
                            hoverClass: "connection-drop"
                        }
                    }
                }
            },

            nodeSetting: {
                show: false, // show/hide setting dialog.
                nodeData: {}, // cloned node data to be edited on setting form.
            },
            loggerView: {
                show: false,
                data: {},
            },
        };
    },

    mounted() {
        $self = this;
        router = this.$router;

        const toolkitComponent = this.$refs.toolkitComponent;
        toolkit = toolkitComponent.toolkit;

        jsPlumbToolkitVue2.getSurface(this.surfaceId, (s) => {
            surface = s;
            new DrawingTools({
                renderer: s
            });
        });
    },

    methods: {
        onNodeSetting(params) {
            let nodeData;
            if (params.node) {
                nodeData = params.node.data;
            } else if (params.group) {
                nodeData = params.group.data;
            } else {
                return;
            }
            this.nodeSetting.show = true;
            this.nodeSetting.nodeData = cloneDeep(nodeData);
        },
        onLoggerView(params) {
            this.loggerView.show = true;
        },
    }
}
</script>
