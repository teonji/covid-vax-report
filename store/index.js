import pathify, { make } from 'vuex-pathify'
import _ from 'lodash'

export const dataUrl = 'https://wabi-europe-north-b-api.analysis.windows.net/public/reports/querydata?synchronous=true'
export const dataPost = {
  regions: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"t2","Entity":"TAB_REGIONI","Type":0},{"Name":"t","Entity":"TAB_MASTER","Type":0},{"Name":"c","Entity":"cfg VACCINI_DOSICONSEGNATEREGIONI","Type":0}],"Select":[{"Column":{"Expression":{"SourceRef":{"Source":"t2"}},"Property":"AREA"},"Name":"TAB_REGIONI.AREA"},{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t"}},"Property":"TOT_SOMM"}},"Function":0},"Name":"Sum(TAB_MASTER.TOT_SOMM)"},{"Measure":{"Expression":{"SourceRef":{"Source":"t"}},"Property":"TassoVaccinazione"},"Name":"TAB_MASTER.TassoVaccinazione"},{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"c"}},"Property":"TOT_DOSI"}},"Function":0},"Name":"CountNonNull(cfg VACCINI_DOSICONSEGNATEREGIONI.TOT_DOSI)"}],"OrderBy":[{"Direction":1,"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t2"}},"Property":"AREA"}}}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0,1,2,3],"Subtotal":1}]},"DataReduction":{"DataVolume":3,"Primary":{"Window":{"Count":500}}},"Version":1}}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"t2\",\"Entity\":\"TAB_REGIONI\",\"Type\":0},{\"Name\":\"t\",\"Entity\":\"TAB_MASTER\",\"Type\":0},{\"Name\":\"c\",\"Entity\":\"cfg VACCINI_DOSICONSEGNATEREGIONI\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t2\"}},\"Property\":\"AREA\"},\"Name\":\"TAB_REGIONI.AREA\"},{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t\"}},\"Property\":\"TOT_SOMM\"}},\"Function\":0},\"Name\":\"Sum(TAB_MASTER.TOT_SOMM)\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t\"}},\"Property\":\"TassoVaccinazione\"},\"Name\":\"TAB_MASTER.TassoVaccinazione\"},{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"c\"}},\"Property\":\"TOT_DOSI\"}},\"Function\":0},\"Name\":\"CountNonNull(cfg VACCINI_DOSICONSEGNATEREGIONI.TOT_DOSI)\"}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t2\"}},\"Property\":\"AREA\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1,2,3],\"Subtotal\":1}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{\"Count\":500}}},\"Version\":1}}}]}","QueryId":"","ApplicationContext":{"DatasetId":"5bff6260-1025-49e0-8e9b-169ade7c07f9","Sources":[{"ReportId":"b548a77c-ab0a-4d7c-a457-2e38c2914fc6"}]}}],"cancelQueries":[],"modelId":4280811},
  lastUpdate: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"l","Entity":"LastRefresh","Type":0}],"Select":[{"Column":{"Expression":{"SourceRef":{"Source":"l"}},"Property":"Datetime_UTC+1"},"Name":"LastRefresh.Datetime_UTC+1"}],"OrderBy":[{"Direction":1,"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"l"}},"Property":"Datetime_UTC+1"}}}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0]}]},"DataReduction":{"DataVolume":3,"Primary":{"Window":{}}},"Version":1}}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"l\",\"Entity\":\"LastRefresh\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"l\"}},\"Property\":\"Datetime_UTC+1\"},\"Name\":\"LastRefresh.Datetime_UTC+1\"}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"l\"}},\"Property\":\"Datetime_UTC+1\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{}}},\"Version\":1}}}]}","QueryId":"","ApplicationContext":{"DatasetId":"5bff6260-1025-49e0-8e9b-169ade7c07f9","Sources":[{"ReportId":"b548a77c-ab0a-4d7c-a457-2e38c2914fc6"}]}}],"cancelQueries":[],"modelId":4280811},
  man: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"t","Entity":"TAB_MASTER","Type":0}],"Select":[{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t"}},"Property":"TML_SESSO_M"}},"Function":0},"Name":"Sum(TAB_MASTER.TML_SESSO_M)"}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0]}]},"DataReduction":{"DataVolume":3,"Primary":{"Window":{}}},"Version":1}}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"t\",\"Entity\":\"TAB_MASTER\",\"Type\":0}],\"Select\":[{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t\"}},\"Property\":\"TML_SESSO_M\"}},\"Function\":0},\"Name\":\"Sum(TAB_MASTER.TML_SESSO_M)\"}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{}}},\"Version\":1}}}]}","QueryId":"","ApplicationContext":{"DatasetId":"5bff6260-1025-49e0-8e9b-169ade7c07f9","Sources":[{"ReportId":"b548a77c-ab0a-4d7c-a457-2e38c2914fc6"}]}}],"cancelQueries":[],"modelId":4280811},
  woman: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"t","Entity":"TAB_MASTER","Type":0}],"Select":[{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t"}},"Property":"TML_SESSO_F"}},"Function":0},"Name":"Sum(TAB_MASTER.TML_SESSO_F)"}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0]}]},"DataReduction":{"DataVolume":3,"Primary":{"Window":{}}},"Version":1}}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"t\",\"Entity\":\"TAB_MASTER\",\"Type\":0}],\"Select\":[{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t\"}},\"Property\":\"TML_SESSO_F\"}},\"Function\":0},\"Name\":\"Sum(TAB_MASTER.TML_SESSO_F)\"}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{}}},\"Version\":1}}}]}","QueryId":"","ApplicationContext":{"DatasetId":"5bff6260-1025-49e0-8e9b-169ade7c07f9","Sources":[{"ReportId":"b548a77c-ab0a-4d7c-a457-2e38c2914fc6"}]}}],"cancelQueries":[],"modelId":4280811},
  total: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"t1","Entity":"TAB_MASTER_PIVOT","Type":0}],"Select":[{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t1"}},"Property":"Valore"}},"Function":0},"Name":"Sum(TAB_MASTER_PIVOT.Valore)"}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0]}]},"DataReduction":{"DataVolume":3,"Primary":{"Window":{}}},"Version":1}}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"t1\",\"Entity\":\"TAB_MASTER_PIVOT\",\"Type\":0}],\"Select\":[{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t1\"}},\"Property\":\"Valore\"}},\"Function\":0},\"Name\":\"Sum(TAB_MASTER_PIVOT.Valore)\"}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Window\":{}}},\"Version\":1}}}]}","QueryId":"","ApplicationContext":{"DatasetId":"5bff6260-1025-49e0-8e9b-169ade7c07f9","Sources":[{"ReportId":"b548a77c-ab0a-4d7c-a457-2e38c2914fc6"}]}}],"cancelQueries":[],"modelId":4280811},
  ageGroups: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"t","Entity":"TAB_MASTER","Type":0},{"Name":"t1","Entity":"TAB_MASTER_PIVOT","Type":0}],"Select":[{"Column":{"Expression":{"SourceRef":{"Source":"t"}},"Property":"TML_FASCIA_ETA"},"Name":"TAB_MASTER.TML_FASCIA_ETA"},{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t1"}},"Property":"Valore"}},"Function":0},"Name":"Sum(TAB_MASTER_PIVOT.Valore)"}],"OrderBy":[{"Direction":1,"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t"}},"Property":"TML_FASCIA_ETA"}}}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0,1]}]},"DataReduction":{"DataVolume":4,"Primary":{"Window":{"Count":1000}}},"Version":1}}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"t\",\"Entity\":\"TAB_MASTER\",\"Type\":0},{\"Name\":\"t1\",\"Entity\":\"TAB_MASTER_PIVOT\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t\"}},\"Property\":\"TML_FASCIA_ETA\"},\"Name\":\"TAB_MASTER.TML_FASCIA_ETA\"},{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t1\"}},\"Property\":\"Valore\"}},\"Function\":0},\"Name\":\"Sum(TAB_MASTER_PIVOT.Valore)\"}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t\"}},\"Property\":\"TML_FASCIA_ETA\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1]}]},\"DataReduction\":{\"DataVolume\":4,\"Primary\":{\"Window\":{\"Count\":1000}}},\"Version\":1}}}]}","QueryId":"","ApplicationContext":{"DatasetId":"5bff6260-1025-49e0-8e9b-169ade7c07f9","Sources":[{"ReportId":"b548a77c-ab0a-4d7c-a457-2e38c2914fc6"}]}}],"cancelQueries":[],"modelId":4280811},
  typologies: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"t2","Entity":"TAB_MASTER_PIVOT","Type":0}],"Select":[{"Column":{"Expression":{"SourceRef":{"Source":"t2"}},"Property":"Categoria Attributo"},"Name":"TAB_MASTER_PIVOT.Categoria Attributo"},{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t2"}},"Property":"Valore"}},"Function":0},"Name":"Sum(TAB_MASTER_PIVOT.Valore)"}],"OrderBy":[{"Direction":1,"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"t2"}},"Property":"Categoria Attributo"}}}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0,1]}]},"DataReduction":{"DataVolume":4,"Primary":{"Window":{"Count":1000}}},"Version":1}}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"t2\",\"Entity\":\"TAB_MASTER_PIVOT\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t2\"}},\"Property\":\"Categoria Attributo\"},\"Name\":\"TAB_MASTER_PIVOT.Categoria Attributo\"},{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t2\"}},\"Property\":\"Valore\"}},\"Function\":0},\"Name\":\"Sum(TAB_MASTER_PIVOT.Valore)\"}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"t2\"}},\"Property\":\"Categoria Attributo\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1]}]},\"DataReduction\":{\"DataVolume\":4,\"Primary\":{\"Window\":{\"Count\":1000}}},\"Version\":1}}}]}","QueryId":"","ApplicationContext":{"DatasetId":"5bff6260-1025-49e0-8e9b-169ade7c07f9","Sources":[{"ReportId":"b548a77c-ab0a-4d7c-a457-2e38c2914fc6"}]}}],"cancelQueries":[],"modelId":4280811},
}
const dataPostState = _.mapValues(dataPost, d => null)

const peoples = {
  'Abruzzo': 1305770,
  'Basilicata': 556934,
  'Calabria': 1924701,
  'Campania': 5785861,
  'Emilia-Romagna': 4467118,
  'Friuli-Venezia Giulia': 1211357,
  'Lazio': 5865544,
  'Liguria': 1543127,
  'Lombardia': 10103969,
  'Marche': 1518400,
  'Molise': 302265,
  'P.A. Bolzano': 532080,
  'P.A. Trento': 542739,
  'Piemonte': 4341375,
  'Puglia': 4008296,
  'Sardegna': 1630474,
  'Sicilia': 4968410,
  'Toscana': 3722729,
  'Trentino': 1074819,
  'Umbria': 880285,
  'Valle d\'Aosta': 125501,
  'Veneto': 4907704
}

const defaultState = () => ({
  ...dataPostState,
  totalRegions: {},
})
export default {
  state () {
    return defaultState()
  },
  mutations: {
    ...make.mutations(defaultState()),
  },
  actions: {
    setRegionsData (context, payload) {
      const data = _.keyBy(_.map(_.get(payload, 'results[0].result.data.dsr.DS[0].PH[1].DM1'), d => {
        return {
          nome: d.C[0],
          abitanti: peoples[d.C[0]],
          somministrazioni: parseInt(d.C[1]),
          // percentualeTotale: parseFloat(d.C[2]),
          consegnate: parseInt(d.C[3]),
          percentualeSomministrazioniConsegnate: Math.round(parseInt(d.C[1]) * 100 / parseInt(d.C[3]) * 100) / 100,
          percentualeSomministrazioniTotali: Math.round(parseInt(d.C[1]) * 100 / peoples[d.C[0]] * 100) / 100,
        }
      }), 'nome')
      const totalAbitanti = _.reduce(_.map(data, 'abitanti'), (a, b) => a + b, 0)
      const totalSomministrazioni = _.reduce(_.map(data, 'somministrazioni'), (a, b) => a + b, 0)
      const percentualeTotale = Math.round(_.reduce(_.map(data, 'percentualeTotale'), (a, b) => a + b, 0) * 100) / 100
      const totalConsegnate = _.reduce(_.map(data, 'consegnate'), (a, b) => a + b, 0)
      const percentualeSomministrazioniConsegnate = Math.round(_.meanBy(_.map(data, 'percentualeSomministrazioniConsegnate')) * 100) / 100
      const percentualeSomministrazioniTotali = Math.round(totalSomministrazioni * 100 / totalAbitanti * 100) / 100
      const percentualeConsegnateTotali = Math.round(parseFloat(totalConsegnate / totalAbitanti) * 100) / 100
      const totalRegion = {
        abitanti: totalAbitanti,
        somministrazioni: totalSomministrazioni,
        // percentualeTotale,
        consegnate: totalConsegnate,
        percentualeConsegnateTotali,
        percentualeSomministrazioniConsegnate,
        percentualeSomministrazioniTotali,
      }
      this.commit('SET_TOTAL_REGIONS', totalRegion)
      this.commit('SET_REGIONS', data)
    },
    setLastUpdateData (context, payload) {
      this.commit('SET_LAST_UPDATE', _.get(payload, 'results[0].result.data.dsr.DS[0].PH[0].DM0[0].G0'))
    },
    setManData (context, payload) {
      this.commit('SET_MAN', _.get(payload, 'results[0].result.data.dsr.DS[0].PH[0].DM0[0].M0'))
    },
    setWomanData (context, payload) {
      this.commit('SET_WOMAN', _.get(payload, 'results[0].result.data.dsr.DS[0].PH[0].DM0[0].M0'))
    },
    setTotalData (context, payload) {
      this.commit('SET_TOTAL', _.get(payload, 'results[0].result.data.dsr.DS[0].PH[0].DM0[0].M0'))
    },
    setAgeGroupsData (context, payload) {
      const data = _.keyBy(_.map(_.get(payload, 'results[0].result.data.dsr.DS[0].PH[0].DM0'), d => ({ age: d.C[0], number: d.C[1] })), 'age')
      this.commit('SET_AGE_GROUPS', data)
    },
    setTypologiesData (context, payload) {
      const data = _.keyBy(_.map(_.get(payload, 'results[0].result.data.dsr.DS[0].PH[0].DM0'), d => ({ type: d.C[0], number: d.C[1] })), 'type')
      this.commit('SET_TYPOLOGIES', data)
    },
    ...make.actions(defaultState()),
  },
  getters: {
    ...make.getters(defaultState()),
  },
  plugins: [pathify.plugin]
}
