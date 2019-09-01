define(function (require) {
  var CheckRateDialog = require('./components/CheckRateDialog');

  return {
    name: `Rateplans`,
    components: {
      CheckRateDialog: CheckRateDialog
    },
    data() {
      return {
        expanded: [],
        headers: [
          {
            text: this.$t('rateplans.table.headers.name'),
            align: 'left',
            value: 'attributes.name',
          },
          {
            text: this.$t('rateplans.table.headers.actions')
          }
        ],
        showDialog: false
      };
    },
    template: `
      <v-layout wrap>
        <v-flex xs12 mb-3>
          <h3 class="title">{{ $t('rateplans.title') }}</h3>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            v-if="rateplans.length > 0"
            :headers="headers"
            :items="rateplans"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.attributes['name'] }}</td>
                  <td>
                    <check-rate-dialog
                      :rateplanId="item.id"
                      :rateplanName="item.attributes.name"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          
          </v-data-table>
          <div v-else>
            {{ $t('rateplans.noRateplansMessage') }}
          </div>
        </v-flex>
      </v-layout>
    `,
    computed: {
      rateplans () {
        return this.$store.getters.rateplans
      },
      checkedRates () {
        return this.$store.getters.checkedRates
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
          this.$store.dispatch('loadRateplans', this.authToken);
        } else {
          this.$store.dispatch('setRateplans', []);
        }
      }
    },
    mounted () {
      this.$store.dispatch('loadRateplans', this.authToken);
    }
  }
});
