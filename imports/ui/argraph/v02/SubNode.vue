<template>
    <div
        :style="{
            left: obj.left + 'px',
            top: obj.top + 'px',
            height: obj.h + 'px',
            width: obj.w + 'px',
            minWidth: obj.mw + 'px',
            borderColor: obj.mcolor,
            overflow: 'visible',
        }"
    >
        <div class="argraph-item-toolbox">
            <button class="item-connector"
                :style="{
                    backgroundColor: obj.mcolor,
                }"
            />
            <button class="item-delete" v-on:click="maybeDelete()"/>
        </div>
        <v-row class="fill-height flex-nowrap" dense no-gutters>
            <div class="pa-1 white--text d-flex flex-column align-center justify-center"
                :style="{
                    backgroundColor: obj.mcolor,
                    minWidth: obj.w1 + 'px',
                    wordBreak: 'break-all',
                }"
            >
                <div v-html="obj.itemTitle.replace(/[\n\s\t]+/g, '<br>')"/>
                <v-avatar size="40">
                    <svgicon :icon="obj.icon" color="white"/>
                </v-avatar>
            </div>
            <div class="flex-grow-1 ma-1 white d-flex flex-column align-center justify-space-between"
                :style="{
                    wordBreak: 'break-all',
                    overflow: 'hidden',
                }"
            >
                <div v-html="obj.itemTitle.replace(/[\n\s\t]+/g, '<br>')"/>
                <v-avatar size="40">
                    <svgicon :icon="obj.icon"/>
                </v-avatar>
            </div>
        </v-row>
        <jtk-source port-type="source" filter=".item-connector" v-pre/>
        <jtk-target port-type="target" v-pre/>
    </div>
</template>

<script>
    import BaseNode from '/imports/ui/argraph/v02/BaseNode.vue'
    export default {
        mixins:[BaseNode]
    }
</script>
