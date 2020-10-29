<template>
    <v-dialog
        v-model="showHide"
        hide-overlay
        persistent
        fullscreen
    >
        <v-card>
            <v-system-bar dark color="deep-purple darken-4" dense class="py-4 white--text">
                <v-icon small>mdi-tooltip-text-outline</v-icon>
                <v-toolbar-title class="ml-1 subtitle-1">Logger</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn x-small icon @click="showHide = false"><v-icon class="ma-2">mdi-close</v-icon></v-btn>
            </v-system-bar>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: [
        "setting",
    ],
    components: {
    },
    computed: {
        showHide: {
            get() {
                return this.setting.show;
            },
            set(val) {
                this.setting.show = val;
            }
        },
    }
}
</script>