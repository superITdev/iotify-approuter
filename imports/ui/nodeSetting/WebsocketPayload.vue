<template>
    <v-container>
        <div>
            <v-text-field
                label="Inject on Channel"
                value="mysuperchannel"
                outlined
                dense
            />
        </div>
        <div>
            <div class="form-label mb-3">Payload Contents</div>
            <v-textarea
                outlined
                dense
            />
        </div>
        <v-radio-group dense v-model="options"
            label="Options"
        >
            <v-radio label="Inject only once"/>
            <v-radio>
                <template v-slot:label>
                    <div class="d-flex align-center">
                        <div>Inject continuously with a gap of</div>
                        <v-text-field dense outlined :value="10" label="timeout" suffix="sec" hide-details class="ml-5" style="width:110px"/>
                    </div>
                </template>
            </v-radio>
        </v-radio-group>
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
                rowGap: 25,
            },
            options: null,
        }
    )
}
</script>

<style scoped>
.form-label {
    font-weight: regular;
}
</style>