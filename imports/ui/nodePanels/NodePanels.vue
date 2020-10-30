<template>
<v-expansion-panels accordion multiple tile v-model="openPanels" class="px-1">
    <v-expansion-panel>
        <v-expansion-panel-header class="iotar-subbar-subtitle">Recently Used</v-expansion-panel-header>
        <v-expansion-panel-content class="iotar-subbar-content">
            <v-row dense>
                <v-col v-for="(nodeItem, nodeIdx) in subRecents" :key="nodeIdx" :cols="panelCols">
                    <NodeItem :nodeItem="nodeItemInfo(nodeItem)" titleMode="major_sub" recentlyUsed="true"/>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel v-for="(sub, subIdx) in subCategories" :key="subIdx">
        <v-expansion-panel-header class="iotar-subbar-subtitle">{{sub.subTitle ? sub.subTitle : sub.majorTitle}}</v-expansion-panel-header>
        <v-expansion-panel-content class="iotar-subbar-content">
            <v-row dense>
                <v-col v-for="(nodeItem, nodeIdx) in sub.nodeItems" :key="nodeIdx" :cols="panelCols">
                    <NodeItem :nodeItem="nodeItemInfo(nodeItem)" titleMode="major_sub"/>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</template>

<script>
import {SurfaceDrop} from 'jsplumbtoolkit-vue2-drop'
import NodeItem from '/imports/ui/NodePanels/NodeItem.vue'

export default {
    mixins:[SurfaceDrop],

    props: [
        "surfaceId",
        "subRecents",
        "subCategories",
        "nodeItemInfo",
    ],
    
    components: {
        NodeItem,
    },

    data() {
        return {
            panelCols: 4,
            openRecents: undefined,
            openSubs: [],
        }
    },

    computed: {
        openPanels: {
            // opens all pannels including 'Recentely Used'.
            get() {
                if (this.openRecents===undefined) return this.openSubs;
                else return [this.openRecents].concat(this.openSubs);
            },
            set(val) {
            }
        },
    },

    watch: {
        subRecents(recents) {
            this.openRecents = (recents != null) && 0 < recents.length ? 0 : undefined;
        },
        subCategories(subs) {
            const openSubs = [];
            subs.forEach((sub, idx) => {
                if (0 < sub.nodeItems.length) openSubs.push(idx + 1);
            });
            this.openSubs = openSubs;
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