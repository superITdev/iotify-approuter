<template>
<v-expansion-panels accordion multiple tile v-model="subVS.openSubs">
    <v-expansion-panel>
        <v-expansion-panel-header class="iotar-subbar-subtitle">Recently Used</v-expansion-panel-header>
        <v-expansion-panel-content class="iotar-subbar-content">
            node1, node2, node3 ...
        </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel v-for="(sub, subIdx) in subCategories" :key="subIdx">
        <v-expansion-panel-header class="iotar-subbar-subtitle">{{sub.subTitle}}</v-expansion-panel-header>
        <v-expansion-panel-content class="iotar-subbar-content">
            <v-row dense>
                <v-col v-for="(nodeItem, nodeIdx) in sub.nodeItems" :key="nodeIdx" :cols="subVS.cols">
                    <NodeItem :nodeItem="nodeItemInfo(nodeItem)"/>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</template>

<script>
import {SurfaceDrop} from 'jsplumbtoolkit-vue2-drop'
import NodeItem from '/imports/ui/nodePanels/NodeItem.vue'

export default {
    mixins:[SurfaceDrop],

    props: [
        "surfaceId",
        "subCategories",
        "nodeItemInfo",
    ],
    
    components: {
        NodeItem,
    },

    data() {
        return {
            subVS: {
                // vue-style for sub-bar ui
                cols: 4,
                openSubs: [],
            }
        }
    },

    watch: {
        subCategories(subs) {
            // opens all pannels including 'Recentely Used'.
            const n = subs.length + 1;
            this.subVS.openSubs = [...Array(n).keys()];
        },
    }
}
</script>

<style scoped>
.iotar-subbar-subtitle {
  font-size:14px;
}
.iotar-subbar-content {
  font-size:14px;
}
</style>