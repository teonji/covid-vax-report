<template>
  <div class="gradient text-white min-h-screen flex items-center">
    <div class="container mx-auto p-4 flex flex-wrap items-center">
      <div class="w-full text-center md:text-left p-4">
        <div class="text-lg flex justify-end">
          <div>Aggiornato il {{ lastUpdateDate }}</div>
        </div>
        <div class="text-4xl font-medium">
          {{ administrations | numFormat }} Vaccinazioni totali in {{ fromVaccineDays | numFormat }} giorni.
        </div>
        <div class="text-lg">
          {{ parseInt(administrations / fromVaccineDays) | numFormat }} Vaccinazioni al giorno, {{ parseInt(administrations / fromVaccineDays / 24) | numFormat }} all'ora.
        </div>
        <div class="text-xl md:text-3xl font-medium">
          Consegnate {{ deliveriesVaccinesTotal | numFormat }}/{{ totalPeople | numFormat }} dosi. Il {{ percentageTotalDelivered | numFormat('0.00%') }} degli italiani.
          <br />
          <p>Su {{ totalPeople | numFormat }} sono state vaccinate {{ percentageTotalAdministrations | numFormat('0.00%') }} persone.</p>
          <p>Di questo passo mancano circa {{ daysMissing | numFormat }} giorni, {{ daysMissingDate }} circa</p>
          <p>{{ daysMissingHerdImmunity | numFormat }} Per raggiungere il 70%, {{ daysMissingHerdImmunityDate }} circa</p>
        </div>
        <div class="text-lg mb-4">
          Vaccinazioni iniziate il {{ startDate.format('DD MMMM YYYY') }}
        </div>
        <div class="text-xl md:text-3xl font-medium mb-4">
          <p>Uomini: {{ totalMale | numFormat }}</p>
          <p>Donne {{ totalFemale | numFormat }}</p>
        </div>
        <div class="w-full flex">
          <div class="w-1/2">
            <div class="text-xl md:text-3xl font-medium mb-4">Gruppi età</div>
            <ul v-for="ag in vaccineRegistryAgeGroup">
              <li>
                Età {{ ag.ageGroup }}: {{ ag.total | numFormat }}
              </li>
            </ul>
          </div>
          <div class="w-1/2">
            <div class="text-xl md:text-3xl font-medium mb-4">Tipologie</div>
            <ul>
              <li>
                Operatori Sanitari e Sociosanitari: {{ totalDoctors | numFormat }}
              </li>
              <li>
                Ospiti Strutture Residenziali: {{ totalRsaGuests | numFormat }}
              </li>
              <li>
                Personale non Sanitario: {{ totalOthers | numFormat }}
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
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">% Somm. Consegnate</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Abitanti</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">% Somm. Totali</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <template v-for="(r, i) in vaccinesTable" :keys="`region-${i}`">
                <tr :class="`${i % 2 ? 'bg-gray-100' : ''}`">
                  <td class="text-left py-3 px-4">{{ r.name }}</td>
                  <td class="text-left py-3 px-4">{{ r.administered | numFormat }}</td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.delivered | numFormat }}</a></td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.percentageAdministeredOnDelivered | numFormat('0.00%') }}</a></td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.people | numFormat }}</a></td>
                  <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ r.percentageAdministeredOnPeople | numFormat('0.00%') }}</a></td>
                </tr>
              </template>
              <tr :class="`${vaccinesTable.length % 2 ? 'bg-gray-100' : ''}`">
                <td class="text-left py-3 px-4">Totale</td>
                <td class="text-left py-3 px-4">{{ vaccinesTotalTable.administered | numFormat }}</td>
                <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ vaccinesTotalTable.delivered | numFormat }}</a></td>
                <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ vaccinesTotalTable.percentageAdministeredOnDelivered | numFormat('0.00%') }}</a></td>
                <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ vaccinesTotalTable.people | numFormat }}</a></td>
                <td class="text-left py-3 px-4"><a class="hover:text-blue-500">{{ vaccinesTotalTable.percentageAdministeredOnPeople | numFormat('0.00%') }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-full text-center md:text-left p-4 flex justify-end">
        <div class="text-lg flex justify-end mr-6">
            <span class="mr-2">Powerd by <a href="https://www.matteotritto.it">teonji</a></span>
            <a href="https://github.com/teonji/covid-vax-report"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
        </div>
        <div class="text-lg flex justify-end">
          <span class="mr-2">Api by <a href="https://www.linkedin.com/in/a-marchetti">marquez</a></span>
          <a href="https://github.com/andreamarchetti/covid19-vaccini"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//* https://github.com/italia/covid19-opendata-vaccini *//
import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/it'
import _ from 'lodash'
import numeral from 'numeral'
numeral.register('locale', 'it', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'mila',
    million: 'milioni',
  },
})
numeral.locale('it')
import numFormat from 'vue-filter-number-format'
const dataUrl = 'https://api.vaxstats.it/v0/latest/'
Vue.filter('numFormat', numFormat(numeral))
const dataGet = [
  {
    name: 'lastUpdate',
    slug: 'last-update-dataset',
    resolver: jsonData => _.get(jsonData, 'data[0].jsonData.ultimo_aggiornamento'),
  },
  {
    name: 'deliveriesVaccines',
    slug: 'consegne-vaccini-latest',
    resolver: jsonData => {
      let json = _.get(jsonData, 'data[0].jsonData')
      return _.mapValues(_.groupBy(json.data, 'area'), v => {
        return {
          last: moment(_.last(_.map(v, 'data_consegna'))),
          doses: _.sum(_.map(v, 'numero_dosi')),
          list: _.map(v, vv => ({
            date: moment(vv.data_consegna),
            doses: vv.numero_dosi,
          })),
        }
      })
    },
  },
  {
    name: 'vaccines',
    slug: 'vaccini-summary-latest',
    resolver: jsonData => {
      let json = _.get(jsonData, 'data[0].jsonData')
      return _.mapValues(_.keyBy(json.data, 'area'), v => ({
        administered: v.dosi_somministrate,
        delivered: v.dosi_consegnate,
        percentage: v.percentuale_somministrazione,
        lastUpdate: moment(v.ultimo_aggiornamento),
      }))
    },
  },
  {
    name: 'administeredByRegion',
    slug: 'somministrazioni-vaccini-latest',
    resolver: jsonData => {
      let json = _.get(jsonData, 'data[0].jsonData')
      return _.mapValues(_.groupBy(json.data, 'area'), v => ({
          doctors: _.sum(_.map(v, 'categoria_operatori_sanitari_sociosanitari')),
          rsaGuests: _.sum(_.map(v, 'categoria_ospiti_rsa')),
          others: _.sum(_.map(v, 'categoria_personale_non_sanitario')),
          last: moment(_.last(_.map(v, 'data_somministrazione'))),
          male: _.sum(_.map(v, 'sesso_maschile')),
          female: _.sum(_.map(v, 'sesso_femminile')),
          total: _.sum(_.map(v, 'sesso_maschile')) + _.sum(_.map(v, 'sesso_femminile')),
          ageGroups: _.mapValues(_.groupBy(v, 'fascia_anagrafica'), vv => {
            return {
              doctors: _.sum(_.map(vv, 'categoria_operatori_sanitari_sociosanitari')),
              rsaGuests: _.sum(_.map(vv, 'categoria_ospiti_rsa')),
              others: _.sum(_.map(vv, 'categoria_personale_non_sanitario')),
              last: moment(_.last(_.map(vv, 'data_somministrazione'))),
              male: _.sum(_.map(vv, 'sesso_maschile')),
              female: _.sum(_.map(vv, 'sesso_femminile')),
              total: _.sum(_.map(vv, 'sesso_maschile')) + _.sum(_.map(vv, 'sesso_femminile')),
              list: _.map(vv, val => ({
                doctors: val.categoria_operatori_sanitari_sociosanitari,
                rsaGuests: val.categoria_ospiti_rsa,
                others: val.categoria_personale_non_sanitario,
                date: moment(val.data_somministrazione),
                male: val.sesso_maschile,
                female: val.sesso_femminile,
                total: val.sesso_maschile + val.sesso_femminile,
              })),
            }
          }),
          list: _.map(v, val => ({
            doctors: val.categoria_operatori_sanitari_sociosanitari,
            rsaGuests: val.categoria_ospiti_rsa,
            others: val.categoria_personale_non_sanitario,
            date: moment(val.data_somministrazione),
            male: val.sesso_maschile,
            female: val.sesso_femminile,
          })),
      }))
    },
  },
  {
    name: 'summaryAdministered',
    slug: 'somministrazioni-vaccini-summary-latest',
    resolver: jsonData => {
      let json = _.get(jsonData, 'data[0].jsonData')
      return _.mapValues(_.groupBy(json.data, 'area'), v => ({
        doctors: _.sum(_.map(v, 'categoria_operatori_sanitari_sociosanitari')),
        rsaGuests: _.sum(_.map(v, 'categoria_ospiti_rsa')),
        others: _.sum(_.map(v, 'categoria_personale_non_sanitario')),
        last: moment(_.last(_.map(v, 'data_somministrazione'))),
        male: _.sum(_.map(v, 'sesso_maschile')),
        female: _.sum(_.map(v, 'sesso_femminile')),
        total: _.sum(_.map(v, 'totale')),
        list: _.map(v, val => ({
          doctors: val.categoria_operatori_sanitari_sociosanitari,
          rsaGuests: val.categoria_ospiti_rsa,
          others: val.categoria_personale_non_sanitario,
          date: moment(val.data_somministrazione),
          male: val.sesso_maschile,
          female: val.sesso_femminile,
          total: val.totale,
        })),
      }))
    },
  },
  {
    name: 'administrationPoints',
    slug: 'punti-somministrazione-latest',
    resolver: jsonData => {
      let json = _.get(jsonData, 'data[0].jsonData')
      return _.mapValues(_.groupBy(json.data, 'area'), v => _.map(v, vv => ({
        province: vv.provincia,
        city: vv.comune,
        hospital: vv.presidio_ospedaliero,
      })))
    },
  },
  {
    name: 'vaccineRegistry',
    slug: 'anagrafica-vaccini-summary-latest',
    resolver: jsonData => {
      let json = _.get(jsonData, 'data[0].jsonData')
      return _.map(json.data, d => ({
        ageGroup: d.fascia_anagrafica,
        total: d.totale,
        male: d.sesso_maschile,
        female: d.sesso_femminile,
        doctors: d.categoria_operatori_sanitari_sociosanitari,
        others: d.categoria_personale_non_sanitario,
        rsaGuests: d.categoria_ospiti_rsa,
        lastUpdate: moment(d.ultimo_aggiornamento),
      }))
    },
  },
]
export default {
  async asyncData ({ $axios }) {
    const promises = _.map(dataGet, d => $axios.get(`${dataUrl}${d.slug}/json`))
    const resolved = await Promise.all(_.map(promises))
    console.log(_.mapKeys(_.mapValues(dataGet, (v, k) => v.resolver(resolved[k])), (v, k) => dataGet[k].name))
    return _.mapKeys(_.mapValues(dataGet, (v, k) => v.resolver(resolved[k])), (v, k) => dataGet[k].name)
  },
  data () {
    return {
      startDate: moment('2020-12-27 00:00:00'),
      regionMap: {
        ABR: {
          name: 'Abruzzo',
          people: 1293941,
        },
        BAS: {
          name: 'Basilicata',
          people: 553254,
        },
        CAL: {
          name: 'Calabria',
          people: 1894110,
        },
        CAM: {
          name: 'Campania',
          people: 5712143,
        },
        EMR: {
          name: 'Emilia-Romagna',
          people: 4464119,
        },
        FVG: {
          name: 'Friuli-Venezia Giulia',
          people: 1206216,
        },
        LAZ: {
          name: 'Lazio',
          people: 5755700,
        },
        LIG: {
          name: 'Liguria',
          people: 1524826,
        },
        LOM: {
          name: 'Lombardia',
          people: 10027602,
        },
        MAR: {
          name: 'Marche',
          people: 1512672,
        },
        MOL: {
          name: 'Molise',
          people: 300516,
        },
        PAB: {
          name: 'P.A. Bolzano',
          people: 532644,
        },
        PAT: {
          name: 'P.A. Trento',
          people: 545425,
        },
        PIE: {
          name: 'Piemonte',
          people: 4311217,
        },
        PUG: {
          name: 'Puglia',
          people: 3953305,
        },
        SAR: {
          name: 'Sardegna',
          people: 1611621,
        },
        SIC: {
          name: 'Sicilia',
          people: 4875290,
        },
        TOS: {
          name: 'Toscana',
          people: 3692555,
        },
        UMB: {
          name: 'Umbria',
          people: 870165,
        },
        VDA: {
          name: 'Valle d\'Aosta',
          people: 125034,
        },
        VEN: {
          name: 'Veneto',
          people: 4879133,
        },
      },
    }
  },
  computed: {
    administrations () {
      return _.sum(_.map(this.administeredByRegion, 'total'))
    },
    deliveriesVaccinesTotal () {
      return _.sum(_.map(this.deliveriesVaccines, 'doses'))
    },
    peopleByRegion () {
      return _.mapValues(this.regionMap, 'people')
    },
    regionNameMap () {
      return _.mapValues(this.regionMap, 'name')
    },
    totalPeople () {
      return _.sum(_.map(this.peopleByRegion))
    },
    percentageTotalDelivered () {
      return this.deliveriesVaccinesTotal / this.totalPeople
    },
    percentageTotalAdministrations () {
      return this.administrations / this.totalPeople
    },
    daysMissing () {
      return parseInt(this.fromVaccineDays / this.percentageTotalAdministrations)
    },
    daysMissingDate () {
      return moment(this.lastUpdate).add(this.daysMissing, 'days').format('DD MMMM YYYY')
    },
    daysMissingHerdImmunity () {
      return parseInt(this.daysMissing / 100 * 70)
    },
    daysMissingHerdImmunityDate () {
      return moment(this.lastUpdate).add(this.daysMissingHerdImmunity, 'days').format('DD MMMM YYYY')
    },
    fromVaccineDays () {
      return moment(this.lastUpdate).diff(this.startDate, 'days')
    },
    lastUpdateDate () {
      return moment(this.lastUpdate).format('DD MMMM YYYY HH:mm')
    },
    totalMale () {
      return _.sum(_.map(this.vaccineRegistry, 'male')) // todo: check difference with sum summaryAdministered mmmh
    },
    totalFemale () {
      return _.sum(_.map(this.vaccineRegistry, 'female'))
    },
    vaccineRegistryAgeGroup () {
      return _.keyBy(this.vaccineRegistry, 'ageGroup')
    },
    totalRsaGuests () {
      return _.sum(_.map(this.vaccineRegistry, 'rsaGuests'))
    },
    totalOthers () {
      return _.sum(_.map(this.vaccineRegistry, 'others'))
    },
    totalDoctors () {
      return _.sum(_.map(this.vaccineRegistry, 'doctors'))
    },
    vaccinesTable () {
      return _.map(this.vaccines, (v, k) => ({
        name: this.regionNameMap[k],
        administered: v.administered,
        delivered: v.delivered,
        percentageAdministeredOnDelivered: v.percentage / 100,
        people: this.peopleByRegion[k],
        percentageAdministeredOnPeople: v.administered / this.peopleByRegion[k],
      }))
    },
    vaccinesTotalTable () {
      return {
        administered: _.sum(_.map(this.vaccinesTable, 'administered')),
        delivered: _.sum(_.map(this.vaccinesTable, 'delivered')),
        percentageAdministeredOnDelivered: _.sum(_.map(this.vaccinesTable, 'administered')) / _.sum(_.map(this.vaccinesTable, 'delivered')),
        people: _.sum(_.map(this.vaccinesTable, 'people')),
        percentageAdministeredOnPeople: _.sum(_.map(this.vaccinesTable, 'administered')) / _.sum(_.map(this.vaccinesTable, 'people')),
      }
    }
  }
}
</script>

<style scoped>
  .gradient {
    background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
  }
</style>
