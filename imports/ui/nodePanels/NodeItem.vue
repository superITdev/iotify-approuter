<template>
    <div class="text-center" :title="pathTitle">
        <svgicon
            :icon="nodeItem.icon"
            :color="nodeItem.color"
            :width="`${iconSize}`"
            :height="`${iconSize}`"
            :node-item-selector="itemSelector"
            :jtk-is-group="!!nodeItem.isGroup"
            style="cursor: grab;"
        />
        <div :style="`font-size:${fontSize}px`" v-text="nodeItem.title"/>
    </div>
</template>

<script>
export default {
    props:[
        "nodeItem",
        "titleMode",
    ],
    
    data() {
        return {
            iconSize: 40, // px
            fontSize: 11, // px
        }
    },

    computed: {
        itemSelector() {
            const selector = [this.nodeItem.majorType, this.nodeItem.subTitle, this.nodeItem.itemTitle].join('/')
            return selector;
        },
        pathTitle() {
            switch(this.titleMode) {
                case 'major':
                    return this.nodeItem.majorTitle;
                    break;
                case 'sub':
                    if (this.nodeItem.subTitle) return this.nodeItem.subTitle;
                    break;
                case 'major-sub':
                    return this.nodeItem.subTitle ? [this.nodeItem.majorTitle, this.nodeItem.subTitle].join(' / ') : this.nodeItem.majorTitle;
                    break;
            }
        }
    }
}
</script>