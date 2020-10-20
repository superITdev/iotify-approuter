<script>
    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseGroupComponent } from 'jsplumbtoolkit-vue2'

    export default {
        mixins:[BaseGroupComponent],
        methods:{
            getTitle: obj => obj.title,
            getTitleIcon: obj => obj.titleIcon,

            maybeDelete:function(removeChildNodes) {
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + this.getTitle(this.obj) + "'"
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