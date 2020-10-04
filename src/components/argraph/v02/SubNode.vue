<template>
    <div v-bind:style="{left:obj.left + 'px', top:obj.top + 'px', width:obj.w + 'px', height:obj.h + 'px'}">
        {{obj.title}}
        <div class="delete"/>
        <div class="connect"/>

        <jtk-source port-type="source" filter=".connect" v-pre/>
        <jtk-target port-type="target" v-pre/>
    </div>
</template>

<script>
    import BaseNode from '@/components/argraph/v02/BaseNode.vue'
    export default {
        mixins:[BaseNode]
    }
</script>
