<script>
    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseNodeComponent } from 'jsplumbtoolkit-vue2'

    export default {
        mixins:[BaseNodeComponent],
        methods:{
            getTitle: obj => obj.title,
            
            maybeDelete:function() {
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + this.getTitle(this.obj) + "'"
                    },
                    onOK:() => {
                        this.removeNode();
                    }
                });
            }
        }
    }
</script>