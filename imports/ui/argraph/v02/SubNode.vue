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
            <div
                :style="{
                    backgroundColor: obj.mcolor,
                    minWidth: obj.w1 + 'px',
                }"
            >
            </div>
            <div class="flex-grow-1 d-flex align-center justify-center white ma-1"
                :style="{
                    wordBreak: 'break-all',
                }"
            >
                {{ getTitle(obj) }}
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
