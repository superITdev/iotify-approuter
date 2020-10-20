<template>
    <div :style="{left:obj.left + 'px', top:obj.top + 'px', width:obj.w + 'px', height:obj.h + 'px'}">
        <div class="parts">
            <div class="part-left" :style="{width:obj.w1 + 'px', backgroundColor:obj.color1}"></div>
            <div class="part-divider" :style="{width:'blue'}"></div>
            <div class="part-right" :style="{width:obj.w2 + 'px'}">{{getTitle(obj)}}</div>
        </div>
        <div class="delete" v-on:click="maybeDelete()"/>
        <div class="connect"/>

        <jtk-source port-type="source" filter=".connect" v-pre/>
        <jtk-target port-type="target" v-pre/>
    </div>
</template>

<script>
    import BaseNode from '/imports/ui/argraph/v02/BaseNode.vue'
    export default {
        mixins:[BaseNode]
    }
</script>

<style scoped>
.parts {
    display: flex;
    align-items: stretch;
}
.part-left {
    background-color: aqua;
    width: 75px;
    opacity: 0.15;
}
.part-divider {
    width: 1px;
    border-width: 0;
    background-color: black;
}
.part-right {
    background-color: transparent;
    width: 100px;
    word-wrap: break-word;
    padding: 10px;
}

</style>
