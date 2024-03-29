<template>
    <div style="width: 100%;height: 100%;position: relative;" class="argraph-v02">
        <jsplumb-toolkit
            ref="toolkitComponent"
            v-bind:render-params="renderParams"
            v-bind:view="view"
            v-bind:surface-id="surfaceId"
            v-bind:toolkit-params="toolkitParams">
        </jsplumb-toolkit>

        <HttpSetting ref="httpsetting" />
    </div>
</template>

<script>
import HttpSetting from '@/components/HttpSetting'

import {jsPlumb, Dialogs, DrawingTools} from 'jsplumbtoolkit'
import {jsPlumbToolkitVue2} from 'jsplumbtoolkit-vue2'

import NodeCategoryTypes from '@/data/NodeCategoryTypes'
import DeployNode from '@/components/argraph/v02/DeployNode'
import SubNode from '@/components/argraph/v02/SubNode'

let toolkit;
let surface;

let httpsetting;
let router;

function checkConnectivity(edges, source, target) {
    return edges.some(edge => {
        return (edge.source === source && edge.target === target);
    })
}

export default {
    name: 'jsp-toolkit',
    props:["surfaceId"],
    components: {
        HttpSetting,
    },
    data:() => {
        return {
            toolkitParams:{
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
                      jsPlumb.removeClass(jsPlumb.getSelector(".controls [mode]"), "selected-mode");
                      jsPlumb.addClass(jsPlumb.getSelector(".controls [mode='" + mode + "']"), "selected-mode");
                  },
                  canvasClick:() => {
                      toolkit.clearSelection();
                      surface.stopEditing();
                  }
              },
              dragOptions: {
                  filter: ".jtk-draw-handle, .delete, .expand, .group-delete, .connect",
                  magnetize: true,
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
                            // tap: (params) => params.toolkit.toggleSelection(params.node)
                        }
                    },
                    [NodeCategoryTypes.protocol]: {
                        parent: "default",
                    },
                    [NodeCategoryTypes.memory]: {
                        parent: "default",
                    },
                    [NodeCategoryTypes.control]: {
                        parent: "default",
                        events: {
                            dblclick(params) { // open http-setting modal.
                                httpsetting.showModal();
                            }
                        }
                    },
                    [NodeCategoryTypes.illustration]: {
                        parent: "default",
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
                            // tap: (params) => {
                            //     params.toolkit.toggleSelection(params.group)
                            // }
                        }
                    },
                    [NodeCategoryTypes.deployment]: {
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
                                        Dialogs.show({
                                            id: "dlgConfirm",
                                            data: {
                                                msg: "Delete Edge"
                                            },
                                            onOK: doDelete
                                        });
                                    }
                                });
                            },
                            dblclick(params) { // open logger-page.
                                surface.stopEditing();
                                router.push('/app/logger-page');
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
            }
        };
    },

    mounted() {
        httpsetting = this.$refs['httpsetting'];
        router = this.$router;

        const toolkitComponent = this.$refs.toolkitComponent;
        toolkit = toolkitComponent.toolkit;

        jsPlumbToolkitVue2.getSurface(this.surfaceId, (s) => {
            surface = s;
            new DrawingTools({
                renderer: s
            });
        });
    }
}
</script>
