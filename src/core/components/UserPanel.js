define(function (require) {
  return {
    name: 'UserPanel',
    components: {},
    data() {
      return {
        login: '',
        password: '',
        highPrivacyMode: false
      };
    },
    methods: {
      logout: function () {
        this.authToken = '';
        this.login = '';
        this.password = '';
        this.$store.dispatch('setAuthorizedStatus', false);
        window.localStorage.removeItem('authToken');
      }
    },
    computed: {
      authToken: {
        set(authToken) {
          this.$store.dispatch('setAuthToken', authToken)
        },
        get() {
          return this.$store.getters.authToken
        }
      },
      showAuthDialog: {
        set(showDialog) {
          this.$store.dispatch('setShowAuthDialog', showDialog)
        },
        get() {
          return this.$store.getters.showAuthDialog
        }
      },
    },
    template: `
    <v-menu
      v-if="authToken" 
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          flat
          ml-2
          mr-3
          v-on="on"
        >
          <v-avatar
            v-if="authToken"
            size="32px"
          >
            <v-icon>person</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          @click="logout"
        >
          <v-list-tile-title>{{ $t('core.auth.logOut') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn
      v-else
      flat
      @click.stop="showAuthDialog = true"
    >
      {{ $t('core.auth.logIn') }}
    </v-btn>
  `
  }
})

