<template>
    <v-dialog
        v-model="showHide"
        persistent
        fullscreen
    >
        <v-card tile flat>
            <v-card class="pa-5" tile flat>
                <v-row align="center" dense>
                    <v-icon>mdi-tooltip-text-outline</v-icon>
                    <v-toolbar-title class="ml-2 subtitle-1">Logger</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="showHide = false" fab x-small depressed color="red accent-2" dark><v-icon>mdi-close</v-icon></v-btn>
                </v-row>
                <v-row align="center" class="mt-3" dense no-gutters>
                    <v-col cols="3">
                        <v-select :items="['Odin Ingestion']" :value="'Odin Ingestion'" prepend-inner-icon="mdi-cube-outline" outlined dense></v-select>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="6">
                        <v-text-field prepend-inner-icon="mdi-magnify" label="Search your logs" outlined dense/>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="2">
                        <v-menu
                            v-model="searchDatePicker"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            nudge-bottom="40"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="searchDate"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    dense
                                    outlined
                                />
                            </template>
                            <v-date-picker
                                v-model="searchDate"
                                @input="searchDatePicker = false"
                            />
                        </v-menu>
                    </v-col>
                    <v-col align-self="start" cols="auto">
                        <v-btn icon large color="indigo accent-4" dark @click="onGetLog"><v-icon>mdi-chart-box-outline</v-icon></v-btn>
                    </v-col>                    
                </v-row>
                <v-row justify="space-between" dense no-gutters align="center">
                    <v-col cols="auto" class="txt-2">
                        <div>Histogram of messages sent over the channel</div>
                    </v-col>
                    <v-col cols="auto" class="txt-2">
                        <div>June 22nd 2020, 16:45:38:456 - June 23nd 2020, 16:45:38:456</div>
                    </v-col>
                </v-row>
                <BarChart :data="barChartData" style="height:200px;" class="my-5"/>
                <v-row dense no-gutters style="border: 1px solid grey;">
                    <v-col class="grey lighten-4">
                        <v-virtual-scroll
                            :bench="20"
                            :items="logData"
                            height="500"
                            item-height="35"
                        >
                            <template v-slot:default="{item}">
                                <v-list-item dense>
                                    <v-list-item-subtitle style="color: blue; min-width:15%;">{{item.field0}}</v-list-item-subtitle>
                                    <v-list-item-subtitle style="color: green; min-width:5%;">{{item.field1}}</v-list-item-subtitle>
                                    <v-list-item-subtitle style="color: red; min-width:10%;">{{item.field2}}</v-list-item-subtitle>
                                    <v-list-item-subtitle style="color: #BCB343; min-width:10%;">{{item.field3}}</v-list-item-subtitle>
                                    <v-list-item-subtitle style="min-width:60%;">{{item.field4}}</v-list-item-subtitle>
                                </v-list-item>
                                <v-divider></v-divider>
                            </template>
                        </v-virtual-scroll>
                    </v-col>
                    <v-col cols="auto">
                        <v-list dense>
                            <v-list-item class="list-item-log-tool">
                                <v-btn icon x-small fab>
                                    <v-icon>mdi-filter-outline</v-icon>
                                </v-btn>
                            </v-list-item>
                            <v-list-item class="list-item-log-tool">
                                <v-btn icon x-small fab>
                                    <v-icon>mdi-eye-outline</v-icon>
                                </v-btn>
                            </v-list-item>
                            <v-list-item class="list-item-log-tool">
                                <v-btn icon x-small fab>
                                    <v-icon>mdi-arrow-left-circle-outline</v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>
    </v-dialog>
</template>

<script>
import {barChartData} from '/imports/ui/LoggerView/Charts/charts.js'
import BarChart from '/imports/ui/LoggerView/Charts/Bar.vue'
import {GetLog} from '/imports/api'

export default {
    props: [
        "setting",
    ],
    components: {
        BarChart,
    },
    data() {
        return {
            searchDate: new Date().toISOString().substr(0, 10),
            searchDatePicker: false,

            barChartData,
            logData: [],
        }
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
    },
    methods: {
        onGetLog() {
            const self = this;
            this.logData = [];
            GetLog(undefined, (result) => {
                // console.log(result);
                self.logData.unshift(result);
            });
        },
    },
    meteor: {
        // Meteor.call : find/fetch data
    }
}
</script>

<style scoped>
.txt-2 {
    font-size: 14px;
}
.list-item-log-tool {
    padding-left: 5px;
    padding-right: 5px;
}
</style>