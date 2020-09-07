<template>
  <div class="logger-area">
    <b-row class="logger-header">
      <b-colxx xxs="6">
        <img src="/assets/img/logger/title.png" alt="title"/>
        <span class="title">Logger</span>
      </b-colxx>
      <b-colxx xxs="6" class="text-right">
        <img class="logger-delete-btn" src="/assets/img/logger/delete-btn.png" alt="delete-btn" @click="goToWokerPage" />
      </b-colxx>
    </b-row>
    <b-row class="mt-3 mb-3">
      <b-colxx xxs="3">
        <v-select v-model="loggerForm.select" :options="selectData" :dir="direction" />
      </b-colxx>
      <b-colxx xxs="6">
        <b-form-input></b-form-input>
      </b-colxx>
      <b-colxx xxs="2">
        <v-date-picker mode="single" v-model="dateValue" :input-props="{ class:'form-control', placeholder: 'date' }"></v-date-picker>
      </b-colxx>
      <b-colxx xxs="1">
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
          <div class="logger-content"></div>
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
                select: '',
            },
            direction: getDirection().direction,
            selectData: [
                'Odin ingestion',
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
