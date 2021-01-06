<template>
  <div>
    <div class="gradient text-white min-h-screen flex items-center">
      <div class="container mx-auto p-4 flex flex-wrap items-center">
        <div class="w-full md:w-7/12 text-center md:text-left p-4">
          <div class="text-6xl font-medium">
            {{ total }} Vaccinazioni totali in {{ formVaccineDate }} giorni.
          </div>
          <div class="text-xl md:text-3xl font-medium mb-4">
            <p>Uomini: {{ man }}</p>
            <p>Donne {{ woman }}</p>
          </div>
          <div class="text-lg mb-8">
            Aggiornato il {{ lastUpdateDate }}
          </div>
          <div>
            <div class="text-xl md:text-3xl font-medium mb-4">Gruppi età</div>
            <ul v-for="ag in ageGroupsList">
              <li>
                Età {{ ag.age }}: {{ ag.number }}
              </li>
            </ul>
            <div>
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
                  <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
                  <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Somministrazioni</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Consegnate</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Percentuale</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <template v-for="(r, i) in regionsList" :keys="`region-${i}`">
                  <tr :class="`${i % 2 ? 'bg-gray-100' : ''}`">
                    <td class="w-1/3 text-left py-3 px-4">{{ r.nome }}</td>
                    <td class="w-1/3 text-left py-3 px-4">{{ r.somministrazioni }}</td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.consegnate }}</a></td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.percentuale }}%</a></td>
                  </tr>
                </template>
                <tr :class="`${regionsList.length % 2 ? 'bg-gray-100' : ''}`">
                  <td class="w-1/3 text-left py-3 px-4">Totale</td>
                  <td class="w-1/3 text-left py-3 px-4">{{ totalRegions.somministrazioni }}</td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ totalRegions.consegnate }}</a></td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ totalRegions.percentuale }}%</a></td>
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
    formVaccineDate () {
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
