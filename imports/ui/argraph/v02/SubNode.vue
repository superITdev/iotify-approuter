<template>
    <div
        :style="{
            left: obj.left + 'px',
            top: obj.top + 'px',
            height: obj.h + 'px',
            width: obj.w + 'px',
            minWidth: obj.mw + 'px',
            borderColor: obj.mcolor,
            backgroundColor: obj.mcolor,
        }"
    >
        <v-row class="fill-height" dense no-gutters>
            <div
                :style="{
                    minWidth: obj.w1 + 'px',
                }"
            >
            </div>
            <div class="flex-grow-1 d-flex align-center justify-center white">
                {{ getTitle(obj) }}
            </div>
        </v-row>

        <div class="delete" v-on:click="maybeDelete()"/>
        <div class="connect"
            :style="{
                backgroundColor: obj.mcolor,
            }"
        />

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
