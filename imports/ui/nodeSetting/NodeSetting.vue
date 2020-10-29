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
            <v-container class="ma-0 pa-5" style="max-width:100%;">
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
            let width = 650, height=undefined;
            
            if (this.isWebsocketServer) {
                // height=500;
            } else if (this.isWebsocketPayload) {
                // height=500;
            } else if (this.isRedisClient) {
                // height=750;
            } else if (this.isCustomFunction) {
                width=1000;
            } else {
                // height=700;
            }

            return {width, height};
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