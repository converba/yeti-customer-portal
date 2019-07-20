define(function (require) {
  var Auth = require('../../api/Auth');

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
        var self = this;
        this.$set(this, 'showAuthDialog', false);
        Auth.getToken({
          login: this.login,
          password: this.password
        }).then(function (data) {
          if (data && data.jwt) {
            self.$set(self, 'authToken', data.jwt);
            if(!self.highPrivacyMode) {
              window.localStorage.setItem('authToken', data.jwt);
            }
          }
        })
      },
      openDialog: function () {
        this.$set(this, 'showAuthDialog', true);
      }
    },
    created: function (){
      var authToken = window.localStorage.getItem('authToken');
      if(authToken) {
        this.$set(this, 'authToken', authToken);
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
              <span class="headline">Sign In</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="login" label="Login" required autofocus></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-checkbox v-model="highPrivacyMode" label="High Privacy mode"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="showAuthDialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="signIn">Sign In</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      `,
  };
});
