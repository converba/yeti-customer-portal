define(function (require) {
  return {
    name: `CheckRateDialog`,
    props: {
      rateplanId: {
        type: String,
        default: ''
      },
      rateplanName: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        number: '',
        showDialog: false,
        valid: false,
        rules: {
          digits: value => {
            const pattern = /^\d*$/;
            return pattern.test(value) || this.$t('rateplans.checkRateDialog.onlyDigitsMessage');
          },
        },
        headers: [
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.connectFee'),
            align: 'left',
            value: 'connect_fee',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.initialInterval'),
            align: 'left',
            value: 'initial_interval',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.initialRate'),
            align: 'left',
            value: 'initial_rate',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.networkPrefixId'),
            align: 'left',
            value: 'network_prefix_id',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.nextInterval'),
            align: 'left',
            value: 'next_interval',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.nextRate'),
            align: 'left',
            value: 'next_rate',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.prefix'),
            align: 'left',
            value: 'prefix',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.rejectCalls'),
            align: 'left',
            value: 'reject_calls',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.tags'),
            align: 'left',
            value: 'routing_tag_names',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.validFrom'),
            align: 'left',
            value: 'valid_from',
          },
          {
            text: this.$t('rateplans.checkRateDialog.table.headers.validTill'),
            align: 'left',
            value: 'valid_till',
          }
        ]
      };
    },
    template: `
      <v-dialog 
        v-model="showDialog" 
        :max-width="dialogWidth"
      >
        <template v-slot:activator="{ on }">
          <v-btn 
            v-on="on"
            small
            outlined
            color="primary"
          >
            {{ $t('rateplans.checkRateDialog.checkRateBtn') }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t('rateplans.checkRateDialog.title') }}</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container grid-list-md pa-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-form v-model="valid" ref="form">
                    <v-text-field 
                      v-model="number" 
                      :label="$t('rateplans.checkRateDialog.number')"
                      :rules="[rules.digits]"
                      @click:clear="clearNumber"
                      class="check-rate-dialog__input"
                      clear-icon="mdi-close-circle"
                      clearable
                      required
                      autofocus
                    >
                    <template v-slot:append-outer>
                      <v-btn
                      v-if="number && valid" 
                      text
                      small
                      color="primary" 
                      @click="checkRate">
                        <v-icon left>mdi-arrow-down-bold-box</v-icon>
                        {{ $t('rateplans.checkRateDialog.checkRateBtn') }}
                      </v-btn>
                    </template>
                    </v-text-field>
                  </v-form>
                </v-flex>
                <v-flex xs12>
                  {{ $t('rateplans.checkRateDialog.rateplanName') }}:
                  {{ rateplanName }}
                </v-flex>
                <v-flex>
                  <v-data-table
                    v-if="checkedRates.length > 0"
                    :headers="headers"
                    :items="checkedRates"
                    item-key="id"
                    class="elevation-1"
                  >
                    <template v-slot:body="{ items }">
                      <tbody>
                        <tr v-for="item in items" :key="item.id">
                          <td>{{ item["connect_fee"] }}</td>
                          <td>{{ item['initial_interval'] }}</td>
                          <td>{{ item['initial_rate'] }}</td>
                          <td>{{ item['network_prefix_id'] }}</td>
                          <td>{{ item['next_interval'] }}</td>
                          <td>{{ item['next_rate'] }}</td>
                          <td>{{ item['prefix'] }}</td>
                          <td>{{ item['reject_calls'] | yesOrNo }}</td>
                          <td>{{ item['routing_tag_names'] | joinItems }}</td>
                          <td>{{ item['valid_from'] | moment('YYYY-MM-DD HH:mm:ss') }}</td>
                          <td>{{ item['valid_till'] | moment('YYYY-MM-DD HH:mm:ss') }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="pt-3">
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog">
              {{ $t('rateplans.checkRateDialog.cancelBtn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    `,
    computed: {
      checkedRates: {
        set (checkedRates) {
          this.$store.dispatch('setCheckedRates', checkedRates)
        },
        get () {
          return this.$store.getters.checkedRates
        }
      },
      authToken () {
        return this.$store.getters.authToken
      },
      dialogWidth () {
        if (this.checkedRates.length > 0) {
          return '100%'
        } else return '400'
      }
    },
    methods: {
      checkRate() {
        if(this.valid) {
          this.$store.dispatch('checkRate', {
            jwt: this.authToken,
            rateplanId: this.rateplanId,
            number: this.number
          });
        }
      },
      closeDialog() {
        this.showDialog = false
      },
      clearNumber() {
        this.number = '';
        this.checkedRates = []
      },
    },
    filters: {
      yesOrNo (val) {
        if(val === true) {
          return 'Yes'
        } else if(val === false) {
          return 'No'
        } else return 'N/A'
      },
      joinItems (arr) {
        return arr.join(', ')
      }
    },
  }
});
