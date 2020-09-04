<template>
<div id="app-container" :class="getMenuType">
    <sidebar />
    <main>
        <div class="container-fluid">
            <router-view />
        </div>
    </main>
</div>
</template>

<script>
import Sidebar from '../../containers/Sidebar'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        'sidebar': Sidebar
    },
    data() {
        return {
            show: true
        }
    },
    computed: {
        ...mapGetters(['getMenuType'])
    }
}
</script>
