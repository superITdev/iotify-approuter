<template>
  <div class="code-area">
    <b-row class="code-header">
      <b-colxx xxs="8">
        <img src="/assets/img/code/code.png" alt="title"/>
        <span class="title">Function Editor</span>
      </b-colxx>
      <b-colxx xxs="4" class="text-right">
        <img class="logger-delete-btn" src="/assets/img/logger/delete-btn.png" alt="delete-btn" @click="goToWokerPage" />
      </b-colxx>
    </b-row>
    <b-row class="mt-4">
      <b-colxx xxs="2" class="global-config">
        <b-card no-body>
          <b-card-title>Global Config</b-card-title>
          <b-card-body>
            <div></div>
          </b-card-body>
        </b-card>
      </b-colxx>
      <b-colxx xxs="7" class="editer">
        <b-row>
          <b-colxx xxs="12">
            <b-card no-body>
              <b-card-title>
                <b-row>
                  <b-colxx xxs="9">
                    <span>function <span class="blue">mysampletransform</span> ( topic, message) </span>
                  </b-colxx>
                  <b-colxx xxs="3" class="text-right code-save-toolbar">
                    <span class="code-save-btn">Save</span>
                  </b-colxx>
                </b-row>
              </b-card-title>
              <b-card-body>
                <div></div>
              </b-card-body>
            </b-card>
          </b-colxx>
          <b-colxx xxs="6" class="mt-4">
            <b-card no-body>
              <b-card-title>
                <b-row>
                  <b-colxx xxs="9">
                    <span>Sample Input</span>
                  </b-colxx>
                  <b-colxx xxs="3" class="text-right code-test-toolbar">
                    <span class="code-test-btn">Test</span>
                  </b-colxx>
                </b-row>
              </b-card-title>
              <b-card-body>
                <div>
                  <!-- <vue-codemirror></vue-codemirror> -->
                </div>
              </b-card-body>
            </b-card>
          </b-colxx>
          <b-colxx xxs="6" class="mt-4">
            <b-card no-body>
              <b-card-title>
                <b-row>
                  <b-colxx xxs="12">
                    <span>Sample Output</span>
                  </b-colxx>
                </b-row>
              </b-card-title>
              <b-card-body>
                <div></div>
              </b-card-body>
            </b-card>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx xxs="3" class="helper">
        <b-card no-body>
          <b-card-title>
            <img src="/assets/img/code/helper.png" alt="helper-function" /> Helper functions
          </b-card-title>
          <b-card-body>
            <div class="mb-2">
              <b-form-input placeholder="Search Here"></b-form-input>
            </div>
            <div v-for="(item,cIndex) in 10" :key="`congig_${cIndex}`" style="padding: 5px 3px;">
              Config.set --------------------------
            </div>
          </b-card-body>
          <b-card-title>
            <img src="/assets/img/code/helper.png" alt="helper-function" /> Logs
          </b-card-title>
          <b-card-body>
            <div class="logs"></div>
          </b-card-body>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
        }
    },
    mounted() {},
    methods: {
      goToWokerPage() {
        this.$router.push('/app/blank-page');
      }
    }
}
</script>
