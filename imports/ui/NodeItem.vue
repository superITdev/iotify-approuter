<template>
    <div class="text-center">
        <v-avatar
            tile
            :size="iconSize"
            :node-item-selector="nodeItem.selector"
            :jtk-is-group="!!nodeItem.isGroup"
            style="cursor: grab;"
        >
            <svgicon :icon="nodeItem.icon" :color="nodeItem.color"/>
        </v-avatar>
        <v-list-item-title :style="`font-size:${fontSize}px`" v-text="nodeItem.title"/>
    </div>
</template>

<script>
export default {
    name: "NodeItem",
    props:["nodeItem"],
    data() {
        return {
            iconSize: 40, // px
            fontSize: 11, // px
        }
    },
}
</script>