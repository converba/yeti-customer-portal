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
      <v-toolbar dark color="primary">
          <v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
      
          <v-toolbar-title class="white--text">{{ $t('core.header.title') }}</v-toolbar-title>
      
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
          
          <user-panel></user-panel>
      
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
    `,
  };
});
