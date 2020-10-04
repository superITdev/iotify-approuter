<template>
    <div style="width: 100%;height: 100%;position: relative;" class="argraph-v02">
        <jsplumb-toolkit
            ref="toolkitComponent"
            v-bind:render-params="renderParams"
            v-bind:view="view"
            v-bind:surface-id="surfaceId"
            v-bind:toolkit-params="toolkitParams">
        </jsplumb-toolkit>
    </div>
</template>

<script>
import {jsPlumb, Dialogs, DrawingTools} from 'jsplumbtoolkit'
import {jsPlumbToolkitVue2} from 'jsplumbtoolkit-vue2'

import NodeCategoryTypes from '@/data/NodeCategoryTypes'
import DeployNode from '@/components/argraph/v02/DeployNode'
import SubNode from '@/components/argraph/v02/SubNode'

let toolkitComponent;
let toolkit;
let surface;

export default {
    name: 'jsp-toolkit',
    props:["surfaceId"],
    data:() => {
        return {
            toolkitParams:{
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
                      let controls = document.querySelector(".controls");
                      jsPlumb.removeClass(controls.querySelectorAll("[mode]"), "selected-mode");
                      jsPlumb.addClass(controls.querySelectorAll("[mode='" + mode + "']"), "selected-mode");
                  },
                  canvasClick:() => {
                      surface.stopEditing();
                  }
              },
              lassoInvert:true,
              consumeRightClick: false,
              dragOptions: {
                  filter: ".delete *, .group-connect *, .delete",
                  magnetize: true,
              },
              zoomToFit:true,
            },
            view:{
                nodes: {
                    "default": {
                        component:SubNode,
                        events: {
                            tap: (params) => params.toolkit.toggleSelection(params.node)
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
                        constrain:false,
                        layout:{
                            type:"Circular"
                        },
                        events:{
                            tap: function (params) {
                                toolkit.toggleSelection(params.group);
                            }
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
                            "click":(p) => {
                                surface.startEditing(p.edge, {
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
        toolkitComponent = this.$refs.toolkitComponent;
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
