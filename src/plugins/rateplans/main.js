define(function (require) {
  return {
    name: `Rateplans`,
    components: {},
    data() {
      return {
        expanded: [],
        headers: [
          {
            text: this.$t('rateplans.table.headers.name'),
            align: 'left',
            value: 'attributes.name',
          }
        ]
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
          ></v-data-table>
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
    },
    methods: {}
  }
});
