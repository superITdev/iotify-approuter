<template>
    <div>
        <v-row dense no-gutters justify="space-between">
            <v-col cols="auto">
                <div class="form-label">Server Type</div>
                <v-responsive height="5"/>
                <v-radio-group dense row v-model="simpleAdvanced" class="ma-2 pa-0" hide-details="true">
                    <v-radio label="Simple" value="simple"/>
                    <v-radio label="Advanced" value="advanced"/>
                </v-radio-group>
            </v-col>
            <v-col cols="auto">
                <div v-show="simpleAdvanced=='advanced'">
                    <div class="d-flex">
                        <div class="form-label mr-5">Load Banlancing</div>
                        <v-radio-group dense row v-model="manualAutomatic" class="ma-0 pa-0" hide-details="true">
                            <v-radio label="Manual" value="manual"/>
                            <v-radio label="Automatic" value="automatic" class="mr-0"/>
                        </v-radio-group>
                    </div>
                    <v-responsive height="5"/>
                    <v-range-slider
                        dense
                        min="1" max="6"
                        ticks="always"
                        :tick-labels="loadBalancingTicks"
                        tick-size="0"
                        :value="loadBalancing"
                    />
                </div>
            </v-col>
        </v-row>

        <div>
            <v-responsive :height="vs.rowGap"/>
            <v-text-field
                label="Endpoint URL"
                v-model="url"
                readonly
                hint="Send data on the public URL above. Show sample curl command."
                persistent-hint
                outlined
                dense
            />
        </div>
        
        <div v-show="simpleAdvanced=='simple'">
            <v-responsive :height="vs.rowGap"/>
            <v-text-field
                label="Channel"
                v-model="cid"
                hint="All received payload shall be published on channel rambo"
                persistent-hint
                outlined
                dense
            />
        </div>

        <div v-show="simpleAdvanced=='advanced'">
            <v-responsive :height="vs.rowGap"/>
            <div class="form-label">Route Handler</div>
            <v-tabs v-model="curRoute">
                <v-tab v-for="(route, i) in routes" :key="i">{{route}}</v-tab>
                <v-btn text class="align-self-center" rounded>+ Add new</v-btn>
            </v-tabs>
            <v-tabs-items v-model="curRoute">
                <v-tab-item v-for="(route, i) in routes" :key="i">
                    <v-sheet outlined class="pa-5">
                        <v-row dense no-gutters>
                            <v-col cols="3">
                                <v-select :items="routeProtocols" value="GET" outlined dense/>
                            </v-col>
                            <v-col cols="6" class="ml-5">
                                <v-text-field dense outlined value="/api/:resource/:operation"/>
                            </v-col>
                        </v-row>
                        <v-text-field
                            label="Publish on Channel"
                            :value="'mych-{{resource}}'"
                            hint="E.g. Any GET request on /api/rambo/romeo will be published on channel mych-rambo."
                            persistent-hint
                            outlined
                            dense
                        />
                        <v-radio-group dense v-model="responseChannel"
                            label="Response From channel"
                            hint="E.g. Response will be published from channel mych-rambo-rsp."
                            persistent-hint
                        >
                            <v-radio label="Always send HTTP 200"/>
                            <v-radio label="Respond from a unique Reply-To channel"/>
                            <v-radio>
                                <template v-slot:label>
                                    <div class="d-flex align-center">
                                        <div>Respond from</div>
                                        <v-text-field dense outlined :value="'mych-{{resource}}-rsp'" label="fixed channel" hide-details class="ml-5"/>
                                        <v-text-field dense outlined :value="10" label="timeout" suffix="sec" hide-details class="ml-5" style="width:110px"/>
                                    </div>
                                </template>
                            </v-radio>
                        </v-radio-group>
                    </v-sheet>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'nodeData',
    ],
    data: () => (
        {
            simpleAdvanced: 'simple',
            manualAutomatic: 'automatic',
            loadBalancingTicks: [1, 2, 3, 4, 5, 6],
            loadBalancing: [2, 4],
            cid:'rambo',
            url: 'https://abc.app.iotify.io',
            curRoute: null,
            routes: ['default', 'route2'],
            routeProtocols: ['GET', 'POST'],

            responseChannel: 2,

            vs: { // view style
                rowGap: 10,
            }
        }
    ),
     watch: {
        // a computed getter
        cid: function (val) {
          // `this` points to the vm instance
          this.url = `https://${val}.app.iotify.io`;    
          console.log(this.url);
        }
      },
    mounted(){
       this.url = `https://${this.cid}.app.iotify.io`;     
    },
}
</script>

<style scoped>
.form-label {
    font-weight: regular;
}
</style>