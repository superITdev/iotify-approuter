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
                <HttpServer :nodeData="nodeData" v-if="isHttpServer"/>
                <WebsocketServer :nodeData="nodeData" v-if="isWebsocketServer"/>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import * as NodeUtil from '/common/NodeUtil.js'
import HttpServer from '/imports/ui/nodeSetting/HttpServer.vue'
import WebsocketServer from '/imports/ui/nodeSetting/WebsocketServer.vue'

export default {
    props: [
        "setting",
    ],
    components: {
        HttpServer,
        WebsocketServer
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
            return this.isHttpServer || this.isWebsocketServer
        },
        formSize() {
            let width = 650, height=700;
            if (this.isWebsocketServer) height=460;
            return {width, height};
        },
        isHttpServer() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'protocol/Gateway/HTTP');
        },
        isWebsocketServer() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'protocol/Gateway/Websocket');
        },
    }
}
</script>