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
        <v-avatar
            :style="{
                position: 'absolute',
                top: -8 + 'px',
                right: -8 + 'px',
            }"
            size=16
            :color="actionSuccess ? 'success' : 'error'"
        >
            <v-icon x-small color="white">{{actionSuccess ? 'mdi-check-bold' : 'mdi-exclamation-thick'}}</v-icon>
        </v-avatar>
        <v-row class="fill-height flex-nowrap" dense no-gutters>
            <div class="pa-1 white--text d-flex flex-column align-center justify-space-between"
                :style="{
                    backgroundColor: obj.mcolor,
                    minWidth: obj.w1 + 'px',
                    wordBreak: 'break-all',
                }"
            >
                <div v-html="obj.itemTitle.replace(/[\n\s\t]+/g, '<br>')"/>
                <v-avatar size="40" class="flex-grow-1 align-center" tile>
                    <svgicon :icon="obj.icon" color="white"/>
                </v-avatar>
            </div>
            <div class="flex-grow-1 ma-1 white d-flex flex-column align-center justify-space-between"
                :style="{
                    wordBreak: 'break-all',
                    overflow: 'hidden',
                }"
            >
                <div v-html="obj.subTitle && obj.subTitle.replace(/[\n\s\t]+/g, '<br>')"/>
                <v-sparkline
                    padding="0"
                    smooth="10"
                    fill
                    auto-draw
                    :auto-draw-duration="200"
                    :value="sparkData"
                    :color="obj.mcolor"
                />
            </div>
        </v-row>
        <jtk-source port-type="source" filter=".item-connector" v-pre/>
        <jtk-target port-type="target" v-pre/>
    </div>
</template>

<script>
    import BaseNode from '/imports/ui/argraph/v02/BaseNode.vue'
    export default {
        mixins:[BaseNode],
        data() {
            return {
                actionSuccess: Math.random() > 0.5,
                sparkData: [0, 2, 5, 9, 5, 10, 3, 5, 2, 4, 2, 6, 2, 7, 0],
            }
        }
    }
</script>
