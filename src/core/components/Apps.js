define(function (require) {
  return {
    name: `Apps`,
    components: {},
    data() {
      return {
        plugins: require('../../plugins/index').modules
      };
    },
    methods: {
      goTo (page) {
        this.$router.push(page)
      },
      getMenuTitle (pluginName) {
        return this.$t(pluginName + '.menuTitle')
      },
      getAppDescription (pluginName) {
        return this.$t(pluginName + '.description')
      }
    },
    template: `
      <v-container class="grey lighten-5">
        <v-row
          class="mb-6"
        >
          <v-col
            sm="6"
            md="4"
            lg="3"
            xl="2"
            class="col-x"
            v-for="(plugin, i) in plugins"
            :key="i"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                height="100%"
                class="pa-2 app-cell"
                :elevation="hover ? 6 : 2"
                tile
                outlined
                @click="goTo(plugin)"
              >
                <v-card-title>
                  <v-icon :class="plugin + '-plugin-icon'">mdi-puzzle</v-icon>
                  <span class="title ml-2">{{ getMenuTitle(plugin) }}</span>                  
                </v-card-title>
                <v-card-text>
                  {{ getAppDescription(plugin) }}
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    `,
  };
});
