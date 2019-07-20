define(function (require) {
  var plugins = require('../plugins/index');
  var Auth = require('../app/components/Auth');

  return {
    name: 'App',
    components: {
      Auth: Auth
    },
    data () {
      return {
        drawer: null,
        plugins: []
      }
    },
    methods: {
      goTo: function (page) {
        this.$router.push(page)
      }
    },
    mounted () {
      this.$set(this, 'plugins', plugins.modules);
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
      <v-app>
        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile @click="goTo('/')">
              <v-list-tile-action>
                <v-icon>home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile>
      
            <v-list-group
              prepend-icon="account_circle"
              value="true"
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>Modules</v-list-tile-title>
                </v-list-tile>
              </template>
              
              <v-list-tile
                  v-for="(plugin, i) in plugins"
                  :key="i"
                  @click="goTo(plugin)"
                >
                  <v-list-tile-avatar>
                    <v-icon>extension</v-icon>
</v-list-tile-avatar>
                  <v-list-tile-title v-text="plugin"></v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
        
        
        <v-toolbar dark color="primary">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      
          <v-toolbar-title class="white--text">Yeti Customer Portal</v-toolbar-title>
      
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
      
          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>
      
          <v-btn icon>
            <v-icon>refresh</v-icon>
          </v-btn>
          
          <v-flex
            v-if="authToken" 
            shrink
            ml-2
            mr-3
          >
            User Name
          </v-flex>

          <v-avatar
            v-if="authToken"
            size="32px"
          >
            <img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              alt="Avatar"
            >
          </v-avatar>
          <v-btn
            v-else
            flat
            @click.stop="showAuthDialog = true"
          >Sign In</v-btn>
      
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>

        <v-content>
          <v-container fluid>
            <router-view></router-view>
            <auth></auth>
          </v-container>
        </v-content>
        <v-footer app></v-footer>
      </v-app>
    `,
  };
});
