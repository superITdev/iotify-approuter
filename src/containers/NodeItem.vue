<template>
    <div>
        <img
            :src="thumbIcon" 
            :alt="nodeItem.title"
            v-bind:node-item-id="nodeItemId"
            v-bind:jtk-is-group="isGroup ? true : false"
            style="cursor: grab;"/>
        <div class="mt-2">{{nodeItem.title}}</div>
    </div>
</template>

<script>
    import {getNodeInfo} from '@/data/nodeCategories'
    import nodeTemplates from '@/data/nodeTemplates'

    export default {
        name: "NodeItem",
        props:["nodeItem"],
        computed: {
            nodeItemId() {
                return nodeTemplates.indexOf(this.nodeItem);
            },
            thumbIcon() {
                return getNodeInfo(this.nodeItem).thumbIcon;
            },
            isGroup() {
                return getNodeInfo(this.nodeItem).isGroup;
            }
        }
    }
</script>