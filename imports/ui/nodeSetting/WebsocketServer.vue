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
        </v-row>

        <div>
            <v-responsive :height="vs.rowGap"/>
            <v-text-field
                label="Endpoint URL"
                value="https://sockio.app.route.network/qwweeaad"
                hint="Connect your websocket client on the URL above. Show sample code."
                persistent-hint
                outlined
                dense
            />
        </div>
        
        <div>
            <v-responsive :height="vs.rowGap"/>
            <v-text-field
                label="Published receive data on Channel"
                hint="All received payload shall be published on channel rambo"
                value="rambo"
                persistent-hint
                outlined
                dense
            />
        </div>

        <div>
            <v-responsive :height="vs.rowGap"/>
            <div class="form-label">Publish to client</div>
            <v-row dense justify="space-between" no-gutters class="mt-3">
                <v-text-field
                    label="From Channel"
                    value="rambo"
                    outlined
                    dense
                />
                <v-spacer/>
                <v-text-field
                    label="Send on Topic"
                    value="rambo"
                    outlined
                    dense
                />
            </v-row>
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