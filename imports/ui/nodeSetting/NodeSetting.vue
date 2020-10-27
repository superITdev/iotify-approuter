<template>
    <v-dialog
        v-model="showHide"
        hide-overlay
        persistent
        :width="formSize.width"
    >
        <v-card :height="formSize.height">
            <v-system-bar dark color="primary" dense class="py-4 white--text">
                <v-icon small>mdi-tooltip-text-outline</v-icon>
                <v-toolbar-title class="ml-1 subtitle-1">{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn x-small icon @click="showHide = false"><v-icon class="ma-2">mdi-close</v-icon></v-btn>
            </v-system-bar>
            <v-container>
                <Http :nodeData="nodeData" v-if="isHttpServer"/>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import * as NodeUtil from '/common/NodeUtil.js'
import Http from '/imports/ui/nodeSetting/Http.vue'

export default {
    props: [
        "setting",
    ],
    components: {
        Http,
    },
    computed: {
        nodeData() {
            return this.setting.nodeData;
        },
        showHide: {
            get() {
                return this.setting.show && this.validSetting;
            },
            set(val) {
                this.setting.show = val;
            }
        },
        title() {
            return "Settings (" + NodeUtil.makeTitleCrumb(this.nodeData) + ")";
        },
        validSetting() {
            return this.isHttpServer // || others, all
        },
        formSize() {
            let width = 650, height=650;
            // if (this.isHttpServer) {}
            // else if ...
            return {width, height};
        },
        isHttpServer() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'protocol/Gateway/HTTP');
        },
    }
}
</script>