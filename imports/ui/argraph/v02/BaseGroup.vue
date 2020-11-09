<script>
    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseGroupComponent } from 'jsplumbtoolkit-vue2'

    export default {
        mixins:[BaseGroupComponent],
        methods:{
            maybeDelete:function(removeChildNodes) {
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + this.obj.itemTitle + "'"
                    },
                    onOK:() => {
                        this.removeGroup(removeChildNodes);
                    }
                });
            },
            toggleGroup:function() {
                const group = this.getGroup();
                this.surface.toggleGroup(group);
            }
        }
    }
</script>