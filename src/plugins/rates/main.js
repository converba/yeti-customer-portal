define(function (require) {
  return {
    name: `Rates`,
    components: {},
    data() {
      return {
        expanded: [],
        headers: [
          {
            text: this.$t('rates.table.headers.connectFee'),
            align: 'left',
            value: 'attributes.connect-fee',
          },
          {
            text: this.$t('rates.table.headers.initialInterval'),
            align: 'left',
            value: 'attributes.initial-interval',
          },
          {
            text: this.$t('rates.table.headers.initialRate'),
            align: 'left',
            value: 'attributes.initial-rate',
          },
          {
            text: this.$t('rates.table.headers.networkPrefixId'),
            align: 'left',
            value: 'attributes.network-prefix-id',
          },
          {
            text: this.$t('rates.table.headers.nextInterval'),
            align: 'left',
            value: 'attributes.next-interval',
          },
          {
            text: this.$t('rates.table.headers.nextRate'),
            align: 'left',
            value: 'attributes.next-rate',
          },
          {
            text: this.$t('rates.table.headers.prefix'),
            align: 'left',
            value: 'attributes.prefix',
          },
          {
            text: this.$t('rates.table.headers.rejectCalls'),
            align: 'left',
            value: 'attributes.reject-calls',
          },
          {
            text: this.$t('rates.table.headers.valid-from'),
            align: 'left',
            value: 'attributes.valid-from',
          },
          {
            text: this.$t('rates.table.headers.validTill'),
            align: 'left',
            value: 'attributes.valid-till',
          }
        ]
      };
    },
    template: `
      <v-layout wrap>
        <v-flex xs12 mb-3>
          <h3 class="title">{{ $t('rates.title') }}</h3>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            v-if="rates.length > 0"
            :headers="headers"
            :items="rates"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.attributes['connect-fee'] }}</td>
                  <td>{{ item.attributes['initial-interval'] }}</td>
                  <td>{{ item.attributes['initial-rate'] }}</td>
                  <td>{{ item.attributes['network-prefix-id'] }}</td>
                  <td>{{ item.attributes['next-interval'] }}</td>
                  <td>{{ item.attributes['next-rate'] }}</td>
                  <td>{{ item.attributes['prefix'] }}</td>
                  <td>{{ item.attributes['reject-calls'] | yesOrNo }}</td>
                  <td>{{ item.attributes['valid-from'] | moment('YYYY-MM-DD HH:mm:ss') }}</td>
                  <td>{{ item.attributes['valid-till'] | moment('YYYY-MM-DD HH:mm:ss') }}</td>
               </tr>
              </tbody>
            </template>
          </v-data-table>
          <div v-else>
            {{ $t('rates.noRatesMessage') }}
          </div>
        </v-flex>
      </v-layout>
    `,
    computed: {
      rates () {
        return this.$store.getters.rates
      },
      isAuthorized () {
        return this.$store.getters.isAuthorized
      },
      authToken () {
        return this.$store.getters.authToken
      }
    },
    watch: {
      isAuthorized (isAuthorized) {
        if(isAuthorized) {
          this.$store.dispatch('loadRates', this.authToken);
        } else {
          this.$store.dispatch('setRates', []);
        }
      }
    },
    mounted () {
      this.$store.dispatch('loadRates', this.authToken);
    },
    filters: {
      yesOrNo (val) {
        if(val === true) {
          return 'Yes'
        } else if(val === false) {
          return 'No'
        } else return 'N/A'
      }
    },
    methods: {}
  }
});
