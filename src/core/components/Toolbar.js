define(function (require) {
  var UserPanel = require('../components/UserPanel');
  var config = require('../../config');

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
      showLogoText () {
        if(config
          && config.theme
          && config.theme.hasOwnProperty('showLogoText')) {
          return config.theme.showLogoText
        }
        return true
      },
      logoPath () {
        if(config
          && config.theme
          && config.theme.hasOwnProperty('customLogoPath')) {
          return config.theme.customLogoPath
        }
        return '/assets/img/logo.png'
      }
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

            <v-toolbar-title
              class="px-0"
            >
              <v-btn 
                to="/" 
                light
                text
                class="white--text px-2"
              >
                <img
                  class="mr-2 header-logo"
                  :src="logoPath"
                />
                <span
                  v-if="showLogoText"
                  class="ml-1"
                >
                  {{ $t('core.header.title') }}
                </span>
              </v-btn>
            </v-toolbar-title>
      
            <v-spacer></v-spacer>

            <v-toolbar-items>
              <v-btn 
                icon
                to="/" 
              >
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
