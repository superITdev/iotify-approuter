<template>
    <v-container>
        <v-row dense no-gutters>
            <v-col cols="4">
                <div class="global-config indigo accent-4 white--text text-center pa-1">Global Config</div>
                <v-treeview
                    :active="globalConfig.tree"
                    :open="globalConfig.initiallyOpen"
                    :items="globalConfig.items"
                    activatable
                    item-key="name"
                    open-on-click
                    multiple-active
                    dense
                >
                    <template v-slot:prepend="{ item, leaf, open }">
                        <div v-if="!leaf">{{ open ? '{ - }' : '{ + }'}}</div>
                        <div v-else>{{ item.iconTxt }}</div>
                    </template>
                    <template v-slot:append="{ item, active}">
                        <v-card-actions>
                            <div v-if="!item.value">{{ '{object}' }}</div>
                            <div v-else>{{ item.value }}</div>
                            <v-icon :color="active ? 'red' : undefined">mdi-trash-can</v-icon>
                        </v-card-actions>
                    </template>
                </v-treeview>
            </v-col>
            <v-col cols="5" class="ml-5">
                <v-row dense>
                    <v-col cols="12">
                        <div class="d-flex justify-space-between">
                            <div class="ml-2">function <span class="blue--text">mysampletransform</span> (cid, payload)</div>
                            <v-btn color="indigo accent-4" dark depressed small>Save</v-btn>
                        </div>
                        <div class="grey darken-3" style="width:100%; height:325px;"/>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex justify-space-between align-center subhead-title">
                            <div class="ml-2">Sample Input</div>
                            <v-btn color="indigo accent-4" dark depressed small>Save</v-btn>
                        </div>
                        <div class="grey darken-3" style="width:100%; height:220px;"/>
                    </v-col>
                    <v-col cols="6">
                        <div class="ml-2 subhead-title">Sample Output</div>
                        <div class="grey darken-3" style="width:100%; height:220px;"/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="ml-5">
                <div class="pa-1">
                    <v-icon>mdi-tooltip-text-outline</v-icon>
                    Helper functions
                </div>
                <v-text-field label="Search Here" outlined dense class="ml-2 mt-2" hide-details=""/>
                <v-list dense>
                    <v-list-item-group>
                        <template v-for="(item, i) in 5">
                            <v-list-item :key="`item-${i}`">
                                <v-list-item-subtitle>Config.set</v-list-item-subtitle>
                            </v-list-item>
                            <v-divider :key="`divider-${i}`"/>
                        </template>
                    </v-list-item-group>
                </v-list>
                <div class="pa-1 mt-5">
                    <v-icon>mdi-tooltip-text-outline</v-icon>
                    Logs
                </div>
                <div class="grey lighten-4 mt-2" style="width:100%; height:250px;"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: [
        'nodeData',
    ],
    data: () => (
        {
            vs: { // view style
                rowGap: 15,
            },
            globalConfig: {
                initiallyOpen: ['item1'],
                tree: ['ready'],
                items: [
                    {
                        name: 'item1',
                        children: [
                            {
                                name: 'serial',
                                iconTxt: '#',
                                value: 'abcd1234',
                            },
                            {
                                name: 'ready',
                                iconTxt: '&',
                                value: 'true',
                            },
                            {
                                name: 'trash',
                                children: [
                                    {
                                        name: 'port',
                                        iconTxt: '@',
                                        value: 'efgd23',
                                    }
                                ],
                            },
                        ],
                    },
                ],
            },
        }
    )
}
</script>

<style scoped>
.form-label {
    font-weight: regular;
}
.global-config {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.subhead-title {
    height: 28px;
}
</style>