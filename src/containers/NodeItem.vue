<template>
    <div>
        <img :src="getNodeThumbIcon(nodeItem)" :alt="nodeItem.title" v-bind:node-item-id="nodeItemId" style="cursor: grab;"/>
        <div class="mt-2">{{nodeItem.title}}</div>
    </div>
</template>

<script>
    import {getNodeThumbIcon} from '@/data/nodeCategories'
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
            }
        }
    }
</script>