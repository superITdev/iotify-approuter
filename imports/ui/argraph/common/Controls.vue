<template>
    <div class="controls" ref="container">
        <i class="fa fa-arrows selected-mode" mode="pan" title="Pan Mode" v-on:click="panMode()"></i>
        <i class="fa fa-pencil" mode="select" title="Select Mode" v-on:click="selectMode()"></i>
        <i class="fa fa-home2" title="Zoom To Fit" v-on:click="zoomToFit()"></i>
        <!-- <i class="fa fa-undo" undo title="Undo last action" v-on:click="undo()"></i>
        <i class="fa fa-repeat" redo title="Redo last action" v-on:click="redo()"></i> -->
        <i class="fa fa-times2" title="Clear" v-on:click="clear()"></i>
    </div>
</template>

<script>
import { jsPlumbToolkitVue2 } from "jsplumbtoolkit-vue2";
import { jsPlumbToolkitUndoRedo } from "jsplumbtoolkit-undo-redo";

let toolkit;
let surface;
let undoManager;

export default {
    props:["surfaceId"],
    methods:{
        panMode:function() {
            surface.setMode("pan");
        },
        selectMode:function() {
            surface.setMode("select");
        },
        zoomToFit:function() {
            toolkit.clearSelection();
            surface.zoomToFit();
        },
        undo:function() {
            undoManager.undo();
        },
        redo:function() {
            undoManager.redo();
        },
        clear: function() {
            const isEmpty = toolkit.getNodeCount()===0 && toolkit.getGroupCount()===0;
            if (isEmpty || confirm("Clear canvas?")) toolkit.clear();
        }
    },
    mounted:function() {
        const container = this.$refs.container;

        jsPlumbToolkitVue2.getSurface(this.surfaceId, (s) => {
            surface = s;
            toolkit = s.getToolkit();

            undoManager = new jsPlumbToolkitUndoRedo({
                surface:surface,
                compound:true,

                onChange:(mgr, undoSize, redoSize) => {
                    container.setAttribute("can-undo", undoSize > 0);
                    container.setAttribute("can-redo", redoSize > 0);
                }
            });

            surface.bind("canvasClick", () => {
                toolkit.clearSelection();
            });
        });
    }
}
</script>
