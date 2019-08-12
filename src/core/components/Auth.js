define(function (require) {
  return {
    name: 'Auth',
    components: {},
    data() {
      return {
        login: '',
        password: '',
        highPrivacyMode: false
      };
    },

    methods: {
      signIn: function () {
        this.showAuthDialog = false;
        this.$store.dispatch('loadAuthToken', {
          login: this.login,
          password: this.password
        });
        this.login = '';
        this.password = '';
      },
      openDialog: function () {
        this.showAuthDialog = true;
      }
    },
    created: function (){
      var authToken = window.localStorage.getItem('authToken');
      if(authToken) {
        this.authToken = authToken;
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
      }
    },
    template: `
      <v-layout row justify-center>
        <v-dialog v-model="showAuthDialog" max-width="400px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t('core.auth.logIn') }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="login" :label="$t('core.auth.login')" required autofocus></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="password" :label="$t('core.auth.logIn')" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-checkbox v-model="highPrivacyMode" :label="$t('core.auth.highPrivacyMode')"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showAuthDialog = false">{{ $t('core.auth.cancel') }}</v-btn>
              <v-btn color="blue darken-1" text @click="signIn">{{ $t('core.auth.logIn') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      `,
  };
});
