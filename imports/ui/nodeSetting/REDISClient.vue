<template>
    <v-container>
        <v-row dense no-gutters justify="space-between">
            <v-col cols="auto">
                <div class="form-label">Client Type</div>
                <v-responsive height="5"/>
                <v-radio-group dense row v-model="simpleAdvanced" class="ma-2 pa-0" hide-details="true">
                    <v-radio label="Simple" value="simple"/>
                    <v-radio label="Advanced" value="advanced"/>
                </v-radio-group>
            </v-col>
        </v-row>

        <div>
            <v-responsive :height="vs.rowGap"/>
            <v-text-field
                label="Redis Server URL"
                value="redis://username:password@myserver.com:6379"
                hint="Provide Redis connection parameters."
                persistent-hint
                outlined
                dense
            />
        </div>
        
        <div v-show="simpleAdvanced=='simple'">
            <v-responsive :height="vs.rowGap"/>

            <div class="form-label">Command Builder</div>
            <v-row dense no-gutters class="mt-3">
                <v-col cols="3">
                    <v-select :items="commands" value="ZADD" outlined dense label="Command"/>
                </v-col>
                <v-col cols="6" class="ml-5">
                    <v-text-field dense outlined :value="'client{{payload.group}}'" label="Key"/>
                </v-col>
            </v-row>
            
            <div class="form-label mb-3">Add argument</div>
            <v-text-field dense outlined :value="'mych-{{resource}}'" style="width:50%;"/>
            <v-text-field dense outlined :value="'{{payload.contents}}'" style="width:50%;"/>
            
            <div class="form-label">+ Add another argument</div>
            <v-card-text>Based on setting above. following command will be executed.<br> <strong>mych-123 ts 1232</strong></v-card-text>

            <v-tabs v-model="responseTab">
                <v-tab>Success</v-tab>
            </v-tabs>
            <v-tabs-items v-model="responseTab">
                <v-tab-item>
                    <v-sheet outlined class="pa-5">
                        <v-radio-group dense v-model="responseChannel"
                            label="Response"
                            hint="E.g. Response will be published from channel mych-rambo-rsp."
                            persistent-hint
                            class="ma-0"
                        >
                            <v-radio label="Discard response"/>
                            <v-radio label="Respond to the erceived Reply-To channel"/>
                            <v-radio>
                                <template v-slot:label>
                                    <div class="d-flex align-center">
                                        <div>Send Respond to a fixed Channel</div>
                                        <v-text-field dense outlined :value="'mych-{{resource}}-rsp'" hide-details class="ml-5"/>
                                    </div>
                                </template>
                            </v-radio>
                        </v-radio-group>
                    </v-sheet>
                </v-tab-item>
            </v-tabs-items>
        </div>

        <div v-show="simpleAdvanced=='advanced'">
            <v-responsive :height="vs.rowGap"/>
            <div class="form-label">function(redis, payload, cid)</div>
            <div class="grey darken-3 white--text mt-3" style="height:350px;">
            </div>
            <div class="form-label mt-3">Test</div>
        </div>
    </v-container>
</template>

<script>
export default {
    props: [
        'nodeData',
    ],
    data: () => (
        {
            simpleAdvanced: 'advanced',
            responseTab: null,
            responseChannel: 2,
            commands: ['ZADD'],

            vs: { // view style
                rowGap: 15,
            }
        }
    )
}
</script>

<style scoped>
.form-label {
    font-weight: regular;
}
</style>