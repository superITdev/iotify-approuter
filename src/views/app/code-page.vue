<template>
  <div class="code-area">
    <b-row class="code-header">
      <b-colxx xxs="8">
        <img src="/assets/img/code/code.png" alt="title"/>
        <span class="title">Function Editor</span>
      </b-colxx>
      <b-colxx xxs="4" class="text-right">
        <i class="el-icon-circle-close" @click="goToWokerPage"></i>
      </b-colxx>
    </b-row>
    <b-row class="mt-4">
      <b-colxx xxs="3" class="global-config">
        <b-card no-body>
          <b-card-title>Global Config</b-card-title>
          <b-card-body style="padding: 10px;">
            <vue-tree />
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
                <codemirror ref="cmEditor" :value="code" :options="cmOptions"></codemirror>
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
                <codemirror ref="cmEditor" :value="code" :options="cmOptions"></codemirror>
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
                <codemirror ref="cmEditor" :value="code" :options="cmOptions"></codemirror>
              </b-card-body>
            </b-card>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx xxs="2" class="helper">
        <b-card no-body>
          <b-card-title>
            <img src="/assets/img/code/helper.png" alt="helper-function" /> Helper functions
          </b-card-title>
          <b-card-body>
            <div class="mb-2">
              <b-form-input placeholder="Search Here"></b-form-input>
            </div>
            <div v-for="(item,cIndex) in 10" :key="`congig_${cIndex}`" style="padding: 5px 3px;">
              Config.set ------------
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
import Tree from '../../components/Common/Tree'

export default {
    components: {
      'vue-tree': Tree
    },
    data() {
        return {
          code: '',
          cmOptions: {
            tabSize: 2,
            mode: 'text/javascript',
            theme: 'base16-dark',
            lineNumbers: true,
            line: true,
          }
        }
    },
    methods: {
      goToWokerPage() {
        this.$router.push('/app/blank-page');
        document.querySelector(".work-canvas").style.visibility = 'visible';
      }
    },
    computed: {
      codemirror() {
        return this.$refs.cmEditor.codemirror
      }
    },
    mounted() {
      document.querySelector(".work-canvas").style.visibility = 'hidden';
    }
}
</script>

<style lang="scss">
.el-icon-circle-close {
  font-size: 22px;
  color: red;
  cursor: pointer;
}
</style>