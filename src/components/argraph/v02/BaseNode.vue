<script>
    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseNodeComponent } from 'jsplumbtoolkit-vue2'

    export default {
        mixins:[ BaseNodeComponent ],
        methods:{
            maybeDelete:function() {
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + this.obj.info.title + "'"
                    },
                    onOK:() => {
                        this.removeNode();
                    }
                });
            }
        }
    }
</script>