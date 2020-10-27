<template>
    <v-container>
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
                        <div class="mr-5">Load Banlancing</div>
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

        <v-responsive :height="vs.rowGap"/>
        <v-text-field
            label="Endpoint URL"
            hint="Send data on the public URL above. Show sample curl command."
            placeholder="https://endpoint122.app.router.network"
            persistent-hint
        />
        
        <div v-show="simpleAdvanced=='simple'">
            <v-responsive :height="vs.rowGap"/>
            <v-text-field
                label="Channel"
                hint="All received payload shall be published on channel rambo"
                placeholder="rambo"
                persistent-hint
            />
        </div>

        <div v-show="simpleAdvanced=='advanced'">
            <v-responsive :height="vs.rowGap"/>
            <div class="form-label">Route Handler</div>
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
            manualAutomatic: 'automatic',
            loadBalancingTicks: [1, 2, 3, 4, 5, 6],
            loadBalancing: [2, 4],

            vs: { // view style
                rowGap: 25,
            }
        }
    )
}
</script>

<style scoped>

</style>