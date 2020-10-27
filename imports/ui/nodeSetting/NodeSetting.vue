<template>
    <v-dialog
        v-model="showHide"
        hide-overlay
        persistent
    >
        <v-card>
            <v-toolbar dark color="primary" dense>
                <v-icon>mdi-tooltip-text-outline</v-icon>
                <span v-for="i in 2" :key="i">&nbsp;</span>

                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn icon @click="showHide = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-toolbar>
        </v-card>
    </v-dialog>    
</template>

<script>
import * as NodeUtil from '/common/NodeUtil.js'

export default {
    props: [
        "setting",
    ],
    computed: {
        nodeData() {
            return this.setting.nodeData;
        },
        validSetting() {
            return NodeUtil.checkTypeByPath(this.nodeData, 'protocol/Gateway/HTTP');
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
        }
    }
}
</script>