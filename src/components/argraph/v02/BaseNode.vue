<script>
    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseNodeComponent } from 'jsplumbtoolkit-vue2'

    import {getNodeInfo} from '@/data/nodeCategories'

    export default {
        mixins:[BaseNodeComponent],
        methods:{
            getTitle: obj => getNodeInfo(obj).title,
            
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