<template>
    <div class="text-center" :title="pathTitle">
        <svgicon
            :icon="nodeItem.icon"
            :color="nodeItem.color"
            :width="`${iconSize}`"
            :height="`${iconSize}`"
            :nodeItemSelector="nodeItemSelector"
            :recentlyUsed="recentlyUsed"
            :jtk-is-group="!!nodeItem.isGroup"
            style="cursor: grab;"
        />
        <div v-html="nodeItem.title.replace(/[\n\s\t]+/g, '<br>')"
            :style="`font-size:${fontSize}px`"
        />
    </div>
</template>

<script>
import * as NodeUtil from '/common/NodeUtil.js'

export default {
    props:[
        "nodeItem",
        "titleMode",
        "recentlyUsed",
    ],
    
    data() {
        return {
            iconSize: 40, // px
            fontSize: 11, // px
        }
    },

    computed: {
        nodeItemSelector() {
            return NodeUtil.makeTypePath(this.nodeItem);
        },
        pathTitle() {
            return NodeUtil.makeTitleCrumb(this.nodeItem, this.titleMode);
        }
    }
}
</script>