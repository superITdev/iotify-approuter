<template>
    <div v-bind:style="{left:obj.left + 'px', top:obj.top + 'px', width:obj.w + 'px', height:obj.h + 'px'}" class="flowchart-object flowchart-output">
        <div style="position:relative">

            <svg :width="obj.w" :height="obj.h">
                <rect x="0" y="0" :width="obj.w" :height="obj.h"/>
                <text text-anchor="middle" :x="obj.w/2" :y="obj.h/2" dominant-baseline="central">{{obj.text}}</text>
            </svg>
            <div class="node-edit node-action" v-on:click="edit()"></div>
            <div class="node-delete node-action delete" v-on:click="maybeDelete()"></div>
        </div>
        <jtk-target port-type="target" v-pre/>
    </div>
</template>

<script>
    import BaseEditableNode from '@/components/argraph/v01/BaseEditableNode.vue'
    export default {
        mixins:[BaseEditableNode]
    }
</script>
