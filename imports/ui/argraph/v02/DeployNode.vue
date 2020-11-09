<template>
    <div
        :style="{
            left:obj.left + 'px',
            top:obj.top + 'px',
            width:obj.w + 'px',
            height:obj.h + 'px',
            borderColor: obj.mcolor,
        }"
    >
        <div class="argraph-item-toolbox">
            <!-- <button class="expand" v-on:click="toggleGroup()"/> -->
            <button class="item-delete" v-on:click="maybeDelete(true)"/>
        </div>

        <div class="group-title"
            :style="{
                backgroundColor: obj.mcolor,
            }"
        >
            <!-- <img :src="getTitleIcon(obj)"/> -->
            {{getTitle(obj)}}
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
