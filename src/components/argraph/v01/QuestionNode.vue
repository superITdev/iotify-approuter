<template>
    <div v-bind:style="{left:obj.left + 'px', top:obj.top + 'px', width:obj.w + 'px', height:obj.h + 'px'}" class="flowchart-object flowchart-question">
        <div style="position:relative">

            <svg :width="obj.w" :height="obj.h">
                <path :d="'M ' + (obj.w/2) + ' 10 L ' + (obj.w-10) + ' ' + (obj.h/2) + ' L ' + (obj.w/2) + ' ' + (obj.h-10) + ' L 10 ' + (obj.h/2) + ' Z'" class="inner"/>
                <text text-anchor="middle" :x="obj.w/2" :y="obj.h/2" dominant-baseline="central">{{obj.text}}</text>
            </svg>
            <div class="node-edit node-action" v-on:click="edit()"></div>
            <div class="node-delete node-action delete" v-on:click="maybeDelete()"></div>

        </div>
        <div class="drag-start connect"></div>
        <jtk-target port-type="target" v-pre/>
        <jtk-source port-type="source" filter=".connect" v-pre/>
    </div>
</template>

<script>
    import BaseEditableNode from '@/components/argraph/v01/BaseEditableNode.vue'
    export default {
        mixins:[BaseEditableNode]
    }
</script>
