<template>
    <div ref="container"
        :style="{
            left:obj.left + 'px',
            top:obj.top + 'px',
            width:obj.w + 'px',
            height:obj.h + 'px',
            borderColor: obj.mcolor,
        }"
    >
        <div class="argraph-item-toolbox" style="justify-content: flex-end;">
            <!-- <button class="expand" v-on:click="toggleGroup()"/> -->
            <button class="item-delete" v-on:click="maybeDelete(true)"/>
        </div>

        <div ref="titlebar"
            class="group-title"
            :style="{
                backgroundColor: obj.mcolor,
            }"
        >
            <v-avatar size="16" tile class="mr-2">
                <svgicon :icon="obj.icon" color="white"/>
            </v-avatar>
            {{obj.itemTitle}}
        </div>

        <div ref="groupArea" jtk-group-content="true"/>

        <!-- disable connectivity with this group -->
        <!-- <div class="group-connect connect"/> -->
        <!-- <jtk-source port-type="source" filter=".group-connect" v-pre/> -->
        <!-- <jtk-target port-type="target" v-pre/> -->
    </div>
</template>

<script>
    import BaseGroup from '/imports/ui/argraph/v02/BaseGroup.vue'
    import { EventBus } from '/imports/methods/EventBus.js'

    export default {
        mixins:[BaseGroup],
        methods: {
            adjustArea() {
                const style = getComputedStyle(this.$refs.groupArea);
                const marginLeft = parseInt(style.marginLeft);
                const marginRight = parseInt(style.marginRight);
                const marginTop = parseInt(style.marginTop);
                const marginBottom = parseInt(style.marginBottom);

                const width = this.$refs.titlebar.offsetWidth - marginLeft - marginRight;
                const height = this.$refs.container.clientHeight - this.$refs.titlebar.offsetHeight - marginTop - marginBottom;
                this.$refs.groupArea.style.width = `${width}px`;
                this.$refs.groupArea.style.height = `${height}px`;
            }
        },
        created() {
            EventBus.$on('adjust-group-area', this.adjustArea)
        },
        beforeDestroy() {
            EventBus.$off('adjust-group-area', this.adjustArea)
        },
    }
</script>
