define(function (require) {
  var UserPanel = require('../components/UserPanel');

  return {
    name: `Toolbar`,
    components: {
      UserPanel: UserPanel
    },
    data() {
      return {};
    },
    computed: {
      showDrawer: {
        set(showDrawer) {
          this.$store.dispatch('setShowDrawer', showDrawer)
        },
        get() {
          return this.$store.getters.showDrawer
        }
      },
    },
    template: `
      <v-card
          color="grey lighten-4"
          flat
          tile
        >
          <v-toolbar 
            dense
            dark 
            color="primary"
          >
            <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer">
              <v-icon>mdi-menu</v-icon>
            </v-app-bar-nav-icon>
      
            <v-toolbar-title class="white--text">{{ $t('core.header.title') }}</v-toolbar-title>
      
            <v-spacer></v-spacer>

            <v-toolbar-items>
              <v-btn icon>
                <v-icon>mdi-apps</v-icon>
              </v-btn>
          
              <user-panel></user-panel>
          
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
          </v-toolbar-items>
          </v-toolbar>
        </v-card>
    `,
  };
});
