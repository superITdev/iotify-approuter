<template>
    <div>
        <img
            :src="getNodeThumbIcon(nodeItem)" 
            :alt="nodeItem.title"
            v-bind:node-item-id="nodeItemId"
            v-bind:jtk-is-group="isGroupNode ? true : false"
            style="cursor: grab;"/>
        <div class="mt-2">{{nodeItem.title}}</div>
    </div>
</template>

<script>
    import {getNodeThumbIcon, isGroupNode} from '@/data/nodeCategories'
    import nodeTemplates from '@/data/nodeTemplates'

    export default {
        name: "NodeItem",
        props:["nodeItem"],
        methods: {
            getNodeThumbIcon,
        },
        computed: {
            nodeItemId() {
                return nodeTemplates.indexOf(this.nodeItem);
            },
            isGroupNode() {
                return isGroupNode(this.nodeItem);
            }
        }
    }
</script>