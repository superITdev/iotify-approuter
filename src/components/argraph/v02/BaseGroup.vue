<script>

    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseGroupComponent } from 'jsplumbtoolkit-vue2'

    export default {
        mixins:[ BaseGroupComponent ],
        methods:{
            maybeDelete:function(removeChildNodes) {
                const group = this.getGroup();
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + group.data.title + "'"
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