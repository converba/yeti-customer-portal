define(function (require) {
  return {
    name: `Accounts`,
    components: {},
    data() {
      return {
        title: 'Accounts',
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'attributes.name',
          },
          { text: 'Balance', value: 'attributes.balance' },
          { text: 'Min. Balance', value: 'attributes.min-balance' },
          { text: 'Max. Balance', value: 'attributes.max-balance' },
          { text: 'Origination Capacity', value: 'attributes.origination-capacity' }
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
        </v-flex>
      </v-layout>
    `,
    computed: {
      accounts: function () {
        return this.$store.getters.accounts
      }
    },
    mounted: function() {
      this.$store.dispatch('loadAccounts', this.$store.getters.authToken);
    }
  }
});
