<template>
    <v-dialog
        v-model="showHide"
        hide-overlay
        persistent
        :max-width="formSize.width"
    >
        <v-card :height="formSize.height">
            <v-toolbar dark color="deep-purple darken-4" dense class="white--text" flat>
                <v-icon small>mdi-tooltip-text-outline</v-icon>
                <v-toolbar-title class="ml-1 subtitle-1">{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="showHide = false" fab x-small depressed color="red accent-2" dark>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card class="pa-5">
                <WebsocketServer :nodeData="nodeData" v-if="isWebsocketServer"/>
                <WebsocketPayload :nodeData="nodeData" v-else-if="isWebsocketPayload"/>
                <HttpServer :nodeData="nodeData" v-else-if="isHttpCS"/>
                <REDISClient :nodeData="nodeData" v-else-if="isDatabaseCS"/>
                <FunctionControl :nodeData="nodeData" v-else-if="isFunctionControl"/>
            </v-card>
        </v-card>
    </v-dialog>
</template>

<script>
import * as NodeUtil from '/common/NodeUtil.js'
import HttpServer from '/imports/ui/NodeSetting/HttpServer.vue'
import WebsocketServer from '/imports/ui/NodeSetting/WebsocketServer.vue'
import WebsocketPayload from '/imports/ui/NodeSetting/WebsocketPayload.vue'
import REDISClient from '/imports/ui/NodeSetting/REDISClient.vue'
import FunctionControl from '/imports/ui/NodeSetting/FunctionControl.vue'

export default {
    props: [
        "setting",
    ],
    components: {
        HttpServer,
        WebsocketServer,
        WebsocketPayload,
        REDISClient,
        FunctionControl,
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
            return "Settings (" + NodeUtil.makeTitlePath(this.nodeData) + ")";
        },
        validSetting() {
            return this.isHttpCS || this.isWebsocketServer || this.isWebsocketPayload || this.isDatabaseCS || this.isFunctionControl
        },
        formSize() {
            let width = 650, height=undefined;
            if (this.isFunctionControl) {
                width = 1000;
            }
            return {width, height};
        },
        isHttpCS() {
            return NodeUtil.checkTypePath(this.nodeData, 'protocol', NodeUtil.PathMode.major);
        },
        isWebsocketServer() {
            return NodeUtil.checkTypePath(this.nodeData, 'protocol/Server/Websocket');
        },
        isWebsocketPayload() {
            return NodeUtil.checkTypePath(this.nodeData, 'protocol/Client/Websocket');
        },
        isDatabaseCS() {
            return NodeUtil.checkTypePath(this.nodeData, 'database', NodeUtil.PathMode.major);
        },
        isFunctionControl() {
            return NodeUtil.checkTypePath(this.nodeData, 'function', NodeUtil.PathMode.major);
        },
    }
}
</script>