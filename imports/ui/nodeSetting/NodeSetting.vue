<template>
    <v-dialog
        v-model="showHide"
        hide-overlay
        persistent
        :width="formSize.width"
    >
        <v-card :height="formSize.height">
            <v-system-bar dark color="deep-purple darken-4" dense class="py-4 white--text">
                <v-icon small>mdi-tooltip-text-outline</v-icon>
                <v-toolbar-title class="ml-1 subtitle-1">{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn x-small icon @click="showHide = false"><v-icon class="ma-2">mdi-close</v-icon></v-btn>
            </v-system-bar>
            <v-container>
                <HttpServer :nodeData="nodeData" v-if="isHttpServer"/>
                <WebsocketServer :nodeData="nodeData" v-else-if="isWebsocketServer"/>
                <WebsocketPayload :nodeData="nodeData" v-else-if="isWebsocketPayload"/>
                <REDISClient :nodeData="nodeData" v-else-if="isRedisClient"/>
                <CustomFunction :nodeData="nodeData" v-else-if="isCustomFunction"/>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import * as NodeUtil from '/common/NodeUtil.js'
import HttpServer from '/imports/ui/NodeSetting/HttpServer.vue'
import WebsocketServer from '/imports/ui/NodeSetting/WebsocketServer.vue'
import WebsocketPayload from '/imports/ui/NodeSetting/WebsocketPayload.vue'
import REDISClient from '/imports/ui/NodeSetting/REDISClient.vue'
import CustomFunction from '/imports/ui/NodeSetting/CustomFunction.vue'

export default {
    props: [
        "setting",
    ],
    components: {
        HttpServer,
        WebsocketServer,
        WebsocketPayload,
        REDISClient,
        CustomFunction,
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
            return this.isHttpServer || this.isWebsocketServer || this.isWebsocketPayload || this.isRedisClient || this.isCustomFunction
        },
        formSize() {
            let width = 650, height=700;
            
            if (this.isWebsocketServer) height=500;
            else if (this.isWebsocketPayload) height=500;
            else if (this.isRedisClient) height=850;
            else if (this.isCustomFunction) width=1000;

            return {width, height:undefined};
        },
        isHttpServer() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'protocol/Gateway/HTTP');
        },
        isWebsocketServer() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'protocol/Gateway/Websocket');
        },
        isWebsocketPayload() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'protocol/Client/Websocket');
        },
        isRedisClient() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'database/Client/REDIS');
        },
        isCustomFunction() {
            return NodeUtil.checkTypeByPath2(this.nodeData, 'function/Custom');
        },
    }
}
</script>