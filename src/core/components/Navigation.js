define(function (require) {
  var plugins = require('../../plugins/index');

  return {
    name: `Navigation`,
    components: {},
    data() {
      return {
        drawer: null,
        plugins: []
      };
    },
    mounted () {
      this.plugins = plugins.modules;
    },
    methods: {
      goTo: function (page) {
        this.$router.push(page)
      },
      getMenuTitle: function (pluginName) {
        return this.$t(pluginName + '.menuTitle')
      }
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
      <v-navigation-drawer
          v-model="showDrawer"
          absolute
          temporary
        >
          <v-list dense>
            <v-list-item 
              link
              @click="goTo('/')"
            >
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('core.navigation.home') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        
            <v-list-item 
              link
              v-for="(plugin, i) in plugins"
              :key="i"
              @click="goTo(plugin)"
            >
              <v-list-item-icon>
                <v-icon>mdi-puzzle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ getMenuTitle(plugin) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    `,
  };
});
