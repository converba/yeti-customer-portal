define(function (require) {
  return {
    name: `Cdrs`,
    components: {},
    data() {
      return {
        headers: [
          {
            text: this.$t('cdrs.table.headers.timeConnect'),
            align: 'left',
            value: 'attributes.time-connect',
          },
          {
            text: this.$t('cdrs.table.headers.timeEnd'),
            value: 'attributes.time-end',
          },
          {
            text: this.$t('cdrs.table.headers.duration'),
            value: 'attributes.duration',
          },
          {
            text: this.$t('cdrs.table.headers.customerPrice'),
            value: 'attributes.customer-price',
          },
          {
            text: this.$t('cdrs.table.headers.destinationFee'),
            value: 'attributes.destination-fee',
          },
          {
            text: this.$t('cdrs.table.headers.destinationInitialRate'),
            value: 'attributes.destination-rate',
          },
          {
            text: this.$t('cdrs.table.headers.destinationNextRate'),
            value: 'attributes.destination-next-rate',
          }
        ],
        showDialog: false,
        moreInfoData: {}
      };
    },
    template: `
      <v-layout wrap>
        <v-flex xs12 mb-3>
          <h3 class="title">{{ $t('cdrs.title') }}</h3>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            v-if="cdrs.length > 0"
            :headers="headers"
            :items="cdrs"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.id" @click="showMoreInfo(item)" class="clickable-row">
                  <td>{{ item.attributes['time-connect'] | moment('YYYY-MM-DD HH:mm:ss') }}</td>
                  <td>{{ item.attributes['time-end'] | moment('YYYY-MM-DD HH:mm:ss') }}</td>
                  <td>{{ item.attributes['duration'] | duration('humanize') }}</td>
                  <td>{{ item.attributes['customer-price'] }}</td>
                  <td>{{ item.attributes['destination-fee'] }}</td>
                  <td>{{ item.attributes['destination-initial-rate'] }}</td>
                  <td>{{ item.attributes['destination-next-rate'] }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
          <div v-else>
            {{ $t('cdrs.noCdrsMessage') }}
          </div>
        </v-flex>
        <v-dialog
          v-model="showDialog"
          max-width="500"
        >
          <v-card v-if="moreInfoData">
            <!--<v-card-title >Call record details</v-card-title>-->

            <v-card-text>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Call record details</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
      
              <v-list
                v-if="moreInfoData.attributes" 
                dense
              >
                <v-list-item v-for="(item, index) in moreInfoData.attributes">
                  <v-list-item-content><strong>{{ index }}</strong></v-list-item-content>
                  <v-list-item-content class="align-end">{{ item }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
    
            <v-card-actions>
              <v-spacer></v-spacer>
    
              <v-btn
                color="primary"
                @click="showDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    `,
    computed: {
      cdrs () {
        return this.$store.getters.cdrs
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
          this.$store.dispatch('loadCdrs', this.authToken);
        } else {
          this.$store.dispatch('setCdrs', []);
        }
      }
    },
    mounted () {
      this.$store.dispatch('loadCdrs', this.authToken);
    },
    methods: {
      showMoreInfo (item) {
        this.moreInfoData = item;
        this.showDialog = true;
      }
    }
  }
});
