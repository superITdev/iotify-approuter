<script>
    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseGroupComponent } from 'jsplumbtoolkit-vue2'

    import {getNodeInfo} from '@/data/nodeCategories'

    export default {
        mixins:[BaseGroupComponent],
        methods:{
            getTitle: obj => getNodeInfo(obj).title,
            getTitleIcon: obj => getNodeInfo(obj).titleIcon,

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