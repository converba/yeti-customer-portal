define(function (require) {
  return {
    name: `Accounts`,
    components: {},
    data() {
      return {
        title: 'Accounts',
        headers: [
          {
            text: this.$t('accounts.table.headers.name'),
            align: 'left',
            value: 'attributes.name',
          },
          {
            text: this.$t('accounts.table.headers.balance'),
            value: 'attributes.balance'
          },
          {
            text: this.$t('accounts.table.headers.minBalance'),
            value: 'attributes.min-balance'
          },
          {
            text: this.$t('accounts.table.headers.maxBalance'),
            value: 'attributes.max-balance'
          },
          {
            text: this.$t('accounts.table.headers.originationCapacity'),
            value: 'attributes.origination-capacity'
          }
        ]
      };
    },
    template: `
      <v-layout wrap>
        <v-flex xs12 mb-3>
          <h3 class="title">{{ $t('accounts.title') }}</h3>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            v-if="accounts.length > 0"
            :headers="headers"
            :items="accounts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.attributes.name }}</td>
              <td>{{ props.item.attributes.balance }}</td>
              <td>{{ props.item.attributes['min-balance'] }}</td>
              <td>{{ props.item.attributes['max-balance'] }}</td>
              <td>{{ props.item.attributes['origination-capacity'] }}</td>
            </template>
          </v-data-table>
          <div v-else>
            {{ $t('accounts.noAccountsMessage') }}
          </div>
        </v-flex>
      </v-layout>
    `,
    computed: {
      accounts () {
        return this.$store.getters.accounts
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
          this.$store.dispatch('loadAccounts', this.authToken);
        } else {
          this.$store.dispatch('setAccounts', []);
        }
      }
    },
    mounted () {
      this.$store.dispatch('loadAccounts', this.authToken);
    }
  }
});
