<template>
  <div class="logger-area">
    <b-row class="logger-header">
      <b-colxx xxs="6">
        <i class="el-icon-tickets" style="font-size: 22px;"></i>
        <span class="title">Logger</span>
      </b-colxx>
      <b-colxx xxs="6" class="text-right">
        <i class="el-icon-circle-close" @click="goToWokerPage"></i>
      </b-colxx>
    </b-row>
    <b-row class="mt-3 mb-3">
      <b-colxx xxs="3">
        <v-select v-model="loggerForm.select" :options="selectData" :dir="direction" />
      </b-colxx>
      <b-colxx xxs="6" class="p-0">
        <b-input-group class="mb-3">
          <b-input-group-prepend is-text>
            <i class="simple-icon-magnifier"></i>
          </b-input-group-prepend>
          <b-form-input placeholder="Search your logs"/>
        </b-input-group>
      </b-colxx>
      <b-colxx xxs="2">
        <v-date-picker mode="single" v-model="dateValue" :input-props="{ class:'form-control', placeholder: 'date' }"></v-date-picker>
      </b-colxx>
      <b-colxx xxs="1" class="text-right">
        <img src="/assets/img/logger/chat.png" alt="chat"/>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="6">
        Histogram of messages sent over the channel
      </b-colxx>
      <b-colxx xxs="6" class="text-right">
        June 22nd 2020, 16:45:38:456 - June 23nd 2020, 16:45:38:456
      </b-colxx>
    </b-row>
    <b-row class="mt-2 mb-4">
      <b-colxx xxs="12">
        <div class="chart-container">
          <bar-chart :data="barChartData" :height="200" />
        </div>
      </b-colxx>
    </b-row>

    <b-row class="mb-2">
      <b-colxx xxs="12">
        <div class="logger-container">
          <b-row>
            <b-colxx xxs="11">
              <div class="logger-content">
                <div v-for="(item,index) in 8" :key="`loger_${index}`">
                  <span style="color: blue">Jul 24 06:00:53.834pm</span>
                  <span style="color: green">info</span>
                  <span style="color: red">ec2-3-90-18...</span>
                  <span style="color: #BCB343">0.19695. ...</span>
                  <span>Transformed frame initialized in 40.399606ms, billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341
                    billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341 billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341
                    billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341 </span>
                </div>
              </div>
            </b-colxx>
            <b-colxx xxs="1" class="p-0">
              <div class="logger-toolbar">
                <div><img src="/assets/img/logger/debug.png" alt="debug"/></div>
                <div><img src="/assets/img/logger/show.png" alt="show"/></div>
                <div class="next-line"><img src="/assets/img/logger/next-line.png" alt="next-line"/></div>
              </div>
            </b-colxx>
          </b-row>
        </div>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {
    getDirection
} from '../../utils'
import {
    barChartData,
} from '../../data/charts'
import BarChart from '../../components/Charts/Bar'

export default {
    components: {
        'v-select': vSelect,
        'bar-chart': BarChart,
    },
    data() {
        return {
            loggerForm: {
                select: 'Odin ingestion',
            },
            direction: getDirection().direction,
            selectData: [
                'Odin ingestion',
                'Odin ingestion1',
                'Odin ingestion2',
                'Odin ingestion3',
            ],
            dateValue: new Date(),
            barChartData
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

<style lang="scss">
.el-icon-circle-close {
  font-size: 22px;
  color: red;
  cursor: pointer;
}
</style>
