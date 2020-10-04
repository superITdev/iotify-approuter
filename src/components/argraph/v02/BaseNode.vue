<script>

    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseNodeComponent } from 'jsplumbtoolkit-vue2'

    export default {
        mixins:[ BaseNodeComponent ],
        methods:{
            maybeDelete:function() {
                let node = this.getNode();
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + node.data.text + "'"
                    },
                    onOK:() => {
                        this.removeNode();
                    }
                });
            }
        }
    }

</script>