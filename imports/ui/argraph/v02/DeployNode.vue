<template>
    <div v-bind:style="{left:obj.left + 'px', top:obj.top + 'px', width:obj.w + 'px', height:obj.h + 'px'}">
        <div class="group-title" v-bind:style="{backgroundColor:obj.titleBgColor}">
            <!-- <img :src="getTitleIcon(obj)"/> -->
            {{getTitle(obj)}}
            <button class="expand" v-on:click="toggleGroup()"></button>
            <button class="group-delete" v-on:click="maybeDelete(true)"></button>
        </div>
        <div jtk-group-content="true"/>

        <!-- disable connectivity with this group -->
        <!-- <div class="group-connect connect"/> -->
        <!-- <jtk-source port-type="source" filter=".group-connect" v-pre/> -->
        <!-- <jtk-target port-type="target" v-pre/> -->
    </div>
</template>

<script>
    import BaseGroup from '/imports/ui/argraph/v02/BaseGroup.vue'
    export default {
        mixins:[BaseGroup]
    }
</script>
