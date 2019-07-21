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
        this.$set(this, 'authToken', '');
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
          flat
          ml-2
          mr-3
          v-on="on"
        >
          <v-flex mr-3>User Name</v-flex>
          <v-avatar
            v-if="authToken"
            size="32px"
          >
            <v-icon>person</v-icon>
            <!--<img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              alt="Avatar"
            >-->
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          @click="logout"
        >
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn
      v-else
      flat
      @click.stop="showAuthDialog = true"
    >
      Sign In
    </v-btn>
  `
  }
})

