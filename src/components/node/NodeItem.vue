<template>
    <div>
        <img :src="getNodeThumbIcon(nodeItem.type)" :alt="nodeItem.title" v-bind:data-node-type="nodeItem.type" style="cursor: grab;"/>
        <div class="mt-2">{{nodeItem.title}}</div>
    </div>
</template>

<script>
    import {getNodeThumbIcon} from '@/data/nodeCategoryUI'

    export default {
        name: "NodeItem",
        props:["nodeItem"],
        methods: {
            getNodeThumbIcon,
        }
    }
</script>