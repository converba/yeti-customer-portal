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
      this.$set(this, 'plugins', plugins.modules);
    },
    methods: {
      goTo: function (page) {
        this.$router.push(page)
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
      }
    },
    template: `
      <v-navigation-drawer
          v-model="showDrawer"
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
    `,
  };
});
