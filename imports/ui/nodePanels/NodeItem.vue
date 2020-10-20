<template>
    <div class="text-center">
        <svgicon
            :icon="nodeItem.icon"
            :color="nodeItem.color"
            :width="`${iconSize}`"
            :height="`${iconSize}`"
            :node-item-selector="nodeItem.selector"
            :jtk-is-group="!!nodeItem.isGroup"
            style="cursor: grab;"
        />
        <div :style="`font-size:${fontSize}px`" v-text="nodeItem.title"/>
    </div>
</template>

<script>
export default {
    props:["nodeItem"],
    
    data() {
        return {
            iconSize: 40, // px
            fontSize: 11, // px
        }
    },
}
</script>