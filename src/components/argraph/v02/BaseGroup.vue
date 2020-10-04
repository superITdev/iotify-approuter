<script>
    import { Dialogs } from 'jsplumbtoolkit'
    import { BaseGroupComponent } from 'jsplumbtoolkit-vue2'

    import {nodeCategories} from '@/data/nodeCategories'

    export default {
        mixins:[ BaseGroupComponent ],
        methods:{
            getTitle: obj => obj.info.title,
            getTitleIcon: (obj) => {
                const item = nodeCategories.find(item => item.id===obj.info.categoryType);
                return item.icon;
            },

            maybeDelete:function(removeChildNodes) {
                Dialogs.show({
                    id: "dlgConfirm",
                    data: {
                        msg: "Delete '" + this.obj.info.title + "'"
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