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
                <sparkline ref="sparkline" :indicatorStyles="false">
                    <sparklineBar
                        :data="sparkData"
                        :limit="sparkData.length"

                        :margin="2"
                        :styles="{fill: obj.mcolor}"
                        :refLineStyles="{strokeOpacity: 0}"
                    />
                </sparkline>
            </div>
        </v-row>
        <jtk-source port-type="source" filter=".item-connector" v-pre/>
        <jtk-target port-type="target" v-pre/>
    </div>
</template>

<script>
import BaseNode from '/imports/ui/argraph/v02/BaseNode.vue'
import sparkline from 'vue-sparklines'

export default {
    mixins:[BaseNode],
    components: {
        sparkline,
    },
    data() {
        return {
            actionSuccess: Math.random() > 0.5,
            // sparkline
            sparkData: (() => {
                const length = 20
                return Array.from({length}, () => Math.floor(Math.random() * length))
            })(),
        }
    },
    mounted() {
        this.$refs.sparkline.$el.children[0].style.width = '100%';
        this.$refs.sparkline.$el.children[0].style.height = '100%';
    },
}
</script>
