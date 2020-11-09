<script>
import { BaseNodeComponent } from 'jsplumbtoolkit-vue2'

export default {
    mixins:[BaseNodeComponent],
    methods:{
        maybeDelete() {
            if (confirm(`Delete ${this.obj.itemTitle}?`)) this.removeNode();
        }
    }
}
</script>