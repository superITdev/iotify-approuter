<template>
  <div class="work-area">
    <b-row class="mt-2 work-header">
      <b-colxx xxs="12" class="text-right">
        <img src="/assets/img/user.png" alt="user" style="width: 45px"/>
        <b-button variant="secondary" class="deploy-btn">Deploy</b-button>
      </b-colxx>
    </b-row>
    <b-row class="work-content"></b-row>
    <b-row class="mt-2 work-footer">
      <b-colxx xxs="6" class="text-left">
        <b-card class="text-center">
          <img :src="fullScreen ? '/assets/img/work/full-screen.png' : '/assets/img/work/full-screen.png'" alt="full-screen" @click="toggleFullScreen"/>
        </b-card>
        <b-card class="text-center mt-2">
          <img src="/assets/img/work/puls.png" alt="plus" />
          <img src="/assets/img/work/minus.png" alt="minus" />
        </b-card>
      </b-colxx>
      <b-colxx xxs="6" class="right-icon">
        <b-row>
          <b-card class="text-center">
            <img src="/assets/img/work/logger.png" alt="logger" @click="goToLoggerPage"/>
            <img src="/assets/img/work/code-pen.png" alt="code-pen" />
            <img src="/assets/img/work/setting.png" alt="setting" />
          </b-card>
        </b-row>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      fullScreen: false,
    }
  },
  methods: {
    goToLoggerPage() {
      this.$router.push('/app/logger-page');
    },

    toggleFullScreen() {
      console.log('fullscreen')
      const isInFullScreen = this.isInFullScreen()

      var docElm = document.documentElement
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
      }
      this.fullScreen = !isInFullScreen
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
            document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
            document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      )
    }
  }
}

</script>
