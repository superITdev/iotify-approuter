<template>
    <div v-bind:style="{left:obj.left + 'px', top:obj.top + 'px', width:obj.w + 'px', height:obj.h + 'px'}">
        {{obj.info.title}}
        <div class="delete" v-on:click="maybeDelete()"/>
        <div class="connect"/>

        <jtk-source port-type="source" filter=".connect" v-pre/>
        <jtk-target port-type="target" v-pre/>
    </div>
</template>

<script>
    import BaseNode from '@/components/argraph/v02/BaseNode'
    export default {
        mixins:[BaseNode]
    }
</script>
