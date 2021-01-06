<template>
  <div>
    <div class="gradient text-white min-h-screen flex items-center">
      <div class="container mx-auto p-4 flex flex-wrap items-center">
        <div class="w-full text-center md:text-left p-4">
          <div class="text-lg flex justify-end">
            <div>Aggiornato il {{ lastUpdateDate }}</div>
          </div>
          <div class="text-4xl font-medium">
            {{ total }} Vaccinazioni totali in {{ formVaccineDays }} giorni.
          </div>
          <div class="text-lg">
            {{ parseInt(total / formVaccineDays) }} Vaccinazioni al giorno, {{ parseInt(total / formVaccineDays / 24) }} all'ora.
          </div>
          <div class="text-xl md:text-3xl font-medium">
            Consegnate {{ totalRegions.consegnate }}/{{ totalRegions.abitanti }} dosi. Il {{ totalRegions.percentualeConsegnateTotali }}% della popolazione.
            <br />
            <p>Su {{ totalRegions.abitanti }} sono state vaccinate {{ totalRegions.percentualeSomministrazioniTotali }}% persone.</p>
            <p>Di questo passo mancano circa {{ daysMissing }} giorni, {{ daysMissingDate }} circa</p>
            <p>{{ daysMissingImmunitaGregge }} Per raggiungere il 70%, {{ daysMissingImmunitaGreggeDate }} circa</p>
          </div>
          <div class="text-lg mb-4">
            Vaccinazioni iniziate il 31 dicembre 2020
          </div>
          <div class="text-xl md:text-3xl font-medium mb-4">
            <p>Uomini: {{ man }}</p>
            <p>Donne {{ woman }}</p>
          </div>
          <div class="w-full flex">
            <div class="w-1/2">
              <div class="text-xl md:text-3xl font-medium mb-4">Gruppi età</div>
              <ul v-for="ag in ageGroupsList">
                <li>
                  Età {{ ag.age }}: {{ ag.number }}
                </li>
              </ul>
            </div>
            <div class="w-1/2">
              <div class="text-xl md:text-3xl font-medium mb-4">Tipologie</div>
              <ul v-for="tp in typologiesList">
                <li>
                  Tipo {{ tp.type }}: {{ tp.number }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="md:px-32 py-8 w-full">
          <div class="shadow overflow-hidden rounded border-b border-gray-200">
            <table class="bg-white w-full">
              <thead class="bg-gray-800 text-white">
                <tr>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Somministrazioni</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Consegnate</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Percentuale Somministrazioni Consegnate</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Abitanti</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Percentuale Somministrazioni Totali</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <template v-for="(r, i) in regionsList" :keys="`region-${i}`">
                  <tr :class="`${i % 2 ? 'bg-gray-100' : ''}`">
                    <td class="text-left py-3 px-4">{{ r.nome }}</td>
                    <td class="text-left py-3 px-4">{{ r.somministrazioni }}</td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.consegnate }}</a></td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.percentualeSomministrazioniConsegnate }}%</a></td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.abitanti }}</a></td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.percentualeSomministrazioniTotali }}%</a></td>
                  </tr>
                </template>
                <tr :class="`${regionsList.length % 2 ? 'bg-gray-100' : ''}`">
                  <td class="text-left py-3 px-4">Totale</td>
                  <td class="text-left py-3 px-4">{{ totalRegions.somministrazioni }}</td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ totalRegions.consegnate }}</a></td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ totalRegions.percentualeSomministrazioniConsegnate }}%</a></td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ totalRegions.abitanti }}</a></td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ totalRegions.percentualeSomministrazioniTotali }}%</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  dataUrl,
  dataPost,
} from '../store'
import moment from 'moment'
import 'moment/locale/it'
import _ from 'lodash'
import { get } from 'vuex-pathify'
const computed = _.mapValues(dataPost, (v, k) => get(k))
export default {
  async asyncData ({ $axios, store }) {
    const dataPostKey = _.keys(dataPost)
    const promises = _.mapValues(dataPost, d => $axios.post(dataUrl, d))
    Promise.all(_.map(promises)).then(values => _.each(dataPostKey, (k, i) => store.dispatch(`set${k.charAt(0).toUpperCase() + k.slice(1)}Data`, values[i].data)))
  },
  data () {
    return {
      startDate: moment('2020-12-31 00:00:00'),
    }
  },
  computed: {
    ...computed,
    totalRegions: get('totalRegions'),
    daysMissing () {
      return parseInt(100 * parseInt(this.formVaccineDays) / parseFloat(this.totalRegions.percentualeSomministrazioniTotali))
    },
    daysMissingDate () {
      return moment(this.lastUpdate).add(this.daysMissing, 'days').format('DD MMMM YYYY')
    },
    daysMissingImmunitaGregge () {
      return parseInt(this.daysMissing / 100 * 70)
    },
    daysMissingImmunitaGreggeDate () {
      return moment(this.lastUpdate).add(this.daysMissingImmunitaGregge, 'days').format('DD MMMM YYYY')
    },
    formVaccineDays () {
      return moment(this.lastUpdate).diff(this.startDate, 'days')
    },
    lastUpdateDate () {
      return moment(this.lastUpdate).format('DD MMMM YYYY HH:mm')
    },
    ageGroupsList () {
      return _.map(this.ageGroups)
    },
    typologiesList () {
      return _.map(this.typologies)
    },
    regionsList () {
      return _.sortBy(_.map(this.regions), 'name')
    },
  }
}
</script>

<style scoped>
  .gradient {
    background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
  }
</style>
