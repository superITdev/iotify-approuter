<script>
import { BaseGroupComponent } from 'jsplumbtoolkit-vue2'

export default {
    mixins:[BaseGroupComponent],
    methods:{
        maybeDelete(removeChildNodes) {
            if (confirm(`Delete ${this.obj.itemTitle}?`)) this.removeGroup(removeChildNodes);
        },
        toggleGroup() {
            const group = this.getGroup();
            this.surface.toggleGroup(group);
        }
    }
}
</script>