<script>

    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseNodeComponent } from 'jsplumbtoolkit-vue2'

    export default {
        mixins:[ BaseNodeComponent ],
        methods:{
            maybeDelete:function() {
                const node = this.getNode();
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + node.data.title + "'"
                    },
                    onOK:() => {
                        this.removeNode();
                    }
                });
            }
        }
    }

</script>